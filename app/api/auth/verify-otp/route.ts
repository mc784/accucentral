import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyOTP, generateToken } from '@/lib/auth-server';

export async function POST(request: Request) {
  try {
    const { phone, otp } = await request.json();

    // Validate inputs
    if (!phone || !otp) {
      return NextResponse.json(
        { error: 'Phone and OTP are required' },
        { status: 400 }
      );
    }

    // Validate phone format
    if (!/^\+91[6-9]\d{9}$/.test(phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // Verify OTP
    const isValidOTP = verifyOTP(phone, otp);
    if (!isValidOTP) {
      return NextResponse.json(
        { error: 'Invalid or expired OTP' },
        { status: 401 }
      );
    }

    // DEV MODE: Create mock user if doesn't exist
    if (process.env.NODE_ENV === 'development') {
      let user = await prisma.user.findUnique({
        where: { phone },
        include: {
          patient: true,
          provider: true,
          admin: true,
        },
      });

      if (!user) {
        console.log(`[DEV MODE] Creating new user for ${phone}`);
        
        // Determine role based on phone pattern (simple heuristic)
        const role = phone.includes('9123') ? 'PROVIDER' : 'PATIENT';
        
        user = await prisma.user.create({
          data: {
            phone,
            email: `user${phone.slice(-4)}@test.com`,
            role: role as any,
            status: 'ACTIVE',
          },
          include: {
            patient: true,
            provider: true,
            admin: true,
          },
        });

        // Create role-specific profile
        if (role === 'PATIENT') {
          await prisma.patient.create({
            data: {
              userId: user.id,
              name: `Test Patient ${phone.slice(-4)}`,
              condition: 'General Wellness',
              currentPainScore: 5,
              age: 30,
              gender: 'male',
            },
          });
        } else if (role === 'PROVIDER') {
          await prisma.provider.create({
            data: {
              userId: user.id,
              name: `Test Provider ${phone.slice(-4)}`,
              specialization: 'General Therapist',
              serviceArea: 'FARIDABAD',
              badgeLevel: 'LEVEL_1',
              gender: 'male',
              experience: 5,
              rating: 4.5,
              totalSessions: 0,
              status: 'ACTIVE',
              ayushCertified: false,
            },
          });
        }
        
        // Re-fetch with relations
        user = await prisma.user.findUnique({
          where: { phone },
          include: {
            patient: true,
            provider: true,
            admin: true,
          },
        })!;
      }

      // Generate token for dev user
      const token = generateToken({
        userId: user.id,
        phone: user.phone,
        role: user.role,
      });

      let userData: any = {
        userId: user.id,
        phone: user.phone,
        email: user.email,
        role: user.role,
      };

      if (user.patient) {
        userData.patient = {
          id: user.patient.id,
          name: user.patient.name,
          condition: user.patient.condition,
          currentPainScore: user.patient.currentPainScore,
        };
      } else if (user.provider) {
        userData.provider = {
          id: user.provider.id,
          name: user.provider.name,
          specialization: user.provider.specialization,
          serviceArea: user.provider.serviceArea,
        };
      }

      return NextResponse.json({
        success: true,
        message: 'Login successful (DEV MODE)',
        token,
        user: userData,
      });
    }

    // PRODUCTION: Fetch user from database
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
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if user is active
    if (user.status !== 'ACTIVE') {
      return NextResponse.json(
        { error: 'Account is not active' },
        { status: 403 }
      );
    }

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      phone: user.phone,
      role: user.role,
    });

    // Prepare user data based on role
    let userData: any = {
      userId: user.id,
      phone: user.phone,
      email: user.email,
      role: user.role,
    };

    if (user.patient) {
      userData.patient = {
        id: user.patient.id,
        name: user.patient.name,
        condition: user.patient.condition,
        currentPainScore: user.patient.currentPainScore,
      };
    }

    if (user.provider) {
      userData.provider = {
        id: user.provider.id,
        name: user.provider.name,
        slug: user.provider.slug,
        badgeLevel: user.provider.badgeLevel,
        status: user.provider.status,
      };
    }

    if (user.admin) {
      userData.admin = {
        id: user.admin.id,
        name: user.admin.name,
      };
    }

    return NextResponse.json({
      success: true,
      token,
      user: userData,
      message: 'Login successful',
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    return NextResponse.json(
      { error: 'Failed to verify OTP' },
      { status: 500 }
    );
  }
}
