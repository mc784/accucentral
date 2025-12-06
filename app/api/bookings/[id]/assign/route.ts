import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withRole } from '@/lib/middleware';

/**
 * PATCH /api/bookings/[id]/assign
 * Assign provider to booking (Admin only)
 */
export const PATCH = withRole(['ADMIN'], async (request, user, context: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { providerId, confirmedDate, confirmedTime } = body;

    // Validate inputs
    if (!providerId) {
      return NextResponse.json(
        { error: 'Provider ID is required' },
        { status: 400 }
      );
    }

    // Check if booking exists
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        patient: true,
      },
    });

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Check if provider exists and is active
    const provider = await prisma.provider.findUnique({
      where: { id: providerId },
    });

    if (!provider) {
      return NextResponse.json(
        { error: 'Provider not found' },
        { status: 404 }
      );
    }

    if (provider.status !== 'ACTIVE') {
      return NextResponse.json(
        { error: `Provider is ${provider.status.toLowerCase()}. Cannot assign.` },
        { status: 400 }
      );
    }

    // Update booking with provider assignment
    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: {
        providerId,
        assignedProviderName: provider.name,
        confirmedDate: confirmedDate || booking.requestedDate,
        confirmedTime: confirmedTime || booking.requestedTime,
        assignmentStatus: 'ASSIGNED',
      },
      include: {
        service: true,
        patient: {
          select: {
            name: true,
            phone: true,
          },
        },
        provider: {
          select: {
            name: true,
            badgeLevel: true,
          },
        },
      },
    });

    // TODO: Send notification to provider (SMS/WhatsApp/Push)
    // TODO: Send confirmation to patient

    return NextResponse.json({
      success: true,
      booking: updatedBooking,
      message: 'Provider assigned successfully',
    });
  } catch (error) {
    console.error('Assign provider error:', error);
    return NextResponse.json(
      { error: 'Failed to assign provider' },
      { status: 500 }
    );
  }
});
