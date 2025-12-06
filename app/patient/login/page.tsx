'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function PatientLoginPage() {
  const router = useRouter()
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    // Validate phone number
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError('Please enter a valid 10-digit mobile number')
      return
    }

    setLoading(true)
    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: `+91${phone}` }),
      })

      if (!response.ok) throw new Error('Failed to send OTP')

      setStep('otp')
      setError('')
    } catch (err) {
      setError('Failed to send OTP. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (otp.length !== 6) {
      setError('Please enter a 6-digit OTP')
      return
    }

    setLoading(true)
    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: `+91${phone}`, otp }),
      })

      if (!response.ok) throw new Error('Invalid OTP')

      const data = await response.json()
      
      // Store token and patient ID
      localStorage.setItem('auth_token', data.token)
      localStorage.setItem('patient_id', data.patientId)

      // Redirect to dashboard
      router.push(`/patient/${data.patientId}`)
    } catch (err) {
      setError('Invalid OTP. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setError('')
    setLoading(true)
    try {
      // TODO: Replace with actual API call
      await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: `+91${phone}` }),
      })
      setError('OTP resent successfully!')
      setTimeout(() => setError(''), 3000)
    } catch (err) {
      setError('Failed to resend OTP. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-bg-app">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-heading font-bold text-brand-indigo">
            Marma
          </Link>
          <Link href="/patient/book" className="text-sm text-slate-600 hover:text-brand-indigo">
            ← Back
          </Link>
        </div>
      </header>

      {/* Login Form */}
      <div className="max-w-md mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brand-indigo/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🔐</span>
          </div>
          <h1 className="text-3xl font-bold text-brand-charcoal mb-2">
            {step === 'phone' ? 'Welcome Back!' : 'Verify OTP'}
          </h1>
          <p className="text-slate-600">
            {step === 'phone' 
              ? 'Enter your mobile number to access your dashboard'
              : `We sent a 6-digit code to +91 ${phone}`
            }
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className={`mb-6 p-4 rounded-lg ${
            error.includes('success') 
              ? 'bg-brand-indigo/20 border border-brand-indigo/30 text-brand-indigo'
              : 'bg-brand-ochre/20 border border-brand-ochre/30 text-brand-ochre'
          }`}>
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Phone Number Step */}
        {step === 'phone' && (
          <div className="bg-white rounded-2xl shadow-xl p-8 pattern-bg">
            <form onSubmit={handleSendOTP}>
              <label className="block mb-6">
                <span className="block text-sm font-semibold text-slate-700 mb-2">
                  Mobile Number
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-slate-600 bg-slate-100 px-4 py-3 rounded-lg">
                    +91
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="9876543210"
                    className="flex-1 px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-brand-indigo text-lg"
                    maxLength={10}
                    required
                  />
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Enter the mobile number you used during booking
                </p>
              </label>

              <button
                type="submit"
                disabled={loading || phone.length !== 10}
                className="w-full bg-brand-indigo hover:bg-brand-indigo/90 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-colors shadow-lg"
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </form>

            {/* Alternative Actions */}
            <div className="mt-6 text-center">
              <p className="text-sm text-slate-600 mb-3">Don't have an account?</p>
              <Link
                href="/patient/book"
                className="text-brand-indigo font-semibold hover:underline"
              >
                Book Your First Session →
              </Link>
            </div>
          </div>
        )}

        {/* OTP Verification Step */}
        {step === 'otp' && (
          <div className="bg-white rounded-2xl shadow-xl p-8 pattern-bg">
            <form onSubmit={handleVerifyOTP}>
              <label className="block mb-6">
                <span className="block text-sm font-semibold text-slate-700 mb-2">
                  Enter 6-Digit OTP
                </span>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-brand-indigo text-2xl text-center tracking-widest font-bold"
                  maxLength={6}
                  required
                  autoFocus
                />
                <p className="text-xs text-slate-500 mt-2">
                  Check your SMS or WhatsApp for the code
                </p>
              </label>

              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full bg-brand-indigo hover:bg-brand-indigo/90 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-colors shadow-lg mb-4"
              >
                {loading ? 'Verifying...' : 'Verify & Login'}
              </button>

              {/* Resend OTP */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={loading}
                  className="text-sm text-brand-indigo font-semibold hover:underline disabled:opacity-50"
                >
                  Resend OTP
                </button>
              </div>
            </form>

            {/* Change Number */}
            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setStep('phone')
                  setOtp('')
                  setError('')
                }}
                className="text-sm text-slate-600 hover:text-brand-indigo"
              >
                ← Change Phone Number
              </button>
            </div>
          </div>
        )}

        {/* Trust Badges */}
        <div className="mt-12 grid grid-cols-2 gap-4 text-center">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="text-2xl mb-1">🔒</div>
            <p className="text-xs text-slate-600">Secure Login</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="text-2xl mb-1">⚡</div>
            <p className="text-xs text-slate-600">Instant Access</p>
          </div>
        </div>

        {/* Help */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-600 mb-2">Having trouble logging in?</p>
          <a
            href="https://wa.me/919876543210?text=I need help logging into my account"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-brand-indigo font-semibold hover:underline"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Contact Support
          </a>
        </div>
      </div>
    </div>
  )
}
