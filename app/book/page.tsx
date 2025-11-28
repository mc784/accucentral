import Link from 'next/link'

export default function BookPage() {
  return (
    <div className="min-h-screen bg-slate-medical">
      {/* Header */}
      <header className="bg-slate-medical border-b border-slate-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-heading font-bold text-deep-teal">
              Accucentral
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/points" className="text-slate-gray hover:text-deep-teal font-medium transition-colors">
                Points
              </Link>
              <Link href="/protocols" className="text-slate-gray hover:text-deep-teal font-medium transition-colors">
                Protocols
              </Link>
              <Link href="/science" className="text-slate-gray hover:text-deep-teal font-medium transition-colors">
                Science
              </Link>
              <Link href="/about" className="text-slate-gray hover:text-deep-teal font-medium transition-colors">
                About
              </Link>
              <Link href="/book" className="px-4 py-2 bg-warm-coral text-white rounded-lg hover:bg-warm-coral-500 transition font-semibold shadow-md">
                Book Consultation
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Booking Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-heading font-bold text-charcoal mb-4 text-center">Book a Consultation</h1>
          <p className="text-lg text-slate-gray text-center mb-8">
            Schedule a session for personalized acupressure guidance. Choose a time that works for you.
          </p>

          <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-6">
            <p className="text-slate-700 mb-4">
              Booking integration coming soon. In the meantime, contact us at:
            </p>
            <ul className="text-slate-700 space-y-2">
              <li><strong>Email:</strong> <a className="text-calm-blue hover:text-calm-blue-600" href="mailto:bookings@accucentral.com">bookings@accucentral.com</a></li>
              <li><strong>Phone:</strong> <a className="text-calm-blue hover:text-calm-blue-600" href="tel:+11234567890">+1 (123) 456-7890</a></li>
            </ul>
          </div>

          <div className="text-center mt-8">
            <Link href="/protocols" className="inline-block px-6 py-3 bg-deep-teal hover:bg-deep-teal-600 text-white font-semibold rounded-lg transition-colors">
              Explore Protocols
            </Link>
          </div>

          <p className="text-xs text-slate-500 mt-8 text-center">
            By requesting an appointment you agree to our terms and privacy policy.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-deep-teal text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-heading font-bold mb-4">Accucentral</h3>
          <div className="flex justify-center gap-6 text-sm">
            <Link href="/points" className="text-sage-green hover:text-sage-green-300">Browse Points</Link>
            <span className="text-slate-400">•</span>
            <Link href="/protocols" className="text-sage-green hover:text-sage-green-300">Protocols</Link>
            <span className="text-slate-400">•</span>
            <Link href="/science" className="text-sage-green hover:text-sage-green-300">Science</Link>
          </div>
          <p className="mt-6 text-sm text-slate-300">Built with Next.js • Sanity CMS • Vercel</p>
        </div>
      </footer>
    </div>
  )
}
