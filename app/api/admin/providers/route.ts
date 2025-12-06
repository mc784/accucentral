import { NextResponse } from 'next/server';

// Mock providers data - Replace with database query
const mockProviders = [
  {
    id: 'prov_001',
    name: 'Chandan',
    phone: '+919876543210',
    whatsapp: '+919876543210',
    email: 'chandan@example.com',
    ayushReg: 'AYUSH-2020-12345',
    specialization: 'Acupressure & Marma Therapy',
    status: 'active',
    totalSessions: 45,
    completedSessions: 42,
    rating: 4.8,
    totalEarnings: 31500,
    joinedDate: 'Nov 15, 2025',
  },
  {
    id: 'prov_002',
    name: 'Dr. Sharma',
    phone: '+919876543211',
    whatsapp: '+919876543211',
    email: 'sharma@example.com',
    ayushReg: 'AYUSH-2019-67890',
    specialization: 'Ayurvedic Medicine & Acupressure',
    status: 'active',
    totalSessions: 38,
    completedSessions: 35,
    rating: 4.9,
    totalEarnings: 26250,
    joinedDate: 'Nov 18, 2025',
  },
  {
    id: 'prov_003',
    name: 'Priya Gupta',
    phone: '+919876543212',
    whatsapp: '+919876543212',
    email: 'priya@example.com',
    ayushReg: 'AYUSH-2021-11111',
    specialization: 'Geriatric Acupressure',
    status: 'active',
    totalSessions: 32,
    completedSessions: 30,
    rating: 4.7,
    totalEarnings: 22500,
    joinedDate: 'Nov 20, 2025',
  },
  {
    id: 'prov_004',
    name: 'Rajesh Kumar',
    phone: '+919876543213',
    whatsapp: '+919876543213',
    email: 'rajesh@example.com',
    ayushReg: 'AYUSH-2022-22222',
    specialization: 'Sports Injury & Pain Management',
    status: 'pending',
    totalSessions: 0,
    completedSessions: 0,
    rating: 0,
    totalEarnings: 0,
    joinedDate: 'Dec 1, 2025',
  },
  {
    id: 'prov_005',
    name: 'Anita Verma',
    phone: '+919876543214',
    whatsapp: '+919876543214',
    email: 'anita@example.com',
    ayushReg: 'AYUSH-2020-33333',
    specialization: 'Women\'s Health & Wellness',
    status: 'active',
    totalSessions: 28,
    completedSessions: 26,
    rating: 4.9,
    totalEarnings: 19500,
    joinedDate: 'Nov 22, 2025',
  },
];

export async function GET() {
  try {
    // TODO: Replace with actual database query
    // const providers = await db.query('SELECT * FROM providers ORDER BY created_at DESC');
    
    return NextResponse.json(mockProviders);
  } catch (error) {
    console.error('Fetch providers error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch providers' },
      { status: 500 }
    );
  }
}
