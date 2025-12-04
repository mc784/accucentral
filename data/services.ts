// Product offerings for Chandan Accucenter
// These are standardized, bookable services with fixed pricing

export interface PressurePoint {
  code: string;
  name: string;
  duration: string;
  instructions: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: 'chronic-pain' | 'musculoskeletal' | 'senior-care';
  targetIssue: string;
  duration: string;
  price: number;
  originalPrice?: number;
  scope: string;
  description: string;
  pressurePoints: PressurePoint[];
  outcomes: string[];
  idealFor: string[];
  whatsappMessage: string;
  status: 'draft' | 'published' | 'featured';
}

// WhatsApp number for bookings (replace with actual number)
const WHATSAPP_NUMBER = '919876543210'; // Replace with your actual number

export const services: Service[] = [
  {
    id: '1',
    slug: 'tech-neck-reset',
    title: 'Tech-Neck Reset',
    tagline: 'Instant relief for IT professionals',
    category: 'musculoskeletal',
    targetIssue: 'Neck and shoulder tension from prolonged screen time',
    duration: '30 Minutes',
    price: 299,
    originalPrice: 499,
    scope: 'Neck + Shoulder Acupoints + Seated Massage',
    description: 'Specifically designed for IT professionals and desk workers who spend hours in front of screens. This quick yet effective session targets the exact pressure points that release tech-induced neck and shoulder tension. Walk out feeling lighter, pain-free, and ready to focus.',
    pressurePoints: [
      {
        code: 'GB20',
        name: 'Gallbladder 20 (Feng Chi)',
        duration: '3 minutes per side',
        instructions: 'Base of skull pressure point - releases deep neck tension',
      },
      {
        code: 'LI4',
        name: 'Large Intestine 4 (Hegu)',
        duration: '2 minutes per hand',
        instructions: 'Webbing between thumb and index finger - relieves upper body pain',
      },
      {
        code: 'SI3',
        name: 'Small Intestine 3',
        duration: '2 minutes per hand',
        instructions: 'Side of hand below pinky - releases neck and shoulder tension',
      },
    ],
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
      'Those with "text neck" or forward head posture',
    ],
    whatsappMessage: `Hi, I want to book the Tech-Neck Reset for ₹299.

📱 30 Minutes
🎯 Neck + Shoulder Relief
💼 Perfect for desk workers

When can I schedule this?`,
    status: 'featured',
  },
  {
    id: '2',
    slug: 'migraine-eraser',
    title: 'The Migraine Eraser',
    tagline: 'Proven relief for chronic headaches',
    category: 'chronic-pain',
    targetIssue: 'Migraine headaches and chronic head pain',
    duration: '45 Minutes',
    price: 499,
    scope: 'Head + Hand Points + Magnet Application',
    description: 'Chronic migraines don\'t have to control your life. This comprehensive session combines targeted head and hand acupoints with therapeutic magnet application to interrupt pain signals and restore balance. Most clients report significant relief within the first session.',
    pressurePoints: [
      {
        code: 'GV20',
        name: 'Governing Vessel 20 (Baihui)',
        duration: '5 minutes',
        instructions: 'Top of head - calms the mind and reduces headache intensity',
      },
      {
        code: 'LI4',
        name: 'Large Intestine 4 (Hegu)',
        duration: '3 minutes per hand',
        instructions: 'Hand webbing - powerful pain relief point',
      },
      {
        code: 'GB20',
        name: 'Gallbladder 20 (Feng Chi)',
        duration: '4 minutes per side',
        instructions: 'Base of skull - releases migraine-triggering tension',
      },
      {
        code: 'LV3',
        name: 'Liver 3 (Taichong)',
        duration: '3 minutes per foot',
        instructions: 'Foot point - reduces stress-induced headaches',
      },
    ],
    outcomes: [
      'Significant reduction in migraine intensity',
      'Decreased frequency of headache episodes',
      'Relief from light and sound sensitivity',
      'Better stress management',
    ],
    idealFor: [
      'Chronic migraine sufferers',
      'Those with tension headaches',
      'People sensitive to medication',
      'Anyone seeking drug-free pain relief',
    ],
    whatsappMessage: `Hi, I want to book The Migraine Eraser for ₹499.

⏱️ 45 Minutes
🧠 Head + Hand Points + Magnets
💊 Drug-free relief

When can I schedule this?`,
    status: 'featured',
  },
  {
    id: '3',
    slug: 'senior-citizen-pain-relief',
    title: 'Senior Citizen Pain Relief',
    tagline: 'Gentle, effective relief for knee and back pain',
    category: 'senior-care',
    targetIssue: 'Knee pain, back pain, and age-related joint discomfort',
    duration: '45 Minutes',
    price: 449,
    scope: 'Local Points + Moxibustion (if applicable)',
    description: 'Age shouldn\'t mean living with constant pain. This specially designed session for seniors uses gentle acupressure combined with warming moxibustion therapy to relieve knee and back pain. Safe, comfortable, and remarkably effective for improving mobility and reducing chronic discomfort.',
    pressurePoints: [
      {
        code: 'ST36',
        name: 'Stomach 36 (Zusanli)',
        duration: '4 minutes per leg',
        instructions: 'Below knee - strengthens legs and overall vitality',
      },
      {
        code: 'SP6',
        name: 'Spleen 6 (Sanyinjiao)',
        duration: '3 minutes per leg',
        instructions: 'Inner ankle - reduces joint pain and inflammation',
      },
      {
        code: 'BL23',
        name: 'Bladder 23 (Shenshu)',
        duration: '4 minutes per side',
        instructions: 'Lower back - relieves kidney/back pain',
      },
      {
        code: 'BL40',
        name: 'Bladder 40 (Weizhong)',
        duration: '3 minutes per leg',
        instructions: 'Behind knee - reduces knee pain and stiffness',
      },
    ],
    outcomes: [
      'Significant knee and back pain reduction',
      'Improved mobility and range of motion',
      'Better sleep quality',
      'Enhanced overall vitality and energy',
    ],
    idealFor: [
      'Seniors aged 60+',
      'Those with chronic knee or back pain',
      'People with arthritis or joint stiffness',
      'Anyone seeking gentle, non-invasive pain relief',
    ],
    whatsappMessage: `Hi, I want to book Senior Citizen Pain Relief for ₹449.

⏱️ 45 Minutes
🦴 Knee + Back Pain Relief
🔥 Includes Moxibustion
👴 Gentle for seniors

When can I schedule this?`,
    status: 'featured',
  },
];

// Helper function to generate WhatsApp booking link
export function getWhatsAppBookingLink(service: Service): string {
  const message = encodeURIComponent(service.whatsappMessage);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

// Helper functions
export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(s => s.slug === slug);
}

export function getFeaturedServices(): Service[] {
  return services.filter(s => s.status === 'featured');
}

export function getPublishedServices(): Service[] {
  return services.filter(s => s.status === 'published' || s.status === 'featured');
}

export function getServicesByCategory(category: string): Service[] {
  return services.filter(s => s.category === category);
}

// Category display mappings
export const categoryColors: Record<string, string> = {
  'chronic-pain': 'bg-warm-coral/10 text-warm-coral border-warm-coral',
  'musculoskeletal': 'bg-deep-teal/10 text-deep-teal border-deep-teal',
  'senior-care': 'bg-sage-green/10 text-sage-green-700 border-sage-green',
};

export const categoryLabels: Record<string, string> = {
  'chronic-pain': 'Chronic Pain',
  'musculoskeletal': 'Musculoskeletal',
  'senior-care': 'Senior Care',
};
