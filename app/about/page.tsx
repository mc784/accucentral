import Link from 'next/link'
import { ScienceNote } from '@/components/ScienceNote'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-medical">
      {/* Header */}
      <header className="bg-slate-medical border-b border-slate-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-heading font-bold text-navy-500">
              VrikshaYoga
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/protocols" className="text-slate-600 hover:text-navy-500 font-semibold">
                Protocols
              </Link>
              <Link href="/poses" className="text-slate-600 hover:text-navy-500">
                Poses
              </Link>
              <Link href="/science" className="text-slate-600 hover:text-navy-500">
                Science
              </Link>
              <Link href="/about" className="text-coral font-medium">
                About
              </Link>
              <Link href="/assessment" className="px-4 py-2 bg-coral text-white rounded-lg hover:bg-coral-500 transition font-semibold">
                Take Assessment
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-slate-medical py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-navy-500 mb-6">
            We're Not a Fitness App.
            <span className="block text-coral mt-2">
              We're a Biological Regulation Platform.
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            VrikshaYoga exists to reclaim the human nervous system from the chaos of modern life
            by synthesizing the ancient precision of Yoga with the validation of modern Medical Science.
          </p>
        </div>
      </section>

      {/* Section 1: The Problem We Solve */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-heading font-bold text-navy-500 mb-6">
            Modern Life Keeps Your Body in Permanent Emergency Mode
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-slate-700 leading-relaxed mb-4">
              The current wellness landscape (Glo, Alo Moves, Apple Fitness+) treats Yoga as <strong>exercise</strong>.
              They sell "sweat," "flexibility," and "aesthetic perfection." They ask the user to fit into the practice.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed mb-4">
              <strong>The Reality:</strong> The modern human is not just "stiff"; they are <em>biologically dysregulated</em>.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed">
              We are living through an epidemic of "Cortisol Addiction"—a state of chronic, low-grade fight-or-flight
              that manifests as anxiety, inflammation, sleeplessness, and burnout. "Gym Yoga" does not fix this;
              often, it aggravates it by adding more performance pressure.
            </p>
          </div>

          <ScienceNote 
            expert="Robert Sapolsky"
            insight="Chronic stress literally shrinks the hippocampus—the part of your brain responsible for memory and emotional regulation. But movement and breathing can reverse this damage."
            source="Why Zebras Don't Get Ulcers"
          />
        </div>
      </section>

      {/* Section 2: The Three Pillars - How We're Different */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-4xl font-heading font-bold text-navy-500 text-center mb-4">
            The VrikshaYoga Difference
          </h2>
          <p className="text-lg text-slate-600 text-center max-w-2xl mx-auto mb-12">
            We're not a fitness app. We're a biological regulation platform.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-md border border-slate-200">
              <div className="w-16 h-16 rounded-full bg-gold-300/20 flex items-center justify-center text-3xl mb-4">🔬</div>
              <h3 className="text-xl font-heading font-semibold text-navy-500 mb-3">
                The Authority
              </h3>
              <p className="mb-3 font-medium text-sm text-gold-300">
                Science-backed, not woo-woo
              </p>
              <p className="text-slate-600">
                Every practice is backed by physiological evidence. We explain the <em>why</em> (science) behind the <em>what</em> (asana), serving the skeptic and the engineer.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md border border-slate-200">
              <div className="w-16 h-16 rounded-full bg-gold-300/20 flex items-center justify-center text-3xl mb-4">💊</div>
              <h3 className="text-xl font-heading font-semibold text-navy-500 mb-3">
                The Remedy
              </h3>
              <p className="mb-3 font-medium text-sm text-gold-300">
                The cortisol cure
              </p>
              <p className="text-slate-600">
                We acknowledge you're addicted to busyness. Short, accessible interventions meet you where you are, breaking the stress loop without demanding hours you don't have.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md border border-slate-200">
              <div className="w-16 h-16 rounded-full bg-gold-300/20 flex items-center justify-center text-3xl mb-4">🕊️</div>
              <h3 className="text-xl font-heading font-semibold text-navy-500 mb-3">
                The Sanctuary
              </h3>
              <p className="mb-3 font-medium text-sm text-gold-300">
                Judgment-free, ego-free
              </p>
              <p className="text-slate-600">
                A safe harbor devoid of competition and performance pressure. Built by a family, for families, to heal the "karmic knots" of modern living.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Our Mission & Story */}
      <section className="py-16 bg-slate-medical">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-heading font-bold text-navy-500 mb-6">Our Mission</h2>
          <p className="text-2xl text-navy-500 font-medium mb-6 leading-relaxed">
            To reclaim the human nervous system from the chaos of modern life by synthesizing
            the ancient precision of Yoga with the validation of modern Medical Science.
          </p>
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Vrikshayoga does not exist to make you "good at yoga." We exist to make you <strong>good at life</strong>.
              We use Yoga as a precision tool to:
            </p>
            <ul className="space-y-3 text-lg text-slate-700 mb-8">
              <li><strong>Down-regulate</strong> the nervous system (The Cortisol Detox)</li>
              <li><strong>Re-align</strong> the structural anatomy (The "Modern Hunch" Fix)</li>
              <li><strong>Restore</strong> the body's innate healing capacity (The "Inflammation" Remedy)</li>
            </ul>
            <p className="text-lg text-slate-700 leading-relaxed">
              We envision a future where Vrikshayoga is the <strong>"Main Clinic of Wellness"</strong>—the first place
              a person turns not just for a workout, but when they feel pain, anxiety, or burnout. We bridge the gap
              between the <strong>Doctor's Office</strong> and the <strong>Yoga Studio</strong>.
            </p>
          </div>
          
          <div className="mt-12 text-center">
            <Link
              href="/assessment"
              className="inline-block px-8 py-4 bg-coral hover:bg-coral-500 text-white font-semibold rounded-xl transition-colors text-lg"
            >
              Start Your Journey →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-500 text-slate-medical py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-heading font-bold mb-4">VrikshaYoga</h3>
            <p className="text-slate-300 mb-6">
              Regulate your nervous system, not just your hamstrings
            </p>
            <div className="flex justify-center gap-6 text-sm flex-wrap">
              <Link href="/protocols" className="text-gold-300 hover:text-gold-200">
                Protocols
              </Link>
              <span className="text-slate-400">•</span>
              <Link href="/poses" className="text-gold-300 hover:text-gold-200">
                Poses
              </Link>
              <span className="text-slate-400">•</span>
              <Link href="/science" className="text-gold-300 hover:text-gold-200">
                Science
              </Link>
              <span className="text-slate-400">•</span>
              <Link href="/about" className="text-gold-300 hover:text-gold-200">
                About
              </Link>
            </div>
            <p className="mt-8 text-sm text-slate-400">
              Built with Next.js • Sanity CMS • AWS Amplify
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
