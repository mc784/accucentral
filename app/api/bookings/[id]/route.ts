import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withAuth } from '@/lib/middleware';

/**
 * GET /api/bookings/[id]
 * Get booking details (authenticated)
 */
export const GET = withAuth(async (request, user, context: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await context.params;

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        service: {
          select: {
            id: true,
            slug: true,
            title: true,
            duration: true,
            price: true,
            description: true,
          },
        },
        patient: {
          select: {
            id: true,
            name: true,
            phone: true,
            condition: true,
            currentPainScore: true,
          },
        },
        provider: {
          select: {
            id: true,
            name: true,
            photo: true,
            badgeLevel: true,
            badgeTitle: true,
            rating: true,
          },
        },
        package: {
          select: {
            id: true,
            packageType: true,
            totalSessions: true,
            sessionsCompleted: true,
            sessionsRemaining: true,
          },
        },
        painScore: {
          select: {
            painScore: true,
            notes: true,
            recordedAt: true,
          },
        },
      },
    });

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Authorization check: user must be patient, assigned provider, or admin
    const isPatient = user.role === 'PATIENT' && booking.patient.id === user.userId;
    const isProvider = user.role === 'PROVIDER' && booking.providerId === user.userId;
    const isAdmin = user.role === 'ADMIN';

    if (!isPatient && !isProvider && !isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized to view this booking' },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error('Fetch booking error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch booking' },
      { status: 500 }
    );
  }
});
