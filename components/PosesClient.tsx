'use client'

import { PoseCard } from './PoseCard'

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

interface PosesClientProps {
  poses: YogaPose[]
}

export function PosesClient({ poses }: PosesClientProps) {
  if (!poses || poses.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-slate-500">No poses found matching your filters.</p>
        <a
          href="/poses"
          className="mt-4 inline-block text-coral hover:text-coral-500 font-medium"
        >
          Clear filters
        </a>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {poses.map((pose) => (
        <PoseCard key={pose._id} pose={pose} />
      ))}
    </div>
  )
}
