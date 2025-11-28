import { client } from '@/lib/sanity.client'
import Link from 'next/link'
import { PoseFilters } from '@/components/PoseFilters'
import { PosesClient } from '@/components/PosesClient'

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

interface SearchParams {
  category?: string
  difficulty?: string
  search?: string
}

async function getPoses(searchParams: SearchParams): Promise<YogaPose[]> {
  const conditions = ['_type == "yogaPose"', 'status == "published"']

  // Add filters
  if (searchParams.category) {
    conditions.push(`category == "${searchParams.category}"`)
  }
  if (searchParams.difficulty) {
    conditions.push(`difficulty == "${searchParams.difficulty}"`)
  }
  if (searchParams.search) {
    conditions.push(`(title match "${searchParams.search}*" || sanskritName match "${searchParams.search}*")`)
  }

  const query = `*[${conditions.join(' && ')}] | order(title asc) {
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

  console.log('GROQ Query:', query)
  console.log('Search Params:', searchParams)
  
  const result = await client.fetch(query)
  console.log('Result count:', result?.length || 0)
  
  return result || []
}

export default async function PosesPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams
  const poses = await getPoses(params) || []

  return (
    <div className="min-h-screen bg-slate-medical">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-heading font-bold text-navy-500">
              VrikshaYoga
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/poses" className="text-coral font-medium">
                Browse Poses
              </Link>
              <Link href="/studio" className="text-slate-600 hover:text-navy-500">
                Studio
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-slate-medical py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-navy-500 mb-4">
            Yoga Pose Library
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Explore our professionally curated yoga poses with detailed instructions,
            safety guidance, and anatomical insights.
          </p>
        </div>
      </section>

      {/* Filters */}
      <PoseFilters currentParams={params} totalCount={poses?.length ?? 0} />

      {/* Pose Grid */}
      <section className="container mx-auto px-4 py-12">
        <PosesClient poses={poses} />
      </section>
    </div>
  )
}
