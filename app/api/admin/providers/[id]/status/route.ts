import { NextResponse } from 'next/server';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { status } = await request.json();

    // Validate status
    const validStatuses = ['active', 'inactive', 'pending'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    // TODO: Replace with actual database update
    // await db.query('UPDATE providers SET status = ?, updated_at = NOW() WHERE id = ?', [status, id]);
    
    // TODO: Send notifications
    // if (status === 'active') {
    //   await sendWhatsAppMessage(providerPhone, 'Your account has been approved!');
    // }

    return NextResponse.json({
      success: true,
      message: 'Provider status updated',
    });
  } catch (error) {
    console.error('Update provider status error:', error);
    return NextResponse.json(
      { error: 'Failed to update provider status' },
      { status: 500 }
    );
  }
}
