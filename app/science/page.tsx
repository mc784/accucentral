import Link from 'next/link'
import Image from 'next/image'
import { ScienceNote } from '@/components/ScienceNote'

interface Article {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  category?: string
  mainImage?: {
    asset: {
      url: string
    }
  }
  publishedAt?: string
}

async function getArticles(): Promise<Article[]> { return [] }

export default async function SciencePage() {
  const articles = await getArticles()

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
              <Link href="/science" className="text-deep-teal font-medium">
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
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-charcoal mb-6">
            The Science
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Evidence-based education on stress, cortisol, anatomy, and the nervous system. 
            We refuse to be "woo-woo"—every claim is backed by physiological evidence.
          </p>

          <div className="max-w-2xl mx-auto">
            <ScienceNote 
              expert="Gabor Maté"
              insight="Stress is not what happens to us. It's our response to what happens. And response is something we can choose."
              source="The Myth of Normal"
            />
          </div>
        </div>
      </section>

      {/* Yin–Yang Framework Intro */}
      <section id="yin-yang" className="py-12 bg-white scroll-mt-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-heading font-bold text-deep-teal mb-4 text-center">Yin–Yang Energy: A Practical Lens</h2>
          <p className="text-slate-700 text-lg leading-relaxed text-center max-w-3xl mx-auto mb-6">
            We use a simple Yin–Yang framing to organize common symptom patterns. Yin often maps to cooling, moistening, and rest; Yang to warming, activating, and movement. 
            This model is educational—not a medical diagnosis—and helps guide safe, non‑pharmacologic self‑care.
          </p>
          <div className="text-center">
            <Link href="/protocols" className="inline-block px-6 py-3 bg-deep-teal hover:bg-deep-teal-600 text-white font-semibold rounded-lg transition-colors">
              Explore Services & Protocols →
            </Link>
          </div>
          <p className="text-xs text-slate-500 mt-6 text-center">Always consider personal conditions (e.g., pregnancy) and consult a qualified clinician for medical concerns.</p>
        </div>
      </section>

      {/* Section 1: The Biology of Stress */}
      <section className="py-16 bg-white" id="biology">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-4xl font-heading font-bold text-charcoal mb-8 text-center">
            How Chronic Stress Hijacks Your Body
          </h2>

          {/* HPA Axis */}
          <div className="mb-12">
            <h3 className="text-2xl font-heading font-bold text-charcoal mb-4">The HPA Axis Explained</h3>
            <p className="text-lg text-slate-700 leading-relaxed mb-4">
              When you face stress, your body activates the <strong>HPA Axis</strong> (Hypothalamus → Pituitary → Adrenal pathway). 
              This is your body's alarm system, designed to save your life in emergencies.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed">
              The problem? Modern life keeps this alarm system <em>permanently on</em>. Your body can't tell the difference 
              between a physical threat and an email from your boss.
            </p>
          </div>

          {/* Acute vs Chronic */}
          <div className="mb-12 bg-slate-50 p-8 rounded-xl">
            <h3 className="text-2xl font-heading font-bold text-charcoal mb-6">Acute vs. Chronic Stress</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold text-charcoal mb-3">🦓 The Zebra (Acute Stress)</h4>
                <p className="text-slate-700 mb-2"><strong>Duration:</strong> 5 minutes</p>
                <p className="text-slate-700 mb-2"><strong>Trigger:</strong> Lion chases zebra</p>
                <p className="text-slate-700 mb-2"><strong>Response:</strong> Cortisol spike → escape → cortisol drops</p>
                <p className="text-slate-700"><strong>Result:</strong> System resets, zebra grazes peacefully</p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-charcoal mb-3">💼 The Human (Chronic Stress)</h4>
                <p className="text-slate-700 mb-2"><strong>Duration:</strong> 8 hours/day, every day</p>
                <p className="text-slate-700 mb-2"><strong>Trigger:</strong> Email, Slack, meetings, deadlines</p>
                <p className="text-slate-700 mb-2"><strong>Response:</strong> Cortisol elevated all day, every day</p>
                <p className="text-slate-700"><strong>Result:</strong> System never resets, chronic inflammation</p>
              </div>
            </div>
          </div>

          {/* Three Cortisol Profiles */}
          <div className="mb-12">
            <h3 className="text-2xl font-heading font-bold text-charcoal mb-6">The Three Cortisol Profiles</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg border-2 border-coral/30">
                <h4 className="text-xl font-semibold text-charcoal mb-3">🔥 The Spiker</h4>
                <p className="text-sm text-slate-600 mb-2"><strong>Pattern:</strong> High morning cortisol, crashes by 3 PM</p>
                <p className="text-sm text-slate-600"><strong>Symptoms:</strong> Morning anxiety, afternoon exhaustion, needs caffeine to function</p>
              </div>
              <div className="bg-white p-6 rounded-lg border-2 border-slate-300">
                <h4 className="text-xl font-semibold text-charcoal mb-3">😴 The Flatliner</h4>
                <p className="text-sm text-slate-600 mb-2"><strong>Pattern:</strong> Flat cortisol all day (adrenal fatigue)</p>
                <p className="text-sm text-slate-600"><strong>Symptoms:</strong> Chronic exhaustion, can't get out of bed, brain fog</p>
              </div>
              <div className="bg-white p-6 rounded-lg border-2 border-calm-blue-300">
                <h4 className="text-xl font-semibold text-charcoal mb-3">🌙 The Night Owl</h4>
                <p className="text-sm text-slate-600 mb-2"><strong>Pattern:</strong> Reversed curve, high at night</p>
                <p className="text-sm text-slate-600"><strong>Symptoms:</strong> Wired at night, can't fall asleep, groggy mornings</p>
              </div>
            </div>
          </div>

          {/* Why Acupressure Regulates */}
          <div className="mb-8">
            <h3 className="text-2xl font-heading font-bold text-charcoal mb-4">Why Acupressure Regulates the Nervous System</h3>
            <p className="text-lg text-slate-700 leading-relaxed mb-4">
              Acupressure applies targeted mechanical pressure that modulates <strong>vagal tone</strong>, influences spinal <strong>gate control</strong> of pain, and improves local circulation via <strong>mechanotransduction</strong>—helping your body shift from sympathetic to parasympathetic state.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed">
              Gentle pressure + paced breathing create a practical biological reset you can use daily alongside professional care when needed.
            </p>
          </div>

          <ScienceNote 
            expert="Andrew Huberman"
            insight="The physiological sigh—a double inhale followed by a long exhale—is the fastest way to calm your nervous system. This is pranayama with a neuroscience label."
            source="Huberman Lab Podcast"
            sourceUrl="https://www.hubermanlab.com"
          />

          <div className="text-center mt-12">
            <Link
              href="/protocols"
              className="inline-block px-8 py-4 bg-warm-coral hover:bg-warm-coral-500 text-white font-semibold rounded-lg transition-colors text-lg"
            >
              View Services →
            </Link>
          </div>
        </div>
      </section>

      {/* Section 2: Why This Works */}
      <section className="py-16 bg-slate-medical">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-heading font-bold text-charcoal mb-8 text-center">
            Why This Works
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl">
              <h3 className="text-xl font-heading font-semibold text-charcoal mb-3">
                🧠 Nervous System Regulation
              </h3>
              <p className="text-slate-600">
                We target the autonomic nervous system—switching you from "fight or flight" (sympathetic) to 
                "rest and digest" (parasympathetic). This is measurable, repeatable biology.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl">
              <h3 className="text-xl font-heading font-semibold text-charcoal mb-3">
                💊 Cortisol Management
              </h3>
              <p className="text-slate-600">
                Chronic cortisol causes inflammation, weight gain, insomnia, and anxiety. Our protocols help 
                your body return to its natural cortisol rhythm.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl">
              <h3 className="text-xl font-heading font-semibold text-charcoal mb-3">
                🩺 Evidence-Based Movements
              </h3>
              <p className="text-slate-600">
                Every pose is explained with anatomical precision. You'll understand why you're doing it, 
                which muscles are engaged, and what biological system you're affecting.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl">
              <h3 className="text-xl font-heading font-semibold text-charcoal mb-3">
                ⏱️ Micro-Dose Interventions
              </h3>
              <p className="text-slate-600">
                Busy people can't commit to hour-long practices. Our SOS interventions are 3-10 minutes—
                short enough to do daily, powerful enough to create change.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Articles Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {articles.length === 0 ? (
            <div className="max-w-2xl mx-auto text-center py-16">
              <div className="text-6xl mb-6">📚</div>
              <h2 className="text-3xl font-heading font-bold text-charcoal mb-4">
                Articles Coming Soon
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                We're crafting in-depth, science‑backed articles on acupressure, pain science, and nervous system health. 
                Check back soon!
              </p>
              <div className="bg-sage-green-300/10 border border-sage-green-300/30 rounded-xl p-6 text-left">
                <h3 className="font-heading font-semibold text-charcoal mb-3">Upcoming Articles:</h3>
                <ul className="space-y-2 text-slate-600">
                  <li>• Why You're Addicted to Being Busy (The Dopamine-Cortisol Loop)</li>
                  <li>• The 3 AM Wake-Up Call: Liver, Blood Sugar & Adrenaline</li>
                  <li>• Cortisol Belly & Face: The Anatomy of Inflammation</li>
                  <li>• The HPA Axis Explained (Simplified Neuroscience)</li>
                  <li>• Fight or Flight vs. Rest & Digest</li>
                </ul>
              </div>
              <div className="mt-8">
                <Link
                  href="/protocols"
                  className="inline-block px-6 py-3 bg-deep-teal hover:bg-deep-teal-600 text-white font-semibold rounded-lg transition-colors"
                >
                  Explore Protocols Instead →
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {articles.map((article) => (
                <Link
                  key={article._id}
                  href={`/science/${article.slug.current}`}
                  className="group"
                >
                  <div className="bg-white rounded-xl overflow-hidden border-2 border-slate-200 hover:border-sage-green-300 transition-all shadow-sm hover:shadow-md">
                    {article.mainImage?.asset?.url && (
                      <div className="relative h-48 bg-slate-100">
                        <Image
                          src={article.mainImage.asset.url}
                          alt={article.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      {article.category && (
                        <span className="text-xs font-semibold text-coral uppercase tracking-wide">
                          {article.category.replace('-', ' ')}
                        </span>
                      )}
                      <h2 className="text-xl font-heading font-bold text-charcoal mt-2 mb-3 group-hover:text-warm-coral transition-colors">
                        {article.title}
                      </h2>
                      {article.excerpt && (
                        <p className="text-slate-600 line-clamp-3">
                          {article.excerpt}
                        </p>
                      )}
                      <div className="mt-4 text-coral font-medium text-sm flex items-center gap-2">
                        Read article
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Section 4: Expert Sources */}
      <section className="py-16 bg-slate-medical">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-heading font-bold text-charcoal mb-8 text-center">
            Expert Sources
          </h2>
          
          <p className="text-lg text-slate-600 text-center mb-12">
            We build on the work of world-class researchers, physicians, and neuroscientists. 
            Here are the experts whose work informs our protocols.
          </p>

          <div className="max-w-2xl mx-auto mb-12">
            <ScienceNote 
              expert="Gabor Maté"
              insight="Stress is not what happens to us. It's our response to what happens. And response is something we can choose."
              source="The Myth of Normal"
            />
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-heading font-bold text-charcoal mb-6">Recommended Reading</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-white rounded-lg">
                <div className="text-3xl">📖</div>
                <div>
                  <h4 className="font-semibold text-charcoal">Why Zebras Don't Get Ulcers</h4>
                  <p className="text-sm text-slate-600">Robert Sapolsky — The definitive book on stress physiology</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white rounded-lg">
                <div className="text-3xl">📖</div>
                <div>
                  <h4 className="font-semibold text-charcoal">The Body Keeps the Score</h4>
                  <p className="text-sm text-slate-600">Bessel van der Kolk — How trauma lives in the nervous system</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white rounded-lg">
                <div className="text-3xl">📖</div>
                <div>
                  <h4 className="font-semibold text-charcoal">The Myth of Normal</h4>
                  <p className="text-sm text-slate-600">Gabor Maté — Trauma, illness, and healing in a toxic culture</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white rounded-lg">
                <div className="text-3xl">📖</div>
                <div>
                  <h4 className="font-semibold text-charcoal">Breath: The New Science of a Lost Art</h4>
                  <p className="text-sm text-slate-600">James Nestor — How breathing regulates everything</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white rounded-lg">
                <div className="text-3xl">📖</div>
                <div>
                  <h4 className="font-semibold text-charcoal">Huberman Lab Podcast</h4>
                  <p className="text-sm text-slate-600">Andrew Huberman — Science-based tools for everyday life</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl font-heading font-bold text-charcoal mb-4">
            Want Personalized Guidance?
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Not sure where to start? Browse common concerns and their matching service protocols.
          </p>
          <Link
            href="/protocols"
            className="inline-block px-8 py-4 bg-warm-coral hover:bg-warm-coral-500 text-white font-semibold text-lg rounded-lg transition-colors"
          >
            Browse Services →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-deep-teal text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-heading font-bold mb-4">Accucentral</h3>
            <p className="text-slate-200 mb-6">Pain Relief Through Acupressure</p>
            <div className="flex justify-center gap-6 text-sm flex-wrap">
              <Link href="/protocols" className="text-sage-green hover:text-sage-green-300">
                Services
              </Link>
              <span className="text-slate-400">•</span>
              <Link href="/science" className="text-sage-green hover:text-sage-green-300">
                Science
              </Link>
              <span className="text-slate-400">•</span>
              <Link href="/about" className="text-sage-green hover:text-sage-green-300">
                About
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
