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

  // Assessment sticky button removed per request - component kept for future use
  return null
}
