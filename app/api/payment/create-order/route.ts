import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { bookingId, amount } = await request.json();

    // Validate inputs
    if (!bookingId || !amount) {
      return NextResponse.json(
        { error: 'Booking ID and amount are required' },
        { status: 400 }
      );
    }

    // TODO: Initialize Razorpay with your credentials
    const Razorpay = require('razorpay');
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // Create order
    const options = {
      amount: amount * 100, // Razorpay expects paise (multiply rupees by 100)
      currency: 'INR',
      receipt: `booking_${bookingId}`,
      notes: {
        bookingId,
      },
    };

    const order = await razorpay.orders.create(options);

    // TODO: Save order details to database
    // await db.query('INSERT INTO payment_orders (order_id, booking_id, amount, status) VALUES (?, ?, ?, ?)',
    //   [order.id, bookingId, amount, 'created']);

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment order' },
      { status: 500 }
    );
  }
}
