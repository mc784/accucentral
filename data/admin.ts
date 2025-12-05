// Admin Dashboard Data Structure

import { Patient } from './patients'
import { Provider } from './providers'

export interface Booking {
  id: string
  bookingNumber: string // e.g., "ACC-2024-001"

  // Customer Info
  customerId: string
  customerName: string
  customerPhone: string
  customerAddress: string

  // Service Details
  serviceId: string
  serviceName: string
  servicePrice: number
  sessionNumber: number // Which session in their package

  // Scheduling
  requestedDate: string
  requestedTime: string
  confirmedDate?: string
  confirmedTime?: string

  // Provider Assignment
  assignedProviderId?: string
  assignedProviderName?: string
  assignmentStatus: 'pending' | 'assigned' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled'

  // Location
  territory: string
  serviceArea: 'faridabad' | 'delhi' | 'gurgaon' | 'noida'

  // Payment
  packageId: string
  isPaid: boolean
  paymentMethod: 'prepaid' | 'cash' | 'online'

  // Session Data (filled after completion)
  painScoreBefore?: number
  painScoreAfter?: number
  sessionNotes?: string
  completedAt?: string

  // Timestamps
  createdAt: string
  updatedAt: string
}

export interface PendingProvider {
  id: string
  applicationDate: string

  // Personal Info
  name: string
  email: string
  phone: string
  gender: 'male' | 'female'

  // Certification
  ayushCertified: boolean
  certificationBody?: string
  certificationNumber?: string
  experienceYears: number

  // Service Info
  requestedServices: string[]
  specializations: string[]
  territory: string
  serviceArea: string

  // Documents (URLs to uploaded files)
  documents: {
    photo?: string
    certificationFile?: string
    idProof?: string
    addressProof?: string
    covidCert?: string
  }

  // Application Status
  status: 'pending' | 'under-review' | 'approved' | 'rejected'
  reviewedBy?: string
  reviewedAt?: string
  rejectionReason?: string

  // Admin Notes
  adminNotes?: string
}

export interface Commission {
  id: string
  providerId: string
  providerName: string

  // Booking Reference
  bookingId: string
  sessionDate: string

  // Amounts
  sessionPrice: number
  commissionRate: number // 0.70 = 70%, 0.80 = 80%
  commissionAmount: number
  platformFee: number

  // Payout
  payoutStatus: 'pending' | 'processing' | 'paid' | 'on-hold'
  payoutBatchId?: string
  paidAt?: string

  // Tax
  tdsAmount: number
  netPayout: number
}

export interface PayoutBatch {
  id: string
  batchNumber: string // e.g., "PAYOUT-W48-2024"

  weekEnding: string
  providerId: string
  providerName: string

  // Summary
  totalSessions: number
  totalCommission: number
  totalTDS: number
  netPayout: number

  // Banking
  bankAccount: string
  ifscCode: string

  // Status
  status: 'draft' | 'approved' | 'processing' | 'completed' | 'failed'
  processedAt?: string
  transactionId?: string

  // Commissions included
  commissionIds: string[]
}

export interface AdminStats {
  // Overview
  totalRevenue: number
  revenueThisMonth: number
  revenueGrowth: number // percentage

  // Bookings
  totalBookings: number
  pendingBookings: number
  completedBookings: number
  cancelledBookings: number
  bookingsToday: number

  // Patients
  totalPatients: number
  activePatients: number
  inactivePatients: number
  newPatientsThisWeek: number
  patientsNeedingRenewal: number

  // Providers
  totalProviders: number
  activeProviders: number
  pendingApplications: number
  suspendedProviders: number

  // Commissions
  pendingPayouts: number
  payoutsThisWeek: number
  averageCommissionRate: number

  // Performance
  averagePainReduction: number
  averageCompletionRate: number
  averageRating: number
}

// Mock Data for Development
export const mockBookings: Booking[] = [
  {
    id: 'BKG001',
    bookingNumber: 'ACC-2024-001',
    customerId: 'PAT001',
    customerName: 'Amit Kumar',
    customerPhone: '+91 98765 43210',
    customerAddress: 'Sector 15, Faridabad',
    serviceId: 'tech-neck-reset',
    serviceName: 'Tech-Neck Reset',
    servicePrice: 299,
    sessionNumber: 6,
    requestedDate: '2024-12-05',
    requestedTime: '10:00 AM',
    assignmentStatus: 'pending',
    territory: 'Sector 15',
    serviceArea: 'faridabad',
    packageId: 'PKG001',
    isPaid: true,
    paymentMethod: 'prepaid',
    createdAt: '2024-12-04T09:30:00Z',
    updatedAt: '2024-12-04T09:30:00Z',
  },
  {
    id: 'BKG002',
    bookingNumber: 'ACC-2024-002',
    customerId: 'PAT002',
    customerName: 'Priya Mehta',
    customerPhone: '+91 98765 43211',
    customerAddress: 'Sector 16, Faridabad',
    serviceId: 'migraine-eraser',
    serviceName: 'The Migraine Eraser',
    servicePrice: 499,
    sessionNumber: 8,
    requestedDate: '2024-12-05',
    requestedTime: '3:00 PM',
    confirmedDate: '2024-12-05',
    confirmedTime: '3:00 PM',
    assignedProviderId: '2',
    assignedProviderName: 'Anita Verma',
    assignmentStatus: 'confirmed',
    territory: 'Sector 16',
    serviceArea: 'faridabad',
    packageId: 'PKG002',
    isPaid: true,
    paymentMethod: 'prepaid',
    createdAt: '2024-12-04T10:15:00Z',
    updatedAt: '2024-12-04T11:00:00Z',
  },
]

export const mockPendingProviders: PendingProvider[] = [
  {
    id: 'PAPP001',
    applicationDate: '2024-12-01',
    name: 'Suresh Patel',
    email: 'suresh.patel@example.com',
    phone: '+91 98765 44444',
    gender: 'male',
    ayushCertified: true,
    certificationBody: 'ASPEUS',
    certificationNumber: 'ASP-2023-1234',
    experienceYears: 8,
    requestedServices: ['tech-neck-reset', 'migraine-eraser'],
    specializations: ['Tech-neck relief', 'Chronic pain management'],
    territory: 'Sector 20, Faridabad',
    serviceArea: 'faridabad',
    documents: {
      photo: '/uploads/suresh-photo.jpg',
      certificationFile: '/uploads/suresh-cert.pdf',
      idProof: '/uploads/suresh-aadhar.pdf',
      addressProof: '/uploads/suresh-address.pdf',
    },
    status: 'pending',
    adminNotes: 'Strong AYUSH credentials. Good fit for Sector 20 area.',
  },
]

export const mockCommissions: Commission[] = [
  {
    id: 'COM001',
    providerId: '1',
    providerName: 'Rahul Sharma',
    bookingId: 'BKG001',
    sessionDate: '2024-12-01',
    sessionPrice: 299,
    commissionRate: 0.75,
    commissionAmount: 224.25,
    platformFee: 74.75,
    payoutStatus: 'pending',
    tdsAmount: 22.43, // 10% TDS
    netPayout: 201.82,
  },
  {
    id: 'COM002',
    providerId: '2',
    providerName: 'Anita Verma',
    bookingId: 'BKG002',
    sessionDate: '2024-12-02',
    sessionPrice: 499,
    commissionRate: 0.80,
    commissionAmount: 399.20,
    platformFee: 99.80,
    payoutStatus: 'pending',
    tdsAmount: 39.92, // 10% TDS
    netPayout: 359.28,
  },
]

export const mockStats: AdminStats = {
  totalRevenue: 145620,
  revenueThisMonth: 32450,
  revenueGrowth: 23.5,

  totalBookings: 487,
  pendingBookings: 12,
  completedBookings: 468,
  cancelledBookings: 7,
  bookingsToday: 3,

  totalPatients: 156,
  activePatients: 89,
  inactivePatients: 67,
  newPatientsThisWeek: 8,
  patientsNeedingRenewal: 15,

  totalProviders: 23,
  activeProviders: 20,
  pendingApplications: 3,
  suspendedProviders: 0,

  pendingPayouts: 12450,
  payoutsThisWeek: 8500,
  averageCommissionRate: 0.75,

  averagePainReduction: 58.3,
  averageCompletionRate: 96.1,
  averageRating: 4.7,
}

// Helper Functions
export function getBookingsByStatus(status: Booking['assignmentStatus']): Booking[] {
  return mockBookings.filter(b => b.assignmentStatus === status)
}

export function getPendingProviderApplications(): PendingProvider[] {
  return mockPendingProviders.filter(p => p.status === 'pending')
}

export function calculateWeeklyPayout(providerId: string): number {
  return mockCommissions
    .filter(c => c.providerId === providerId && c.payoutStatus === 'pending')
    .reduce((sum, c) => sum + c.netPayout, 0)
}

export function getProviderCommissions(providerId: string): Commission[] {
  return mockCommissions.filter(c => c.providerId === providerId)
}
