'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Question {
  id: string
  text: string
  options: string[]
}

const questions: Question[] = [
  {
    id: 'q1',
    text: 'Do you feel cold hands and feet often?',
    options: ['Never', 'Sometimes', 'Often', 'Always']
  },
  {
    id: 'q2',
    text: 'Do you experience low energy and fatigue?',
    options: ['Never', 'Sometimes', 'Often', 'Always']
  },
  {
    id: 'q3',
    text: 'Do you prefer warm drinks and warm environments?',
    options: ['Never', 'Sometimes', 'Often', 'Always']
  },
  {
    id: 'q4',
    text: 'Do you feel irritable or restless?',
    options: ['Never', 'Sometimes', 'Often', 'Always']
  },
  {
    id: 'q5',
    text: 'Do you experience excessive thirst or dry mouth?',
    options: ['Never', 'Sometimes', 'Often', 'Always']
  },
  {
    id: 'q6',
    text: 'Do you have digestive issues (bloating, constipation)?',
    options: ['Never', 'Sometimes', 'Often', 'Always']
  },
  {
    id: 'q7',
    text: 'Do you have trouble sleeping or restless sleep?',
    options: ['Never', 'Sometimes', 'Often', 'Always']
  },
  {
    id: 'q8',
    text: 'Do you feel hot or warm most of the time?',
    options: ['Never', 'Sometimes', 'Often', 'Always']
  },
  {
    id: 'q9',
    text: 'Do you prefer cold drinks and cool environments?',
    options: ['Never', 'Sometimes', 'Often', 'Always']
  },
  {
    id: 'q10',
    text: 'Do you feel anxious or overwhelmed?',
    options: ['Never', 'Sometimes', 'Often', 'Always']
  }
]

const profiles = {
  yin: {
    title: 'Yin Deficiency',
    icon: '☯️',
    color: 'calm-blue',
    description: 'You show signs of Yin deficiency—lack of cooling, nourishing energy. Your body may feel depleted and overheated.',
    symptoms: [
      'Hot hands and feet',
      'Night sweats',
      'Restlessness and anxiety',
      'Dry mouth and throat',
      'Difficulty sleeping'
    ],
    recommendations: [
      'Cooling acupressure points',
      'Rest and restorative practices',
      'Hydrating foods and drinks',
      'Evening relaxation routines'
    ],
    services: ['Insomnia Treatment', 'Anxiety Relief']
  },
  yang: {
    title: 'Yang Deficiency',
    icon: '☯️',
    color: 'warm-coral',
    description: 'You show signs of Yang deficiency—lack of warming, activating energy. Your body may feel cold and fatigued.',
    symptoms: [
      'Cold hands and feet',
      'Low energy and fatigue',
      'Preference for warm environments',
      'Sluggish digestion',
      'Low motivation'
    ],
    recommendations: [
      'Warming acupressure points',
      'Gentle movement and circulation',
      'Warming foods and beverages',
      'Morning activation practices'
    ],
    services: ['Tech-Neck Relief', 'Digestive Support']
  },
  balanced: {
    title: 'Balanced',
    icon: '⚖️',
    color: 'sage-green',
    description: 'You show good Yin-Yang balance. Maintain this harmony with regular acupressure and mindful self-care.',
    symptoms: [
      'Good energy levels',
      'Comfortable body temperature',
      'Restful sleep',
      'Healthy digestion'
    ],
    recommendations: [
      'Maintenance acupressure sessions',
      'Continue current wellness practices',
      'Seasonal adjustments as needed',
      'Preventive care'
    ],
    services: ['Tech-Neck Relief', 'Stress & Anxiety Management']
  }
}

export default function AssessmentPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [result, setResult] = useState<'yin' | 'yang' | 'balanced' | null>(null)

  const handleAnswer = (value: number) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: value }
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      calculateResult(newAnswers)
    }
  }

  const calculateResult = (finalAnswers: Record<string, number>) => {
    // Yin deficiency indicators: hot, dry, restless (q4, q5, q7, q8, q9, q10)
    const yinScore = (finalAnswers['q4'] || 0) + (finalAnswers['q5'] || 0) +
                     (finalAnswers['q7'] || 0) + (finalAnswers['q8'] || 0) +
                     (finalAnswers['q9'] || 0) + (finalAnswers['q10'] || 0)

    // Yang deficiency indicators: cold, fatigued, sluggish (q1, q2, q3, q6)
    const yangScore = (finalAnswers['q1'] || 0) + (finalAnswers['q2'] || 0) +
                      (finalAnswers['q3'] || 0) + (finalAnswers['q6'] || 0)

    // Determine profile
    if (yinScore > 12) {
      setResult('yin')
    } else if (yangScore > 8) {
      setResult('yang')
    } else {
      setResult('balanced')
    }
  }

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const restart = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setResult(null)
  }

  if (result) {
    const profile = profiles[result]
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
                <Link href="/points" className="text-slate-gray hover:text-deep-teal font-medium transition-colors">
                  Points
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

        {/* Results */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-8xl mb-4">{profile.icon}</div>
              <h1 className="text-5xl font-heading font-bold text-deep-teal mb-4">
                Your Profile: {profile.title}
              </h1>
              <p className="text-xl text-slate-700">
                {profile.description}
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-sage-green/30 mb-8">
              <h2 className="text-2xl font-heading font-bold text-deep-teal mb-4">
                Your Symptoms
              </h2>
              <ul className="space-y-3">
                {profile.symptoms.map((symptom, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-sage-green text-xl">•</span>
                    <span className="text-slate-700">{symptom}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-calm-blue/30 mb-8">
              <h2 className="text-2xl font-heading font-bold text-deep-teal mb-4">
                Recommendations
              </h2>
              <ul className="space-y-3">
                {profile.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-calm-blue text-xl">✓</span>
                    <span className="text-slate-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-warm-coral/30 mb-8">
              <h2 className="text-2xl font-heading font-bold text-deep-teal mb-4">
                Recommended Services
              </h2>
              <div className="space-y-3">
                {profile.services.map((service, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="text-warm-coral text-xl">→</span>
                    <Link href="/protocols" className="text-deep-teal hover:text-calm-blue underline">
                      {service}
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={restart}
                className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition"
              >
                Retake Assessment
              </button>
              <Link
                href="/book"
                className="px-6 py-3 bg-[#F4A261] text-white font-semibold rounded-lg hover:bg-[#E96F1C] transition shadow-md"
              >
                Book Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

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
              <Link href="/points" className="text-slate-gray hover:text-deep-teal font-medium transition-colors">
                Points
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

      {/* Assessment */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-deep-teal mb-4">
              Yin-Yang Balance Assessment
            </h1>
            <p className="text-lg text-slate-700">
              Discover your energy profile and get personalized acupressure recommendations
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-sage-green/30">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-slate-600">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span className="text-sm text-slate-600">
                  {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className="bg-sage-green h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            <h2 className="text-2xl font-heading font-bold text-deep-teal mb-8">
              {questions[currentQuestion].text}
            </h2>

            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className="w-full px-6 py-4 bg-slate-50 hover:bg-sage-green/10 border-2 border-slate-200 hover:border-sage-green rounded-lg text-left transition-all font-medium text-slate-700 hover:text-deep-teal"
                >
                  {option}
                </button>
              ))}
            </div>

            {currentQuestion > 0 && (
              <button
                onClick={goBack}
                className="mt-6 px-4 py-2 text-slate-600 hover:text-deep-teal transition"
              >
                ← Back
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
