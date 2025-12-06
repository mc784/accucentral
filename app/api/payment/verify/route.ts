import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingId,
    } = await request.json();

    // Validate inputs
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: 'Missing payment verification parameters' },
        { status: 400 }
      );
    }

    // Verify signature
    const key_secret = process.env.RAZORPAY_KEY_SECRET;
    if (!key_secret) {
      throw new Error('Razorpay key secret not configured');
    }

    const generated_signature = crypto
      .createHmac('sha256', key_secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generated_signature !== razorpay_signature) {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 401 }
      );
    }

    // TODO: Update booking status in database
    // await db.query('UPDATE bookings SET payment_status = ?, payment_id = ?, updated_at = NOW() WHERE id = ?',
    //   ['paid', razorpay_payment_id, bookingId]);

    // TODO: Update payment order status
    // await db.query('UPDATE payment_orders SET status = ?, payment_id = ? WHERE order_id = ?',
    //   ['success', razorpay_payment_id, razorpay_order_id]);

    // TODO: Send confirmation SMS/WhatsApp to patient
    // await sendWhatsAppMessage(patientPhone, `Payment successful! Your booking is confirmed.`);

    // TODO: Notify provider
    // await sendWhatsAppMessage(providerPhone, `New booking confirmed. Payment received.`);

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      paymentId: razorpay_payment_id,
    });
  } catch (error) {
    console.error('Verify payment error:', error);
    return NextResponse.json(
      { error: 'Payment verification failed' },
      { status: 500 }
    );
  }
}
