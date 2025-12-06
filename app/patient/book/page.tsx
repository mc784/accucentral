import Link from 'next/link';
import Image from 'next/image';

// Mock provider data - will be replaced with API call
const providers = [
  { id: '1', name: 'Chandan', avatar: '/images/providers/chandan.jpg' },
  { id: '2', name: 'Dr. Sharma', avatar: '/images/providers/sharma.jpg' },
  { id: '3', name: 'Priya Gupta', avatar: '/images/providers/priya.jpg' },
  { id: '4', name: 'Rajesh Kumar', avatar: '/images/providers/rajesh.jpg' },
  { id: '5', name: 'Anita Verma', avatar: '/images/providers/anita.jpg' },
];

const services = [
  {
    id: 'tech-neck',
    name: 'Tech-Neck Relief',
    originalPrice: 1500,
    discountedPrice: 750,
    duration: '45 minutes',
    description: 'Instant relief for desk workers and phone users. Targets neck and shoulder tension.',
    icon: '💆',
    popular: true,
  },
  {
    id: 'migraine',
    name: 'Migraine Relief',
    originalPrice: 1500,
    discountedPrice: 750,
    duration: '45 minutes',
    description: 'Stop the pain before it starts. Reduces frequency and intensity of migraines.',
    icon: '🧘',
    popular: true,
  },
  {
    id: 'senior-wellness',
    name: 'Senior Wellness',
    originalPrice: 1500,
    discountedPrice: 750,
    duration: '60 minutes',
    description: 'Gentle relief for arthritis, joint pain, and age-related discomfort.',
    icon: '🌿',
    popular: false,
  },
];

export default function PatientBookingPage() {
  const whatsappNumber = '919876543210'; // Replace with actual business WhatsApp
  
  const generateWhatsAppLink = (serviceName: string) => {
    const message = encodeURIComponent(
      `Hi! I'd like to book a session:\n\n` +
      `- Service: ${serviceName}\n` +
      `- Preferred Date: Tomorrow\n` +
      `- Time: Morning/Afternoon/Evening\n\n` +
      `My name: \n` +
      `My number: +91`
    );
    return `https://wa.me/${whatsappNumber}?text=${message}`;
  };

  return (
    <div className="min-h-screen bg-bg-app">
      {/* Mobile Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="px-4 py-4">
          <Link href="/" className="text-xl font-heading font-bold text-brand-indigo">
            Marma
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-indigo to-brand-indigo-700 text-white px-4 py-8 tribal-divider-bottom">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold mb-2">
            Book Professional Acupressure in Faridabad
          </h1>
          <p className="text-base text-white/90 mb-4">
            Trusted by expert practitioners. 50% off pilot pricing.
          </p>
          
          {/* Provider Trust Badges */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
            <p className="text-xs text-white/80 mb-2">Trusted Practitioners:</p>
            <div className="flex justify-center gap-1.5 flex-wrap">
              {providers.map((provider) => (
                <div key={provider.id} className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                  {provider.name}
                </div>
              ))}
            </div>
            <p className="text-xs text-white/70 mt-2">
              All certified by Ministry of AYUSH
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="px-4 py-6 max-w-md mx-auto">
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-1 text-brand-charcoal">Choose Your Service</h2>
          <p className="text-sm text-slate-600">
            Professional acupressure sessions. First session 50% off.
          </p>
        </div>

        <div className="space-y-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
            >
              {/* Service Header */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="text-3xl">{service.icon}</div>
                    <div>
                      <h3 className="text-lg font-bold text-brand-charcoal flex items-center gap-2">
                        {service.name}
                        {service.popular && (
                          <span className="text-xs bg-brand-ochre text-white px-2 py-1 rounded-full">
                            Popular
                          </span>
                        )}
                      </h3>
                      <p className="text-xs text-slate-500">{service.duration}</p>
                    </div>
                  </div>
                </div>

                <p className="text-slate-700 text-sm mb-3">
                  {service.description}
                </p>

                {/* Pricing */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-brand-indigo">
                        ₹{service.discountedPrice}
                      </span>
                      <span className="text-xs text-slate-400 line-through">
                        ₹{service.originalPrice}
                      </span>
                    </div>
                    <p className="text-xs text-brand-ochre font-semibold">
                      50% OFF - Pilot Pricing
                    </p>
                  </div>
                </div>

                {/* Book Button */}
                <a
                  href={generateWhatsAppLink(service.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-brand-ochre hover:bg-brand-ochre-600 text-white text-center font-semibold py-3 rounded-lg transition-colors shadow-md text-sm"
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Book via WhatsApp
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Alternative Contact */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-600 mb-3">Prefer to call?</p>
          <a
            href="tel:+919876543210"
            className="inline-block px-6 py-3 bg-white border-2 border-deep-teal text-deep-teal font-semibold rounded-xl hover:bg-slate-50 transition-colors"
          >
            📞 Call Us
          </a>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="text-2xl mb-1">✓</div>
            <p className="text-xs text-slate-600">AYUSH Certified</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="text-2xl mb-1">🏥</div>
            <p className="text-xs text-slate-600">50+ Sessions</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="text-2xl mb-1">⭐</div>
            <p className="text-xs text-slate-600">Trusted Care</p>
          </div>
        </div>

        {/* Already Booked Section */}
        <div className="mt-12 bg-sage-green/10 border border-sage-green/30 rounded-xl p-6 text-center">
          <h3 className="text-lg font-bold mb-2 text-charcoal">Already Booked?</h3>
          <p className="text-sm text-slate-600 mb-4">
            View your sessions, track progress, and see pain score improvements.
          </p>
          <Link
            href="/patient/dashboard"
            className="inline-block px-6 py-3 bg-deep-teal text-white font-semibold rounded-xl hover:bg-deep-teal-600 transition-colors"
          >
            View My Sessions
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 px-4 py-8 mt-12">
        <div className="max-w-md mx-auto text-center">
          <p className="text-sm text-slate-600">
            Professional acupressure services in Faridabad
          </p>
          <div className="flex justify-center gap-4 mt-4 text-xs text-slate-500">
            <Link href="/about" className="hover:text-brand-indigo">About</Link>
            <span>•</span>
            <Link href="/points" className="hover:text-brand-indigo">Pressure Points</Link>
            <span>•</span>
            <Link href="/science" className="hover:text-brand-indigo">Science</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
