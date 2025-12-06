import { NextResponse } from 'next/server';

// Mock bookings data - Replace with database query
const mockBookings = [
  {
    id: 'BK001',
    patientName: 'Rajesh Kumar',
    patientPhone: '+919876543210',
    serviceName: 'Tech-Neck Relief',
    providerName: 'Chandan',
    date: 'Dec 10, 2025',
    time: '2:00 PM',
    amount: 750,
    status: 'pending',
    paymentStatus: 'paid',
    createdAt: '2025-12-05T10:30:00Z',
  },
  {
    id: 'BK002',
    patientName: 'Priya Sharma',
    patientPhone: '+919876543211',
    serviceName: 'Migraine Relief',
    providerName: 'Dr. Sharma',
    date: 'Dec 11, 2025',
    time: '10:00 AM',
    amount: 750,
    status: 'confirmed',
    paymentStatus: 'paid',
    createdAt: '2025-12-05T11:15:00Z',
  },
  {
    id: 'BK003',
    patientName: 'Amit Patel',
    patientPhone: '+919876543212',
    serviceName: 'Senior Wellness',
    providerName: 'Priya Gupta',
    date: 'Dec 8, 2025',
    time: '4:00 PM',
    amount: 750,
    status: 'completed',
    paymentStatus: 'paid',
    createdAt: '2025-12-04T09:00:00Z',
    painBefore: 8,
    painAfter: 3,
  },
];

export async function GET() {
  try {
    // TODO: Replace with actual database query
    // const bookings = await db.query('SELECT * FROM bookings ORDER BY created_at DESC');
    
    return NextResponse.json(mockBookings);
  } catch (error) {
    console.error('Fetch bookings error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}
