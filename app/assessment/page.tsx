'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Question {
  id: string
  text: string
  options: string[]
}

const questions: Question[] = [
  { id: 'q1', text: 'Cold hands and feet; prefer warmth and hot drinks', options: ['Never', 'Sometimes', 'Often', 'Always'] },
  { id: 'q2', text: 'Hot flashes, night sweats, or heat at night', options: ['Never', 'Sometimes', 'Often', 'Always'] },
  { id: 'q3', text: 'Dry mouth/throat, dry eyes or skin (especially at night)', options: ['Never', 'Sometimes', 'Often', 'Always'] },
  { id: 'q4', text: 'Insomnia or waking between 1–3 AM', options: ['Never', 'Sometimes', 'Often', 'Always'] },
  { id: 'q5', text: 'Low energy or fatigue, worse in mornings or after meals', options: ['Never', 'Sometimes', 'Often', 'Always'] },
  { id: 'q6', text: 'Irritability, tension in neck/shoulders, or stress headaches', options: ['Never', 'Sometimes', 'Often', 'Always'] },
  { id: 'q7', text: 'Bloating, heaviness, or loose stools', options: ['Never', 'Sometimes', 'Often', 'Always'] },
  { id: 'q8', text: 'Thirst for small sips; prefer room‑temperature water', options: ['Never', 'Sometimes', 'Often', 'Always'] },
  { id: 'q9', text: 'Palpitations, restlessness, or anxious heat', options: ['Never', 'Sometimes', 'Often', 'Always'] },
  { id: 'q10', text: 'Sensitive to cold weather and AC', options: ['Never', 'Sometimes', 'Often', 'Always'] },
  { id: 'q11', text: 'Red face/eyes, feel hotter with stress', options: ['Never', 'Sometimes', 'Often', 'Always'] },
  { id: 'q12', text: 'Feel better with warmth; worse with cold/raw foods', options: ['Never', 'Sometimes', 'Often', 'Always'] },
]

type ResultKey = 'yinDef' | 'yangDef' | 'heatExcess' | 'balanced'

const profiles: Record<ResultKey, {
  title: string
  icon: string
  description: string
  guidance: string
  points: string[]
  protocols: string[]
}> = {
  yinDef: {
    title: 'Yin‑Deficient Pattern',
    icon: '🌙',
    description: 'Signs of fluid/"cooling" deficiency: dryness, heat at night, light sleep.',
    guidance: 'Focus on calming, nourishing pressure with gentle holds. Avoid intense heat and late nights.',
    points: ['KI3 (Kidney 3)', 'SP6 (Spleen 6)', 'HT7 (Heart 7)'],
    protocols: ['Insomnia Support', 'Calm Heart Sequence']
  },
  yangDef: {
    title: 'Yang‑Deficient Pattern',
    icon: '❄️',
    description: 'Signs of warming/activation deficiency: cold limbs, low energy, sluggish digestion.',
    guidance: 'Use warming, steady pressure and keep core warm. Prefer cooked, warm foods.',
    points: ['ST36 (Stomach 36)', 'CV6 (Conception 6)', 'KI3 (Kidney 3)'],
    protocols: ['Morning Warm‑Up', 'Digestive Boost']
  },
  heatExcess: {
    title: 'Heat / Yang Rising Pattern',
    icon: '🔥',
    description: 'Signs of excess heat or tension: irritability, red face/eyes, tension headaches.',
    guidance: 'Apply cooling, dispersing pressure. Breathe slowly and lengthen exhale.',
    points: ['LI11 (Large Intestine 11)', 'LI4 (Large Intestine 4)', 'LV3 (Liver 3)', 'GB20 (Gallbladder 20)'],
    protocols: ['Headache Relief', 'Stress Cool‑Down']
  },
  balanced: {
    title: 'Balanced (Minor Variations)',
    icon: '🟢',
    description: 'No dominant pattern detected. Mild fluctuations are normal.',
    guidance: 'Maintain daily self‑care. Use general points for resilience.',
    points: ['LI4', 'PC6', 'ST36'],
    protocols: ['Daily Maintenance', 'Evening Wind‑Down']
  }
}

export default function AssessmentPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [result, setResult] = useState<ResultKey | null>(null)

  const handleAnswer = (value: number) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: value }
    setAnswers(newAnswers)
    if (currentQuestion < questions.length - 1) setCurrentQuestion(currentQuestion + 1)
    else calculateResult(newAnswers)
  }

  const calculateResult = (finalAnswers: Record<string, number>) => {
    let yin = 0, yang = 0, heat = 0

    const add = (k: 'yin'|'yang'|'heat', v: number, w = 1) => {
      const inc = v * w
      if (k === 'yin') yin += inc
      if (k === 'yang') yang += inc
      if (k === 'heat') heat += inc
    }

    const v = (id: string) => finalAnswers[id] || 0
    // Map questions to patterns
    add('yang', v('q1'), 2)
    add('heat', v('q2'), 1); add('yin', v('q2'), 2)
    add('yin', v('q3'), 2)
    add('yin', v('q4'), 1); add('heat', v('q4'), 1)
    add('yang', v('q5'), 1)
    add('heat', v('q6'), 2)
    add('yang', v('q7'), 1)
    add('yin', v('q8'), 1)
    add('heat', v('q9'), 1); add('yin', v('q9'), 1)
    add('yang', v('q10'), 1)
    add('heat', v('q11'), 1)
    add('yang', v('q12'), 1)

    const scores = [
      { key: 'yinDef' as const, val: yin },
      { key: 'yangDef' as const, val: yang },
      { key: 'heatExcess' as const, val: heat },
    ].sort((a,b) => b.val - a.val)

    const top = scores[0]
    const threshold = 4
    if (!top || top.val < threshold) setResult('balanced')
    else setResult(top.key)
  }

  const goBack = () => { if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1) }
  const restart = () => { setCurrentQuestion(0); setAnswers({}); setResult(null) }

  if (result) {
    const profile = profiles[result]
    return (
      <div className="min-h-screen bg-slate-medical">
        {/* Header */}
        <header className="bg-slate-medical border-b border-slate-200">
          <div className="container mx-auto px-4 py-6">
            <Link href="/" className="text-2xl font-heading font-bold text-deep-teal">
              Accucentral
            </Link>
          </div>
        </header>

        {/* Results */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-8xl mb-4">{profile.icon}</div>
              <h1 className="text-5xl font-heading font-bold text-charcoal mb-4">
                Yin–Yang Energy Assessment Result
              </h1>
              <p className="text-xl text-slate-600">
                {profile.title} — {profile.description}
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-slate-200 mb-8">
              <h2 className="text-2xl font-heading font-bold text-deep-teal mb-3">Guidance</h2>
              <p className="text-slate-700">{profile.guidance}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-slate-200">
                <h3 className="text-xl font-heading font-bold text-deep-teal mb-4">Suggested Points</h3>
                <ul className="space-y-2 text-slate-700">
                  {profile.points.map((p, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-calm-blue">•</span>
                      <a className="hover:text-calm-blue" href={`/points?search=${encodeURIComponent(p)}`}>{p}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-slate-200">
                <h3 className="text-xl font-heading font-bold text-deep-teal mb-4">Suggested Protocols</h3>
                <ul className="space-y-2 text-slate-700">
                  {profile.protocols.map((p, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-sage-green">→</span>
                      <a className="hover:text-calm-blue" href={`/protocols?search=${encodeURIComponent(p)}`}>{p}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Technique Guidance per Point */}
            <TechniqueGuidance points={profile.points} />

            <div className="flex gap-4 justify-center">
              <button
                onClick={restart}
                className="px-6 py-3 border-2 border-slate-300 text-slate-600 font-semibold rounded-lg hover:border-slate-400 transition-colors"
              >
                Retake Assessment
              </button>
              <Link
                href="/points"
                className="px-6 py-3 bg-deep-teal hover:bg-deep-teal-600 text-white font-semibold rounded-lg transition-colors"
              >
                Browse Points
              </Link>
            </div>

            <p className="text-xs text-slate-500 mt-8 text-center">
              This self‑assessment is educational and not a medical diagnosis. If you have health concerns, consult a qualified practitioner.
            </p>
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
          <Link href="/" className="text-2xl font-heading font-bold text-deep-teal">
            Accucentral
          </Link>
        </div>
      </header>

      {/* Intro */}
      <div className="container mx-auto px-4 pt-12">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <h1 className="text-4xl font-heading font-bold text-charcoal mb-3">Yin–Yang Energy Assessment</h1>
          <p className="text-slate-600">
            A quick self‑check inspired by traditional East Asian frameworks. Learn which pattern is most dominant for you today—and which pressure points can help. 
          </p>
        </div>
      </div>

      {/* Quiz */}
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-slate-600 mb-2">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% complete</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className="bg-calm-blue h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-slate-200 mb-6">
            <h2 className="text-2xl font-heading font-bold text-deep-teal mb-8">
              {questions[currentQuestion].text}
            </h2>
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className="w-full text-left px-6 py-4 bg-slate-50 hover:bg-calm-blue/10 border-2 border-slate-200 hover:border-calm-blue rounded-lg transition-all font-medium text-slate-700"
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
              className="px-6 py-3 text-slate-600 hover:text-deep-teal font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              ← Back
            </button>
            <Link
              href="/"
              className="px-6 py-3 text-slate-600 hover:text-deep-teal font-semibold transition-colors"
            >
              Exit
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// --- Technique Guidance Component ---
function TechniqueGuidance({ points }: { points: string[] }) {
  const extractCode = (label: string) => {
    const m = label.match(/^[A-Z]{1,2}\d+/)
    if (m) return m[0]
    const beforeParen = label.split('(')[0].trim()
    return beforeParen.split(' ')[0]
  }

  const technique: Record<string, { duration: string; pressure: string; frequency: string; caution?: string }> = {
    LI4: { duration: '30–60 seconds each side', pressure: 'Moderate, firm but comfortable', frequency: '2–3 times daily', caution: 'Avoid during pregnancy' },
    SP6: { duration: '30–60 seconds each side', pressure: 'Gentle to moderate', frequency: '1–2 times daily', caution: 'Avoid during pregnancy' },
    HT7: { duration: '60–90 seconds', pressure: 'Gentle, steady', frequency: 'Evening or when anxious' },
    ST36: { duration: '60 seconds each side', pressure: 'Moderate', frequency: 'Daily, especially mornings' },
    KI3: { duration: '60 seconds each side', pressure: 'Gentle to moderate', frequency: 'Daily' },
    CV6: { duration: '60 seconds', pressure: 'Gentle, vertical pressure', frequency: 'Daily, especially mornings' },
    LV3: { duration: '30–60 seconds each side', pressure: 'Moderate', frequency: '1–2 times daily' },
    GB20: { duration: '30–60 seconds', pressure: 'Gentle to moderate with head support', frequency: 'As needed for tension' },
    PC6: { duration: '60 seconds each side', pressure: 'Gentle to moderate', frequency: 'As needed for nausea or anxiety' },
    LI11: { duration: '30–60 seconds each side', pressure: 'Moderate', frequency: 'As needed for heat/tension' },
  }

  const uniqueCodes = Array.from(new Set(points.map(extractCode)))

  return (
    <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-slate-200 mb-8">
      <h3 className="text-2xl font-heading font-bold text-deep-teal mb-4">Technique Guidance</h3>
      <p className="text-slate-700 mb-4">Use slow, steady pressure. Breathe through the sensation and ease off if painful or numb.</p>
      <div className="grid md:grid-cols-2 gap-4">
        {uniqueCodes.map((code) => {
          const t = technique[code]
          return (
            <div key={code} className="border-2 border-slate-200 rounded-lg p-4">
              <div className="font-semibold text-charcoal mb-1">{code}</div>
              <div className="text-sm text-slate-700"><strong>Duration:</strong> {t?.duration || '30–60 seconds'}</div>
              <div className="text-sm text-slate-700"><strong>Pressure:</strong> {t?.pressure || 'Gentle to moderate'}</div>
              <div className="text-sm text-slate-700"><strong>Frequency:</strong> {t?.frequency || '1–2 times daily'}</div>
              {t?.caution && <div className="text-xs text-warm-coral mt-1"><strong>Caution:</strong> {t.caution}</div>}
            </div>
          )
        })}
      </div>
      <p className="text-xs text-slate-500 mt-4">These guidelines are educational and not a substitute for clinical advice.</p>
    </div>
  )
}
