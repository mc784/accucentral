
export interface MockProvider {
  id: string;
  name: string;
  phone: string;
  photo?: string;
  ayushNumber: string;
  services: string[];
  availability: string[];
  rating: number;
  totalBookings: number;
}

export interface MockBooking {
  id: string;
  bookingNumber: string;
  patientName: string;
  serviceName: string;
  timeSlot: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  painScoreBefore?: number;
  painScoreAfter?: number;
  notes?: string;
}

export interface SessionData {
  bookingId: string;
  patientName: string;
  serviceName: string;
  previousPainScores: number[];
  painScoreBefore?: number;
  painScoreAfter?: number;
  notes?: string;
  improvement?: number;
}

export interface EarningsData {
  totalSessionsThisWeek: number;
  totalEarnings: number;
  breakdown: { service: string; sessions: number; earnings: number }[];
  sessionsPerDay: { day: string; count: number }[];
  commission: number;
}

// Mock providers database
const mockProviders: Record<string, MockProvider> = {
  'prov_001': {
    id: 'prov_001',
    name: 'Raj Kumar',
    phone: '+91 98765 43210',
    photo: 'https://via.placeholder.com/200',
    ayushNumber: 'AYUSH/2024/001',
    services: ['Tech-Neck Relief', 'Insomnia Switch', 'Anxiety Reset'],
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Friday', 'Saturday'],
    rating: 4.8,
    totalBookings: 145,
  },
  'prov_002': {
    id: 'prov_002',
    name: 'Priya Singh',
    phone: '+91 98765 43211',
    photo: 'https://via.placeholder.com/200',
    ayushNumber: 'AYUSH/2024/002',
    services: ['Migraine Relief', 'Digestive Care', 'Sleep Protocol'],
    availability: ['Tuesday', 'Wednesday', 'Thursday', 'Saturday', 'Sunday'],
    rating: 4.9,
    totalBookings: 89,
  },
};

// Mock bookings
const mockBookings: Record<string, MockBooking[]> = {
  'prov_001': [
    {
      id: 'book_001',
      bookingNumber: 'ACC-2024-001',
      patientName: 'Amit',
      serviceName: 'Tech-Neck Relief',
      timeSlot: '10:00 AM - 10:45 AM',
      status: 'Pending',
    },
    {
      id: 'book_002',
      bookingNumber: 'ACC-2024-002',
      patientName: 'Neha',
      serviceName: 'Anxiety Reset',
      timeSlot: '11:00 AM - 11:45 AM',
      status: 'In Progress',
      painScoreBefore: 7,
    },
    {
      id: 'book_003',
      bookingNumber: 'ACC-2024-003',
      patientName: 'Vikram',
      serviceName: 'Insomnia Switch',
      timeSlot: '2:00 PM - 2:45 PM',
      status: 'Completed',
      painScoreBefore: 8,
      painScoreAfter: 4,
      notes: 'Patient responded well. Recommended evening session tomorrow.',
    },
  ],
  'prov_002': [
    {
      id: 'book_004',
      bookingNumber: 'ACC-2024-004',
      patientName: 'Ravi',
      serviceName: 'Migraine Relief',
      timeSlot: '9:00 AM - 9:45 AM',
      status: 'Completed',
      painScoreBefore: 9,
      painScoreAfter: 3,
    },
    {
      id: 'book_005',
      bookingNumber: 'ACC-2024-005',
      patientName: 'Deepa',
      serviceName: 'Sleep Protocol',
      timeSlot: '5:00 PM - 5:45 PM',
      status: 'Pending',
    },
  ],
};

// OTP store (in-memory for mock)
const otpStore: Record<string, { code: string; expiresAt: number }> = {};

export const mockSendOTP = async (phone: string): Promise<{ success: boolean; message: string }> => {
  const code = Math.random().toString().slice(2, 8);
  otpStore[phone] = {
    code,
    expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
  };

  console.log(`[MOCK OTP] ${phone}: ${code}`);

  return {
    success: true,
    message: `OTP sent to ${phone}. (Mock: ${code})`,
  };
};

export const mockVerifyOTP = async (
  phone: string,
  otp: string
): Promise<{ success: boolean; providerId?: string; message: string }> => {
  const stored = otpStore[phone];

  if (!stored) {
    return { success: false, message: 'OTP expired or not sent' };
  }

  if (stored.expiresAt < Date.now()) {
    delete otpStore[phone];
    return { success: false, message: 'OTP expired' };
  }

  if (stored.code !== otp) {
    return { success: false, message: 'Invalid OTP' };
  }

  delete otpStore[phone];

  // Find or create provider
  const provider = Object.values(mockProviders).find((p) => p.phone === phone);
  const providerId = provider?.id || `prov_${Date.now()}`;

  return {
    success: true,
    providerId,
    message: 'OTP verified',
  };
};

export const mockGetProvider = async (providerId: string): Promise<MockProvider | null> => {
  return mockProviders[providerId] || null;
};

export const mockGetTodaysBookings = async (providerId: string): Promise<MockBooking[]> => {
  return mockBookings[providerId] || [];
};

export const mockGetSessionData = async (bookingId: string): Promise<SessionData | null> => {
  for (const bookings of Object.values(mockBookings)) {
    const booking = bookings.find((b) => b.id === bookingId);
    if (booking) {
      return {
        bookingId,
        patientName: booking.patientName,
        serviceName: booking.serviceName,
        previousPainScores: [7, 8, 6], // Mock previous pain scores
        painScoreBefore: booking.painScoreBefore,
        painScoreAfter: booking.painScoreAfter,
        notes: booking.notes,
      };
    }
  }
  return null;
};

export const mockLogSession = async (
  bookingId: string,
  painScoreBefore: number,
  painScoreAfter: number,
  notes: string
): Promise<{ success: boolean; improvement: number; message: string }> => {
  const improvement = Math.round(((painScoreBefore - painScoreAfter) / painScoreBefore) * 100);

  console.log(`[MOCK SESSION LOG] Booking ${bookingId}: ${painScoreBefore} → ${painScoreAfter} (${improvement}% improvement)`);

  // Mock WhatsApp notification
  console.log(`[MOCK WHATSAPP] Admin notification: Payment pending for [Patient]`);

  return {
    success: true,
    improvement,
    message: `Session logged. Pain reduced by ${improvement}%!`,
  };
};

export const mockGetEarnings = async (providerId: string): Promise<EarningsData> => {
  return {
    totalSessionsThisWeek: 12,
    totalEarnings: 9000,
    breakdown: [
      { service: 'Tech-Neck Relief', sessions: 6, earnings: 4500 },
      { service: 'Anxiety Reset', sessions: 4, earnings: 3000 },
      { service: 'Insomnia Switch', sessions: 2, earnings: 1500 },
    ],
    sessionsPerDay: [
      { day: 'Mon', count: 2 },
      { day: 'Tue', count: 2 },
      { day: 'Wed', count: 3 },
      { day: 'Thu', count: 1 },
      { day: 'Fri', count: 2 },
      { day: 'Sat', count: 2 },
      { day: 'Sun', count: 0 },
    ],
    commission: 0,
  };
};
