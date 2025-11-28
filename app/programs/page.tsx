import Link from 'next/link'
import { client } from '@/lib/sanity.client'
import Image from 'next/image'

interface Program {
  _id: string
  title: string
  slug: { current: string }
  description?: string
  duration: number
  targetProfile?: string
  difficulty?: string
  mainImage?: {
    asset: {
      url: string
    }
  }
}

async function getPrograms(): Promise<Program[]> {
  const query = `*[_type == "program" && status == "published"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    description,
    duration,
    targetProfile,
    difficulty,
    mainImage {
      asset-> {
        url
      }
    }
  }`

  return client.fetch(query)
}

const profileInfo: Record<string, { icon: string, color: string, label: string }> = {
  'spiker': { icon: '🔥', color: 'coral', label: 'The Spiker' },
  'flatliner': { icon: '😴', color: 'slate-400', label: 'The Flatliner' },
  'night-owl': { icon: '🌙', color: 'navy-400', label: 'The Night Owl' },
  'all': { icon: '✨', color: 'gold-300', label: 'All Profiles' },
}

export default async function ProgramsPage() {
  const programs = await getPrograms()

  return (
    <div className="min-h-screen bg-slate-medical">
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

      {/* Hero */}
      <section className="bg-slate-medical py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-navy-500 mb-6">
            Curated Programs
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Multi-day journeys designed to regulate your nervous system. Not random workouts—precision protocols 
            for biological healing.
          </p>
          <div className="flex justify-center gap-4 text-sm flex-wrap">
            <span className="px-4 py-2 bg-white border border-gold-300/30 rounded-full text-slate-600">
              ✓ Science-backed sequences
            </span>
            <span className="px-4 py-2 bg-white border border-gold-300/30 rounded-full text-slate-600">
              ✓ Track your progress
            </span>
            <span className="px-4 py-2 bg-white border border-gold-300/30 rounded-full text-slate-600">
              ✓ 100% free
            </span>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {programs.length === 0 ? (
            <div className="max-w-2xl mx-auto text-center py-16">
              <div className="text-6xl mb-6">📅</div>
              <h2 className="text-3xl font-heading font-bold text-navy-500 mb-4">
                Programs Coming Soon
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                We're building curated multi-day programs tailored to your cortisol profile. Check back soon!
              </p>
              <div className="bg-gold-300/10 border border-gold-300/30 rounded-xl p-6 text-left">
                <h3 className="font-heading font-semibold text-navy-500 mb-3">Upcoming Programs:</h3>
                <ul className="space-y-4 text-slate-600">
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">🔥</span>
                    <div>
                      <strong className="text-navy-500">The 7-Day Cortisol Detox</strong>
                      <p className="text-sm">For Flatliners: Gentle restoration to reboot your exhausted nervous system</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">💼</span>
                    <div>
                      <strong className="text-navy-500">The Executive Reset</strong>
                      <p className="text-sm">For Spikers: High intensity to burn stress, followed by deep rest</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">🌙</span>
                    <div>
                      <strong className="text-navy-500">The Sleep Protocol</strong>
                      <p className="text-sm">For Night Owls: Evening wind-down sequences to reverse your cortisol curve</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="mt-8 flex gap-4 justify-center flex-wrap">
                <Link
                  href="/assessment"
                  className="inline-block px-6 py-3 bg-coral hover:bg-coral-500 text-white font-semibold rounded-lg transition-colors"
                >
                  Take Assessment First →
                </Link>
                <Link
                  href="/poses"
                  className="inline-block px-6 py-3 bg-navy-500 hover:bg-navy-600 text-white font-semibold rounded-lg transition-colors"
                >
                  Explore Poses →
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {programs.map((program) => {
                const profile = profileInfo[program.targetProfile || 'all']
                return (
                  <Link
                    key={program._id}
                    href={`/programs/${program.slug.current}`}
                    className="group"
                  >
                    <div className="bg-white rounded-xl overflow-hidden border-2 border-slate-200 hover:border-gold-300 transition-all shadow-sm hover:shadow-md h-full flex flex-col">
                      {program.mainImage?.asset?.url && (
                        <div className="relative h-48 bg-slate-100">
                          <Image
                            src={program.mainImage.asset.url}
                            alt={program.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-2xl">{profile.icon}</span>
                          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                            {profile.label}
                          </span>
                        </div>
                        <h2 className="text-2xl font-heading font-bold text-navy-500 mb-3 group-hover:text-coral transition-colors">
                          {program.title}
                        </h2>
                        {program.description && (
                          <p className="text-slate-600 mb-4 line-clamp-3 flex-1">
                            {program.description}
                          </p>
                        )}
                        <div className="flex gap-3 text-sm text-slate-600 mb-4">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {program.duration} days
                          </span>
                          {program.difficulty && (
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                              {program.difficulty}
                            </span>
                          )}
                        </div>
                        <div className="text-coral font-medium text-sm flex items-center gap-2">
                          View program
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Not Sure CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl font-heading font-bold text-navy-500 mb-4">
            Not Sure Which Program to Start?
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Take our 2-minute cortisol assessment to discover your stress profile and get personalized program recommendations.
          </p>
          <Link
            href="/assessment"
            className="inline-block px-8 py-4 bg-coral hover:bg-coral-500 text-white font-semibold text-lg rounded-lg transition-colors"
          >
            Take the Assessment →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-500 text-slate-medical py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-heading font-bold mb-4">VrikshaYoga</h3>
            <p className="text-slate-300 mb-6">
              Regulate your nervous system, not just your hamstrings
            </p>
            <div className="flex justify-center gap-6 text-sm flex-wrap">
              <Link href="/protocols" className="text-gold-300 hover:text-gold-200">
                Protocols
              </Link>
              <span className="text-slate-400">•</span>
              <Link href="/poses" className="text-gold-300 hover:text-gold-200">
                Poses
              </Link>
              <span className="text-slate-400">•</span>
              <Link href="/science" className="text-gold-300 hover:text-gold-200">
                Science
              </Link>
              <span className="text-slate-400">•</span>
              <Link href="/about" className="text-gold-300 hover:text-gold-200">
                About
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
