import { client } from '@/lib/sanity.client';
import Link from 'next/link';

const PROTOCOLS_QUERY = `*[_type == "protocol" && status in ["published", "featured"]] | order(status desc, _createdAt desc) {
  _id,
  title,
  slug,
  tagline,
  category,
  targetIssue,
  duration,
  difficulty,
  status,
  "poseCount": count(poseSequence),
  benefits
}`;

const categoryColors: Record<string, string> = {
  'stress-anxiety': 'from-purple-500 to-indigo-600',
  'pain-relief': 'from-red-500 to-orange-600',
  'energy': 'from-yellow-500 to-orange-500',
  'sleep': 'from-indigo-600 to-purple-700',
  'flexibility': 'from-green-500 to-teal-500',
  'strength': 'from-blue-600 to-cyan-600',
  'digestion': 'from-amber-500 to-yellow-600',
  'posture': 'from-slate-600 to-gray-700',
};

const categoryLabels: Record<string, string> = {
  'stress-anxiety': 'Stress & Anxiety',
  'pain-relief': 'Pain Relief',
  'energy': 'Energy & Vitality',
  'sleep': 'Sleep & Restoration',
  'flexibility': 'Flexibility & Mobility',
  'strength': 'Strength & Stability',
  'digestion': 'Digestive Health',
  'posture': 'Posture Correction',
};

const difficultyStars: Record<string, string> = {
  beginner: '⭐',
  intermediate: '⭐⭐',
  advanced: '⭐⭐⭐',
  'all-levels': '⭐',
};

export default async function ProtocolsPage() {
  const protocols = await client.fetch(PROTOCOLS_QUERY);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/" className="text-white/80 hover:text-white text-sm mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-5xl font-bold mb-4">Healing Protocols</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Curated sequences designed to address specific health issues. Not just exercise—precision medicine for your body.
          </p>
          <div className="mt-6 flex gap-4 text-sm">
            <div className="bg-white/20 px-4 py-2 rounded-full">
              ✓ Science-backed
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-full">
              ✓ 5-15 minutes
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-full">
              ✓ Results in 7 days
            </div>
          </div>
        </div>
      </div>

      {/* Protocols Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Featured Protocols</h2>
          <p className="text-slate-600">
            Start here—these protocols target the most common issues facing modern humans.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {protocols.map((protocol: any) => (
            <Link
              key={protocol._id}
              href={`/protocol/${protocol.slug.current}`}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-200 hover:border-green-300"
            >
              {/* Category Badge */}
              <div className={`h-2 bg-gradient-to-r ${categoryColors[protocol.category] || 'from-gray-500 to-gray-600'}`} />

              <div className="p-6">
                {/* Status Badge */}
                {protocol.status === 'featured' && (
                  <div className="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    ⭐ Featured
                  </div>
                )}

                {/* Title */}
                <h3 className="text-2xl font-bold mb-2 group-hover:text-green-600 transition-colors">
                  {protocol.title}
                </h3>

                {/* Tagline */}
                <p className="text-slate-600 mb-4 text-sm">
                  {protocol.tagline}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-2 mb-4 text-sm">
                  <span className="bg-slate-100 px-3 py-1 rounded-full text-slate-700">
                    ⏱️ {protocol.duration}
                  </span>
                  <span className="bg-slate-100 px-3 py-1 rounded-full text-slate-700">
                    {difficultyStars[protocol.difficulty]} {protocol.difficulty}
                  </span>
                  <span className="bg-slate-100 px-3 py-1 rounded-full text-slate-700">
                    {protocol.poseCount} poses
                  </span>
                </div>

                {/* Category */}
                <div className="text-xs font-semibold text-slate-500 mb-3 uppercase">
                  {categoryLabels[protocol.category]}
                </div>

                {/* Benefits Preview */}
                <div className="border-t border-slate-200 pt-4 mt-4">
                  <p className="text-xs font-semibold text-slate-500 mb-2">KEY BENEFITS:</p>
                  <ul className="space-y-1">
                    {protocol.benefits?.slice(0, 2).map((benefit: string, idx: number) => (
                      <li key={idx} className="text-sm text-slate-600 flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="line-clamp-1">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  {protocol.benefits?.length > 2 && (
                    <p className="text-xs text-slate-400 mt-2">
                      +{protocol.benefits.length - 2} more benefits
                    </p>
                  )}
                </div>

                {/* CTA */}
                <div className="mt-4 text-green-600 font-semibold flex items-center group-hover:translate-x-1 transition-transform">
                  View Protocol →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {protocols.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-500 text-lg">No protocols found. Check back soon!</p>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-2">Not sure where to start?</h3>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
            Most people begin with "The 5-Minute Morning Flush" or "The 7-Day Cortisol Detox." Both are beginner-friendly and deliver results within a week.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/protocol/5-minute-morning-flush"
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Try Morning Flush
            </Link>
            <Link
              href="/protocol/7-day-cortisol-detox"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Try Cortisol Detox
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
