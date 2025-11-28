// Static service offerings for Chandan Accucenter
// This file contains all acupressure treatment services

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
  category: 'stress-anxiety' | 'chronic-pain' | 'sleep-insomnia' | 'digestive-health' | 'headaches' | 'musculoskeletal' | 'womens-health' | 'respiratory';
  targetIssue: string;
  duration: string;
  complexity: 'beginner' | 'intermediate' | 'advanced' | 'all-levels';
  frequency: string;
  description: string;
  pressurePoints: PressurePoint[];
  outcomes: string[];
  science: string;
  idealFor: string[];
  contraindications: string[];
  tips: string[];
  status: 'draft' | 'published' | 'featured';
}

export const services: Service[] = [
  {
    id: '1',
    slug: 'tech-neck-relief',
    title: 'Tech-Neck Relief Session',
    tagline: 'Instant relief for desk workers and phone users',
    category: 'musculoskeletal',
    targetIssue: 'Neck and shoulder tension from prolonged screen time',
    duration: '45 minutes',
    complexity: 'beginner',
    frequency: '1-2 sessions per week for 4 weeks',
    description: 'Modern life keeps our heads down and shoulders hunched. This targeted session addresses the specific muscle tensions caused by prolonged computer and phone use. Using a combination of Traditional Chinese Medicine points and modern trigger point therapy, we release the chronic tension patterns that cause pain and restrict movement.',
    pressurePoints: [
      {
        code: 'GB20',
        name: 'Gallbladder 20 (Feng Chi)',
        duration: '3 minutes per side',
        instructions: 'Firm pressure at the base of the skull, in the hollow between the two vertical neck muscles. Releases neck tension and headaches.',
      },
      {
        code: 'LI4',
        name: 'Large Intestine 4 (Hegu)',
        duration: '2 minutes per hand',
        instructions: 'Apply firm pressure in the webbing between thumb and index finger. Relieves upper body tension and pain.',
      },
      {
        code: 'SI3',
        name: 'Small Intestine 3',
        duration: '2 minutes per hand',
        instructions: 'Point on the side of the hand below the pinky finger. Releases neck and shoulder tension.',
      },
    ],
    outcomes: [
      'Immediate reduction in neck and shoulder tension',
      'Improved range of motion in the neck',
      'Relief from tension headaches',
      'Better posture awareness',
      'Reduced pain from prolonged screen time',
    ],
    science: 'This protocol combines TCM meridian theory with modern trigger point therapy. The points target the Gallbladder and Small Intestine meridians, which run through the neck and shoulders. Research shows that acupressure at GB20 increases blood flow to the head and neck by up to 25%, while LI4 has documented analgesic effects.',
    idealFor: [
      'Office workers with desk jobs',
      'People who spend 4+ hours daily on screens',
      'Anyone experiencing neck stiffness or "text neck"',
      'Those with tension headaches from poor posture',
    ],
    contraindications: [
      'Recent neck injury or whiplash (consult physician first)',
      'Severe cervical spine conditions',
      'Pregnancy (LI4 is contraindicated)',
    ],
    tips: [
      'Take screen breaks every 30 minutes',
      'Keep your monitor at eye level',
      'Drink water after the session to help flush toxins',
      'Apply gentle pressure to these points throughout the day',
    ],
    status: 'featured',
  },
  {
    id: '2',
    slug: 'insomnia-treatment',
    title: 'Deep Sleep Protocol',
    tagline: 'Natural relief for insomnia and restless sleep',
    category: 'sleep-insomnia',
    targetIssue: 'Difficulty falling asleep, staying asleep, or non-restorative sleep',
    duration: '60 minutes',
    complexity: 'intermediate',
    frequency: '2-3 sessions per week for 3 weeks',
    description: 'Quality sleep is the foundation of health, yet millions struggle with insomnia. This comprehensive protocol addresses both the physical tension and the overactive nervous system that prevent deep sleep. By working with specific calming points and balancing the body\'s energy systems, we help restore your natural sleep-wake cycle.',
    pressurePoints: [
      {
        code: 'HT7',
        name: 'Heart 7 (Shen Men)',
        duration: '3 minutes per wrist',
        instructions: 'Gentle pressure on the wrist crease, on the pinky side. Calms the mind and promotes sleep.',
      },
      {
        code: 'PC6',
        name: 'Pericardium 6 (Nei Guan)',
        duration: '3 minutes per wrist',
        instructions: 'Three finger-widths below the wrist crease, between the tendons. Reduces anxiety and promotes relaxation.',
      },
      {
        code: 'SP6',
        name: 'Spleen 6 (San Yin Jiao)',
        duration: '3 minutes per leg',
        instructions: 'Four finger-widths above the inner ankle bone. Calms the mind and regulates sleep cycles.',
      },
      {
        code: 'KI1',
        name: 'Kidney 1 (Yong Quan)',
        duration: '2 minutes per foot',
        instructions: 'Center of the sole of the foot. Grounds energy and promotes deep sleep.',
      },
    ],
    outcomes: [
      'Faster time to fall asleep',
      'Fewer nighttime awakenings',
      'Deeper, more restorative sleep',
      'Reduced anxiety around bedtime',
      'Improved daytime energy and focus',
    ],
    science: 'The Heart and Pericardium meridians regulate the Shen (spirit/mind) in TCM. Modern research shows that acupressure at HT7 increases parasympathetic activity and reduces cortisol levels. A 2015 study found that regular acupressure improved sleep quality by 35% in chronic insomnia patients.',
    idealFor: [
      'People with chronic insomnia',
      'Those who wake frequently during the night',
      'Individuals with racing thoughts at bedtime',
      'Shift workers with disrupted sleep patterns',
    ],
    contraindications: [
      'Pregnancy (SP6 is contraindicated)',
      'Sleep apnea (requires medical evaluation first)',
    ],
    tips: [
      'Maintain a consistent sleep schedule',
      'Avoid screens 1 hour before bed',
      'Keep bedroom cool and dark',
      'Practice the wrist points (HT7, PC6) in bed before sleep',
    ],
    status: 'featured',
  },
  {
    id: '3',
    slug: 'anxiety-relief',
    title: 'Anxiety & Stress Management',
    tagline: 'Find calm in 30 minutes',
    category: 'stress-anxiety',
    targetIssue: 'Chronic anxiety, panic attacks, stress-related tension',
    duration: '30 minutes',
    complexity: 'beginner',
    frequency: 'As needed, or weekly for prevention',
    description: 'When anxiety strikes, your body goes into fight-or-flight mode. This quick yet powerful session targets specific points that activate your parasympathetic nervous system—your body\'s natural "rest and digest" mode. You\'ll leave feeling grounded, calm, and more capable of handling stress.',
    pressurePoints: [
      {
        code: 'GV20',
        name: 'Governing Vessel 20 (Bai Hui)',
        duration: '3 minutes',
        instructions: 'Top of the head, at the intersection of a line from ear to ear. Calms the mind and lifts mood.',
      },
      {
        code: 'PC6',
        name: 'Pericardium 6 (Nei Guan)',
        duration: '3 minutes per wrist',
        instructions: 'Three finger-widths below wrist crease. Immediate relief for anxiety and nausea.',
      },
      {
        code: 'LV3',
        name: 'Liver 3 (Tai Chong)',
        duration: '2 minutes per foot',
        instructions: 'Top of foot, between big toe and second toe. Releases stress and anger.',
      },
    ],
    outcomes: [
      'Immediate reduction in anxiety symptoms',
      'Slower heart rate and deeper breathing',
      'Reduced muscle tension',
      'Clearer thinking and decision-making',
      'Better emotional regulation',
    ],
    science: 'These points work through the Gate Control Theory of pain and the autonomic nervous system. PC6 has been extensively studied for anxiety and nausea, showing measurable reductions in cortisol and increases in GABA (the brain\'s calming neurotransmitter). GV20 increases alpha brain waves associated with relaxation.',
    idealFor: [
      'People experiencing acute anxiety or panic',
      'Those with generalized anxiety disorder',
      'Individuals under high stress',
      'Anyone seeking non-pharmaceutical anxiety relief',
    ],
    contraindications: [
      'Active psychosis (requires medical care)',
      'Severe depression (should be part of comprehensive treatment)',
    ],
    tips: [
      'Learn to self-apply PC6 during anxious moments',
      'Practice deep belly breathing during treatment',
      'Combine with regular exercise for best results',
      'Keep a stress journal to identify triggers',
    ],
    status: 'featured',
  },
  {
    id: '4',
    slug: 'migraine-relief',
    title: 'Migraine & Headache Relief',
    tagline: 'Stop the pain before it starts',
    category: 'headaches',
    targetIssue: 'Tension headaches, migraines, and cluster headaches',
    duration: '45 minutes',
    complexity: 'intermediate',
    frequency: '2 sessions per week during active phase, then weekly for prevention',
    description: 'Migraines aren\'t just headaches—they\'re neurological events that can be debilitating. This protocol addresses both acute pain relief and prevention by working with points that regulate blood flow to the head, release muscle tension, and calm the nervous system. Many clients report reduced frequency and intensity of migraines with regular sessions.',
    pressurePoints: [
      {
        code: 'LI4',
        name: 'Large Intestine 4 (Hegu)',
        duration: '3 minutes per hand',
        instructions: 'Firm pressure in the webbing between thumb and index finger. Strong analgesic effect for head pain.',
      },
      {
        code: 'GB20',
        name: 'Gallbladder 20 (Feng Chi)',
        duration: '3 minutes per side',
        instructions: 'Base of skull, in the hollow between neck muscles. Releases head and neck tension.',
      },
      {
        code: 'LV3',
        name: 'Liver 3 (Tai Chong)',
        duration: '2 minutes per foot',
        instructions: 'Between big toe and second toe. Reduces inflammation and regulates blood flow.',
      },
      {
        code: 'Yin Tang',
        name: 'Yin Tang (Third Eye Point)',
        duration: '3 minutes',
        instructions: 'Between the eyebrows. Relieves frontal headaches and sinus pressure.',
      },
    ],
    outcomes: [
      'Reduced migraine frequency',
      'Lower pain intensity when migraines occur',
      'Faster recovery from headache episodes',
      'Decreased need for pain medication',
      'Better identification of triggers',
    ],
    science: 'LI4 has been shown in multiple studies to have analgesic effects comparable to some medications. It works by releasing endorphins and blocking pain signals in the spinal cord (Gate Control Theory). GB20 increases cerebral blood flow and releases muscle tension that can trigger migraines.',
    idealFor: [
      'Chronic migraine sufferers',
      'People with frequent tension headaches',
      'Those who want to reduce medication dependence',
      'Individuals seeking preventive care',
    ],
    contraindications: [
      'Pregnancy (LI4 is contraindicated)',
      'Headaches from head injury (seek medical evaluation)',
      'New or sudden severe headaches (rule out serious conditions first)',
    ],
    tips: [
      'Keep a migraine diary to identify triggers',
      'Stay hydrated—dehydration is a common trigger',
      'Apply ice to GB20 points during acute migraines',
      'Learn to self-treat with LI4 at first sign of headache',
    ],
    status: 'published',
  },
  {
    id: '5',
    slug: 'digestive-support',
    title: 'Digestive Health & IBS Support',
    tagline: 'Balance your gut, balance your life',
    category: 'digestive-health',
    targetIssue: 'IBS, bloating, indigestion, and sluggish digestion',
    duration: '45 minutes',
    complexity: 'intermediate',
    frequency: 'Weekly for 6 weeks, then bi-weekly',
    description: 'Your gut is your second brain, and when it\'s unhappy, everything feels off. This gentle yet effective protocol works with the digestive system\'s meridians to regulate gut motility, reduce inflammation, and calm the gut-brain axis. Whether you struggle with IBS, chronic bloating, or general digestive discomfort, this session helps restore balance.',
    pressurePoints: [
      {
        code: 'ST36',
        name: 'Stomach 36 (Zu San Li)',
        duration: '3 minutes per leg',
        instructions: 'Four finger-widths below the kneecap, one finger-width outside the shinbone. Strengthens digestion and immunity.',
      },
      {
        code: 'CV12',
        name: 'Conception Vessel 12',
        duration: '5 minutes',
        instructions: 'Midline of the abdomen, halfway between navel and sternum. Regulates stomach function and reduces bloating.',
      },
      {
        code: 'PC6',
        name: 'Pericardium 6 (Nei Guan)',
        duration: '2 minutes per wrist',
        instructions: 'Three finger-widths below wrist crease. Relieves nausea and calms digestive upset.',
      },
      {
        code: 'LI4',
        name: 'Large Intestine 4',
        duration: '2 minutes per hand',
        instructions: 'Webbing between thumb and index finger. Regulates bowel function.',
      },
    ],
    outcomes: [
      'Reduced bloating and gas',
      'More regular bowel movements',
      'Decreased abdominal pain and cramping',
      'Improved nutrient absorption',
      'Better stress-related digestive symptoms',
    ],
    science: 'The vagus nerve connects your brain to your gut, and acupressure points along the Stomach and Conception Vessel meridians stimulate this connection. ST36 has been shown to increase gut motility and reduce inflammation. Research indicates that regular treatment can reduce IBS symptoms by up to 40%.',
    idealFor: [
      'People with IBS (irritable bowel syndrome)',
      'Those experiencing chronic bloating',
      'Individuals with stress-related digestive issues',
      'Anyone seeking to improve overall digestive health',
    ],
    contraindications: [
      'Pregnancy (certain abdominal points contraindicated)',
      'Inflammatory bowel disease in active flare (medical care needed)',
      'Recent abdominal surgery',
    ],
    tips: [
      'Eat mindfully and chew thoroughly',
      'Avoid trigger foods during treatment period',
      'Practice abdominal breathing exercises',
      'Self-massage ST36 before meals',
    ],
    status: 'published',
  },
];

// Helper functions
export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(service => service.slug === slug);
}

export function getFeaturedServices(): Service[] {
  return services.filter(service => service.status === 'featured');
}

export function getPublishedServices(): Service[] {
  return services.filter(service => service.status === 'published' || service.status === 'featured');
}

export function getServicesByCategory(category: string): Service[] {
  return services.filter(service => service.category === category && service.status !== 'draft');
}

// Category metadata
export const categoryColors: Record<string, string> = {
  'stress-anxiety': 'from-calm-blue to-deep-teal',
  'chronic-pain': 'from-warm-coral to-red-600',
  'sleep-insomnia': 'from-deep-teal to-indigo-700',
  'digestive-health': 'from-sage-green to-green-600',
  'headaches': 'from-purple-500 to-indigo-600',
  'musculoskeletal': 'from-blue-600 to-cyan-600',
  'womens-health': 'from-pink-500 to-rose-600',
  'respiratory': 'from-teal-500 to-cyan-600',
};

export const categoryLabels: Record<string, string> = {
  'stress-anxiety': 'Stress & Anxiety',
  'chronic-pain': 'Chronic Pain',
  'sleep-insomnia': 'Sleep & Insomnia',
  'digestive-health': 'Digestive Health',
  'headaches': 'Headaches & Migraines',
  'musculoskeletal': 'Musculoskeletal',
  'womens-health': 'Women\'s Health',
  'respiratory': 'Respiratory',
};

export const complexityLabels: Record<string, string> = {
  beginner: 'Mild',
  intermediate: 'Moderate',
  advanced: 'Chronic',
  'all-levels': 'All Conditions',
};
