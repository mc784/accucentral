// Provider/Specialist data for Chandan Accucenter
// Core + Flex structure for scalable provider management

export type BadgeLevel = 'level-1' | 'level-2' | 'level-3' | 'accucentral-verified';
export type ServiceArea = 'faridabad' | 'delhi' | 'gurgaon' | 'noida';

export interface Provider {
  id: string;
  slug: string;
  name: string;
  photo: string;

  // Badge & Certification
  badgeLevel: BadgeLevel;
  badgeTitle: string;
  ayushCertified: boolean;
  certificationBody?: string;

  // Location & Service Area
  territory: string;
  territoryCode: string;
  serviceArea: ServiceArea;
  serviceRadius: string; // e.g., "5km radius"

  // Experience & Stats
  totalBookings: number;
  experienceYears: number;
  rating: number;
  completionRate: number;

  // Available Services (SKUs they can deliver)
  availableServices: string[]; // Array of service slugs

  // Infrastructure & Safety
  verified: {
    backgroundCheck: boolean;
    covidVaccinated: boolean;
    ayushRegistered: boolean;
    kycComplete: boolean;
  };

  equipment: {
    portableTable: boolean;
    bringsMats: boolean;
    oilFree: boolean;
  };

  // Availability
  availableDays: ('mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun')[];
  preferredTimeSlots: string[];

  // Specializations & Tags
  specializations: string[];
  tags: string[];

  // Bio (structured, not free-form)
  languages: string[];
  gender: 'male' | 'female';
  femaleClientsOnly?: boolean;

  // Status
  status: 'active' | 'on-hold' | 'suspended';
  joinedDate: string;

  // Commission (for internal use)
  commissionRate: number; // percentage
}

// Central dispatch WhatsApp number
export const DISPATCH_WHATSAPP = '919876543210'; // Replace with actual

// AYUSH Badge definitions
export const badgeInfo: Record<BadgeLevel, {
  label: string;
  color: string;
  bgColor: string;
  description: string;
}> = {
  'level-1': {
    label: 'Protocol Instructor (Level 1)',
    color: 'text-amber-700',
    bgColor: 'bg-amber-100 border-amber-300',
    description: 'Basic certified instructor for group sessions'
  },
  'level-2': {
    label: 'Wellness Instructor (Level 2)',
    color: 'text-blue-700',
    bgColor: 'bg-blue-100 border-blue-300',
    description: 'Experienced therapist for home visits'
  },
  'level-3': {
    label: 'Senior Therapist (Level 3)',
    color: 'text-purple-700',
    bgColor: 'bg-purple-100 border-purple-300',
    description: 'Expert therapist for complex cases'
  },
  'accucentral-verified': {
    label: 'AccuCentral Verified',
    color: 'text-green-700',
    bgColor: 'bg-green-100 border-green-300',
    description: 'Verified by AccuCentral standards'
  }
};

// Sample providers
export const providers: Provider[] = [
  {
    id: '1',
    slug: 'rahul-sharma-far15',
    name: 'Rahul Sharma',
    photo: '/images/providers/rahul-sharma.jpg',

    badgeLevel: 'level-2',
    badgeTitle: 'Wellness Instructor (Level 2)',
    ayushCertified: true,
    certificationBody: 'ASPEUS',

    territory: 'Sector 15, Faridabad',
    territoryCode: 'FAR-S15',
    serviceArea: 'faridabad',
    serviceRadius: '5km radius',

    totalBookings: 487,
    experienceYears: 5,
    rating: 4.8,
    completionRate: 96,

    availableServices: ['tech-neck-reset', 'migraine-eraser'],

    verified: {
      backgroundCheck: true,
      covidVaccinated: true,
      ayushRegistered: true,
      kycComplete: true,
    },

    equipment: {
      portableTable: true,
      bringsMats: false,
      oilFree: true,
    },

    availableDays: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
    preferredTimeSlots: ['Morning (9 AM - 1 PM)', 'Evening (5 PM - 8 PM)'],

    specializations: ['Tech-neck relief', 'Chronic pain management'],
    tags: ['Has portable table', 'Oil-free sessions', 'Punctual'],

    languages: ['Hindi', 'English'],
    gender: 'male',

    status: 'active',
    joinedDate: '2023-06-15',
    commissionRate: 30,
  },
  {
    id: '2',
    slug: 'anita-verma-far16',
    name: 'Anita Verma',
    photo: '/images/providers/anita-verma.jpg',

    badgeLevel: 'level-2',
    badgeTitle: 'Wellness Instructor (Level 2)',
    ayushCertified: true,
    certificationBody: 'QCI',

    territory: 'Sector 16, Faridabad',
    territoryCode: 'FAR-S16',
    serviceArea: 'faridabad',
    serviceRadius: '5km radius',

    totalBookings: 312,
    experienceYears: 4,
    rating: 4.9,
    completionRate: 98,

    availableServices: ['tech-neck-reset', 'migraine-eraser', 'senior-citizen-pain-relief'],

    verified: {
      backgroundCheck: true,
      covidVaccinated: true,
      ayushRegistered: true,
      kycComplete: true,
    },

    equipment: {
      portableTable: true,
      bringsMats: true,
      oilFree: true,
    },

    availableDays: ['mon', 'wed', 'thu', 'fri', 'sat', 'sun'],
    preferredTimeSlots: ['Morning (9 AM - 12 PM)', 'Afternoon (2 PM - 5 PM)'],

    specializations: ['Senior care', 'Migraine treatment', 'Women\'s health'],
    tags: ['Female therapist', 'Senior specialist', 'Gentle approach'],

    languages: ['Hindi', 'English', 'Punjabi'],
    gender: 'female',
    femaleClientsOnly: false,

    status: 'active',
    joinedDate: '2023-08-20',
    commissionRate: 30,
  },
  {
    id: '3',
    slug: 'suresh-kumar-far17',
    name: 'Suresh Kumar',
    photo: '/images/providers/suresh-kumar.jpg',

    badgeLevel: 'level-3',
    badgeTitle: 'Senior Therapist (Level 3)',
    ayushCertified: true,
    certificationBody: 'IGNOU',

    territory: 'Sector 17, Faridabad',
    territoryCode: 'FAR-S17',
    serviceArea: 'faridabad',
    serviceRadius: '7km radius',

    totalBookings: 856,
    experienceYears: 12,
    rating: 4.9,
    completionRate: 97,

    availableServices: ['tech-neck-reset', 'migraine-eraser', 'senior-citizen-pain-relief'],

    verified: {
      backgroundCheck: true,
      covidVaccinated: true,
      ayushRegistered: true,
      kycComplete: true,
    },

    equipment: {
      portableTable: true,
      bringsMats: true,
      oilFree: false,
    },

    availableDays: ['tue', 'wed', 'thu', 'fri', 'sat'],
    preferredTimeSlots: ['Morning (8 AM - 12 PM)', 'Evening (4 PM - 7 PM)'],

    specializations: ['Complex pain cases', 'Sciatica', 'Sports injuries'],
    tags: ['12+ years experience', 'Expert level', 'Senior specialist'],

    languages: ['Hindi', 'English'],
    gender: 'male',

    status: 'active',
    joinedDate: '2022-03-10',
    commissionRate: 25,
  },
];

// Helper functions
export function getProviderBySlug(slug: string): Provider | undefined {
  return providers.find(p => p.slug === slug);
}

export function getActiveProviders(): Provider[] {
  return providers.filter(p => p.status === 'active');
}

export function getProvidersByServiceArea(area: ServiceArea): Provider[] {
  return providers.filter(p => p.serviceArea === area && p.status === 'active');
}

export function getProvidersByService(serviceSlug: string): Provider[] {
  return providers.filter(p =>
    p.availableServices.includes(serviceSlug) && p.status === 'active'
  );
}

// Generate WhatsApp booking link for provider
export function getProviderBookingLink(provider: Provider, serviceSlug?: string): string {
  let message = `Hi AccuCentral, I want to book a session.`;

  if (serviceSlug) {
    message += `\n\nService: ${serviceSlug}`;
  }

  message += `\n\nPreferred Specialist: ${provider.name} (${provider.territory})`;
  message += `\n\nPlease confirm availability and schedule.`;

  return `https://wa.me/${DISPATCH_WHATSAPP}?text=${encodeURIComponent(message)}`;
}

// Generate general booking link (dispatch assigns provider)
export function getDispatchBookingLink(serviceSlug: string, location?: string): string {
  let message = `Hi AccuCentral, I want to book a session.`;
  message += `\n\nService: ${serviceSlug}`;

  if (location) {
    message += `\nLocation: ${location}`;
  }

  message += `\n\nPlease assign an available specialist.`;

  return `https://wa.me/${DISPATCH_WHATSAPP}?text=${encodeURIComponent(message)}`;
}
