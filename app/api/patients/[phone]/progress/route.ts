import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withAuth } from '@/lib/middleware';

/**
 * GET /api/patients/[phone]/progress
 * Get patient progress chart with pain scores (authenticated)
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
        { error: 'Providers cannot access patient progress data' },
        { status: 403 }
      );
    }
    // Admin can access any patient data

    // Find patient by phone
    const patient = await prisma.patient.findFirst({
      where: { phone: decodedPhone },
      include: {
        painScores: {
          include: {
            provider: {
              select: {
                name: true,
                badgeLevel: true,
              },
            },
            booking: {
              select: {
                bookingNumber: true,
                serviceName: true,
              },
            },
          },
          orderBy: {
            sessionNumber: 'asc',
          },
        },
        packages: {
          where: {
            status: {
              in: ['ACTIVE', 'COMPLETED'],
            },
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

    // Calculate progress metrics
    const totalSessions = patient.painScores.length;
    const initialPain = patient.initialPainScore;
    const currentPain = patient.currentPainScore;
    const improvement = initialPain - currentPain;
    const improvementPercent = initialPain > 0 ? ((improvement / initialPain) * 100).toFixed(1) : 0;

    // Calculate average pain reduction per session
    const avgReductionPerSession = totalSessions > 0 ? (improvement / totalSessions).toFixed(2) : 0;

    // Find best and worst sessions
    const sessionsWithChange = patient.painScores
      .map((ps: any) => ({
        sessionNumber: ps.sessionNumber,
        before: ps.painScore,
        after: ps.painScore,
        change: 0, // We store after score, need booking data for before
      }));

    // Calculate consistency (sessions with improvement)
    const sessionsWithImprovement = patient.painScores.filter((ps: any) => {
      // This would need booking painScoreBefore to calculate properly
      return true; // Placeholder
    }).length;

    // Prepare chart data
    const chartData = [
      {
        session: 0,
        painScore: initialPain,
        date: patient.startDate,
        label: 'Initial',
      },
      ...patient.painScores.map((ps, index) => ({
        session: ps.sessionNumber,
        painScore: ps.painScore,
        date: ps.recordedAt,
        serviceName: ps.booking?.serviceName,
        providerName: ps.provider.name,
        notes: ps.notes,
      })),
    ];

    // Homework compliance (if assigned)
    const hasHomework = !!patient.homeworkVideoUrl;

    return NextResponse.json({
      success: true,
      patient: {
        id: patient.id,
        name: patient.name,
        condition: patient.condition,
        startDate: patient.startDate,
        lastSessionDate: patient.lastSessionDate,
        nextSessionDate: patient.nextSessionDate,
      },
      progress: {
        initialPainScore: initialPain,
        currentPainScore: currentPain,
        improvement,
        improvementPercent: Number(improvementPercent),
        totalSessions,
        avgReductionPerSession: Number(avgReductionPerSession),
      },
      homework: hasHomework ? {
        title: patient.homeworkTitle,
        videoUrl: patient.homeworkVideoUrl,
        frequency: patient.homeworkFrequency,
      } : null,
      packages: {
        total: patient.packages.length,
        active: patient.packages.filter(p => p.status === 'ACTIVE').length,
        completed: patient.packages.filter(p => p.status === 'COMPLETED').length,
      },
      chartData,
      insights: {
        trend: improvement > 0 ? 'improving' : improvement < 0 ? 'worsening' : 'stable',
        consistency: totalSessions > 0 ? ((sessionsWithImprovement / totalSessions) * 100).toFixed(0) + '%' : 'N/A',
        recommendation: improvement > 3
          ? 'Great progress! Continue with current treatment plan.'
          : improvement > 0
          ? 'Good progress. Consider increasing session frequency.'
          : 'Limited progress. Consult with provider for treatment adjustment.',
      },
    });
  } catch (error) {
    console.error('Fetch patient progress error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch patient progress' },
      { status: 500 }
    );
  }
});
