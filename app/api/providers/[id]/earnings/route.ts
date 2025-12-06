import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withAuth } from '@/lib/middleware';

/**
 * GET /api/providers/[id]/earnings
 * Get provider earnings summary (authenticated)
 * Query params:
 *   - period: 'week' | 'month' | 'all' (default: 'month')
 */
export const GET = withAuth(async (request, user, context: { params: Promise<{ id: string }> }) => {
  try {
    const { id: providerId } = await context.params;
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'month';

    // Verify authorization: user must be the provider or admin
    if (user.role === 'PROVIDER') {
      const provider = await prisma.provider.findUnique({
        where: { userId: user.userId },
      });

      if (!provider || provider.id !== providerId) {
        return NextResponse.json(
          { error: 'Unauthorized to view these earnings' },
          { status: 403 }
        );
      }
    } else if (user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    // Calculate date filter based on period
    let dateFilter: any = {};
    const now = new Date();

    if (period === 'week') {
      const weekAgo = new Date(now);
      weekAgo.setDate(weekAgo.getDate() - 7);
      dateFilter = { gte: weekAgo };
    } else if (period === 'month') {
      const monthAgo = new Date(now);
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      dateFilter = { gte: monthAgo };
    }
    // 'all' period has no date filter

    // Fetch commissions
    const commissions = await prisma.commission.findMany({
      where: {
        providerId,
        ...(Object.keys(dateFilter).length > 0 && {
          createdAt: dateFilter,
        }),
      },
      include: {
        booking: {
          select: {
            bookingNumber: true,
            serviceName: true,
            completedAt: true,
            sessionNumber: true,
            patient: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Calculate summary statistics
    const totalEarnings = commissions.reduce((sum, c) => sum + c.netPayout, 0);
    const totalCommission = commissions.reduce((sum, c) => sum + c.commissionAmount, 0);
    const totalTDS = commissions.reduce((sum, c) => sum + c.tdsAmount, 0);
    const totalSessions = commissions.length;

    // Group by payout status
    const pending = commissions.filter(c => c.payoutStatus === 'PENDING');
    const paid = commissions.filter(c => c.payoutStatus === 'PAID');
    const processing = commissions.filter(c => c.payoutStatus === 'PROCESSING');

    const pendingAmount = pending.reduce((sum, c) => sum + c.netPayout, 0);
    const paidAmount = paid.reduce((sum, c) => sum + c.netPayout, 0);
    const processingAmount = processing.reduce((sum, c) => sum + c.netPayout, 0);

    // Fetch provider details for context
    const provider = await prisma.provider.findUnique({
      where: { id: providerId },
      select: {
        name: true,
        commissionRate: true,
        totalBookings: true,
        rating: true,
        bankAccountNumber: true,
        ifscCode: true,
        upiId: true,
      },
    });

    return NextResponse.json({
      success: true,
      period,
      provider: {
        name: provider?.name,
        commissionRate: provider?.commissionRate,
        totalBookings: provider?.totalBookings,
        rating: provider?.rating,
        paymentMethods: {
          hasBankAccount: !!provider?.bankAccountNumber,
          hasUPI: !!provider?.upiId,
        },
      },
      summary: {
        totalSessions,
        totalEarnings: totalEarnings / 100, // Convert paise to rupees
        totalCommission: totalCommission / 100,
        totalTDS: totalTDS / 100,
        averagePerSession: totalSessions > 0 ? (totalEarnings / totalSessions / 100).toFixed(2) : 0,
      },
      breakdown: {
        pending: {
          count: pending.length,
          amount: pendingAmount / 100,
        },
        processing: {
          count: processing.length,
          amount: processingAmount / 100,
        },
        paid: {
          count: paid.length,
          amount: paidAmount / 100,
        },
      },
      commissions: commissions.map(c => ({
        id: c.id,
        bookingNumber: c.booking.bookingNumber,
        serviceName: c.booking.serviceName,
        patientName: c.booking.patient.name,
        sessionNumber: c.booking.sessionNumber,
        completedAt: c.booking.completedAt,
        sessionPrice: c.sessionPrice / 100,
        commissionAmount: c.commissionAmount / 100,
        tdsAmount: c.tdsAmount / 100,
        netPayout: c.netPayout / 100,
        payoutStatus: c.payoutStatus,
        payoutDate: c.payoutDate,
      })),
    });
  } catch (error) {
    console.error('Fetch earnings error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch earnings' },
      { status: 500 }
    );
  }
});
