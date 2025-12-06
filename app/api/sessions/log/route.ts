import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withRole } from '@/lib/middleware';

/**
 * POST /api/sessions/log
 * Log session completion with pain scores (Provider only)
 */
export const POST = withRole(['PROVIDER', 'ADMIN'], async (request, user) => {
  try {
    const body = await request.json();
    const {
      bookingId,
      painScoreBefore,
      painScoreAfter,
      sessionNotes,
    } = body;

    // Validate required fields
    if (!bookingId || painScoreBefore === undefined || painScoreAfter === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: bookingId, painScoreBefore, painScoreAfter' },
        { status: 400 }
      );
    }

    // Validate pain scores (1-10 scale)
    if (painScoreBefore < 1 || painScoreBefore > 10 || painScoreAfter < 1 || painScoreAfter > 10) {
      return NextResponse.json(
        { error: 'Pain scores must be between 1 and 10' },
        { status: 400 }
      );
    }

    // Fetch booking
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        patient: true,
        package: true,
        provider: true,
      },
    });

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Verify provider is assigned to this booking (unless admin)
    if (user.role === 'PROVIDER') {
      const provider = await prisma.provider.findUnique({
        where: { userId: user.userId },
      });

      if (!provider || booking.providerId !== provider.id) {
        return NextResponse.json(
          { error: 'Unauthorized to log session for this booking' },
          { status: 403 }
        );
      }
    }

    // Check if booking is already completed
    if (booking.assignmentStatus === 'COMPLETED') {
      return NextResponse.json(
        { error: 'Session already logged for this booking' },
        { status: 400 }
      );
    }

    // Use transaction to update all related records atomically
    const result = await prisma.$transaction(async (tx) => {
      // 1. Update booking with session data
      const updatedBooking = await tx.booking.update({
        where: { id: bookingId },
        data: {
          painScoreBefore,
          painScoreAfter,
          sessionNotes,
          completedAt: new Date(),
          assignmentStatus: 'COMPLETED',
        },
      });

      // 2. Create pain score record
      const painScore = await tx.painScore.create({
        data: {
          patientId: booking.patientId,
          providerId: booking.providerId!,
          bookingId,
          sessionNumber: booking.sessionNumber,
          painScore: painScoreAfter,
          notes: sessionNotes,
        },
      });

      // 3. Update package progress
      const updatedPackage = await tx.package.update({
        where: { id: booking.packageId },
        data: {
          sessionsCompleted: {
            increment: 1,
          },
          sessionsRemaining: {
            decrement: 1,
          },
          ...(booking.package.sessionsRemaining === 1 && {
            status: 'COMPLETED',
          }),
        },
      });

      // 4. Update patient's current pain score
      await tx.patient.update({
        where: { id: booking.patientId },
        data: {
          currentPainScore: painScoreAfter,
          lastSessionDate: new Date(),
        },
      });

      // 5. Create commission record for payout
      const sessionPrice = booking.servicePrice;
      const commissionRate = booking.provider?.commissionRate || 0.75;
      const commissionAmount = Math.round(sessionPrice * commissionRate);
      const platformFee = sessionPrice - commissionAmount;
      const tdsAmount = Math.round(commissionAmount * 0.1); // 10% TDS
      const netPayout = commissionAmount - tdsAmount;

      const commission = await tx.commission.create({
        data: {
          providerId: booking.providerId!,
          bookingId,
          sessionPrice,
          commissionRate,
          commissionAmount,
          platformFee,
          tdsAmount,
          netPayout,
          payoutStatus: 'PENDING',
        },
      });

      return {
        booking: updatedBooking,
        painScore,
        package: updatedPackage,
        commission,
      };
    });

    // TODO: Send notifications
    // - Patient: Session completed, pain score improvement
    // - Admin: New session completion
    // - Provider: Commission credited

    return NextResponse.json({
      success: true,
      message: 'Session logged successfully',
      data: result,
    });
  } catch (error) {
    console.error('Log session error:', error);
    return NextResponse.json(
      { error: 'Failed to log session' },
      { status: 500 }
    );
  }
});
