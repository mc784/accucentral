'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface SearchHeroProps {
  totalCount: number
}

const headlines = [
  { line1: "Acupressure for Pain", line2: "Clear, Practical Guidance" },
  { line1: "Search Symptoms", line2: "Find Precise Pressure Points" },
  { line1: "Relieve Headaches", line2: "Ease Neck & Back Pain" },
  { line1: "Where to Press", line2: "How Long & How Firm" },
  { line1: "Evidence‑Informed", line2: "TCM + Modern Insights" },
  { line1: "Safe Techniques", line2: "For Everyday Complaints" },
  { line1: "Step‑by‑Step", line2: "Simple, Repeatable Routines" },
  { line1: "Non‑Pharmacologic", line2: "Self‑Care Pain Relief" }
]

const expertQuotes = [
  {
    quote: "Pain is a protective output. Gentle pressure may modulate pain via gate control mechanisms.",
    expert: "Lorimer Moseley, PhD",
    source: "Pain Education"
  },
  {
    quote: "Fascial continuity helps explain body‑wide effects from local mechanical stimulation.",
    expert: "Thomas Myers",
    source: "Anatomy Trains"
  },
  {
    quote: "Mechanical stimulation can produce measurable local tissue responses in connective tissue.",
    expert: "Helene Langevin, MD",
    source: "NIH Research"
  },
  {
    quote: "Slow, focused touch can support a parasympathetic shift—calming and down‑regulating stress.",
    expert: "Peter Levine, PhD",
    source: "Somatic Approaches"
  }
]

export function SearchHero({ totalCount }: SearchHeroProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentHeadline, setCurrentHeadline] = useState(0)
  const [currentQuote, setCurrentQuote] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [isQuoteVisible, setIsQuoteVisible] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentHeadline((prev) => (prev + 1) % headlines.length)
        setIsVisible(true)
      }, 800)
    }, 7000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setIsQuoteVisible(false)
      setTimeout(() => {
        setCurrentQuote((prev) => (prev + 1) % expertQuotes.length)
        setIsQuoteVisible(true)
      }, 600)
    }, 30000)

    return () => clearInterval(quoteInterval)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/points?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <section className="bg-slate-medical py-20">
      <div className="container mx-auto px-4">
        {/* Hero Text */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-charcoal mb-6 leading-tight min-h-[160px] md:min-h-[180px] flex items-center justify-center">
            <span
              className={`transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              style={{ display: 'block' }}
            >
              {headlines[currentHeadline].line1}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-calm-blue to-sage-green mt-2">
                {headlines[currentHeadline].line2}
              </span>
            </span>
          </h1>

          {/* Rotating Expert Quotes */}
          <div className="max-w-3xl mx-auto mb-8 min-h-[120px] flex items-center justify-center">
            <div
              className={`transition-opacity duration-1000 ease-in-out ${isQuoteVisible ? 'opacity-100' : 'opacity-60'}`}
            >
              <blockquote className="text-lg md:text-xl text-slate-gray leading-relaxed italic mb-3">
                "{expertQuotes[currentQuote].quote}"
              </blockquote>
              <p className="text-sm text-slate-500">
                — <span className="font-semibold text-deep-teal">{expertQuotes[currentQuote].expert}</span>, {expertQuotes[currentQuote].source}
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Where does it hurt? (e.g., headache, nausea, back pain)"
                className="w-full px-6 py-5 text-lg rounded-full border-2 border-calm-blue/30 focus:border-calm-blue focus:outline-none focus:ring-4 focus:ring-calm-blue/20 transition-all shadow-md"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-3 bg-calm-blue hover:bg-calm-blue-600 text-white font-semibold rounded-full transition-colors"
              >
                Search →
              </button>
            </form>
          </div>

          <p className="text-base text-slate-500 mb-8">
            Pressure points • Evidence-based • TCM + Modern Science • Aligned with Ministry of AYUSH guidelines
          </p>

          {/* Navigation Pills */}
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            <a
              href="/protocols"
              className="px-8 py-4 bg-deep-teal hover:bg-deep-teal-600 text-white font-bold rounded-full transition-all shadow-md hover:shadow-lg hover:scale-105"
            >
              Daily Protocols
            </a>
            <a
              href="/points"
              className="px-8 py-4 bg-calm-blue hover:bg-calm-blue-600 text-white font-bold rounded-full transition-all shadow-md hover:shadow-lg hover:scale-105"
            >
              Browse Points
            </a>
            <a
              href="/book"
              className="px-8 py-4 bg-warm-coral hover:bg-warm-coral-500 text-white font-bold rounded-full transition-all shadow-md hover:shadow-lg hover:scale-105"
            >
              Book Consultation
            </a>
            <a
              href="/science#yin-yang"
              className="px-8 py-4 border-2 border-sage-green text-sage-green-700 hover:bg-sage-green hover:text-white font-bold rounded-full transition-all hover:scale-105"
            >
              The Science
            </a>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-slate-gray">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-sage-green" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>No sign-up required</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-sage-green" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>100% free knowledge</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-sage-green" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Instant relief techniques</span>
          </div>
        </div>
      </div>
    </section>
  )
}
