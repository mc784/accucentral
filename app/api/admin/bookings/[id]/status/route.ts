import { NextResponse } from 'next/server';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { status } = await request.json();

    // Validate status
    const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    // TODO: Replace with actual database update
    // await db.query('UPDATE bookings SET status = ?, updated_at = NOW() WHERE id = ?', [status, id]);
    
    // TODO: Send notifications
    // if (status === 'confirmed') {
    //   await sendWhatsAppMessage(patientPhone, 'Your booking is confirmed!');
    //   await sendWhatsAppMessage(providerPhone, 'New booking confirmed for you.');
    // }

    return NextResponse.json({
      success: true,
      message: 'Booking status updated',
    });
  } catch (error) {
    console.error('Update booking status error:', error);
    return NextResponse.json(
      { error: 'Failed to update booking status' },
      { status: 500 }
    );
  }
}
