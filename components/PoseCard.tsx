import Link from 'next/link'
import Image from 'next/image'

interface PoseCardProps {
  pose: {
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
}

const difficultyColors = {
  beginner: 'bg-navy-100 text-navy-600 border border-navy-200',
  intermediate: 'bg-gold-100 text-gold-600 border border-gold-200',
  advanced: 'bg-coral-100 text-coral-600 border border-coral-200',
}

const categoryLabels: Record<string, string> = {
  standing: 'Standing',
  seated: 'Seated',
  backbends: 'Backbend',
  'forward-bends': 'Forward Bend',
  twists: 'Twist',
  inversions: 'Inversion',
  'arm-balances': 'Arm Balance',
  'hip-openers': 'Hip Opener',
  core: 'Core',
  restorative: 'Restorative',
  balancing: 'Balance',
}

export function PoseCard({ pose }: PoseCardProps) {
  return (
    <Link
      href={`/pose/${pose.slug.current}`}
      className="group bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] bg-slate-medical-200">
        {pose.mainImage?.asset?.url ? (
          <Image
            src={pose.mainImage.asset.url}
            alt={pose.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-24 h-24 text-navy-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        )}

        {/* Difficulty Badge */}
        {pose.difficulty && (
          <div className="absolute top-3 right-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                difficultyColors[pose.difficulty as keyof typeof difficultyColors] || 'bg-slate-100 text-slate-700'
              }`}
            >
              {pose.difficulty.charAt(0).toUpperCase() + pose.difficulty.slice(1)}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-heading font-semibold text-navy-500 mb-1 group-hover:text-coral transition-colors">
          {pose.title}
        </h3>

        {pose.sanskritName && (
          <p className="text-sm text-slate-500 italic mb-3">{pose.sanskritName}</p>
        )}

        {/* Meta Info */}
        <div className="flex items-center gap-3 text-sm text-slate-600 mb-3">
          {pose.category && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              {categoryLabels[pose.category] || pose.category}
            </span>
          )}
          {pose.duration && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {pose.duration}
            </span>
          )}
        </div>

        {/* Benefits Preview */}
        {pose.benefits && pose.benefits.length > 0 && (
          <div className="border-t border-slate-200 pt-3">
            <p className="text-sm text-slate-600 line-clamp-2">
              {pose.benefits.slice(0, 2).join(' • ')}
            </p>
          </div>
        )}
      </div>
    </Link>
  )
}
