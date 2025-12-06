'use client'

import { useState } from 'react'
import Link from 'next/link'
import { packageTemplates } from '@/data/patients'

export default function PackagesPage() {
  const [selectedPackage, setSelectedPackage] = useState<'basic' | 'standard' | 'premium' | null>(null)

  const handlePurchase = (packageType: 'basic' | 'standard' | 'premium') => {
    setSelectedPackage(packageType)

    const pkg = packageTemplates[packageType]
    const message = `Hi, I want to purchase the ${pkg.name} (${pkg.sessions} sessions) for ₹${pkg.price}`

    // Redirect to WhatsApp
    window.open(
      `https://wa.me/919876543210?text=${encodeURIComponent(message)}`,
      '_blank'
    )
  }

  return (
    <div className="min-h-screen bg-bg-app">
      {/* Header */}
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

      {/* Hero */}
      <section className="bg-gradient-to-r from-deep-teal to-calm-blue text-white py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-heading font-bold mb-6">Treatment Packages</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Prepaid packages for consistent treatment and better results. Track your progress with our Digital Therapy Card.
          </p>
          <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
            <span className="text-lg font-semibold">💰 Save up to 20% with packages</span>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Package */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-slate-200 hover:border-sage-green transition-all hover:scale-105">
              <div className="bg-sage-green/10 p-6 text-center border-b-2 border-sage-green/30">
                <h3 className="text-2xl font-heading font-bold text-deep-teal mb-2">
                  {packageTemplates.basic.name}
                </h3>
                <p className="text-slate-600 text-sm">{packageTemplates.basic.description}</p>
              </div>

              <div className="p-8">
                <div className="text-center mb-6">
                  <div className="text-5xl font-bold text-deep-teal mb-2">
                    ₹{packageTemplates.basic.price}
                  </div>
                  <div className="text-slate-600">{packageTemplates.basic.sessions} Sessions</div>
                  <div className="text-sm text-slate-500">{packageTemplates.basic.duration}</div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-2">
                    <span className="text-sage-green text-xl">✓</span>
                    <span className="text-slate-700">Digital Therapy Card access</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-sage-green text-xl">✓</span>
                    <span className="text-slate-700">Pain progress tracking</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-sage-green text-xl">✓</span>
                    <span className="text-slate-700">Homework video exercises</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-sage-green text-xl">✓</span>
                    <span className="text-slate-700">AYUSH certified therapists</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-sage-green text-xl">✓</span>
                    <span className="text-slate-700">Valid for {packageTemplates.basic.duration}</span>
                  </div>
                </div>

                <button
                  onClick={() => handlePurchase('basic')}
                  className="w-full py-4 bg-sage-green text-white font-bold rounded-lg hover:bg-sage-green/90 transition-all shadow-lg"
                >
                  Buy Now
                </button>
              </div>
            </div>

            {/* Standard Package - POPULAR */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-deep-teal relative transform md:scale-110">
              {/* Popular Badge */}
              <div className="absolute top-0 right-0 bg-warm-coral text-white px-4 py-1 text-sm font-bold">
                MOST POPULAR
              </div>

              <div className="bg-linear-to-r from-deep-teal to-calm-blue p-6 text-center text-white">
                <h3 className="text-2xl font-heading font-bold mb-2">
                  {packageTemplates.standard.name}
                </h3>
                <p className="text-white/90 text-sm">{packageTemplates.standard.description}</p>
              </div>

              <div className="p-8">
                <div className="text-center mb-6">
                  <div className="text-sm text-warm-coral font-bold mb-1">SAVE {packageTemplates.standard.discount}%</div>
                  <div className="text-5xl font-bold text-deep-teal mb-2">
                    ₹{packageTemplates.standard.price}
                  </div>
                  <div className="text-slate-600">{packageTemplates.standard.sessions} Sessions</div>
                  <div className="text-sm text-slate-500">{packageTemplates.standard.duration}</div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-2">
                    <span className="text-deep-teal text-xl">✓</span>
                    <span className="text-slate-700 font-semibold">Everything in Basic, plus:</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-deep-teal text-xl">✓</span>
                    <span className="text-slate-700">Complete treatment cycle</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-deep-teal text-xl">✓</span>
                    <span className="text-slate-700">Priority booking</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-deep-teal text-xl">✓</span>
                    <span className="text-slate-700">WhatsApp support</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-deep-teal text-xl">✓</span>
                    <span className="text-slate-700">Progress review calls</span>
                  </div>
                </div>

                <button
                  onClick={() => handlePurchase('standard')}
                  className="w-full py-4 bg-deep-teal text-white font-bold rounded-lg hover:bg-deep-teal/90 transition-all shadow-lg text-lg"
                >
                  Buy Now - Best Value
                </button>
              </div>
            </div>

            {/* Premium Package */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-slate-200 hover:border-warm-coral transition-all hover:scale-105">
              <div className="bg-warm-coral/10 p-6 text-center border-b-2 border-warm-coral/30">
                <h3 className="text-2xl font-heading font-bold text-deep-teal mb-2">
                  {packageTemplates.premium.name}
                </h3>
                <p className="text-slate-600 text-sm">{packageTemplates.premium.description}</p>
              </div>

              <div className="p-8">
                <div className="text-center mb-6">
                  <div className="text-sm text-warm-coral font-bold mb-1">SAVE {packageTemplates.premium.discount}%</div>
                  <div className="text-5xl font-bold text-deep-teal mb-2">
                    ₹{packageTemplates.premium.price}
                  </div>
                  <div className="text-slate-600">{packageTemplates.premium.sessions} Sessions</div>
                  <div className="text-sm text-slate-500">{packageTemplates.premium.duration}</div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-2">
                    <span className="text-warm-coral text-xl">✓</span>
                    <span className="text-slate-700 font-semibold">Everything in Standard, plus:</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-warm-coral text-xl">✓</span>
                    <span className="text-slate-700">Extended treatment program</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-warm-coral text-xl">✓</span>
                    <span className="text-slate-700">Senior therapist assigned</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-warm-coral text-xl">✓</span>
                    <span className="text-slate-700">Customized treatment plan</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-warm-coral text-xl">✓</span>
                    <span className="text-slate-700">Weekly progress reports</span>
                  </div>
                </div>

                <button
                  onClick={() => handlePurchase('premium')}
                  className="w-full py-4 bg-warm-coral text-white font-bold rounded-lg hover:bg-warm-coral/90 transition-all shadow-lg"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mt-16 bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-heading font-bold text-deep-teal mb-6 text-center">
              Why Choose Packages?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl mb-4">📊</div>
                <h3 className="text-xl font-bold text-deep-teal mb-2">Track Progress</h3>
                <p className="text-slate-600">
                  See your pain levels drop with visual charts on your Digital Therapy Card
                </p>
              </div>

              <div className="text-center">
                <div className="text-5xl mb-4">💰</div>
                <h3 className="text-xl font-bold text-deep-teal mb-2">Save Money</h3>
                <p className="text-slate-600">
                  Package discounts up to 20% compared to single sessions
                </p>
              </div>

              <div className="text-center">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-deep-teal mb-2">Better Results</h3>
                <p className="text-slate-600">
                  Consistent treatment over time = 87% average pain reduction
                </p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-12 bg-sage-green/10 border border-sage-green/30 rounded-xl p-8">
            <h3 className="text-2xl font-heading font-bold text-deep-teal mb-6">Common Questions</h3>

            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-deep-teal mb-1">What is the Digital Therapy Card?</h4>
                <p className="text-slate-700 text-sm">
                  Your personal dashboard showing pain progress, session balance, and homework exercises. Access it anytime on your phone.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-deep-teal mb-1">How long are packages valid?</h4>
                <p className="text-slate-700 text-sm">
                  Basic: 2 weeks, Standard: 1 month, Premium: 2 months. Use sessions at your pace within the validity period.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-deep-teal mb-1">Can I get a refund?</h4>
                <p className="text-slate-700 text-sm">
                  Unused sessions can be refunded within 7 days of purchase. Contact support via WhatsApp.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-deep-teal mb-1">How do I book sessions?</h4>
                <p className="text-slate-700 text-sm">
                  After purchase, book via WhatsApp or your Digital Therapy Card. We'll assign the best therapist in your area.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
