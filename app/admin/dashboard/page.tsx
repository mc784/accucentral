'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Booking {
  id: string
  patientName: string
  patientPhone: string
  serviceName: string
  providerName: string
  date: string
  time: string
  amount: number
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  paymentStatus: 'pending' | 'paid' | 'refunded'
  createdAt: string
  painBefore?: number
  painAfter?: number
}

interface Stats {
  totalBookings: number
  pendingBookings: number
  completedSessions: number
  totalRevenue: number
  activeProviders: number
  activePatients: number
}

export default function AdminDashboard() {
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed'>('pending')

  useEffect(() => {
    // Check admin authentication
    const token = localStorage.getItem('admin_token')
    if (!token) {
      router.push('/admin/login')
      return
    }

    fetchDashboardData()
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000)
    return () => clearInterval(interval)
  }, [router])

  const fetchDashboardData = async () => {
    try {
      // TODO: Replace with actual API calls
      const [bookingsRes, statsRes] = await Promise.all([
        fetch('/api/admin/bookings'),
        fetch('/api/admin/stats'),
      ])

      const bookingsData = await bookingsRes.json()
      const statsData = await statsRes.json()

      setBookings(bookingsData)
      setStats(statsData)
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    try {
      await fetch(`/api/admin/bookings/${bookingId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      
      fetchDashboardData()
    } catch (error) {
      console.error('Failed to update booking status:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    router.push('/admin/login')
  }

  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(b => b.status === filter)

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-app flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-brand-indigo border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600">Loading dashboard...</p>
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
              <h1 className="text-2xl font-heading font-bold text-brand-indigo">Marma Admin</h1>
              <span className="text-sm bg-brand-ochre/20 text-brand-ochre px-3 py-1 rounded-full font-semibold">
                Pilot Program
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={fetchDashboardData}
                className="px-4 py-2 text-sm bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                🔄 Refresh
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-brand-indigo pattern-bg">
            <div className="text-sm text-slate-600 mb-1">Total Bookings</div>
            <div className="text-3xl font-bold text-brand-indigo">{stats?.totalBookings || 0}</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-brand-ochre pattern-bg">
            <div className="text-sm text-slate-600 mb-1">Pending</div>
            <div className="text-3xl font-bold text-brand-ochre">{stats?.pendingBookings || 0}</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-brand-indigo pattern-bg">
            <div className="text-sm text-slate-600 mb-1">Completed</div>
            <div className="text-3xl font-bold text-brand-indigo">{stats?.completedSessions || 0}</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-brand-indigo pattern-bg">
            <div className="text-sm text-slate-600 mb-1">Revenue</div>
            <div className="text-2xl font-bold text-brand-indigo">₹{stats?.totalRevenue?.toLocaleString() || 0}</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-brand-charcoal pattern-bg">
            <div className="text-sm text-slate-600 mb-1">Providers</div>
            <div className="text-3xl font-bold text-brand-charcoal">{stats?.activeProviders || 0}</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-brand-charcoal pattern-bg">
            <div className="text-sm text-slate-600 mb-1">Patients</div>
            <div className="text-3xl font-bold text-brand-charcoal">{stats?.activePatients || 0}</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex gap-2 overflow-x-auto">
            <button
              onClick={() => setFilter('pending')}
              className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                filter === 'pending'
                  ? 'bg-brand-ochre text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              ⏳ Pending ({bookings.filter(b => b.status === 'pending').length})
            </button>
            <button
              onClick={() => setFilter('confirmed')}
              className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                filter === 'confirmed'
                  ? 'bg-brand-indigo text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              ✓ Confirmed ({bookings.filter(b => b.status === 'confirmed').length})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                filter === 'completed'
                  ? 'bg-brand-indigo text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              🎉 Completed ({bookings.filter(b => b.status === 'completed').length})
            </button>
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                filter === 'all'
                  ? 'bg-brand-charcoal text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Bookings ({bookings.length})
            </button>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-12 text-center pattern-bg">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-xl font-bold text-brand-charcoal mb-2">No {filter !== 'all' ? filter : ''} bookings</h3>
              <p className="text-slate-600">Bookings will appear here as they come in.</p>
            </div>
          ) : (
            filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow pattern-bg"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Booking Info */}
                    <div className="flex-grow">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-brand-indigo/10 rounded-full flex items-center justify-center">
                            <span className="text-2xl">👤</span>
                          </div>
                        </div>
                        
                        <div className="flex-grow">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold text-brand-charcoal">{booking.patientName}</h3>
                            <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                              booking.status === 'pending' ? 'bg-brand-ochre/20 text-brand-ochre' :
                              booking.status === 'confirmed' ? 'bg-brand-indigo/20 text-brand-indigo' :
                              booking.status === 'completed' ? 'bg-brand-indigo/20 text-brand-indigo' :
                              'bg-slate-200 text-slate-600'
                            }`}>
                              {booking.status.toUpperCase()}
                            </span>
                            <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                              booking.paymentStatus === 'paid' ? 'bg-brand-indigo/20 text-brand-indigo' :
                              booking.paymentStatus === 'pending' ? 'bg-brand-ochre/20 text-brand-ochre' :
                              'bg-slate-200 text-slate-600'
                            }`}>
                              {booking.paymentStatus === 'paid' ? '💳 Paid' : '⏳ Payment Pending'}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                            <div>
                              <span className="text-slate-500">Service:</span>
                              <span className="ml-2 font-semibold text-brand-charcoal">{booking.serviceName}</span>
                            </div>
                            <div>
                              <span className="text-slate-500">Provider:</span>
                              <span className="ml-2 font-semibold text-brand-charcoal">{booking.providerName}</span>
                            </div>
                            <div>
                              <span className="text-slate-500">Date & Time:</span>
                              <span className="ml-2 font-semibold text-brand-charcoal">{booking.date} at {booking.time}</span>
                            </div>
                            <div>
                              <span className="text-slate-500">Amount:</span>
                              <span className="ml-2 font-semibold text-brand-indigo">₹{booking.amount}</span>
                            </div>
                          </div>
                          
                          <div className="mt-2 text-sm">
                            <span className="text-slate-500">Phone:</span>
                            <a href={`tel:${booking.patientPhone}`} className="ml-2 text-brand-indigo hover:underline">
                              {booking.patientPhone}
                            </a>
                            <a
                              href={`https://wa.me/${booking.patientPhone.replace(/\D/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="ml-3 text-[#25D366] hover:underline"
                            >
                              WhatsApp →
                            </a>
                          </div>

                          {booking.painBefore !== undefined && booking.painAfter !== undefined && (
                            <div className="mt-3 flex items-center gap-4 text-sm">
                              <span className="text-slate-500">Pain Score:</span>
                              <span className="text-brand-ochre font-bold">{booking.painBefore} (Before)</span>
                              <span className="text-slate-400">→</span>
                              <span className="text-brand-indigo font-bold">{booking.painAfter} (After)</span>
                              <span className="text-brand-indigo font-semibold">
                                {Math.round(((booking.painBefore - booking.painAfter) / booking.painBefore) * 100)}% reduction
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex-shrink-0 flex flex-col gap-2">
                      {booking.status === 'pending' && (
                        <button
                          onClick={() => handleStatusChange(booking.id, 'confirmed')}
                          className="px-6 py-2 bg-brand-indigo hover:bg-brand-indigo/90 text-white font-semibold rounded-lg transition-colors"
                        >
                          ✓ Confirm
                        </button>
                      )}
                      {booking.status === 'confirmed' && (
                        <button
                          onClick={() => handleStatusChange(booking.id, 'completed')}
                          className="px-6 py-2 bg-brand-indigo hover:bg-brand-indigo/90 text-white font-semibold rounded-lg transition-colors"
                        >
                          Mark Complete
                        </button>
                      )}
                      <Link
                        href={`/admin/bookings/${booking.id}`}
                        className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-brand-charcoal font-semibold rounded-lg transition-colors text-center"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Quick Links */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/providers"
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow text-center pattern-bg"
          >
            <div className="text-4xl mb-3">👨‍⚕️</div>
            <h3 className="text-lg font-bold text-brand-charcoal mb-1">Manage Providers</h3>
            <p className="text-sm text-slate-600">View and manage practitioner profiles</p>
          </Link>
          
          <Link
            href="/admin/patients"
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow text-center pattern-bg"
          >
            <div className="text-4xl mb-3">👥</div>
            <h3 className="text-lg font-bold text-brand-charcoal mb-1">Patient Database</h3>
            <p className="text-sm text-slate-600">Access patient records and history</p>
          </Link>
          
          <Link
            href="/admin/reports"
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow text-center pattern-bg"
          >
            <div className="text-4xl mb-3">📊</div>
            <h3 className="text-lg font-bold text-brand-charcoal mb-1">Analytics & Reports</h3>
            <p className="text-sm text-slate-600">View detailed program insights</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
