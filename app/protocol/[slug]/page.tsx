import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getServiceBySlug, categoryColors, categoryLabels, complexityLabels } from '@/data/services';

export default async function ProtocolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-linear-to-b from-white to-slate-50">
      {/* Hero Section */}
      <div className={`bg-linear-to-r ${categoryColors[service.category]} text-white py-12`}>
        <div className="max-w-5xl mx-auto px-4">
          <Link href="/protocols" className="text-white/80 hover:text-white text-sm mb-4 inline-block">
            ← Back to Services
          </Link>

          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">{service.title}</h1>
              <p className="text-xl text-white/90 mb-4">{service.tagline}</p>
            </div>
            {service.status === 'featured' && (
              <div className="bg-sage-green text-deep-teal px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap">
                ⭐ Popular Service
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3 text-sm">
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              ⏱️ {service.duration} session
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              {complexityLabels[service.complexity]}
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              {service.pressurePoints.length} pressure points
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              📋 {categoryLabels[service.category]}
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
            <section className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-3xl">🎯</span>
                About This Service
              </h2>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-700">{service.description}</p>
              </div>
              <div className="mt-4 p-4 bg-calm-blue/10 rounded-lg border border-calm-blue/30">
                <p className="text-sm font-semibold text-deep-teal">
                  <strong>Targets:</strong> {service.targetIssue}
                </p>
              </div>
            </section>

            {/* The Science */}
            <section className="bg-linear-to-br from-sage-green/10 to-calm-blue/10 rounded-xl shadow-md p-6 border border-sage-green/30">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-3xl">🧬</span>
                The Science & Mechanism
              </h2>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-700">{service.science}</p>
              </div>
            </section>

            {/* Treatment Sequence */}
            <section className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="text-3xl">💆</span>
                Treatment Sequence
              </h2>

              <div className="space-y-6">
                {service.pressurePoints.map((point, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-calm-blue transition-colors"
                  >
                    {/* Step Number */}
                    <div className="shrink-0">
                      <div className="w-10 h-10 bg-linear-to-br from-deep-teal to-calm-blue text-white rounded-full flex items-center justify-center font-bold">
                        {idx + 1}
                      </div>
                    </div>

                    {/* Point Info */}
                    <div className="grow">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-deep-teal">
                            {point.name}
                          </h3>
                          <p className="text-sm text-slate-500 italic font-mono">
                            {point.code}
                          </p>
                        </div>
                        <div className="text-sm font-semibold text-slate-700 bg-white px-3 py-1 rounded-full whitespace-nowrap">
                          {point.duration}
                        </div>
                      </div>

                      {/* Instructions */}
                      <p className="text-slate-700 text-sm">
                        {point.instructions}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Time */}
              <div className="mt-6 p-4 bg-linear-to-r from-sage-green/20 to-calm-blue/20 rounded-lg text-center border border-sage-green/30">
                <p className="text-sm font-semibold text-slate-700">
                  Session Duration: <span className="text-deep-teal text-lg">{service.duration}</span>
                </p>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Expected Outcomes */}
            <div className="bg-sage-green/10 border border-sage-green/30 rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-lg mb-4 text-deep-teal">✓ Expected Outcomes</h3>
              <ul className="space-y-2">
                {service.outcomes.map((outcome, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="text-sage-green mt-0.5">✓</span>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ideal For */}
            <div className="bg-calm-blue/10 border border-calm-blue/30 rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-lg mb-4 text-deep-teal">👤 Ideal For</h3>
              <ul className="space-y-2">
                {service.idealFor.map((person, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="text-calm-blue mt-0.5">•</span>
                    <span>{person}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Frequency */}
            <div className="bg-deep-teal/10 border border-deep-teal/30 rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-lg mb-2 text-deep-teal">🔁 Recommended Frequency</h3>
              <p className="text-sm text-slate-700">{service.frequency}</p>
            </div>

            {/* Treatment Tips */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-lg mb-4 text-amber-900">💡 Treatment Tips</h3>
              <ul className="space-y-2">
                {service.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-amber-900">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contraindications */}
            {service.contraindications.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 shadow-md">
                <h3 className="font-bold text-lg mb-4 text-red-900">⚠️ Precautions</h3>
                <ul className="space-y-2">
                  {service.contraindications.map((warning, idx) => (
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
        <div className="mt-12 bg-linear-to-r from-deep-teal to-calm-blue text-white rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-3">Ready to Book This Service?</h3>
          <p className="mb-6 text-white/90 max-w-2xl mx-auto">
            Schedule a {service.duration} session with Chandan to experience professional acupressure treatment.
            Personalized care tailored to your specific needs.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/book"
              className="bg-warm-coral text-white px-6 py-3 rounded-lg font-semibold hover:bg-warm-coral/90 transition-colors shadow-lg"
            >
              Book This Session
            </Link>
            <Link
              href="/protocols"
              className="bg-white text-deep-teal px-6 py-3 rounded-lg font-semibold hover:bg-slate-50 transition-colors border border-white shadow-md"
            >
              View All Services
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
