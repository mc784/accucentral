'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface SearchHeroProps {
  totalCount: number
}

const headlines = [
  { line1: "Acupressure for Pain", line2: "Clear, Practical Guidance" },
  { line1: "Search Symptoms", line2: "Find the Right Service" },
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
      router.push(`/protocols?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <section className="bg-slate-medical py-20">
      <div className="container mx-auto px-4">
        {/* Hero Text */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-charcoal mb-6 leading-tight min-h-40 md:min-h-44 flex items-center justify-center">
            <span
              className={`transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              style={{ display: 'block' }}
            >
              {headlines[currentHeadline].line1}
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-calm-blue to-sage-green mt-2">
                {headlines[currentHeadline].line2}
              </span>
            </span>
          </h1>

          {/* Rotating Expert Quotes */}
          <div className="max-w-3xl mx-auto mb-8 min-h-[120px] flex items-center justify-center">
            <div
              className={`transition-opacity duration-1000 ease-in-out ${isQuoteVisible ? 'opacity-100' : 'opacity-60'}`}
            >
              <blockquote className="text-lg md:text-xl text-slate-700 leading-relaxed italic mb-3">
                "{expertQuotes[currentQuote].quote}"
              </blockquote>
              <p className="text-sm text-slate-600">
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

          <p className="text-base text-slate-600 mb-8">
            Pressure points • Evidence-based • TCM + Modern Science • Aligned with Ministry of AYUSH guidelines
          </p>

          {/* Navigation Pills */}
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            <a
              href="/protocols"
              className="px-8 py-4 bg-deep-teal hover:bg-deep-teal-600 text-white font-bold rounded-full transition-all shadow-md hover:shadow-lg hover:scale-105"
            >
              Explore Services
            </a>
            <a
              href="/protocols"
              className="px-8 py-4 bg-calm-blue hover:bg-calm-blue-600 text-white font-bold rounded-full transition-all shadow-md hover:shadow-lg hover:scale-105"
            >
              Browse Services
            </a>
            {/* Assessment removed per request */}
            <a
              href="/book"
              className="px-8 py-4 bg-warm-coral hover:bg-warm-coral-500 text-white font-bold rounded-full transition-all shadow-md hover:shadow-lg hover:scale-105"
            >
              Book Consultation
            </a>
            <a
              href="/science#yin-yang"
              className="px-8 py-4 bg-deep-teal hover:bg-deep-teal-600 text-white font-bold rounded-full transition-all shadow-md hover:shadow-lg hover:scale-105"
            >
              The Science
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
