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
    text: 'Do you wake up with a racing heart or feeling anxious?',
    options: ['Never', 'Sometimes', 'Often', 'Always']
  },
  {
    id: 'q2',
    text: 'Do you experience an energy crash around 3 PM?',
    options: ['Never', 'Sometimes', 'Often', 'Always']
  },
  {
    id: 'q3',
    text: 'Do you scroll social media or check news to "relax"?',
    options: ['Never', 'Sometimes', 'Often', 'Always']
  },
  {
    id: 'q4',
    text: 'Do you have trouble falling asleep despite being exhausted?',
    options: ['Never', 'Sometimes', 'Often', 'Always']
  },
  {
    id: 'q5',
    text: 'Do you wake up between 2-4 AM and struggle to fall back asleep?',
    options: ['Never', 'Sometimes', 'Often', 'Always']
  },
  {
    id: 'q6',
    text: 'Do you get "hangry" (hungry + angry) easily?',
    options: ['Never', 'Sometimes', 'Often', 'Always']
  },
  {
    id: 'q7',
    text: 'Do you have belly fat despite regular exercise?',
    options: ['No', 'A little', 'Moderate', 'Significant']
  },
  {
    id: 'q8',
    text: 'Is your face puffy or bloated in the morning?',
    options: ['Never', 'Sometimes', 'Often', 'Always']
  },
  {
    id: 'q9',
    text: 'Do you crave sugar or caffeine to get through the day?',
    options: ['Never', 'Sometimes', 'Often', 'Always']
  },
  {
    id: 'q10',
    text: 'Do you feel "tired but wired"—exhausted yet unable to rest?',
    options: ['Never', 'Sometimes', 'Often', 'Always']
  }
]

const profiles = {
  spiker: {
    title: 'The Spiker',
    icon: '🔥',
    color: 'coral',
    description: 'You have high morning cortisol that crashes later. Your nervous system starts the day in overdrive.',
    symptoms: [
      'Morning anxiety or racing heart',
      'Afternoon energy crash',
      'Difficulty winding down at night'
    ],
    recommendations: [
      'Active morning movement to burn off cortisol',
      'Gentle stretching in the afternoon',
      'Evening restorative practices'
    ],
    programs: ['The Executive Reset', '5-Minute Morning Flush']
  },
  flatliner: {
    title: 'The Flatliner',
    icon: '😴',
    color: 'slate-500',
    description: 'Your cortisol is chronically low. You are in a state of burnout, with little energy throughout the day.',
    symptoms: [
      'Chronic exhaustion all day',
      'Difficulty getting out of bed',
      'Low motivation and brain fog'
    ],
    recommendations: [
      'Gentle, restorative yoga',
      'Breathwork to reawaken your system',
      'Prioritize rest and recovery'
    ],
    programs: ['The 7-Day Cortisol Detox', 'Gentle Restoration Protocol']
  },
  nightOwl: {
    title: 'The Night Owl',
    icon: '🌙',
    color: 'navy-500',
    description: 'Your cortisol curve is reversed—low in the morning, high at night. This disrupts your sleep-wake cycle.',
    symptoms: [
      'Wired at night, cannot fall asleep',
      'Wake up groggy and unmotivated',
      'Second wind of energy late evening'
    ],
    recommendations: [
      'Morning light exposure + gentle movement',
      'Afternoon grounding practices',
      'Strong evening wind-down routine'
    ],
    programs: ['The Sleep Protocol', 'Evening Wind-Down Sequence']
  }
}

export default function AssessmentPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [result, setResult] = useState<'spiker' | 'flatliner' | 'nightOwl' | null>(null)

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
    // Simple scoring logic
    const morningAnxiety = finalAnswers['q1'] || 0
    const afternoonCrash = finalAnswers['q2'] || 0
    const sleepTrouble = finalAnswers['q4'] || 0
    const nightWake = finalAnswers['q5'] || 0
    const tiredButWired = finalAnswers['q10'] || 0

    const spikerScore = morningAnxiety + afternoonCrash
    const nightOwlScore = sleepTrouble + nightWake + tiredButWired
    const totalScore = Object.values(finalAnswers).reduce((a, b) => a + b, 0)

    // Determine profile
    if (nightOwlScore > 8 && sleepTrouble > 2) {
      setResult('nightOwl')
    } else if (spikerScore > 5 && morningAnxiety > 2) {
      setResult('spiker')
    } else {
      setResult('flatliner')
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
            <Link href="/" className="text-2xl font-heading font-bold text-navy-500">
              VrikshaYoga
            </Link>
          </div>
        </header>

        {/* Results */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-8xl mb-4">{profile.icon}</div>
              <h1 className="text-5xl font-heading font-bold text-navy-500 mb-4">
                Your Profile: {profile.title}
              </h1>
              <p className="text-xl text-slate-600">
                {profile.description}
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-gold-300/30 mb-8">
              <h2 className="text-2xl font-heading font-bold text-navy-500 mb-4">
                Your Symptoms
              </h2>
              <ul className="space-y-3">
                {profile.symptoms.map((symptom, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-600">
                    <span className="text-coral text-xl">•</span>
                    <span>{symptom}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-gold-300/30 mb-8">
              <h2 className="text-2xl font-heading font-bold text-navy-500 mb-4">
                What You Need
              </h2>
              <ul className="space-y-3">
                {profile.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-600">
                    <span className="text-gold-300 text-xl">✓</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-navy-500 text-white rounded-xl p-8 shadow-lg mb-8">
              <h2 className="text-2xl font-heading font-bold mb-4">
                Recommended Programs
              </h2>
              <ul className="space-y-2 mb-6">
                {profile.programs.map((program, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-gold-300">→</span>
                    <span>{program}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/programs"
                className="inline-block px-6 py-3 bg-coral hover:bg-coral-500 text-white font-semibold rounded-lg transition-colors"
              >
                Explore Programs →
              </Link>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={restart}
                className="px-6 py-3 border-2 border-slate-300 text-slate-600 font-semibold rounded-lg hover:border-slate-400 transition-colors"
              >
                Retake Assessment
              </button>
              <Link
                href="/poses"
                className="px-6 py-3 bg-navy-500 hover:bg-navy-600 text-white font-semibold rounded-lg transition-colors"
              >
                Browse All Poses
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
          <Link href="/" className="text-2xl font-heading font-bold text-navy-500">
            VrikshaYoga
          </Link>
        </div>
      </header>

      {/* Quiz */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-slate-600 mb-2">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% complete</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className="bg-gold-300 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-slate-200 mb-6">
            <h2 className="text-2xl font-heading font-bold text-navy-500 mb-8">
              {questions[currentQuestion].text}
            </h2>
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className="w-full text-left px-6 py-4 bg-slate-50 hover:bg-gold-300/10 border-2 border-slate-200 hover:border-gold-300 rounded-lg transition-all font-medium text-slate-700"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={goBack}
              disabled={currentQuestion === 0}
              className="px-6 py-3 text-slate-600 hover:text-navy-500 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              ← Back
            </button>
            <Link
              href="/"
              className="px-6 py-3 text-slate-600 hover:text-navy-500 font-semibold transition-colors"
            >
              Exit Quiz
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
