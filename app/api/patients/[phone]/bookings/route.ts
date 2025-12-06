import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withAuth } from '@/lib/middleware';

/**
 * GET /api/patients/[phone]/bookings
 * Get patient booking history (authenticated)
 */
export const GET = withAuth(async (request, user, context: { params: Promise<{ phone: string }> }) => {
  try {
    const { phone } = await context.params;

    // Decode phone if URL encoded
    const decodedPhone = decodeURIComponent(phone);

    // Verify authorization: user must be the patient or admin
    if (user.role === 'PATIENT' && user.phone !== decodedPhone) {
      return NextResponse.json(
        { error: 'Unauthorized to view this patient data' },
        { status: 403 }
      );
    } else if (user.role === 'PROVIDER') {
      return NextResponse.json(
        { error: 'Providers cannot access patient booking history' },
        { status: 403 }
      );
    }
    // Admin can access any patient data

    // Find patient by phone
    const patient = await prisma.patient.findFirst({
      where: { phone: decodedPhone },
      include: {
        packages: {
          include: {
            bookings: {
              include: {
                service: {
                  select: {
                    title: true,
                    duration: true,
                  },
                },
                provider: {
                  select: {
                    name: true,
                    badgeLevel: true,
                    rating: true,
                  },
                },
              },
              orderBy: {
                createdAt: 'desc',
              },
            },
          },
          orderBy: {
            purchaseDate: 'desc',
          },
        },
      },
    });

    if (!patient) {
      return NextResponse.json(
        { error: 'Patient not found' },
        { status: 404 }
      );
    }

    // Flatten bookings from all packages
    const allBookings = patient.packages.flatMap((pkg: any) =>
      pkg.bookings.map((booking: any) => ({
        ...booking,
        package: {
          id: pkg.id,
          type: pkg.packageType,
          totalSessions: pkg.totalSessions,
          sessionsCompleted: pkg.sessionsCompleted,
        },
      }))
    );

    // Calculate summary stats
    const totalSessions = allBookings.filter((b: any) => b.assignmentStatus === 'COMPLETED').length;
    const upcomingSessions = allBookings.filter((b: any) =>
      ['PENDING', 'ASSIGNED', 'CONFIRMED'].includes(b.assignmentStatus)
    ).length;

    return NextResponse.json({
      success: true,
      patient: {
        id: patient.id,
        name: patient.name,
        condition: patient.condition,
        currentPainScore: patient.currentPainScore,
        initialPainScore: patient.initialPainScore,
        improvement: patient.initialPainScore - patient.currentPainScore,
      },
      summary: {
        totalSessions,
        upcomingSessions,
        totalPackages: patient.packages.length,
        activePackages: patient.packages.filter(p => p.status === 'ACTIVE').length,
      },
      packages: patient.packages.map(pkg => ({
        id: pkg.id,
        type: pkg.packageType,
        totalSessions: pkg.totalSessions,
        sessionsCompleted: pkg.sessionsCompleted,
        sessionsRemaining: pkg.sessionsRemaining,
        status: pkg.status,
        purchaseDate: pkg.purchaseDate,
        price: pkg.price / 100, // Convert paise to rupees
      })),
      bookings: allBookings.map(b => ({
        id: b.id,
        bookingNumber: b.bookingNumber,
        serviceName: b.service.title,
        duration: b.service.duration,
        sessionNumber: b.sessionNumber,
        requestedDate: b.requestedDate,
        requestedTime: b.requestedTime,
        confirmedDate: b.confirmedDate,
        confirmedTime: b.confirmedTime,
        status: b.assignmentStatus,
        provider: b.provider ? {
          name: b.provider.name,
          badgeLevel: b.provider.badgeLevel,
          rating: b.provider.rating,
        } : null,
        painScoreBefore: b.painScoreBefore,
        painScoreAfter: b.painScoreAfter,
        completedAt: b.completedAt,
        package: b.package,
      })),
    });
  } catch (error) {
    console.error('Fetch patient bookings error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch patient bookings' },
      { status: 500 }
    );
  }
});
