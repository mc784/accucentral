'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPatientById, calculateProgress, shouldShowRenewalAlert, packageTemplates } from '@/data/patients'
import type { Patient } from '@/data/patients'

interface PatientPageProps {
  params: Promise<{
    id: string
  }>
}

export default function PatientDashboard({ params }: PatientPageProps) {
  const [patient, setPatient] = useState<Patient | null>(null)
  const [id, setId] = useState<string>('')

  useEffect(() => {
    params.then(p => {
      setId(p.id)
      const patientData = getPatientById(p.id)
      if (patientData) {
        setPatient(patientData)
      }
    })
  }, [params])

  if (!patient) {
    return notFound()
  }

  const progress = calculateProgress(patient)
  const showRenewal = shouldShowRenewalAlert(patient)

  // Prepare chart data
  const chartData = patient.painScoreHistory.map(entry => ({
    x: entry.date,
    y: entry.painScore,
    session: entry.sessionNumber,
  }))

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-heading font-bold text-deep-teal">
              Accucentral
            </Link>
            <div className="text-sm text-slate-600">
              Patient ID: <span className="font-semibold">{patient.id}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Renewal Alert */}
      {showRenewal && (
        <div className="bg-warm-coral text-white py-4">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="font-bold text-lg mb-2">⚠️ Only {patient.activePackage.sessionsRemaining} Session Remaining!</p>
            <p className="text-sm mb-3">Don't break your progress streak. Renew your package now.</p>
            <button className="px-6 py-2 bg-white text-warm-coral font-bold rounded-lg hover:bg-slate-100 transition">
              Renew Package →
            </button>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Greeting */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-deep-teal mb-2">
            Hello, {patient.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-lg text-slate-600">Your Journey: <span className="font-semibold text-deep-teal">{patient.condition}</span></p>
        </div>

        {/* Progress Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-sage-green">
            <div className="text-sm text-slate-600 mb-1">Pain Reduction</div>
            <div className="text-4xl font-bold text-sage-green-700">{progress.painReductionPercent}%</div>
            <div className="text-xs text-slate-500 mt-1">
              {patient.initialPainScore} → {patient.currentPainScore} (on 1-10 scale)
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-deep-teal">
            <div className="text-sm text-slate-600 mb-1">Progress</div>
            <div className="text-4xl font-bold text-deep-teal">{Math.round(progress.percentComplete)}%</div>
            <div className="text-xs text-slate-500 mt-1">
              {patient.activePackage.sessionsCompleted} of {patient.activePackage.totalSessions} sessions
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-warm-coral">
            <div className="text-sm text-slate-600 mb-1">Trend</div>
            <div className="text-2xl font-bold text-warm-coral flex items-center gap-2">
              {progress.trend === 'improving' && '📈 Improving'}
              {progress.trend === 'stable' && '➡️ Stable'}
              {progress.trend === 'worsening' && '📉 Attention'}
            </div>
            <div className="text-xs text-slate-500 mt-1">Based on last 3 sessions</div>
          </div>
        </div>

        {/* Pain Level Chart */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-heading font-bold text-deep-teal mb-6">Your Pain Journey</h2>

          {/* Simple Chart using HTML/CSS */}
          <div className="relative h-80 mb-4">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-xs text-slate-500">
              {[10, 8, 6, 4, 2, 0].map(num => (
                <div key={num} className="text-right pr-2">{num}</div>
              ))}
            </div>

            {/* Chart area */}
            <div className="ml-12 h-full border-l-2 border-b-2 border-slate-300 relative">
              {/* Grid lines */}
              {[0, 20, 40, 60, 80, 100].map(percent => (
                <div
                  key={percent}
                  className="absolute left-0 right-0 border-t border-slate-200"
                  style={{ bottom: `${percent}%` }}
                />
              ))}

              {/* Data points and line */}
              <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
                {/* Line connecting points */}
                <polyline
                  points={chartData.map((point, idx) => {
                    const x = (idx / (chartData.length - 1)) * 100;
                    const y = 100 - (point.y / 10) * 100;
                    return `${x}%,${y}%`;
                  }).join(' ')}
                  fill="none"
                  stroke="#4A7C7E"
                  strokeWidth="3"
                  className="drop-shadow-md"
                />

                {/* Points */}
                {chartData.map((point, idx) => {
                  const x = (idx / (chartData.length - 1)) * 100;
                  const y = 100 - (point.y / 10) * 100;
                  return (
                    <g key={idx}>
                      <circle
                        cx={`${x}%`}
                        cy={`${y}%`}
                        r="6"
                        fill="#F4A261"
                        stroke="white"
                        strokeWidth="2"
                        className="drop-shadow-lg"
                      />
                      <text
                        x={`${x}%`}
                        y={`${y}%`}
                        dy="-12"
                        textAnchor="middle"
                        className="text-xs font-bold fill-deep-teal"
                      >
                        {point.y}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* X-axis labels (dates) */}
          <div className="ml-12 flex justify-between text-xs text-slate-500">
            <span>{chartData[0]?.x}</span>
            <span>Today</span>
          </div>

          {/* Legend */}
          <div className="mt-6 flex justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#F4A261]"></div>
              <span>Pain Level</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-1 bg-deep-teal"></div>
              <span>Trend Line</span>
            </div>
          </div>
        </div>

        {/* Session Balance */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-heading font-bold text-deep-teal mb-6">Sessions Balance</h2>

          {/* Visual Session Tracker */}
          <div className="flex flex-wrap gap-3 mb-6">
            {Array.from({ length: patient.activePackage.totalSessions }).map((_, idx) => (
              <div
                key={idx}
                className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-sm ${
                  idx < patient.activePackage.sessionsCompleted
                    ? 'bg-sage-green text-white'
                    : 'bg-slate-200 text-slate-400'
                }`}
              >
                {idx < patient.activePackage.sessionsCompleted ? '✓' : idx + 1}
              </div>
            ))}
          </div>

          <div className="bg-slate-50 rounded-lg p-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-sage-green-700">{patient.activePackage.sessionsCompleted}</div>
                <div className="text-sm text-slate-600">Completed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-deep-teal">{patient.activePackage.sessionsRemaining}</div>
                <div className="text-sm text-slate-600">Remaining</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-warm-coral">{patient.activePackage.totalSessions}</div>
                <div className="text-sm text-slate-600">Total</div>
              </div>
            </div>
          </div>

          {/* Next Session */}
          {patient.nextSessionDate && (
            <div className="mt-6 bg-deep-teal/10 border border-deep-teal/30 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-slate-600">Next Session</div>
                  <div className="text-lg font-bold text-deep-teal">{patient.nextSessionDate}</div>
                </div>
                <Link
                  href={`https://wa.me/919876543210?text=${encodeURIComponent('I want to confirm my next session')}`}
                  target="_blank"
                  className="px-6 py-3 bg-deep-teal text-white font-bold rounded-lg hover:bg-deep-teal/90 transition"
                >
                  Confirm Session
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Today's Homework */}
        {patient.homeworkVideoUrl && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-heading font-bold text-deep-teal mb-6">Today's Homework</h2>

            <div className="bg-gradient-to-r from-sage-green/20 to-calm-blue/20 rounded-xl p-6">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                {/* Video Thumbnail */}
                <div className="w-full md:w-48 h-32 bg-slate-200 rounded-lg overflow-hidden flex-shrink-0">
                  <iframe
                    width="100%"
                    height="100%"
                    src={patient.homeworkVideoUrl.replace('watch?v=', 'embed/')}
                    title={patient.homeworkTitle}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>

                {/* Details */}
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-deep-teal mb-2">{patient.homeworkTitle}</h3>
                  <p className="text-slate-600 mb-4">Do this <span className="font-bold text-warm-coral">{patient.homeworkFrequency}</span></p>
                  <a
                    href={patient.homeworkVideoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-deep-teal text-white font-bold rounded-lg hover:bg-deep-teal/90 transition"
                  >
                    Watch Full Video →
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA Footer */}
        <div className="bg-gradient-to-r from-deep-teal to-calm-blue rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-heading font-bold mb-3">Keep Up The Great Work!</h2>
          <p className="text-lg mb-6 text-white/90">
            Your {progress.painReductionPercent}% pain reduction is amazing. Stay consistent with your sessions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/protocols"
              className="px-8 py-4 bg-white text-deep-teal font-bold rounded-lg hover:bg-slate-100 transition"
            >
              Explore More Services
            </Link>
            <a
              href={`https://wa.me/919876543210?text=${encodeURIComponent('I need help with my treatment')}`}
              target="_blank"
              className="px-8 py-4 bg-[#25D366] text-white font-bold rounded-lg hover:bg-[#20BA5A] transition flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
