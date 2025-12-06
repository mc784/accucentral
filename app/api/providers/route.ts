import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { ServiceArea } from '@prisma/client';

/**
 * GET /api/providers
 * List available providers with filters
 * Query params:
 *   - serviceArea: FARIDABAD | DELHI | GURGAON | NOIDA
 *   - gender: male | female
 *   - serviceId: Filter by service capability
 *   - badgeLevel: LEVEL_1 | LEVEL_2 | LEVEL_3 | ACCUCENTRAL_VERIFIED
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const serviceArea = searchParams.get('serviceArea') as ServiceArea | null;
    const gender = searchParams.get('gender');
    const serviceId = searchParams.get('serviceId');
    const badgeLevel = searchParams.get('badgeLevel');

    // Build filter
    const where: any = {
      status: 'ACTIVE', // Only show active providers
    };

    if (serviceArea) {
      where.serviceArea = serviceArea;
    }

    if (gender) {
      where.gender = gender;
    }

    if (badgeLevel) {
      where.badgeLevel = badgeLevel;
    }

    // If filtering by service, use junction table
    if (serviceId) {
      where.services = {
        some: {
          serviceId,
          isActive: true,
        },
      };
    }

    // Fetch providers
    const providers = await prisma.provider.findMany({
      where,
      select: {
        id: true,
        slug: true,
        name: true,
        photo: true,
        gender: true,
        languages: true,
        badgeLevel: true,
        badgeTitle: true,
        ayushCertified: true,
        territory: true,
        serviceArea: true,
        experienceYears: true,
        rating: true,
        totalBookings: true,
        completionRate: true,
        backgroundCheck: true,
        covidVaccinated: true,
        portableTable: true,
        bringsMats: true,
        oilFree: true,
        availableDays: true,
        preferredTimeSlots: true,
        specializations: true,
        tags: true,
        services: {
          where: { isActive: true },
          select: {
            service: {
              select: {
                id: true,
                slug: true,
                title: true,
                price: true,
                duration: true,
              },
            },
          },
        },
      },
      orderBy: [
        { rating: 'desc' },
        { totalBookings: 'desc' },
      ],
    });

    // Transform services array
    const transformedProviders = providers.map(provider => ({
      ...provider,
      services: provider.services.map(ps => ps.service),
    }));

    return NextResponse.json({
      success: true,
      count: transformedProviders.length,
      providers: transformedProviders,
    });
  } catch (error) {
    console.error('List providers error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch providers' },
      { status: 500 }
    );
  }
}
