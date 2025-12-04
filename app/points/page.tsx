import Link from 'next/link';
import Image from 'next/image';

interface PressurePoint {
  id: string;
  code: string;
  name: string;
  commonName: string;
  location: string;
  image: string;
  indications: string[];
  technique: {
    pressure: string;
    duration: string;
    frequency: string;
  };
  mechanism: string;
  contraindications: string[];
  category: string;
}

const pressurePoints: PressurePoint[] = [
  {
    id: 'ht7',
    code: 'HT7',
    name: 'Heart 7',
    commonName: 'Shen Men (Spirit Gate)',
    location: 'On the wrist crease, on the pinky side, in the small depression at the ulnar end of the transverse wrist crease.',
    image: '/images/acupressure/heart-7.png',
    indications: [
      'Insomnia and difficulty falling asleep',
      'Anxiety and restlessness',
      'Heart palpitations',
      'Mental agitation and overthinking',
      'Emotional distress',
    ],
    technique: {
      pressure: 'Gentle to moderate circular pressure',
      duration: '2-3 minutes per wrist',
      frequency: 'Can be applied multiple times daily, especially before bed',
    },
    mechanism: 'HT7 is the primary calming point on the Heart meridian, which governs the Shen (spirit/mind) in Traditional Chinese Medicine. Modern research suggests this point may influence parasympathetic nervous system activity, promoting relaxation and reducing cortisol levels. The gentle pressure on this richly innervated area may trigger a cascade of calming neurotransmitters including GABA and serotonin.',
    contraindications: [
      'No major contraindications',
      'Use gentle pressure during pregnancy',
    ],
    category: 'Sleep & Anxiety',
  },
  {
    id: 'pc6',
    code: 'PC6',
    name: 'Pericardium 6',
    commonName: 'Nei Guan (Inner Gate)',
    location: 'Three finger-widths (about 2 inches) below the wrist crease, between the two prominent tendons on the inner forearm.',
    image: '/images/acupressure/pericardium-6.png',
    indications: [
      'Nausea and motion sickness',
      'Anxiety and panic attacks',
      'Chest tightness and palpitations',
      'Insomnia',
      'Digestive upset',
      'Wrist and forearm pain',
    ],
    technique: {
      pressure: 'Firm, steady pressure perpendicular to the skin',
      duration: '2-3 minutes per wrist',
      frequency: 'As needed for acute symptoms; 2-3 times daily for prevention',
    },
    mechanism: 'PC6 is one of the most researched acupressure points in Western medicine. Multiple clinical trials demonstrate its effectiveness for nausea, with the mechanism likely involving vagal nerve stimulation and modulation of neurotransmitters in the chemoreceptor trigger zone. The point also influences the autonomic nervous system, helping shift from sympathetic (fight-or-flight) to parasympathetic (rest-and-digest) dominance.',
    contraindications: [
      'Safe for most people including pregnancy',
      'Avoid excessive pressure if wrist pain is present',
    ],
    category: 'Digestive & Anxiety',
  },
  {
    id: 'gv26',
    code: 'GV26',
    name: 'Governing Vessel 26',
    commonName: 'Ren Zhong (Middle of the Person)',
    location: 'In the philtrum (the groove between the nose and upper lip), approximately one-third down from the nose.',
    image: '/images/acupressure/governing-vessel-26.png',
    indications: [
      'Emergency revival and alertness',
      'Fainting and dizziness',
      'Mental fog and drowsiness',
      'Acute anxiety or panic',
      'Nasal congestion',
      'Lower back pain (via meridian connection)',
    ],
    technique: {
      pressure: 'Firm upward pressure toward the nose',
      duration: '30-60 seconds for acute use; up to 2 minutes for general stimulation',
      frequency: 'As needed for acute symptoms; not for prolonged daily use',
    },
    mechanism: 'GV26 is a Yang point on the Governing Vessel, which runs along the spine and governs upright posture and alertness. Stimulation here creates a strong sensory input that can rapidly activate the reticular activating system in the brainstem, promoting wakefulness. In TCM theory, it "raises Yang" and clears obstructions. The intense localized pressure may also trigger an adrenaline-like response, useful in emergency situations.',
    contraindications: [
      'Do not use excessive force—this area is sensitive',
      'Avoid if facial injuries or conditions present',
      'Not suitable for young children',
    ],
    category: 'Emergency & Alertness',
  },
  {
    id: 'li4',
    code: 'LI4',
    name: 'Large Intestine 4',
    commonName: 'Hegu (Joining Valley)',
    location: 'In the webbing between the thumb and index finger, at the highest point of the muscle when thumb and index finger are brought together.',
    image: '/images/acupressure/hand-dorsal.png',
    indications: [
      'Headaches and migraines',
      'Facial pain and toothaches',
      'Neck and shoulder tension',
      'Sinus congestion',
      'Digestive issues and constipation',
      'General pain relief throughout the body',
    ],
    technique: {
      pressure: 'Firm pinching pressure, angling toward the bone of the index finger',
      duration: '2-3 minutes per hand',
      frequency: '2-3 times daily, or as needed for pain',
    },
    mechanism: 'LI4 is perhaps the most famous acupressure point for pain relief. It works through multiple mechanisms: stimulation here activates descending pain inhibitory pathways (Gate Control Theory), releases endorphins, and may modulate inflammatory cytokines. The Large Intestine meridian passes through the face, jaw, and head, explaining its effectiveness for head and facial pain. Research shows measurable analgesic effects comparable to some over-the-counter pain medications.',
    contraindications: [
      '⚠️ CONTRAINDICATED during pregnancy—can induce labor',
      'Use caution if hand arthritis is present',
    ],
    category: 'Pain Relief',
  },
];

const categories = [
  { name: 'All Points', slug: 'all' },
  { name: 'Sleep & Anxiety', slug: 'sleep-anxiety' },
  { name: 'Pain Relief', slug: 'pain-relief' },
  { name: 'Digestive & Anxiety', slug: 'digestive-anxiety' },
  { name: 'Emergency & Alertness', slug: 'emergency-alertness' },
];

export default function PointsPage() {
  return (
    <main className="min-h-screen bg-linear-to-b from-white to-slate-50">
      {/* Navigation Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-heading font-bold text-deep-teal">
              Accucentral
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/protocols" className="text-slate-gray hover:text-deep-teal font-medium transition-colors">
                Services
              </Link>
              <Link href="/points" className="text-slate-gray hover:text-deep-teal font-medium transition-colors">
                Points
              </Link>
              <Link href="/science" className="text-slate-gray hover:text-deep-teal font-medium transition-colors">
                Science
              </Link>
              <Link href="/about" className="text-slate-gray hover:text-deep-teal font-medium transition-colors">
                About
              </Link>
              <Link href="/book" className="px-4 py-2 bg-[#F4A261] text-white rounded-lg hover:bg-[#E96F1C] transition font-semibold shadow-md">
                Book Consultation
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Points Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-3">Essential Pressure Points</h1>
          <p className="text-lg text-slate-600 max-w-3xl mb-6">
            Master the precise location, technique, and science behind key acupressure points. Each point includes detailed instructions, visual guides, and evidence-based explanations for safe, effective self-care.
          </p>
          <div className="flex gap-3 text-sm flex-wrap">
            <div className="bg-slate-100 px-4 py-2 rounded-full text-slate-700">
              ✓ Precise Locations
            </div>
            <div className="bg-slate-100 px-4 py-2 rounded-full text-slate-700">
              ✓ Step-by-Step Techniques
            </div>
            <div className="bg-slate-100 px-4 py-2 rounded-full text-slate-700">
              ✓ Scientific Mechanisms
            </div>
            <div className="bg-slate-100 px-4 py-2 rounded-full text-slate-700">
              ✓ Safety Guidelines
            </div>
          </div>
        </div>

        <div className="space-y-16">
          {pressurePoints.map((point, index) => (
            <article
              key={point.id}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200 ${
                index % 2 === 0 ? '' : ''
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Image Column */}
                <div className={`relative bg-slate-50 flex items-center justify-center p-8 ${
                  index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'
                }`}>
                  <div className="relative w-full max-w-md aspect-square">
                    <Image
                      src={point.image}
                      alt={`${point.name} (${point.code}) pressure point location`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>

                {/* Content Column */}
                <div className={`p-8 lg:p-12 ${
                  index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'
                }`}>
                  {/* Header */}
                  <div className="mb-6">
                    <div className="inline-block bg-deep-teal/10 text-deep-teal px-3 py-1 rounded-full text-xs font-bold mb-3">
                      {point.code}
                    </div>
                    <h2 className="text-3xl font-bold mb-2 text-charcoal">
                      {point.name}
                    </h2>
                    <p className="text-lg text-deep-teal font-semibold italic">
                      {point.commonName}
                    </p>
                  </div>

                  {/* Location */}
                  <div className="mb-6">
                    <h3 className="text-sm font-bold uppercase text-slate-500 mb-2 flex items-center gap-2">
                      <span className="text-lg">📍</span> Location
                    </h3>
                    <p className="text-slate-700 leading-relaxed">{point.location}</p>
                  </div>

                  {/* Technique */}
                  <div className="mb-6 bg-calm-blue/5 rounded-lg p-4 border border-calm-blue/20">
                    <h3 className="text-sm font-bold uppercase text-deep-teal mb-3 flex items-center gap-2">
                      <span className="text-lg">👆</span> Technique
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p className="text-slate-700">
                        <span className="font-semibold">Pressure:</span> {point.technique.pressure}
                      </p>
                      <p className="text-slate-700">
                        <span className="font-semibold">Duration:</span> {point.technique.duration}
                      </p>
                      <p className="text-slate-700">
                        <span className="font-semibold">Frequency:</span> {point.technique.frequency}
                      </p>
                    </div>
                  </div>

                  {/* Indications */}
                  <div className="mb-6">
                    <h3 className="text-sm font-bold uppercase text-slate-500 mb-3 flex items-center gap-2">
                      <span className="text-lg">✓</span> Helps With
                    </h3>
                    <ul className="grid grid-cols-1 gap-2">
                      {point.indications.map((indication, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-slate-700">
                          <span className="text-sage-green mt-0.5 shrink-0">✓</span>
                          <span className="text-sm">{indication}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Mechanism */}
                  <div className="mb-6">
                    <h3 className="text-sm font-bold uppercase text-slate-500 mb-2 flex items-center gap-2">
                      <span className="text-lg">🧬</span> How It Works
                    </h3>
                    <p className="text-slate-700 text-sm leading-relaxed">{point.mechanism}</p>
                  </div>

                  {/* Contraindications */}
                  {point.contraindications.length > 0 && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <h3 className="text-sm font-bold uppercase text-amber-900 mb-2 flex items-center gap-2">
                        <span className="text-lg">⚠️</span> Important Notes
                      </h3>
                      <ul className="space-y-1">
                        {point.contraindications.map((warning, idx) => (
                          <li key={idx} className="text-sm text-amber-900 flex items-start gap-2">
                            <span className="shrink-0">•</span>
                            <span>{warning}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-linear-to-r from-sage-green/20 to-calm-blue/20 rounded-2xl p-8 text-center border border-sage-green/30">
          <h3 className="text-2xl font-bold mb-2 text-charcoal">Ready to Apply These Points?</h3>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
            Explore our complete treatment protocols that combine multiple pressure points for specific health concerns.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/protocols"
              className="bg-deep-teal text-white px-6 py-3 rounded-lg font-semibold hover:bg-deep-teal/90 transition-colors"
            >
              View All Services
            </Link>
            <Link
              href="/book"
              className="bg-warm-coral text-white px-6 py-3 rounded-lg font-semibold hover:bg-warm-coral/90 transition-colors shadow-lg"
            >
              Book a Session
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
