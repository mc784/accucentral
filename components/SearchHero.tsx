'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface SearchHeroProps {
  totalCount: number
}

const headlines = [
  { line1: "Regulate Your Nervous System,", line2: "Not Just Your Hamstrings" },
  { line1: "You're Not Broken,", line2: "You're Just Dysregulated" },
  { line1: "Your Body Isn't Tight,", line2: "It's Traumatized" },
  { line1: "This Isn't Just Yoga.", line2: "This Is Biology." },
  { line1: "Fix Your Cortisol,", line2: "Fix Your Life" },
  { line1: "Stop Stretching.", line2: "Start Regulating." },
  { line1: "The User Manual", line2: "For Your Nervous System" },
  { line1: "From Cortisol Addiction", line2: "To Calm Capability" },
  { line1: "Fix Your Circadian Rhythm,", line2: "Fix Your Sleep" },
  { line1: "Doom Scrolling Destroys", line2: "Your Nervous System" },
  { line1: "Binge Watching Is", line2: "Binge Cortisol" },
  { line1: "You Can't Sleep Because", line2: "You Can't Regulate" }
]

const expertQuotes = [
  { 
    quote: "Chronic stress literally shrinks the hippocampus—the part of your brain responsible for memory and emotional regulation.",
    expert: "Robert Sapolsky",
    source: "Why Zebras Don't Get Ulcers"
  },
  { 
    quote: "The body keeps the score. Trauma lives in the nervous system until you give it a way out.",
    expert: "Bessel van der Kolk",
    source: "The Body Keeps the Score"
  },
  { 
    quote: "Stress is not what happens to us. It's our response to what happens. And response is something we can choose.",
    expert: "Gabor Maté",
    source: "The Myth of Normal"
  },
  { 
    quote: "The physiological sigh—a double inhale followed by a long exhale—is the fastest way to calm your nervous system.",
    expert: "Andrew Huberman",
    source: "Huberman Lab"
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
      router.push(`/poses?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <section className="bg-slate-medical py-20">
      <div className="container mx-auto px-4">
        {/* Hero Text */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-navy-500 mb-6 leading-tight min-h-[160px] md:min-h-[180px] flex items-center justify-center">
            <span 
              className={`transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              style={{ display: 'block' }}
            >
              {headlines[currentHeadline].line1}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-coral-400 mt-2">
                {headlines[currentHeadline].line2}
              </span>
            </span>
          </h1>
          
          {/* Rotating Expert Quotes */}
          <div className="max-w-3xl mx-auto mb-6 min-h-[120px] flex items-center justify-center">
            <div 
              className={`transition-opacity duration-1000 ease-in-out ${isQuoteVisible ? 'opacity-100' : 'opacity-60'}`}
            >
              <blockquote className="text-lg md:text-xl text-slate-700 leading-relaxed italic mb-3">
                "{expertQuotes[currentQuote].quote}"
              </blockquote>
              <p className="text-sm text-slate-500">
                — <span className="font-semibold text-navy-500">{expertQuotes[currentQuote].expert}</span>, {expertQuotes[currentQuote].source}
              </p>
            </div>
          </div>

          <p className="text-base text-slate-500 mb-8">
            {totalCount}+ science-backed practices • Always free • No woo-woo
          </p>

          {/* Navigation Pills */}
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            <a
              href="/assessment"
              className="px-8 py-4 bg-coral hover:bg-coral-500 text-white font-bold rounded-full transition-all shadow-md hover:shadow-lg hover:scale-105"
            >
              Cortisol Assessment
            </a>
            <a
              href="/protocols"
              className="px-8 py-4 bg-navy-500 hover:bg-navy-600 text-white font-bold rounded-full transition-all shadow-md hover:shadow-lg hover:scale-105"
            >
              Our Protocols
            </a>
            <a
              href="/poses"
              className="px-8 py-4 border-2 border-navy-500 text-navy-500 hover:bg-navy-500 hover:text-white font-bold rounded-full transition-all hover:scale-105"
            >
              Yoga Poses
            </a>
            <a
              href="/science"
              className="px-8 py-4 border-2 border-gold-300 text-gold-300 hover:bg-gold-300 hover:text-navy-500 font-bold rounded-full transition-all hover:scale-105"
            >
              Baseline Science
            </a>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gold-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>No sign-up required</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gold-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>100% free forever</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gold-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Evidence-based guidance</span>
          </div>
        </div>
      </div>
    </section>
  )
}
