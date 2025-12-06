import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { generateOTP, storeOTP, sendOTPSMS } from '@/lib/auth-server';

export async function POST(request: Request) {
  try {
    const { phone } = await request.json();

    // Validate phone number format (India: +91XXXXXXXXXX)
    if (!phone || !/^\+91[6-9]\d{9}$/.test(phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number. Must be in format: +91XXXXXXXXXX' },
        { status: 400 }
      );
    }

    // DEV MODE: Auto-accept all phone numbers
    if (process.env.NODE_ENV === 'development') {
      const otp = generateOTP();
      storeOTP(phone, otp);
      console.log(`[DEV MODE] OTP for ${phone}: ${otp}`);
      
      return NextResponse.json({
        success: true,
        message: 'OTP sent successfully (DEV MODE: Use any 6-digit code)',
        otp, // Expose OTP in dev mode
      });
    }

    // PRODUCTION: Check if user exists
    const user = await prisma.user.findUnique({
      where: { phone },
      include: {
        patient: true,
        provider: true,
        admin: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found. Please register first.' },
        { status: 404 }
      );
    }

    // Check if user is active
    if (user.status !== 'ACTIVE') {
      return NextResponse.json(
        { error: 'Account is not active. Please contact support.' },
        { status: 403 }
      );
    }

    // Generate and store OTP
    const otp = generateOTP();
    storeOTP(phone, otp);

    // Send OTP via SMS
    await sendOTPSMS(phone, otp);

    return NextResponse.json({
      success: true,
      message: 'OTP sent successfully',
      ...(process.env.NODE_ENV === 'development' && { otp }), // Include OTP in dev mode
    });
  } catch (error) {
    console.error('Send OTP error:', error);
    return NextResponse.json(
      { error: 'Failed to send OTP' },
      { status: 500 }
    );
  }
}
