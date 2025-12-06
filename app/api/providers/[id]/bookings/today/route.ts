import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withAuth } from '@/lib/middleware';

/**
 * GET /api/providers/[id]/bookings/today
 * Get today's bookings for a provider (authenticated)
 */
export const GET = withAuth(async (request, user, context: { params: Promise<{ id: string }> }) => {
  try {
    const { id: providerId } = await context.params;

    // Verify authorization: user must be the provider or admin
    if (user.role === 'PROVIDER') {
      const provider = await prisma.provider.findUnique({
        where: { userId: user.userId },
      });

      if (!provider || provider.id !== providerId) {
        return NextResponse.json(
          { error: 'Unauthorized to view these bookings' },
          { status: 403 }
        );
      }
    } else if (user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    // Fetch today's bookings
    const bookings = await prisma.booking.findMany({
      where: {
        providerId,
        requestedDate: today,
        assignmentStatus: {
          in: ['ASSIGNED', 'CONFIRMED', 'IN_PROGRESS'],
        },
      },
      include: {
        service: {
          select: {
            id: true,
            title: true,
            duration: true,
            price: true,
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
        package: {
          select: {
            packageType: true,
            sessionsCompleted: true,
            totalSessions: true,
          },
        },
      },
      orderBy: {
        requestedTime: 'asc',
      },
    });

    return NextResponse.json({
      success: true,
      date: today,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error('Fetch today bookings error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
});
