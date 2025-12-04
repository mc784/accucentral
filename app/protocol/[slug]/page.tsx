import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getServiceBySlug, getWhatsAppBookingLink, categoryColors, categoryLabels } from '@/data/services';

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
              ⏱️ {service.duration}
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full font-bold text-lg">
              ₹{service.price}
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

            {/* What's Included */}
            <section className="bg-linear-to-br from-sage-green/10 to-calm-blue/10 rounded-xl shadow-md p-6 border border-sage-green/30">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-3xl">🎯</span>
                What's Included
              </h2>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-700 text-lg font-semibold">{service.scope}</p>
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

            {/* Pricing */}
            <div className="bg-warm-coral/10 border border-warm-coral/30 rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-lg mb-2 text-warm-coral">💰 Investment</h3>
              <div className="text-3xl font-bold text-deep-teal">₹{service.price}</div>
              {service.originalPrice && (
                <div className="text-sm text-slate-600 mt-1">
                  Regular price: <span className="line-through">₹{service.originalPrice}</span>
                </div>
              )}
            </div>

            {/* Book Now CTA */}
            <div className="bg-linear-to-br from-sage-green/20 to-calm-blue/20 border-2 border-deep-teal rounded-xl p-6 shadow-lg">
              <h3 className="font-bold text-xl mb-3 text-deep-teal">📲 Ready to Book?</h3>
              <p className="text-sm text-slate-700 mb-4">Click below to book via WhatsApp</p>
              <a
                href={getWhatsAppBookingLink(service)}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-center rounded-lg transition-all shadow-md"
              >
                Book Now
              </a>
            </div>
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
            <a
              href={getWhatsAppBookingLink(service)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20BA5A] text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg flex items-center gap-2"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Book for ₹{service.price} on WhatsApp
            </a>
            <Link
              href="/protocols"
              className="bg-white text-deep-teal px-6 py-3 rounded-lg font-semibold hover:bg-slate-50 transition-colors border-2 border-deep-teal shadow-md"
            >
              View All Products
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
