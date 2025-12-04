import Link from 'next/link';
import { getActiveProviders, badgeInfo } from '@/data/providers';

export default function SpecialistsPage() {
  const providers = getActiveProviders();

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Navigation Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-heading font-bold text-deep-teal">
              Accucentral
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/protocols" className="text-slate-gray hover:text-deep-teal font-medium transition-colors">
                Products
              </Link>
              <Link href="/specialists" className="text-slate-gray hover:text-deep-teal font-medium transition-colors">
                Our Specialists
              </Link>
              <Link href="/science" className="text-slate-gray hover:text-deep-teal font-medium transition-colors">
                Science
              </Link>
              <Link href="/about" className="text-slate-gray hover:text-deep-teal font-medium transition-colors">
                About
              </Link>
              <Link href="/book" className="px-4 py-2 bg-[#F4A261] text-white rounded-lg hover:bg-[#E96F1C] transition font-semibold shadow-md">
                Book Consultation
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-deep-teal text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Our Certified Specialists
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            AYUSH-certified therapists delivering standardized AccuCentral treatments.
            All specialists are background-verified and trained to our protocols.
          </p>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="bg-white border-b border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✅</span>
              <span className="text-slate-700">Background Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎓</span>
              <span className="text-slate-700">AYUSH Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">💉</span>
              <span className="text-slate-700">COVID Vaccinated</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏆</span>
              <span className="text-slate-700">Standardized Training</span>
            </div>
          </div>
        </div>
      </div>

      {/* Specialists Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {providers.map((provider) => {
            const badge = badgeInfo[provider.badgeLevel];

            return (
              <Link
                key={provider.id}
                href={`/specialists/${provider.slug}`}
                className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-slate-200 hover:border-deep-teal hover:shadow-2xl transition-all duration-300"
              >
                {/* Photo Header */}
                <div className="relative h-64 bg-gradient-to-br from-deep-teal to-calm-blue">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 rounded-full border-4 border-white bg-slate-200 overflow-hidden">
                      {/* Placeholder for photo */}
                      <div className="w-full h-full flex items-center justify-center text-6xl text-slate-400">
                        👤
                      </div>
                    </div>
                  </div>

                  {/* Badge Overlay */}
                  <div className="absolute top-4 right-4">
                    {provider.verified.ayushRegistered && (
                      <div className="bg-white rounded-full px-3 py-1 text-xs font-bold text-green-600 flex items-center gap-1">
                        <span>✓</span>
                        AYUSH
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Name & Title */}
                  <h3 className="text-2xl font-heading font-bold text-deep-teal mb-2">
                    {provider.name}
                  </h3>

                  {/* Badge */}
                  <div className={`inline-block px-3 py-1 rounded-lg text-xs font-semibold mb-4 border ${badge.bgColor} ${badge.color}`}>
                    {badge.label}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-4 bg-slate-50 p-3 rounded-lg">
                    <div className="text-center">
                      <div className="text-xl font-bold text-deep-teal">{provider.totalBookings}+</div>
                      <div className="text-xs text-slate-600">Sessions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-deep-teal">{provider.rating}</div>
                      <div className="text-xs text-slate-600">Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-deep-teal">{provider.experienceYears}Y</div>
                      <div className="text-xs text-slate-600">Experience</div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-4">
                    <span>📍</span>
                    <span>{provider.territory}</span>
                  </div>

                  {/* Specializations */}
                  <div className="mb-4">
                    <div className="text-xs font-semibold text-slate-700 mb-2">Specializations:</div>
                    <div className="flex flex-wrap gap-2">
                      {provider.specializations.slice(0, 2).map((spec, idx) => (
                        <span key={idx} className="text-xs bg-sage-green/20 text-sage-green-700 px-2 py-1 rounded">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Infrastructure Icons */}
                  <div className="flex gap-3 mb-4 text-xs">
                    {provider.equipment.portableTable && (
                      <div className="flex items-center gap-1 text-slate-600">
                        <span>🛏️</span>
                        <span>Table</span>
                      </div>
                    )}
                    {provider.verified.backgroundCheck && (
                      <div className="flex items-center gap-1 text-slate-600">
                        <span>✅</span>
                        <span>Verified</span>
                      </div>
                    )}
                    {provider.verified.covidVaccinated && (
                      <div className="flex items-center gap-1 text-slate-600">
                        <span>💉</span>
                        <span>Vaxxed</span>
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="pt-4 border-t border-slate-200">
                    <div className="text-center text-deep-teal font-semibold text-sm hover:text-calm-blue transition-colors">
                      View Profile & Book →
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom Info */}
        <div className="mt-16 bg-linear-to-r from-sage-green/20 to-calm-blue/20 rounded-2xl p-8 text-center border-2 border-deep-teal/30">
          <h2 className="text-2xl font-heading font-bold text-deep-teal mb-3">
            All Bookings Through AccuCentral Dispatch
          </h2>
          <p className="text-slate-700 mb-6 max-w-2xl mx-auto">
            We assign specialists based on your location and their availability.
            Guaranteed service quality with our standardized protocols.
          </p>
          <Link
            href="/protocols"
            className="inline-block px-8 py-4 bg-deep-teal text-white font-bold rounded-lg hover:bg-deep-teal/90 transition-colors shadow-lg"
          >
            View Our Services
          </Link>
        </div>
      </div>
    </main>
  );
}
