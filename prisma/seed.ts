import 'dotenv/config';
import prisma from '../lib/prisma';

async function main() {
  console.log('🌱 Starting database seed...\n');

  // Clear existing data (dev only)
  await prisma.auditLog.deleteMany();
  await prisma.review.deleteMany();
  await prisma.commission.deleteMany();
  await prisma.painScore.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.package.deleteMany();
  await prisma.providerService.deleteMany();
  await prisma.pressurePoint.deleteMany();
  await prisma.service.deleteMany();
  await prisma.providerApplication.deleteMany();
  await prisma.provider.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.admin.deleteMany();
  await prisma.user.deleteMany();

  console.log('✓ Cleared existing data\n');

  // ========================================
  // 1. CREATE ADMIN USER
  // ========================================

  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@accucentral.com',
      phone: '+919876543210',
      role: 'ADMIN',
      status: 'ACTIVE',
    },
  });

  await prisma.admin.create({
    data: {
      userId: adminUser.id,
      name: 'Admin User',
    },
  });

  console.log('✓ Created admin user\n');

  // ========================================
  // 2. CREATE 3 SERVICES (SKUs)
  // ========================================

  const techNeckService = await prisma.service.create({
    data: {
      slug: 'tech-neck-reset',
      title: 'Tech-Neck Reset',
      tagline: 'Instant relief for IT professionals',
      category: 'MUSCULOSKELETAL',
      targetIssue: 'Neck and shoulder tension from prolonged screen time',
      duration: '30 Minutes',
      price: 29900, // ₹299 in paise
      originalPrice: 49900,
      scope: 'Neck + Shoulder Acupoints + Seated Massage',
      description: 'Specifically designed for IT professionals and desk workers who spend hours in front of screens.',
      outcomes: [
        'Immediate neck and shoulder pain relief',
        'Improved head rotation and mobility',
        'Reduced tension headaches',
        'Better concentration at work',
      ],
      idealFor: [
        'IT professionals and software engineers',
        'Office workers with desk jobs',
        'Anyone spending 6+ hours daily on screens',
      ],
      status: 'FEATURED',
      pressurePoints: {
        create: [
          {
            code: 'GB20',
            name: 'Gallbladder 20 (Feng Chi)',
            duration: '3 minutes per side',
            instructions: 'Base of skull pressure point - releases deep neck tension',
            sortOrder: 1,
          },
          {
            code: 'LI4',
            name: 'Large Intestine 4 (Hegu)',
            duration: '2 minutes per hand',
            instructions: 'Webbing between thumb and index finger - relieves upper body pain',
            sortOrder: 2,
          },
          {
            code: 'SI3',
            name: 'Small Intestine 3',
            duration: '2 minutes per hand',
            instructions: 'Side of hand below pinky - releases neck and shoulder tension',
            sortOrder: 3,
          },
        ],
      },
    },
  });

  const migraineService = await prisma.service.create({
    data: {
      slug: 'migraine-eraser',
      title: 'The Migraine Eraser',
      tagline: 'Proven relief for chronic headaches',
      category: 'CHRONIC_PAIN',
      targetIssue: 'Migraine headaches and chronic head pain',
      duration: '45 Minutes',
      price: 49900, // ₹499
      scope: 'Head + Hand Points + Magnet Application',
      description: 'Chronic migraines don\'t have to control your life. This comprehensive session combines targeted head and hand acupoints.',
      outcomes: [
        'Reduced migraine frequency',
        'Lower pain intensity',
        'Improved sleep quality',
        'Less medication dependency',
      ],
      idealFor: [
        'Chronic migraine sufferers',
        'Stress-induced headaches',
        'Hormonal headache patterns',
      ],
      status: 'PUBLISHED',
      pressurePoints: {
        create: [
          {
            code: 'GV20',
            name: 'Governing Vessel 20 (Baihui)',
            duration: '5 minutes',
            instructions: 'Top of head - primary headache relief point',
            sortOrder: 1,
          },
          {
            code: 'LI4',
            name: 'Large Intestine 4',
            duration: '3 minutes per hand',
            instructions: 'Master pain relief point',
            sortOrder: 2,
          },
        ],
      },
    },
  });

  const seniorService = await prisma.service.create({
    data: {
      slug: 'senior-pain-relief',
      title: 'Senior Citizen Pain Relief',
      tagline: 'Gentle, effective joint and back pain management',
      category: 'SENIOR_CARE',
      targetIssue: 'Chronic knee and lower back pain in elderly',
      duration: '45 Minutes',
      price: 44900, // ₹449
      scope: 'Knee + Back Points + Gentle Stretching',
      description: 'Age-appropriate gentle acupressure targeting common senior pain points.',
      outcomes: [
        'Improved mobility',
        'Reduced joint stiffness',
        'Better sleep quality',
        'Increased independence',
      ],
      idealFor: [
        'Seniors 60+ years',
        'Arthritis management',
        'Post-injury recovery',
      ],
      status: 'PUBLISHED',
      pressurePoints: {
        create: [
          {
            code: 'ST36',
            name: 'Stomach 36 (Zusanli)',
            duration: '4 minutes per leg',
            instructions: 'Below knee - strengthens overall vitality',
            sortOrder: 1,
          },
          {
            code: 'BL40',
            name: 'Bladder 40',
            duration: '3 minutes per leg',
            instructions: 'Back of knee - relieves lower back and knee pain',
            sortOrder: 2,
          },
        ],
      },
    },
  });

  console.log('✓ Created 3 services with pressure points\n');

  // ========================================
  // 3. CREATE 5 PROVIDERS (including Chandan)
  // ========================================

  const providers: any[] = [];

  // Provider 1: Chandan (Founder)
  const chandanUser = await prisma.user.create({
    data: {
      email: 'chandan@accucentral.com',
      phone: '+919876543211',
      role: 'PROVIDER',
      status: 'ACTIVE',
    },
  });

  const chandan = await prisma.provider.create({
    data: {
      userId: chandanUser.id,
      slug: 'chandan-kumar',
      name: 'Chandan Kumar',
      photo: '/images/providers/chandan.jpg',
      gender: 'male',
      languages: ['Hindi', 'English'],
      badgeLevel: 'ACCUCENTRAL_VERIFIED',
      badgeTitle: 'AccuCentral Verified - Founder',
      ayushCertified: true,
      certificationBody: 'ASPEUS',
      certificationNumber: 'AYUSH-2019-12345',
      territory: 'Sector 20, Faridabad',
      territoryCode: 'FBD-S20',
      serviceArea: 'FARIDABAD',
      serviceRadius: '10km radius',
      totalBookings: 487,
      experienceYears: 8,
      rating: 4.9,
      completionRate: 98.5,
      backgroundCheck: true,
      covidVaccinated: true,
      ayushRegistered: true,
      kycComplete: true,
      portableTable: true,
      bringsMats: true,
      oilFree: true,
      availableDays: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
      preferredTimeSlots: ['Morning (8 AM - 12 PM)', 'Evening (4 PM - 8 PM)'],
      specializations: ['Tech-neck relief', 'Chronic pain management', 'Senior care'],
      tags: ['founder', 'expert', 'trainer'],
      commissionRate: 0.70,
      bankAccountNumber: '1234567890',
      ifscCode: 'HDFC0001234',
      panNumber: 'ABCDE1234F',
      status: 'ACTIVE',
      joinedDate: new Date('2023-01-01'),
    },
  });

  providers.push(chandan);

  // Provider 2-5: Peer therapists
  const providerData = [
    {
      name: 'Rahul Sharma',
      territory: 'Sector 15, Faridabad',
      territoryCode: 'FBD-S15',
      experienceYears: 5,
      rating: 4.7,
      totalBookings: 234,
    },
    {
      name: 'Anita Verma',
      territory: 'Lajpat Nagar, Delhi',
      territoryCode: 'DEL-LN',
      experienceYears: 6,
      rating: 4.8,
      totalBookings: 312,
      serviceArea: 'DELHI',
    },
    {
      name: 'Suresh Kumar',
      territory: 'DLF Phase 2, Gurgaon',
      territoryCode: 'GGN-DLF2',
      experienceYears: 4,
      rating: 4.6,
      totalBookings: 189,
      serviceArea: 'GURGAON',
    },
    {
      name: 'Priya Mehta',
      territory: 'Sector 62, Noida',
      territoryCode: 'NOI-S62',
      experienceYears: 7,
      rating: 4.9,
      totalBookings: 401,
      serviceArea: 'NOIDA',
    },
  ];

  for (let i = 0; i < providerData.length; i++) {
    const data = providerData[i];
    const user = await prisma.user.create({
      data: {
        email: `provider${i + 2}@accucentral.com`,
        phone: `+91987654321${i + 2}`,
        role: 'PROVIDER',
        status: 'ACTIVE',
      },
    });

    const provider = await prisma.provider.create({
      data: {
        userId: user.id,
        slug: data.name.toLowerCase().replace(' ', '-'),
        name: data.name,
        photo: `/images/providers/${data.name.toLowerCase().replace(' ', '-')}.jpg`,
        gender: i % 2 === 0 ? 'male' : 'female',
        languages: ['Hindi', 'English'],
        badgeLevel: i === 3 ? 'LEVEL_3' : 'LEVEL_2',
        badgeTitle: i === 3 ? 'Senior Therapist (Level 3)' : 'Wellness Instructor (Level 2)',
        ayushCertified: true,
        certificationBody: 'ASPEUS',
        territory: data.territory,
        territoryCode: data.territoryCode,
        serviceArea: (data.serviceArea as any) || 'FARIDABAD',
        serviceRadius: '5km radius',
        totalBookings: data.totalBookings,
        experienceYears: data.experienceYears,
        rating: data.rating,
        completionRate: 95 + Math.random() * 3,
        backgroundCheck: true,
        covidVaccinated: true,
        ayushRegistered: true,
        kycComplete: true,
        portableTable: true,
        bringsMats: true,
        oilFree: false,
        availableDays: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
        preferredTimeSlots: ['Morning (8 AM - 12 PM)', 'Afternoon (12 PM - 4 PM)'],
        specializations: ['Chronic pain', 'Stress relief'],
        tags: ['verified', 'experienced'],
        commissionRate: 0.75,
        status: 'ACTIVE',
        joinedDate: new Date(2023, 3 + i, 15),
      },
    });

    providers.push(provider);
  }

  console.log('✓ Created 5 providers\n');

  // ========================================
  // 4. LINK PROVIDERS TO SERVICES
  // ========================================

  for (const provider of providers) {
    await prisma.providerService.createMany({
      data: [
        { providerId: provider.id, serviceId: techNeckService.id, isActive: true },
        { providerId: provider.id, serviceId: migraineService.id, isActive: true },
        { providerId: provider.id, serviceId: seniorService.id, isActive: true },
      ],
    });
  }

  console.log('✓ Linked providers to services\n');

  // ========================================
  // 5. CREATE 2 PATIENTS WITH PACKAGES & DTC DATA
  // ========================================

  // Patient 1: Amit Kumar
  const amitUser = await prisma.user.create({
    data: {
      email: 'amit@example.com',
      phone: '+919123456789',
      role: 'PATIENT',
      status: 'ACTIVE',
    },
  });

  const amit = await prisma.patient.create({
    data: {
      userId: amitUser.id,
      name: 'Amit Kumar',
      email: 'amit@example.com',
      phone: '+919123456789',
      condition: 'Tech Neck & Shoulder Pain',
      startDate: new Date('2024-11-15'),
      initialPainScore: 8,
      currentPainScore: 4,
      status: 'ACTIVE',
      homeworkVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      homeworkTitle: 'Neck Stretches for Office Workers',
      homeworkFrequency: '3x daily',
      lastSessionDate: new Date('2024-12-03'),
      nextSessionDate: new Date('2024-12-06'),
    },
  });

  const amitPackage = await prisma.package.create({
    data: {
      patientId: amit.id,
      packageType: 'STANDARD',
      totalSessions: 10,
      sessionsCompleted: 6,
      sessionsRemaining: 4,
      price: 299000, // ₹2,990 in paise
      purchaseDate: new Date('2024-11-15'),
      status: 'ACTIVE',
      paymentId: 'pay_test_123',
      paymentMethod: 'razorpay',
      paymentStatus: 'success',
    },
  });

  // Patient 2: Priya Mehta
  const priyaUser = await prisma.user.create({
    data: {
      email: 'priya@example.com',
      phone: '+919234567890',
      role: 'PATIENT',
      status: 'ACTIVE',
    },
  });

  const priya = await prisma.patient.create({
    data: {
      userId: priyaUser.id,
      name: 'Priya Mehta',
      email: 'priya@example.com',
      phone: '+919234567890',
      condition: 'Migraine Relief',
      startDate: new Date('2024-11-20'),
      initialPainScore: 9,
      currentPainScore: 5,
      status: 'ACTIVE',
      homeworkVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      homeworkTitle: 'Pressure Point Self-Massage',
      homeworkFrequency: '2x daily',
      lastSessionDate: new Date('2024-12-02'),
      nextSessionDate: new Date('2024-12-05'),
    },
  });

  const priyaPackage = await prisma.package.create({
    data: {
      patientId: priya.id,
      packageType: 'BASIC',
      totalSessions: 5,
      sessionsCompleted: 3,
      sessionsRemaining: 2,
      price: 149500, // ₹1,495 in paise
      purchaseDate: new Date('2024-11-20'),
      status: 'ACTIVE',
      paymentId: 'pay_test_456',
      paymentMethod: 'razorpay',
      paymentStatus: 'success',
    },
  });

  console.log('✓ Created 2 patients with packages\n');

  // ========================================
  // 6. CREATE BOOKINGS & PAIN SCORES
  // ========================================

  // Amit's 6 completed sessions
  const amitBookings = [];
  for (let i = 0; i < 6; i++) {
    const booking = await prisma.booking.create({
      data: {
        bookingNumber: `ACC-2024-${String(i + 1).padStart(3, '0')}`,
        patientId: amit.id,
        customerName: amit.name,
        customerPhone: amit.phone,
        customerAddress: 'Sector 18, Faridabad, Haryana',
        serviceId: techNeckService.id,
        serviceName: techNeckService.title,
        servicePrice: techNeckService.price,
        sessionNumber: i + 1,
        requestedDate: new Date(2024, 10, 15 + i * 3).toISOString().split('T')[0],
        requestedTime: '10:00 AM - 10:30 AM',
        confirmedDate: new Date(2024, 10, 15 + i * 3).toISOString().split('T')[0],
        confirmedTime: '10:00 AM',
        providerId: chandan.id,
        assignedProviderName: chandan.name,
        assignmentStatus: 'COMPLETED',
        territory: 'Sector 18, Faridabad',
        serviceArea: 'FARIDABAD',
        packageId: amitPackage.id,
        isPaid: true,
        paymentMethod: 'PREPAID',
        painScoreBefore: 8 - i * 0.5,
        painScoreAfter: 6 - i * 0.5,
        sessionNotes: `Session ${i + 1} completed successfully`,
        completedAt: new Date(2024, 10, 15 + i * 3, 11, 0),
      },
    });

    await prisma.painScore.create({
      data: {
        patientId: amit.id,
        sessionNumber: i + 1,
        painScore: Math.max(4, 8 - i * 0.7),
        notes: `Progress tracking - session ${i + 1}`,
        providerId: chandan.id,
        bookingId: booking.id,
        recordedAt: new Date(2024, 10, 15 + i * 3, 11, 0),
      },
    });

    amitBookings.push(booking);
  }

  // Priya's 3 completed sessions
  for (let i = 0; i < 3; i++) {
    const booking = await prisma.booking.create({
      data: {
        bookingNumber: `ACC-2024-${String(10 + i).padStart(3, '0')}`,
        patientId: priya.id,
        customerName: priya.name,
        customerPhone: priya.phone,
        customerAddress: 'Lajpat Nagar, Delhi',
        serviceId: migraineService.id,
        serviceName: migraineService.title,
        servicePrice: migraineService.price,
        sessionNumber: i + 1,
        requestedDate: new Date(2024, 10, 20 + i * 4).toISOString().split('T')[0],
        requestedTime: '2:00 PM - 2:45 PM',
        confirmedDate: new Date(2024, 10, 20 + i * 4).toISOString().split('T')[0],
        confirmedTime: '2:00 PM',
        providerId: providers[2].id,
        assignedProviderName: providers[2].name,
        assignmentStatus: 'COMPLETED',
        territory: 'Lajpat Nagar, Delhi',
        serviceArea: 'DELHI',
        packageId: priyaPackage.id,
        isPaid: true,
        paymentMethod: 'PREPAID',
        painScoreBefore: 9 - i,
        painScoreAfter: 7 - i,
        completedAt: new Date(2024, 10, 20 + i * 4, 15, 0),
      },
    });

    await prisma.painScore.create({
      data: {
        patientId: priya.id,
        sessionNumber: i + 1,
        painScore: Math.max(5, 9 - i * 1.3),
        providerId: providers[2].id,
        bookingId: booking.id,
        recordedAt: new Date(2024, 10, 20 + i * 4, 15, 0),
      },
    });
  }

  // Add 1 pending booking
  await prisma.booking.create({
    data: {
      bookingNumber: 'ACC-2024-020',
      patientId: amit.id,
      customerName: amit.name,
      customerPhone: amit.phone,
      customerAddress: 'Sector 18, Faridabad, Haryana',
      serviceId: techNeckService.id,
      serviceName: techNeckService.title,
      servicePrice: techNeckService.price,
      sessionNumber: 7,
      requestedDate: new Date(2024, 11, 6).toISOString().split('T')[0],
      requestedTime: '10:00 AM - 10:30 AM',
      assignmentStatus: 'PENDING',
      territory: 'Sector 18, Faridabad',
      serviceArea: 'FARIDABAD',
      packageId: amitPackage.id,
      isPaid: true,
      paymentMethod: 'PREPAID',
    },
  });

  console.log('✓ Created bookings and pain scores\n');

  // ========================================
  // SUMMARY
  // ========================================

  console.log('🎉 Database seeded successfully!\n');
  console.log('📊 Summary:');
  console.log(`  - 1 Admin user`);
  console.log(`  - 5 Providers (including Chandan)`);
  console.log(`  - 3 Services (Tech-Neck, Migraine, Senior)`);
  console.log(`  - 2 Patients with packages`);
  console.log(`  - 10 Bookings (9 completed, 1 pending)`);
  console.log(`  - 9 Pain score entries`);
  console.log('\n✓ Seed complete!\n');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
