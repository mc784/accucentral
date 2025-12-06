import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withAuth } from '@/lib/middleware';

/**
 * POST /api/bookings
 * Create a new booking (authenticated)
 */
export const POST = withAuth(async (request, user) => {
  try {
    const body = await request.json();
    const {
      packageId,
      serviceId,
      requestedDate,
      requestedTime,
      customerAddress,
    } = body;

    // Validate required fields
    if (!packageId || !serviceId || !requestedDate || !requestedTime || !customerAddress) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Fetch package to get patient details and verify ownership
    const packageData = await prisma.package.findUnique({
      where: { id: packageId },
      include: {
        patient: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!packageData) {
      return NextResponse.json(
        { error: 'Package not found' },
        { status: 404 }
      );
    }

    // Verify user owns this package (or is admin)
    if (user.role !== 'ADMIN' && packageData.patient.userId !== user.userId) {
      return NextResponse.json(
        { error: 'Unauthorized to book with this package' },
        { status: 403 }
      );
    }

    // Check if package is active and has remaining sessions
    if (packageData.status !== 'ACTIVE') {
      return NextResponse.json(
        { error: `Package is ${packageData.status.toLowerCase()}` },
        { status: 400 }
      );
    }

    if (packageData.sessionsRemaining <= 0) {
      return NextResponse.json(
        { error: 'No sessions remaining in package' },
        { status: 400 }
      );
    }

    // Fetch service details
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service || service.status !== 'PUBLISHED') {
      return NextResponse.json(
        { error: 'Service not available' },
        { status: 404 }
      );
    }

    // Generate booking number (ACC-YYYY-XXXXX)
    const year = new Date().getFullYear();
    const lastBooking = await prisma.booking.findFirst({
      where: {
        bookingNumber: {
          startsWith: `ACC-${year}-`,
        },
      },
      orderBy: {
        bookingNumber: 'desc',
      },
    });

    let bookingSequence = 1;
    if (lastBooking) {
      const lastSequence = parseInt(lastBooking.bookingNumber.split('-')[2]);
      bookingSequence = lastSequence + 1;
    }

    const bookingNumber = `ACC-${year}-${bookingSequence.toString().padStart(5, '0')}`;

    // Calculate session number
    const sessionNumber = packageData.sessionsCompleted + 1;

    // Determine territory and service area from patient location
    // For now, using default (should be calculated from address in production)
    const serviceArea = 'FARIDABAD'; // TODO: Determine from customerAddress
    const territory = 'Sector 20, Faridabad'; // TODO: Determine from customerAddress

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        bookingNumber,
        patientId: packageData.patientId,
        customerName: packageData.patient.name,
        customerPhone: packageData.patient.phone,
        customerAddress,
        serviceId,
        serviceName: service.title,
        servicePrice: service.price,
        sessionNumber,
        requestedDate,
        requestedTime,
        packageId,
        territory,
        serviceArea,
        assignmentStatus: 'PENDING',
        isPaid: true, // Prepaid packages
        paymentMethod: 'PREPAID',
      },
      include: {
        service: true,
        patient: {
          select: {
            name: true,
            phone: true,
            condition: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      booking,
      message: 'Booking created successfully',
    }, { status: 201 });
  } catch (error) {
    console.error('Create booking error:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
});

/**
 * GET /api/bookings
 * List user's bookings (authenticated)
 * Query params:
 *   - status: filter by booking status
 *   - limit: number of bookings to return
 */
export const GET = withAuth(async (request, user) => {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');

    // Build filter based on user role
    const where: any = {};

    if (user.role === 'PATIENT') {
      // Find patient by userId
      const patient = await prisma.patient.findUnique({
        where: { userId: user.userId },
      });

      if (!patient) {
        return NextResponse.json(
          { error: 'Patient profile not found' },
          { status: 404 }
        );
      }

      where.patientId = patient.id;
    } else if (user.role === 'PROVIDER') {
      // Find provider by userId
      const provider = await prisma.provider.findUnique({
        where: { userId: user.userId },
      });

      if (!provider) {
        return NextResponse.json(
          { error: 'Provider profile not found' },
          { status: 404 }
        );
      }

      where.providerId = provider.id;
    }
    // Admin sees all bookings (no filter)

    if (status) {
      where.assignmentStatus = status;
    }

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        service: {
          select: {
            id: true,
            slug: true,
            title: true,
            duration: true,
          },
        },
        patient: {
          select: {
            name: true,
            phone: true,
            condition: true,
          },
        },
        provider: {
          select: {
            id: true,
            name: true,
            badgeLevel: true,
          },
        },
        package: {
          select: {
            packageType: true,
            totalSessions: true,
            sessionsCompleted: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    });

    return NextResponse.json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error('List bookings error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
});
