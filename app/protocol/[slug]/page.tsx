import { client } from '@/lib/sanity.client';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const PROTOCOL_QUERY = `*[_type == "protocol" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  tagline,
  category,
  targetIssue,
  duration,
  difficulty,
  frequency,
  introduction,
  poseSequence[] {
    _key,
    pose->{
      _id,
      title,
      slug,
      sanskritName,
      mainImage,
      difficulty,
      category
    },
    duration,
    instructions,
    transitionNote
  },
  benefits,
  scienceExplainer,
  bestPracticedWhen,
  contraindications,
  tips,
  status
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

export default async function ProtocolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const protocol = await client.fetch(PROTOCOL_QUERY, { slug });

  if (!protocol) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Hero Section */}
      <div className={`bg-gradient-to-r ${categoryColors[protocol.category]} text-white py-12`}>
        <div className="max-w-5xl mx-auto px-4">
          <Link href="/protocols" className="text-white/80 hover:text-white text-sm mb-4 inline-block">
            ← Back to Protocols
          </Link>

          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">{protocol.title}</h1>
              <p className="text-xl text-white/90 mb-4">{protocol.tagline}</p>
            </div>
            {protocol.status === 'featured' && (
              <div className="bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap">
                ⭐ Featured
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3 text-sm">
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              ⏱️ {protocol.duration}
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              {difficultyStars[protocol.difficulty]} {protocol.difficulty}
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              {protocol.poseSequence.length} poses
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              📋 {categoryLabels[protocol.category]}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Introduction */}
            {protocol.introduction && (
              <section className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-3xl">🎯</span>
                  What This Protocol Does
                </h2>
                <div className="prose prose-slate max-w-none">
                  <PortableText value={protocol.introduction} />
                </div>
                {protocol.targetIssue && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm font-semibold text-blue-900">
                      <strong>Targets:</strong> {protocol.targetIssue}
                    </p>
                  </div>
                )}
              </section>
            )}

            {/* The Science */}
            {protocol.scienceExplainer && (
              <section className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl shadow-md p-6 border border-purple-200">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-3xl">🧬</span>
                  The Science
                </h2>
                <div className="prose prose-slate max-w-none">
                  <PortableText value={protocol.scienceExplainer} />
                </div>
              </section>
            )}

            {/* Pose Sequence */}
            <section className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="text-3xl">🧘</span>
                The Sequence
              </h2>

              <div className="space-y-6">
                {protocol.poseSequence.map((step: any, idx: number) => (
                  <div
                    key={step._key}
                    className="flex gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-green-300 transition-colors"
                  >
                    {/* Step Number */}
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                        {idx + 1}
                      </div>
                    </div>

                    {/* Pose Info */}
                    <div className="flex-grow">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <Link
                            href={`/pose/${step.pose.slug.current}`}
                            className="text-lg font-bold text-green-600 hover:text-green-700 hover:underline"
                          >
                            {step.pose.title}
                          </Link>
                          {step.pose.sanskritName && (
                            <p className="text-sm text-slate-500 italic">
                              {step.pose.sanskritName}
                            </p>
                          )}
                        </div>
                        <div className="text-sm font-semibold text-slate-700 bg-white px-3 py-1 rounded-full whitespace-nowrap">
                          {step.duration}
                        </div>
                      </div>

                      {/* Instructions */}
                      <p className="text-slate-700 text-sm mb-2">
                        {step.instructions}
                      </p>

                      {/* Transition */}
                      {step.transitionNote && (
                        <p className="text-xs text-slate-500 italic">
                          ↪ {step.transitionNote}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Time */}
              <div className="mt-6 p-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg text-center">
                <p className="text-sm font-semibold text-slate-700">
                  Total Practice Time: <span className="text-green-700 text-lg">{protocol.duration}</span>
                </p>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Benefits */}
            {protocol.benefits && protocol.benefits.length > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 shadow-md">
                <h3 className="font-bold text-lg mb-4 text-green-900">✓ Key Benefits</h3>
                <ul className="space-y-2">
                  {protocol.benefits.map((benefit: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-green-900">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Best Practiced When */}
            {protocol.bestPracticedWhen && protocol.bestPracticedWhen.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 shadow-md">
                <h3 className="font-bold text-lg mb-4 text-blue-900">⏰ Best Practiced When</h3>
                <ul className="space-y-2">
                  {protocol.bestPracticedWhen.map((time: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-blue-900">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>{time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Frequency */}
            {protocol.frequency && (
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 shadow-md">
                <h3 className="font-bold text-lg mb-2 text-purple-900">🔁 Frequency</h3>
                <p className="text-sm text-purple-900">{protocol.frequency}</p>
              </div>
            )}

            {/* Pro Tips */}
            {protocol.tips && protocol.tips.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 shadow-md">
                <h3 className="font-bold text-lg mb-4 text-yellow-900">💡 Pro Tips</h3>
                <ul className="space-y-2">
                  {protocol.tips.map((tip: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-yellow-900">
                      <span className="text-yellow-600 mt-0.5">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Contraindications */}
            {protocol.contraindications && protocol.contraindications.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 shadow-md">
                <h3 className="font-bold text-lg mb-4 text-red-900">⚠️ Cautions</h3>
                <ul className="space-y-2">
                  {protocol.contraindications.map((warning: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-red-900">
                      <span className="text-red-600 mt-0.5">!</span>
                      <span>{warning}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-3">Ready to Start?</h3>
          <p className="mb-6 text-white/90 max-w-2xl mx-auto">
            Set aside {protocol.duration}, find a quiet space, and follow the sequence above.
            Remember: consistency beats intensity.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/protocols"
              className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
            >
              Browse More Protocols
            </Link>
            <Link
              href="/poses"
              className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors border border-white/40"
            >
              Explore All Poses
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
