import Link from 'next/link'
import { client } from '@/lib/sanity.client'
import { SearchHero } from '@/components/SearchHero'
import { PoseCard } from '@/components/PoseCard'
import { ScienceNote } from '@/components/ScienceNote'
import { StickyAssessmentButton } from '@/components/StickyAssessmentButton'

interface YogaPose {
  _id: string
  title: string
  slug: { current: string }
  sanskritName?: string
  category?: string
  difficulty?: string
  duration?: string
  benefits?: string[]
  mainImage?: {
    asset: {
      url: string
    }
  }
}

async function getFeaturedPoses(): Promise<YogaPose[]> {
  const query = `*[_type == "yogaPose" && status == "published"] | order(_createdAt desc) [0...6] {
    _id,
    title,
    slug,
    sanskritName,
    category,
    difficulty,
    duration,
    benefits,
    mainImage {
      asset-> {
        url
      }
    }
  }`

  return client.fetch(query)
}

async function getPoseCount(): Promise<number> {
  const query = `count(*[_type == "yogaPose" && status == "published"])`
  return client.fetch(query)
}

interface Protocol {
  _id: string
  title: string
  slug: { current: string }
  tagline: string
  category: string
  duration: string
  difficulty: string
  status: string
}

async function getFeaturedProtocols(): Promise<Protocol[]> {
  const query = `*[_type == "protocol" && status == "featured"] | order(_createdAt desc) [0...3] {
    _id,
    title,
    slug,
    tagline,
    category,
    duration,
    difficulty,
    status
  }`
  return client.fetch(query)
}

const categories = [
  { name: 'Standing', value: 'standing' },
  { name: 'Seated', value: 'seated' },
  { name: 'Backbends', value: 'backbends' },
  { name: 'Forward Bends', value: 'forward-bends' },
  { name: 'Twists', value: 'twists' },
  { name: 'Inversions', value: 'inversions' },
  { name: 'Arm Balances', value: 'arm-balances' },
  { name: 'Hip Openers', value: 'hip-openers' },
  { name: 'Core', value: 'core' },
  { name: 'Restorative', value: 'restorative' },
  { name: 'Balancing', value: 'balancing' },
]

export default async function Home() {
  const [featuredPoses, totalCount, featuredProtocols] = await Promise.all([
    getFeaturedPoses(),
    getPoseCount(),
    getFeaturedProtocols(),
  ])

  return (
    <div className="min-h-screen bg-slate-medical">
      {/* Sticky Assessment Button */}
      <StickyAssessmentButton />

      {/* Header */}
      <header className="bg-slate-medical border-b border-slate-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-heading font-bold text-navy-500">
              VrikshaYoga
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/protocols" className="text-slate-600 hover:text-navy-500 font-semibold">
                Protocols
              </Link>
              <Link href="/poses" className="text-slate-600 hover:text-navy-500">
                Poses
              </Link>
              <Link href="/science" className="text-slate-600 hover:text-navy-500">
                Science
              </Link>
              <Link href="/about" className="text-slate-600 hover:text-navy-500">
                About
              </Link>
              <Link href="/assessment" className="px-4 py-2 bg-coral text-white rounded-lg hover:bg-coral-500 transition font-semibold">
                Take Assessment
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section with Search */}
      <SearchHero totalCount={totalCount} />

      {/* Featured Protocols Section - The Clinic Model */}
      <section id="protocols" className="py-16 bg-white scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block bg-gold-300/20 text-gold-300 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              The Clinic Model
            </div>
            <h2 className="text-4xl font-heading font-bold text-navy-500 mb-4">
              Healing Protocols
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Not just poses—curated sequences designed to solve specific health issues.
              This is how we differ from the "gym" approach.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {featuredProtocols.map((protocol) => (
              <Link
                key={protocol._id}
                href={`/protocol/${protocol.slug.current}`}
                className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-navy-200 hover:border-gold-300"
              >
                <div className="p-6">
                  {protocol.status === 'featured' && (
                    <div className="inline-block bg-gold-300/20 text-gold-300 text-xs font-bold px-3 py-1 rounded-full mb-3">
                      ⭐ Featured
                    </div>
                  )}
                  <h3 className="text-xl font-heading font-bold text-navy-500 mb-2 group-hover:text-coral transition-colors">
                    {protocol.title}
                  </h3>
                  <p className="text-slate-600 mb-4 text-sm">
                    {protocol.tagline}
                  </p>
                  <div className="flex gap-2 text-xs">
                    <span className="bg-slate-100 px-3 py-1 rounded-full text-slate-700">
                      ⏱️ {protocol.duration}
                    </span>
                    <span className="bg-slate-100 px-3 py-1 rounded-full text-slate-700 capitalize">
                      {protocol.difficulty}
                    </span>
                  </div>
                  <div className="mt-4 text-coral font-semibold flex items-center group-hover:translate-x-1 transition-transform">
                    Start Protocol →
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/protocols"
              className="inline-flex items-center gap-2 text-coral hover:text-coral-500 font-medium"
            >
              View all protocols
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Explore Our Library - Unified Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-navy-500 mb-4">
              Explore Our Library
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Browse {totalCount}+ poses by category or explore our featured selections
            </p>
          </div>

          {/* Categories Grid */}
          <div className="mb-16">
            <h3 className="text-2xl font-heading font-bold text-navy-500 mb-6">Browse by Category</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((category) => (
                <Link
                  key={category.value}
                  href={`/poses?category=${category.value}`}
                  className="group"
                >
                  <div className="bg-slate-50 border-2 border-navy-200 rounded-xl p-6 text-center hover:border-gold-300 hover:shadow-md hover:bg-white transition-all">
                    <h4 className="text-navy-500 font-heading font-semibold text-lg">{category.name}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Featured Poses */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-heading font-bold text-navy-500">Featured Poses</h3>
              <Link
                href="/poses"
                className="text-coral hover:text-coral-500 font-medium flex items-center gap-2"
              >
                View all {totalCount} poses
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPoses.map((pose) => (
                <PoseCard key={pose._id} pose={pose} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Science CTA */}
      <section id="science" className="py-16 bg-slate-medical scroll-mt-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl font-heading font-bold text-navy-500 mb-4">
            Want to Dive Deeper into the Biology?
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Learn how chronic stress rewires your nervous system—and how yoga regulates it back. 
            Evidence-based education for the skeptical mind.
          </p>
          <Link
            href="/science"
            className="inline-block px-8 py-4 bg-navy-500 hover:bg-navy-600
                       text-white font-semibold text-lg rounded-lg
                       transition-colors"
          >
            Explore the Science →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-500 text-slate-medical py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-heading font-bold mb-4">VrikshaYoga</h3>
            <p className="text-slate-300 mb-6">
              Your comprehensive guide to yoga poses and practice
            </p>

            {/* Recommended Reading */}
            <div className="max-w-3xl mx-auto mb-8 border-t border-slate-400/30 pt-8">
              <h4 className="text-sm font-semibold text-gold-300 uppercase tracking-wide mb-4">
                Recommended Reading
              </h4>
              <p className="text-sm text-slate-300 mb-4">
                The science behind the practice:
              </p>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
                <a 
                  href="https://www.amazon.com/Why-Zebras-Dont-Ulcers-Third/dp/0805073698" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-200 hover:text-gold-200 transition-colors underline decoration-slate-400 hover:decoration-gold-200"
                >
                  Why Zebras Don't Get Ulcers (Sapolsky)
                </a>
                <a 
                  href="https://www.amazon.com/Dopamine-Nation-Finding-Balance-Indulgence/dp/152474672X" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-200 hover:text-gold-200 transition-colors underline decoration-slate-400 hover:decoration-gold-200"
                >
                  Dopamine Nation (Lembke)
                </a>
                <a 
                  href="https://www.amazon.com/Myth-Normal-Illness-Toxic-Culture/dp/0593083881" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-200 hover:text-gold-200 transition-colors underline decoration-slate-400 hover:decoration-gold-200"
                >
                  The Myth of Normal (Maté)
                </a>
                <a 
                  href="https://www.amazon.com/Breath-New-Science-Lost-Art/dp/0735213615" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-200 hover:text-gold-200 transition-colors underline decoration-slate-400 hover:decoration-gold-200"
                >
                  Breath (Nestor)
                </a>
                <a 
                  href="https://www.amazon.com/Body-Keeps-Score-Healing-Trauma/dp/0143127748" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-200 hover:text-gold-200 transition-colors underline decoration-slate-400 hover:decoration-gold-200"
                >
                  The Body Keeps the Score (van der Kolk)
                </a>
              </div>
            </div>

            <div className="flex justify-center gap-6 text-sm">
              <Link href="/poses" className="text-gold-300 hover:text-gold-200">
                Browse Poses
              </Link>
              <span className="text-slate-400">•</span>
              <Link href="/studio" className="text-gold-300 hover:text-gold-200">
                Studio
              </Link>
            </div>
            <div className="flex justify-center gap-6 text-sm mt-6">
              <Link href="/about" className="text-slate-300 hover:text-gold-200">
                About
              </Link>
              <span className="text-slate-400">•</span>
              <Link href="/science" className="text-slate-300 hover:text-gold-200">
                Science
              </Link>
              <span className="text-slate-400">•</span>
              <Link href="/programs" className="text-slate-300 hover:text-gold-200">
                Programs
              </Link>
            </div>
            <p className="mt-8 text-sm text-slate-400">
              Built with Next.js • Sanity CMS • AWS Amplify
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
