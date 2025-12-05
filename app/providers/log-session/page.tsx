'use client'

import { useState } from 'react'
import Link from 'next/link'
import { mockPatients } from '@/data/patients'

export default function LogSessionPage() {
  const [formData, setFormData] = useState({
    patientId: '',
    patientPhone: '',
    sessionDate: new Date().toISOString().split('T')[0],
    painScore: 5,
    notes: '',
  })

  const [searchResults, setSearchResults] = useState<typeof mockPatients>([])
  const [selectedPatient, setSelectedPatient] = useState<typeof mockPatients[0] | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const handlePhoneSearch = (phone: string) => {
    setFormData(prev => ({ ...prev, patientPhone: phone }))

    if (phone.length >= 10) {
      const results = mockPatients.filter(p => p.phone.includes(phone))
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }

  const selectPatient = (patient: typeof mockPatients[0]) => {
    setSelectedPatient(patient)
    setFormData(prev => ({
      ...prev,
      patientId: patient.id,
      patientPhone: patient.phone,
    }))
    setSearchResults([])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // In real app, this would:
    // 1. POST to API endpoint
    // 2. Update Google Sheet
    // 3. Send WhatsApp notification to admin
    // 4. Deduct session from patient balance

    console.log('Session logged:', formData)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))

    setSubmitted(true)

    // Reset form after 2 seconds
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        patientId: '',
        patientPhone: '',
        sessionDate: new Date().toISOString().split('T')[0],
        painScore: 5,
        notes: '',
      })
      setSelectedPatient(null)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-heading font-bold text-deep-teal">
              Accucentral
            </Link>
            <Link href="/providers/dashboard" className="text-slate-gray hover:text-deep-teal font-medium transition-colors">
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Success Message */}
        {submitted && (
          <div className="mb-8 bg-sage-green text-white rounded-xl p-6 text-center animate-bounce">
            <div className="text-4xl mb-2">✅</div>
            <div className="text-xl font-bold">Session Logged Successfully!</div>
            <div className="text-sm mt-2">Admin has been notified via WhatsApp</div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-heading font-bold text-deep-teal mb-2">
              Quick Session Log
            </h1>
            <p className="text-slate-600">Takes less than 30 seconds ⏱️</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Patient Search */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Patient Phone Number *
              </label>
              <input
                type="tel"
                value={formData.patientPhone}
                onChange={(e) => handlePhoneSearch(e.target.value)}
                placeholder="Enter 10-digit number"
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-deep-teal focus:outline-none text-lg"
                required
              />

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="mt-2 border-2 border-slate-200 rounded-lg overflow-hidden">
                  {searchResults.map(patient => (
                    <button
                      key={patient.id}
                      type="button"
                      onClick={() => selectPatient(patient)}
                      className="w-full p-4 text-left hover:bg-slate-50 border-b border-slate-100 last:border-b-0"
                    >
                      <div className="font-bold text-deep-teal">{patient.name}</div>
                      <div className="text-sm text-slate-600">{patient.phone} • {patient.condition}</div>
                    </button>
                  ))}
                </div>
              )}

              {/* Selected Patient */}
              {selectedPatient && (
                <div className="mt-3 bg-sage-green/10 border border-sage-green/30 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-deep-teal">{selectedPatient.name}</div>
                      <div className="text-sm text-slate-600">
                        {selectedPatient.condition} • Last Pain Score: {selectedPatient.currentPainScore}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        Sessions: {selectedPatient.activePackage.sessionsCompleted}/{selectedPatient.activePackage.totalSessions}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPatient(null)
                        setFormData(prev => ({ ...prev, patientId: '', patientPhone: '' }))
                      }}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Session Date */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Session Date *
              </label>
              <input
                type="date"
                value={formData.sessionDate}
                onChange={(e) => setFormData(prev => ({ ...prev, sessionDate: e.target.value }))}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-deep-teal focus:outline-none"
                required
              />
            </div>

            {/* Pain Score Slider */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Pain Score (1-10 Scale) *
              </label>

              <div className="bg-gradient-to-r from-sage-green via-warm-coral to-red-500 h-4 rounded-full mb-4"></div>

              <input
                type="range"
                min="1"
                max="10"
                value={formData.painScore}
                onChange={(e) => setFormData(prev => ({ ...prev, painScore: parseInt(e.target.value) }))}
                className="w-full h-3 bg-transparent appearance-none cursor-pointer"
                style={{
                  backgroundImage: 'linear-gradient(to right, #8FB996, #F4A261, #EF4444)',
                  borderRadius: '9999px',
                  marginTop: '-30px',
                }}
              />

              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>No Pain (1)</span>
                <span className="text-center">
                  <div className="text-4xl font-bold text-deep-teal">{formData.painScore}</div>
                  <div className="text-xs mt-1">
                    {formData.painScore <= 3 && 'Mild Pain'}
                    {formData.painScore > 3 && formData.painScore <= 6 && 'Moderate Pain'}
                    {formData.painScore > 6 && 'Severe Pain'}
                  </div>
                </span>
                <span>Severe Pain (10)</span>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Session Notes (Optional)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                rows={3}
                placeholder="Any observations or patient feedback..."
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-deep-teal focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!selectedPatient || submitted}
              className="w-full py-4 bg-deep-teal text-white font-bold text-lg rounded-lg hover:bg-deep-teal/90 transition disabled:bg-slate-300 disabled:cursor-not-allowed shadow-lg"
            >
              {submitted ? '✅ Logged!' : '📝 Log Session'}
            </button>
          </form>

          {/* Info Box */}
          <div className="mt-8 bg-calm-blue/10 border border-calm-blue/30 rounded-lg p-4">
            <h3 className="font-bold text-deep-teal mb-2 text-sm">What happens after you log?</h3>
            <ul className="text-xs text-slate-700 space-y-1">
              <li>✅ Session is deducted from patient's balance</li>
              <li>✅ Admin receives WhatsApp notification</li>
              <li>✅ Patient can see updated progress on their dashboard</li>
              <li>✅ Your commission is calculated automatically</li>
            </ul>
          </div>
        </div>

        {/* Quick Stats */}
        {selectedPatient && (
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <div className="text-2xl font-bold text-sage-green-700">
                {selectedPatient.activePackage.sessionsCompleted + 1}
              </div>
              <div className="text-xs text-slate-600">Next Session #</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <div className="text-2xl font-bold text-deep-teal">
                {selectedPatient.activePackage.sessionsRemaining - 1}
              </div>
              <div className="text-xs text-slate-600">After This Session</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <div className="text-2xl font-bold text-warm-coral">
                {selectedPatient.currentPainScore}
              </div>
              <div className="text-xs text-slate-600">Last Pain Score</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
