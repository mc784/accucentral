import Link from 'next/link'
import { SearchHero } from '@/components/SearchHero'
import { ScienceNote } from '@/components/ScienceNote'
import { StickyBookingButton } from '@/components/StickyBookingButton'
import { getFeaturedServices } from '@/data/services'

// Placeholder pose count (will be dynamic when we add pressure points library)
const totalCount = 100

const symptomCategories = [
  {
    name: 'Stress & Anxiety',
    value: 'stress-anxiety',
    icon: '🧘',
    description: 'Calming points for nervous tension and emotional balance',
    color: 'calm-blue'
  },
  {
    name: 'Chronic Pain',
    value: 'chronic-pain',
    icon: '💆',
    description: 'Relief for headaches, back pain, and muscle tension',
    color: 'deep-teal'
  },
  {
    name: 'Sleep & Insomnia',
    value: 'sleep-insomnia',
    icon: '😴',
    description: 'Points to calm your nervous system for restful sleep',
    color: 'sage-green'
  },
  {
    name: 'Digestive Health',
    value: 'digestive-health',
    icon: '🌿',
    description: 'Support for bloating, IBS, and sluggish digestion',
    color: 'sage-green'
  },
]

export default function Home() {
  const featuredServices = getFeaturedServices()

  return (
    <div className="min-h-screen bg-slate-medical">
      {/* Sticky Booking Button */}
      <StickyBookingButton />

      {/* Header */}
      <header className="bg-slate-medical border-b border-slate-200">
        <div className="container mx-auto px-4 py-6">
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

      {/* Hero Section with Search */}
      <SearchHero totalCount={totalCount} />

      {/* Featured Services Section */}
      <section id="protocols" className="py-16 bg-slate-medical scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block bg-sage-green/20 text-sage-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Our Services
            </div>
            <h2 className="text-4xl font-heading font-bold text-charcoal mb-4">
              Professional Acupressure Treatments
            </h2>
            <p className="text-lg text-slate-700 max-w-2xl mx-auto">
              Customized treatment protocols for your specific health concerns.
              Each session combines Traditional Chinese Medicine with modern therapeutic techniques.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {featuredServices.map((service) => (
              <Link
                key={service.id}
                href={`/protocol/${service.slug}`}
                className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-slate-200 hover:border-calm-blue"
              >
                <div className="p-6">
                  {service.status === 'featured' && (
                    <div className="inline-block bg-sage-green/20 text-sage-green-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
                      ⭐ Popular Service
                    </div>
                  )}
                  <h3 className="text-xl font-heading font-bold text-charcoal mb-2 group-hover:text-calm-blue transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-700 mb-4 text-sm">
                    {service.tagline}
                  </p>
                  <div className="flex gap-2 text-xs">
                    <span className="bg-slate-100 px-3 py-1 rounded-full text-slate-700">
                      ⏱️ {service.duration}
                    </span>
                    <span className="bg-slate-100 px-3 py-1 rounded-full text-slate-700">
                      ₹{service.price}
                    </span>
                  </div>
                  <div className="mt-4 text-calm-blue font-semibold flex items-center group-hover:translate-x-1 transition-transform">
                    Learn More →
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/protocols"
              className="inline-flex items-center gap-2 text-calm-blue hover:text-calm-blue-600 font-medium text-lg"
            >
              View all services
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Browse by Symptom - Category Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-charcoal mb-4">
              What Brings You Here Today?
            </h2>
            <p className="text-lg text-slate-700 max-w-2xl mx-auto">
              Find relief for your specific symptoms with guided services
            </p>
          </div>

          {/* Symptom Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {symptomCategories.map((category) => (
              <Link
                key={category.value}
                href={`/protocols?category=${category.value}`}
                className="group"
              >
                <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-6 hover:border-calm-blue hover:shadow-lg hover:bg-white transition-all h-full flex flex-col">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="text-xl font-heading font-semibold text-charcoal mb-2 group-hover:text-calm-blue transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-slate-700 grow">
                    {category.description}
                  </p>
                  <div className="mt-4 text-calm-blue font-medium flex items-center group-hover:translate-x-1 transition-transform">
                    Explore services →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Help */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/protocol/insomnia-treatment" className="px-4 py-2 rounded-full border-2 border-calm-blue text-calm-blue hover:bg-calm-blue hover:text-white font-semibold transition-colors">Can't Sleep</Link>
            <Link href="/protocol/tech-neck-relief" className="px-4 py-2 rounded-full border-2 border-sage-green text-sage-green-700 hover:bg-sage-green hover:text-white font-semibold transition-colors">Neck & Shoulder Pain</Link>
            <Link href="/protocol/anxiety-relief" className="px-4 py-2 rounded-full border-2 border-deep-teal text-deep-teal hover:bg-deep-teal hover:text-white font-semibold transition-colors">Stress & Anxiety</Link>
            <Link href="/protocol/migraine-relief" className="px-4 py-2 rounded-full border-2 border-warm-coral text-warm-coral hover:bg-warm-coral hover:text-white font-semibold transition-colors">Headache/Migraine</Link>
            <Link href="/protocol/digestive-support" className="px-4 py-2 rounded-full border-2 border-amber-400 text-amber-700 hover:bg-amber-400 hover:text-white font-semibold transition-colors">Bloating/IBS</Link>
          </div>
        </div>
      </section>

      {/* Featured Points - Commented out until pressure point library is added */}
      {/* <section className="py-16 bg-slate-medical">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-charcoal mb-4">
              Essential Pressure Points
            </h2>
            <p className="text-lg text-slate-gray max-w-2xl mx-auto">
              Master these foundational points for everyday relief
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {featuredPoses.slice(0, 6).map((pose) => (
              <PoseCard key={pose._id} pose={pose} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/points"
              className="inline-flex items-center gap-2 text-calm-blue hover:text-calm-blue-600 font-medium text-lg"
            >
              Explore all pressure points
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section> */}

      {/* Science CTA */}
      <section id="science" className="py-16 bg-white scroll-mt-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-4xl font-heading font-bold text-charcoal mb-4">
            How Does Pressing a Point Stop Pain?
          </h2>
          <p className="text-lg text-slate-700 mb-8">
            Learn the science behind acupressure—from Gate Control Theory to fascia research.
            Evidence-based education grounded in both TCM wisdom and modern neuroscience.
          </p>
          <Link
            href="/science#yin-yang"
            className="inline-block px-8 py-4 border-2 border-deep-teal text-deep-teal hover:bg-deep-teal hover:text-white
                       font-semibold text-lg rounded-lg transition-colors shadow-lg"
          >
            Explore Yin–Yang Basics →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-charcoal py-12 border-t border-slate-200">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-heading font-bold mb-4 text-deep-teal">Accucentral</h3>
            <p className="text-slate-700 mb-6">
              Pain Relief Through Acupressure
            </p>

            {/* Recommended Reading */}
            <div className="max-w-3xl mx-auto mb-8 border-t border-slate-200 pt-8">
              <h4 className="text-sm font-semibold text-deep-teal uppercase tracking-wide mb-4">
                Evidence-Based Resources
              </h4>
              <p className="text-sm text-slate-700 mb-4">
                Learn more about acupressure and pain science:
              </p>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
                <a
                  href="https://www.acusansthan-ald.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-deep-teal hover:text-deep-teal-600 transition-colors underline decoration-slate-300 hover:decoration-deep-teal"
                >
                  AYUSH Ministry Guidelines
                </a>
                <a
                  href="https://www.amazon.com/Acupressure-Beginners-Guide-Alternative-Healing/dp/0895295733"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-deep-teal hover:text-deep-teal-600 transition-colors underline decoration-slate-300 hover:decoration-deep-teal"
                >
                  Acupressure's Potent Points (Gach)
                </a>
                <a
                  href="https://www.amazon.com/Pain-Story-You-Need-Read/dp/0393355853"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-deep-teal hover:text-deep-teal-600 transition-colors underline decoration-slate-300 hover:decoration-deep-teal"
                >
                  The Pain Story (Moseley & Butler)
                </a>
                <a
                  href="https://www.amazon.com/Body-Keeps-Score-Healing-Trauma/dp/0143127748"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-deep-teal hover:text-deep-teal-600 transition-colors underline decoration-slate-300 hover:decoration-deep-teal"
                >
                  The Body Keeps the Score (van der Kolk)
                </a>
              </div>
            </div>

            <div className="flex justify-center gap-6 text-sm">
              <Link href="/protocols" className="text-deep-teal hover:text-deep-teal-600">
                Browse Services
              </Link>
              <span className="text-slate-400">•</span>
              <Link href="/points" className="text-deep-teal hover:text-deep-teal-600">
                Points
              </Link>
              <span className="text-slate-400">•</span>
              <Link href="/book" className="text-deep-teal hover:text-deep-teal-600">
                Book Consultation
              </Link>
            </div>
            <div className="flex justify-center gap-6 text-sm mt-6">
              <Link href="/about" className="text-slate-700 hover:text-deep-teal">
                About Chandan Accucenter
              </Link>
              <span className="text-slate-400">•</span>
              <Link href="/science" className="text-slate-700 hover:text-deep-teal">
                Science
              </Link>
              <span className="text-slate-400">•</span>
              <Link href="/studio" className="text-slate-700 hover:text-deep-teal">
                Studio
              </Link>
            </div>
            <p className="mt-8 text-sm text-slate-600">
              Built with Next.js • Tailwind CSS • Vercel
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
