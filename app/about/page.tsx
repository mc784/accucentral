import Link from 'next/link'
import { ScienceNote } from '@/components/ScienceNote'

export default function AboutPage() {
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
              <Link href="/protocols" className="text-slate-gray hover:text-deep-teal font-medium transition-colors">
                Services
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

      {/* Hero */}
      <section className="bg-slate-medical py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-charcoal mb-4">
            About Accucentral
          </h1>
          <p className="text-xl text-slate-700 max-w-3xl mx-auto">
            Evidence‑informed acupressure for pain relief, better sleep, and calmer days. We combine Traditional Chinese Medicine principles with modern pain science to deliver safe, structured hands‑on protocols.
          </p>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-heading font-bold text-charcoal mb-6">What We Do</h2>
          <div className="prose max-w-none">
            <p className="text-lg text-slate-800 mb-4">
              Accucentral provides professional acupressure sessions and self‑care guidance focused on common concerns like headaches, neck & shoulder pain, back pain, poor sleep, and stress.
            </p>
            <p className="text-lg text-slate-800 mb-4">
              Sessions use safe, well‑known pressure points and gentle techniques to activate the body’s own regulatory systems (mechanotransduction, gate‑control, vagal tone).
            </p>
            <p className="text-sm text-slate-700">
              Educational information only. We do not diagnose, treat, or replace medical care. For medical issues, consult a qualified clinician.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-4xl font-heading font-bold text-charcoal text-center mb-4">How It Works</h2>
          <p className="text-lg text-slate-700 text-center max-w-2xl mx-auto mb-12">
            A clear, gentle process focused on safety and results.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-md border border-slate-200">
              <div className="w-16 h-16 rounded-full bg-sage-green/20 flex items-center justify-center text-3xl mb-4">🗺️</div>
              <h3 className="text-xl font-heading font-semibold text-charcoal mb-3">1) Assess</h3>
              <p className="text-slate-600">Brief intake and Yin–Yang pattern screen. We note symptoms, red flags, and comfort range.</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md border border-slate-200">
              <div className="w-16 h-16 rounded-full bg-calm-blue/20 flex items-center justify-center text-3xl mb-4">👐</div>
              <h3 className="text-xl font-heading font-semibold text-charcoal mb-3">2) Apply</h3>
              <p className="text-slate-600">Targeted points with light‑to‑moderate pressure, paced breathing, and simple positioning.</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md border border-slate-200">
              <div className="w-16 h-16 rounded-full bg-amber-200/30 flex items-center justify-center text-3xl mb-4">📈</div>
              <h3 className="text-xl font-heading font-semibold text-charcoal mb-3">3) Adjust</h3>
              <p className="text-slate-600">We adapt pressure, cadence, and points by response. You leave with simple self‑care steps.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Principles */}
      <section className="py-16 bg-slate-medical">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-heading font-bold text-charcoal mb-6">Our Principles</h2>
          <ul className="space-y-4 text-slate-700 text-lg">
            <li><strong>Safety first:</strong> Cautions for pregnancy, recent injury, uncontrolled hypertension, and acute infection.</li>
            <li><strong>Evidence‑informed:</strong> We align with Ministry of AYUSH guidance and modern pain science.</li>
            <li><strong>Simple is effective:</strong> A few well‑chosen points practiced consistently beat complicated routines.</li>
            <li><strong>Your pace:</strong> Pressure is always within your comfort range. You can stop any time.</li>
          </ul>

          <div className="mt-12 text-center">
            <Link
              href="/protocols"
              className="inline-block px-8 py-4 bg-deep-teal hover:bg-deep-teal-600 text-white font-semibold rounded-xl transition-colors text-lg"
            >
              Explore Services →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-deep-teal text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-heading font-bold mb-4">Accucentral</h3>
            <p className="text-slate-200 mb-6">Pain Relief Through Acupressure</p>
            <div className="flex justify-center gap-6 text-sm flex-wrap">
              <Link href="/protocols" className="text-sage-green hover:text-sage-green-300">Browse Services</Link>
              <span className="text-slate-400">•</span>
              <Link href="/protocols" className="text-sage-green hover:text-sage-green-300">Services</Link>
              <span className="text-slate-400">•</span>
              <Link href="/book" className="text-sage-green hover:text-sage-green-300">Book Consultation</Link>
            </div>
            <div className="flex justify-center gap-6 text-sm mt-6">
              <Link href="/about" className="text-slate-200 hover:text-sage-green">About</Link>
              <span className="text-slate-400">•</span>
              <Link href="/science" className="text-slate-200 hover:text-sage-green">Science</Link>
              <span className="text-slate-400">•</span>
              <Link href="/studio" className="text-slate-200 hover:text-sage-green">Studio</Link>
            </div>
            <p className="mt-8 text-sm text-slate-300">Built with Next.js • Tailwind CSS • Vercel</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
