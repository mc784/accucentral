// Patient and Treatment Session Data Structure

export interface PainScoreEntry {
  date: string; // ISO format: YYYY-MM-DD
  sessionNumber: number;
  painScore: number; // 1-10 scale
  notes?: string;
  providerId: string;
  providerName: string;
}

export interface TreatmentPackage {
  id: string;
  packageType: 'basic' | 'standard' | 'premium';
  totalSessions: number;
  sessionsCompleted: number;
  sessionsRemaining: number;
  price: number;
  purchaseDate: string;
  expiryDate?: string;
  status: 'active' | 'completed' | 'expired';
}

export interface Patient {
  id: string;
  name: string;
  phone: string;
  email?: string;

  // Treatment Info
  condition: string; // e.g., "Sciatica Relief", "Tech Neck", "Migraine"
  startDate: string;

  // Progress Tracking
  painScoreHistory: PainScoreEntry[];
  initialPainScore: number;
  currentPainScore: number;

  // Package Management
  activePackage: TreatmentPackage;
  packageHistory: TreatmentPackage[];

  // Homework
  homeworkVideoUrl?: string;
  homeworkTitle?: string;
  homeworkFrequency?: string; // e.g., "2x daily"

  // Status
  status: 'active' | 'inactive' | 'completed';
  lastSessionDate?: string;
  nextSessionDate?: string;
}

// Package Templates
export const packageTemplates = {
  basic: {
    name: 'Starter Package',
    sessions: 5,
    price: 1495,
    duration: '2 weeks',
    description: 'Try acupressure therapy',
  },
  standard: {
    name: 'Relief Package',
    sessions: 10,
    price: 2990,
    duration: '1 month',
    description: 'Complete treatment cycle',
    discount: 10,
  },
  premium: {
    name: 'Recovery Package',
    sessions: 20,
    price: 5499,
    duration: '2 months',
    description: 'Full recovery program',
    discount: 20,
  },
};

// Helper Functions
export function calculateProgress(patient: Patient): {
  percentComplete: number;
  painReduction: number;
  painReductionPercent: number;
  trend: 'improving' | 'stable' | 'worsening';
} {
  const percentComplete = (patient.activePackage.sessionsCompleted / patient.activePackage.totalSessions) * 100;
  const painReduction = patient.initialPainScore - patient.currentPainScore;
  const painReductionPercent = Math.round((painReduction / patient.initialPainScore) * 100);

  // Determine trend from last 3 sessions
  const recentScores = patient.painScoreHistory.slice(-3).map(entry => entry.painScore);
  let trend: 'improving' | 'stable' | 'worsening' = 'stable';

  if (recentScores.length >= 2) {
    const firstScore = recentScores[0];
    const lastScore = recentScores[recentScores.length - 1];
    if (lastScore < firstScore - 1) trend = 'improving';
    else if (lastScore > firstScore + 1) trend = 'worsening';
  }

  return { percentComplete, painReduction, painReductionPercent, trend };
}

export function shouldShowRenewalAlert(patient: Patient): boolean {
  return patient.activePackage.sessionsRemaining <= 1 && patient.activePackage.status === 'active';
}

export function getNextPackageRecommendation(patient: Patient): string {
  const progress = calculateProgress(patient);

  if (progress.painReductionPercent >= 60) {
    return 'premium'; // They're doing well, upsell
  } else if (progress.painReductionPercent >= 30) {
    return 'standard'; // Moderate progress, continue
  } else {
    return 'basic'; // Slow progress, smaller commitment
  }
}

// Mock Patient Data (for development)
export const mockPatients: Patient[] = [
  {
    id: 'PAT001',
    name: 'Amit Kumar',
    phone: '+91 98765 43210',
    email: 'amit.kumar@example.com',
    condition: 'Sciatica Relief',
    startDate: '2024-11-20',
    initialPainScore: 9,
    currentPainScore: 4,
    painScoreHistory: [
      { date: '2024-11-20', sessionNumber: 1, painScore: 9, providerId: '1', providerName: 'Rahul Sharma' },
      { date: '2024-11-22', sessionNumber: 2, painScore: 8, providerId: '1', providerName: 'Rahul Sharma' },
      { date: '2024-11-25', sessionNumber: 3, painScore: 7, providerId: '1', providerName: 'Rahul Sharma' },
      { date: '2024-11-28', sessionNumber: 4, painScore: 5, providerId: '1', providerName: 'Rahul Sharma' },
      { date: '2024-12-01', sessionNumber: 5, painScore: 4, providerId: '1', providerName: 'Rahul Sharma' },
    ],
    activePackage: {
      id: 'PKG001',
      packageType: 'standard',
      totalSessions: 10,
      sessionsCompleted: 5,
      sessionsRemaining: 5,
      price: 2990,
      purchaseDate: '2024-11-20',
      status: 'active',
    },
    packageHistory: [],
    homeworkVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    homeworkTitle: 'Lower Back Stretches for Sciatica',
    homeworkFrequency: '2x daily',
    status: 'active',
    lastSessionDate: '2024-12-01',
    nextSessionDate: '2024-12-05',
  },
  {
    id: 'PAT002',
    name: 'Priya Mehta',
    phone: '+91 98765 43211',
    email: 'priya.mehta@example.com',
    condition: 'Tech-Neck Relief',
    startDate: '2024-11-15',
    initialPainScore: 8,
    currentPainScore: 3,
    painScoreHistory: [
      { date: '2024-11-15', sessionNumber: 1, painScore: 8, providerId: '2', providerName: 'Anita Verma' },
      { date: '2024-11-18', sessionNumber: 2, painScore: 7, providerId: '2', providerName: 'Anita Verma' },
      { date: '2024-11-21', sessionNumber: 3, painScore: 6, providerId: '2', providerName: 'Anita Verma' },
      { date: '2024-11-24', sessionNumber: 4, painScore: 5, providerId: '2', providerName: 'Anita Verma' },
      { date: '2024-11-27', sessionNumber: 5, painScore: 4, providerId: '2', providerName: 'Anita Verma' },
      { date: '2024-11-30', sessionNumber: 6, painScore: 4, providerId: '2', providerName: 'Anita Verma' },
      { date: '2024-12-03', sessionNumber: 7, painScore: 3, providerId: '2', providerName: 'Anita Verma' },
    ],
    activePackage: {
      id: 'PKG002',
      packageType: 'standard',
      totalSessions: 10,
      sessionsCompleted: 7,
      sessionsRemaining: 3,
      price: 2990,
      purchaseDate: '2024-11-15',
      status: 'active',
    },
    packageHistory: [],
    homeworkVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    homeworkTitle: 'Neck & Shoulder Release Exercises',
    homeworkFrequency: '3x daily',
    status: 'active',
    lastSessionDate: '2024-12-03',
    nextSessionDate: '2024-12-06',
  },
];

// Helper to get patient by ID
export function getPatientById(id: string): Patient | undefined {
  return mockPatients.find(p => p.id === id);
}

// Helper to get patient by phone (for quick lookup)
export function getPatientByPhone(phone: string): Patient | undefined {
  return mockPatients.find(p => p.phone === phone);
}
