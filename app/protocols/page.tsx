import Link from 'next/link';
import { getPublishedServices, categoryColors, categoryLabels, complexityLabels } from '@/data/services';

export default function ProtocolsPage() {
  const services = getPublishedServices();

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-deep-teal to-calm-blue text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/" className="text-white/80 hover:text-white text-sm mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Professional acupressure treatments designed to address your specific health concerns. Evidence-based protocols combining Traditional Chinese Medicine with modern science.
          </p>
          <div className="mt-6 flex gap-4 text-sm flex-wrap">
            <div className="bg-white/20 px-4 py-2 rounded-full">
              ✓ Personalized Treatment
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-full">
              ✓ 30-60 minute sessions
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-full">
              ✓ Expert Practitioner
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Treatment Offerings</h2>
          <p className="text-slate-600">
            Professional acupressure services tailored to your needs. Each session is customized to target your specific symptoms and health goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/protocol/${service.slug}`}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-200 hover:border-calm-blue"
            >
              {/* Category Badge */}
              <div className={`h-2 bg-gradient-to-r ${categoryColors[service.category] || 'from-gray-500 to-gray-600'}`} />

              <div className="p-6">
                {/* Status Badge */}
                {service.status === 'featured' && (
                  <div className="inline-block bg-sage-green/20 text-deep-teal text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    ⭐ Popular Service
                  </div>
                )}

                {/* Title */}
                <h3 className="text-2xl font-bold mb-2 group-hover:text-calm-blue transition-colors">
                  {service.title}
                </h3>

                {/* Tagline */}
                <p className="text-slate-600 mb-4 text-sm">
                  {service.tagline}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-2 mb-4 text-sm">
                  <span className="bg-slate-100 px-3 py-1 rounded-full text-slate-700">
                    ⏱️ {service.duration}
                  </span>
                  <span className="bg-calm-blue/10 px-3 py-1 rounded-full text-deep-teal font-medium">
                    {complexityLabels[service.complexity]}
                  </span>
                  <span className="bg-slate-100 px-3 py-1 rounded-full text-slate-700">
                    {service.pressurePoints.length} points
                  </span>
                </div>

                {/* Category */}
                <div className="text-xs font-semibold text-slate-500 mb-3 uppercase">
                  {categoryLabels[service.category]}
                </div>

                {/* Benefits Preview */}
                <div className="border-t border-slate-200 pt-4 mt-4">
                  <p className="text-xs font-semibold text-slate-500 mb-2">EXPECTED OUTCOMES:</p>
                  <ul className="space-y-1">
                    {service.outcomes.slice(0, 2).map((outcome, idx) => (
                      <li key={idx} className="text-sm text-slate-600 flex items-start">
                        <span className="text-sage-green mr-2">✓</span>
                        <span className="line-clamp-1">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                  {service.outcomes.length > 2 && (
                    <p className="text-xs text-slate-400 mt-2">
                      +{service.outcomes.length - 2} more outcomes
                    </p>
                  )}
                </div>

                {/* CTA */}
                <div className="mt-4 text-calm-blue font-semibold flex items-center group-hover:translate-x-1 transition-transform">
                  Learn More →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {services.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-500 text-lg">Services coming soon. Contact us for availability!</p>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 bg-gradient-to-r from-sage-green/20 to-calm-blue/20 rounded-2xl p-8 text-center border border-sage-green/30">
          <h3 className="text-2xl font-bold mb-2 text-charcoal">Ready to Book a Session?</h3>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
            Not sure which service is right for you? Book a consultation with Chandan to discuss your symptoms and create a personalized treatment plan.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/book"
              className="bg-warm-coral text-white px-6 py-3 rounded-lg font-semibold hover:bg-warm-coral/90 transition-colors shadow-lg"
            >
              Book Consultation
            </Link>
            <Link
              href="/about"
              className="bg-deep-teal text-white px-6 py-3 rounded-lg font-semibold hover:bg-deep-teal/90 transition-colors"
            >
              Learn About Our Approach
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
