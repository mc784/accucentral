'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) throw new Error('Invalid credentials')

      const data = await response.json()
      
      // Store admin token
      localStorage.setItem('admin_token', data.token)
      
      // Redirect to admin dashboard
      router.push('/admin/dashboard')
    } catch (err) {
      setError('Invalid email or password')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-brand-indigo to-slate-800 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-block bg-white/10 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/20 mb-4">
            <h1 className="text-3xl font-heading font-bold text-white">Marma Admin</h1>
          </div>
          <p className="text-white/70">Pilot Program Management</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 pattern-bg">
          <h2 className="text-2xl font-bold text-brand-charcoal mb-6">Administrator Login</h2>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-brand-ochre/20 border border-brand-ochre/30 text-brand-ochre">
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@accucentral.com"
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-brand-indigo"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-brand-indigo"
                required
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded" />
                <span className="text-slate-600">Remember me</span>
              </label>
              <a href="#" className="text-brand-indigo font-semibold hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-indigo hover:bg-brand-indigo/90 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-colors shadow-lg"
            >
              {loading ? 'Logging in...' : 'Login to Dashboard'}
            </button>
          </form>

          {/* Demo Credentials (Remove in production) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-xs text-slate-500 mb-2">Demo Credentials (Development Only):</p>
              <p className="text-xs font-mono text-slate-700">admin@marma.com / admin123</p>
            </div>
          )}
        </div>

        {/* Footer Links */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-white/70 hover:text-white text-sm">
            ← Back to Main Site
          </Link>
        </div>
      </div>
    </div>
  )
}
