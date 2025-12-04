import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProviderBySlug, badgeInfo, getProviderBookingLink } from '@/data/providers';
import { getServiceBySlug } from '@/data/services';

interface ProviderProfilePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProviderProfilePage({ params }: ProviderProfilePageProps) {
  const { slug } = await params;
  const provider = getProviderBySlug(slug);

  if (!provider) {
    notFound();
  }

  const badge = badgeInfo[provider.badgeLevel];

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

      {/* Digital License Header */}
      <div className="bg-gradient-to-br from-deep-teal to-calm-blue text-white py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Photo */}
            <div className="w-48 h-48 rounded-full border-4 border-white bg-slate-200 overflow-hidden flex-shrink-0">
              <div className="w-full h-full flex items-center justify-center text-6xl text-slate-400">
                👤
              </div>
            </div>

            {/* Provider Info */}
            <div className="flex-grow text-center md:text-left">
              <h1 className="text-4xl font-heading font-bold mb-2">{provider.name}</h1>

              {/* Badge */}
              <div className={`inline-block px-4 py-2 rounded-lg text-sm font-semibold mb-4 border ${badge.bgColor} ${badge.color}`}>
                {badge.label}
              </div>

              {/* Stats */}
              <div className="flex flex-wrap justify-center md:justify-start gap-6 text-white/90 mb-4">
                <div>
                  <span className="text-2xl font-bold">{provider.totalBookings}+</span>
                  <span className="text-sm ml-2">Sessions Completed</span>
                </div>
                <div>
                  <span className="text-2xl font-bold">{provider.rating}</span>
                  <span className="text-sm ml-2">Rating</span>
                </div>
                <div>
                  <span className="text-2xl font-bold">{provider.experienceYears}</span>
                  <span className="text-sm ml-2">Years Experience</span>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 justify-center md:justify-start text-white/90">
                <span>📍</span>
                <span className="font-medium">{provider.territory} • {provider.serviceRadius}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Verification & Infrastructure */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-2 border-sage-green/30">
          <h2 className="text-2xl font-heading font-bold text-deep-teal mb-6 flex items-center gap-2">
            <span>✅</span>
            Verified & Certified
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {provider.verified.backgroundCheck && (
              <div className="bg-sage-green/10 rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">✅</div>
                <div className="text-sm font-semibold text-slate-700">Background Verified</div>
              </div>
            )}
            {provider.verified.ayushRegistered && (
              <div className="bg-sage-green/10 rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">🎓</div>
                <div className="text-sm font-semibold text-slate-700">AYUSH Certified</div>
                <div className="text-xs text-slate-600 mt-1">{provider.certificationBody}</div>
              </div>
            )}
            {provider.verified.covidVaccinated && (
              <div className="bg-sage-green/10 rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">💉</div>
                <div className="text-sm font-semibold text-slate-700">COVID Vaccinated</div>
              </div>
            )}
            {provider.equipment.portableTable && (
              <div className="bg-sage-green/10 rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">🛏️</div>
                <div className="text-sm font-semibold text-slate-700">Portable Table</div>
              </div>
            )}
          </div>
        </div>

        {/* Specializations */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-heading font-bold text-deep-teal mb-4">
            Specializations
          </h2>
          <div className="flex flex-wrap gap-3">
            {provider.specializations.map((spec, idx) => (
              <span key={idx} className="px-4 py-2 bg-calm-blue/10 text-calm-blue-700 border border-calm-blue/30 rounded-lg font-medium">
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Available Services */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-heading font-bold text-deep-teal mb-6">
            Available Treatments
          </h2>

          <div className="space-y-4">
            {provider.availableServices.map((serviceSlug) => {
              const service = getServiceBySlug(serviceSlug);
              if (!service) return null;

              return (
                <div key={serviceSlug} className="border-2 border-slate-200 rounded-xl p-6 hover:border-deep-teal transition-all">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-deep-teal mb-1">{service.title}</h3>
                      <p className="text-slate-600 mb-2">{service.tagline}</p>
                      <div className="flex flex-wrap gap-3 text-sm">
                        <span className="flex items-center gap-1 text-slate-700">
                          <span>⏱️</span>
                          {service.duration}
                        </span>
                        <span className="flex items-center gap-1 text-slate-700">
                          <span>🎯</span>
                          {service.scope}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-deep-teal mb-2">₹{service.price}</div>
                      {service.originalPrice && (
                        <div className="text-sm text-slate-500 line-through">₹{service.originalPrice}</div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Availability */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-heading font-bold text-deep-teal mb-4">
            Availability
          </h2>

          <div className="space-y-4">
            <div>
              <div className="text-sm font-semibold text-slate-700 mb-2">Available Days:</div>
              <div className="flex flex-wrap gap-2">
                {['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map((day) => {
                  const isAvailable = provider.availableDays.includes(day as any);
                  return (
                    <span
                      key={day}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                        isAvailable
                          ? 'bg-sage-green/20 text-sage-green-700 border border-sage-green/40'
                          : 'bg-slate-100 text-slate-400 border border-slate-200'
                      }`}
                    >
                      {day.toUpperCase()}
                    </span>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold text-slate-700 mb-2">Preferred Time Slots:</div>
              <div className="flex flex-wrap gap-2">
                {provider.preferredTimeSlots.map((slot, idx) => (
                  <span key={idx} className="px-3 py-1 bg-calm-blue/10 text-calm-blue-700 rounded-lg text-sm border border-calm-blue/30">
                    {slot}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Languages */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-heading font-bold text-deep-teal mb-4">
            Languages
          </h2>
          <div className="flex flex-wrap gap-2">
            {provider.languages.map((lang, idx) => (
              <span key={idx} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium">
                {lang}
              </span>
            ))}
          </div>
        </div>

        {/* Central Booking CTA */}
        <div className="bg-gradient-to-r from-deep-teal to-calm-blue rounded-2xl p-10 text-center text-white shadow-2xl">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Book Session with {provider.name}
          </h2>
          <p className="text-xl mb-6 text-white/90 max-w-2xl mx-auto">
            All bookings are handled through AccuCentral dispatch to ensure availability and service quality.
          </p>
          <a
            href={getProviderBookingLink(provider)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-xl rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-105"
          >
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Book via WhatsApp
          </a>

          <p className="text-sm text-white/70 mt-6">
            Managed by AccuCentral • Guaranteed Service Quality
          </p>
        </div>
      </div>
    </main>
  );
}
