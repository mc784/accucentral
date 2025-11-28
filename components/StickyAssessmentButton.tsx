'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export function StickyAssessmentButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button after scrolling past hero (approximately 800px)
      if (window.scrollY > 800) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  return (
    <div
      className={`fixed bottom-8 right-8 z-50 hidden md:block transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <Link
        href="/assessment"
        className="px-6 py-4 bg-warm-coral hover:bg-warm-coral-500 text-white font-bold rounded-full shadow-2xl hover:shadow-warm-coral/50 transition-all flex items-center gap-2 group"
      >
        Yin–Yang Energy Assessment
        <svg 
          className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  )
}
