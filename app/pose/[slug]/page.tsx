import { client } from '@/lib/sanity.client'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface YogaPose {
  _id: string
  title: string
  slug: { current: string }
  sanskritName?: string
  category?: string
  difficulty?: string
  duration?: string
  benefits?: string[]
  contraindications?: string[]
  musclesWorked?: string[]
  body?: any[]
  mainImage?: {
    asset: {
      url: string
    }
  }
  relatedPoses?: Array<{
    _id: string
    title: string
    slug: { current: string }
    difficulty?: string
  }>
}

async function getPose(slug: string): Promise<YogaPose | null> {
  const query = `*[_type == "yogaPose" && slug.current == $slug && status == "published"][0] {
    _id,
    title,
    slug,
    sanskritName,
    category,
    difficulty,
    duration,
    benefits,
    contraindications,
    musclesWorked,
    body,
    mainImage {
      asset-> {
        url
      }
    },
    relatedPoses[]-> {
      _id,
      title,
      slug,
      difficulty
    }
  }`

  return client.fetch(query, { slug })
}

const difficultyStars: Record<string, string> = {
  beginner: '⭐',
  intermediate: '⭐⭐',
  advanced: '⭐⭐⭐',
}

const categoryLabels: Record<string, string> = {
  standing: 'Standing Pose',
  seated: 'Seated Pose',
  backbends: 'Backbend',
  'forward-bends': 'Forward Bend',
  twists: 'Twist',
  inversions: 'Inversion',
  'arm-balances': 'Arm Balance',
  'hip-openers': 'Hip Opener',
  core: 'Core Strengthening',
  restorative: 'Restorative',
  balancing: 'Balance Pose',
}

export default async function PosePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const pose = await getPose(slug)

  if (!pose) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-slate-medical">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-heading font-bold text-navy-500">
              VrikshaYoga
            </Link>
            <nav className="flex items-center gap-6">
              <Link
                href="/poses"
                className="text-slate-600 hover:text-navy-500 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Library
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-slate-medical py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                {pose.difficulty && (
                  <span className="text-2xl" title={pose.difficulty}>
                    {difficultyStars[pose.difficulty]}
                  </span>
                )}
                {pose.category && (
                  <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-navy-500 border border-slate-200">
                    {categoryLabels[pose.category] || pose.category}
                  </span>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-heading font-bold text-navy-500 mb-3">
                {pose.title}
              </h1>

              {pose.sanskritName && (
                <p className="text-2xl text-slate-600 italic mb-6">{pose.sanskritName}</p>
              )}

              {pose.duration && (
                <div className="flex items-center gap-2 text-slate-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">{pose.duration}</span>
                </div>
              )}
            </div>

            {/* Image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-slate-100">
              {pose.mainImage?.asset?.url ? (
                <Image
                  src={pose.mainImage.asset.url}
                  alt={pose.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-9xl">
                  🧘
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content Column */}
          <div className="lg:col-span-2">
            {/* Step-by-Step Instructions */}
            {pose.body && pose.body.length > 0 && (
              <div className="prose prose-lg max-w-none mb-12">
                <PortableText value={pose.body} />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Benefits */}
            {pose.benefits && pose.benefits.length > 0 && (
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <h3 className="text-xl font-heading font-semibold text-navy-500 mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Key Benefits
                </h3>
                <ul className="space-y-2">
                  {pose.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2 text-slate-700">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Contraindications */}
            {pose.contraindications && pose.contraindications.length > 0 && (
              <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                <h3 className="text-xl font-heading font-semibold text-navy-500 mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Cautions
                </h3>
                <ul className="space-y-2">
                  {pose.contraindications.map((caution, index) => (
                    <li key={index} className="flex items-start gap-2 text-slate-700">
                      <span className="text-red-600 mt-1">⚠</span>
                      <span>{caution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Muscles Worked */}
            {pose.musclesWorked && pose.musclesWorked.length > 0 && (
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-xl font-heading font-semibold text-navy-500 mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Muscles Worked
                </h3>
                <div className="flex flex-wrap gap-2">
                  {pose.musclesWorked.map((muscle, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                    >
                      {muscle}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Poses */}
        {pose.relatedPoses && pose.relatedPoses.length > 0 && (
          <div className="mt-16 pt-12 border-t border-slate-200">
            <h2 className="text-3xl font-heading font-bold text-navy-500 mb-8">Related Poses</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pose.relatedPoses.map((relatedPose) => (
                <Link
                  key={relatedPose._id}
                  href={`/pose/${relatedPose.slug.current}`}
                  className="group p-6 bg-white rounded-lg border border-slate-200 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-lg font-heading font-semibold text-navy-500 group-hover:text-coral mb-2">
                    {relatedPose.title}
                  </h3>
                  {relatedPose.difficulty && (
                    <span className="text-sm text-slate-600">
                      {difficultyStars[relatedPose.difficulty]} {relatedPose.difficulty}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
