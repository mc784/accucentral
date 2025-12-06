'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Provider {
  id: string
  name: string
  phone: string
  whatsapp: string
  email: string
  ayushReg: string
  specialization: string
  status: 'active' | 'inactive' | 'pending'
  totalSessions: number
  completedSessions: number
  rating: number
  totalEarnings: number
  joinedDate: string
}

export default function AdminProvidersPage() {
  const router = useRouter()
  const [providers, setProviders] = useState<Provider[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check admin authentication
    const token = localStorage.getItem('admin_token')
    if (!token) {
      router.push('/admin/login')
      return
    }

    fetchProviders()
  }, [router])

  const fetchProviders = async () => {
    try {
      const response = await fetch('/api/admin/providers')
      const data = await response.json()
      setProviders(data)
    } catch (error) {
      console.error('Failed to fetch providers:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (providerId: string, newStatus: string) => {
    try {
      await fetch(`/api/admin/providers/${providerId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      
      fetchProviders()
    } catch (error) {
      console.error('Failed to update provider status:', error)
    }

  }

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-app flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-brand-indigo border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600">Loading providers...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg-app">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard" className="text-brand-indigo hover:underline">
                ← Dashboard
              </Link>
              <h1 className="text-2xl font-heading font-bold text-brand-charcoal">Provider Management</h1>
            </div>
            
            <button
              onClick={fetchProviders}
              className="px-4 py-2 text-sm bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              🔄 Refresh
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 pattern-bg">
            <div className="text-sm text-slate-600 mb-1">Total Providers</div>
            <div className="text-3xl font-bold text-brand-indigo">{providers.length}</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 pattern-bg">
            <div className="text-sm text-slate-600 mb-1">Active</div>
            <div className="text-3xl font-bold text-brand-indigo">
              {providers.filter(p => p.status === 'active').length}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 pattern-bg">
            <div className="text-sm text-slate-600 mb-1">Pending Approval</div>
            <div className="text-3xl font-bold text-brand-ochre">
              {providers.filter(p => p.status === 'pending').length}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 pattern-bg">
            <div className="text-sm text-slate-600 mb-1">Total Sessions</div>
            <div className="text-3xl font-bold text-brand-indigo">
              {providers.reduce((sum, p) => sum + p.totalSessions, 0)}
            </div>
          </div>
        </div>

        {/* Providers List */}
        <div className="space-y-4">
          {providers.map((provider) => (
            <div
              key={provider.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow pattern-bg">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  {/* Provider Info */}
                  <div className="flex-grow">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-brand-indigo/10 rounded-full flex items-center justify-center">
                          <span className="text-3xl">👨‍⚕️</span>
                        </div>
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-brand-charcoal">{provider.name}</h3>
                          <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                            provider.status === 'active' ? 'bg-brand-indigo/20 text-brand-indigo' :
                            provider.status === 'pending' ? 'bg-brand-ochre/20 text-brand-ochre' :
                            'bg-slate-200 text-slate-600'
                          }`}>
                            {provider.status.toUpperCase()}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mb-3">
                          <div>
                            <span className="text-slate-500">Specialization:</span>
                            <span className="ml-2 font-semibold text-brand-charcoal">{provider.specialization}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">AYUSH Reg:</span>
                            <span className="ml-2 font-semibold text-brand-charcoal">{provider.ayushReg}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">Phone:</span>
                            <a href={`tel:${provider.phone}`} className="ml-2 text-brand-indigo hover:underline">
                              {provider.phone}
                            </a>
                          </div>
                          <div>
                            <span className="text-slate-500">WhatsApp:</span>
                            <a
                              href={`https://wa.me/${provider.whatsapp.replace(/\D/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="ml-2 text-[#25D366] hover:underline"
                            >
                              {provider.whatsapp}
                            </a>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-slate-500">Sessions:</span>
                            <span className="font-bold text-brand-indigo">{provider.completedSessions}/{provider.totalSessions}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-500">Rating:</span>
                            <span className="font-bold text-brand-ochre">⭐ {provider.rating.toFixed(1)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-500">Earnings:</span>
                            <span className="font-bold text-brand-indigo">₹{provider.totalEarnings.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-500">Joined:</span>
                            <span className="font-semibold text-charcoal">{provider.joinedDate}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex-shrink-0 flex flex-col gap-2">
                    {provider.status === 'pending' && (
                      <button
                        onClick={() => handleStatusChange(provider.id, 'active')}
                        className="px-6 py-2 bg-brand-indigo hover:bg-brand-indigo/90 text-white font-semibold rounded-lg transition-colors"
                      >
                        ✓ Approve
                      </button>
                    )}
                    {provider.status === 'active' && (
                      <button
                        onClick={() => handleStatusChange(provider.id, 'inactive')}
                        className="px-6 py-2 bg-slate-400 hover:bg-slate-500 text-white font-semibold rounded-lg transition-colors"
                      >
                        Deactivate
                      </button>
                    )}
                    {provider.status === 'inactive' && (
                      <button
                        onClick={() => handleStatusChange(provider.id, 'active')}
                        className="px-6 py-2 bg-brand-indigo hover:bg-brand-indigo/90 text-white font-semibold rounded-lg transition-colors"
                      >
                        Reactivate
                      </button>
                    )}
                    <Link
                      href={`/admin/providers/${provider.id}`}
                      className="px-6 py-2 bg-brand-indigo hover:bg-brand-indigo/90 text-white font-semibold rounded-lg transition-colors text-center"
                    >
                      View Details
                    </Link>
                    <a
                      href={`https://wa.me/${provider.whatsapp.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2 bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold rounded-lg transition-colors text-center"
                    >
                      Message
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {providers.length === 0 && (
          <div className="bg-white rounded-xl shadow-md p-12 text-center pattern-bg">
            <div className="text-6xl mb-4">👨‍⚕️</div>
            <h3 className="text-xl font-bold text-brand-charcoal mb-2">No Providers Yet</h3>
            <p className="text-slate-600">Providers will appear here once they register.</p>
          </div>
        )}
      </div>
    </div>
  )
}
