'use client'

import { useState } from 'react'
import Link from 'next/link'
import { mockStats, mockBookings, mockPendingProviders, getBookingsByStatus } from '@/data/admin'
import { mockPatients } from '@/data/patients'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const stats = mockStats
  const pendingBookings = getBookingsByStatus('pending')
  const pendingProviders = mockPendingProviders.filter(p => p.status === 'pending')
  const renewalAlerts = mockPatients.filter(p => p.activePackage.sessionsRemaining <= 2)

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-deep-teal to-calm-blue text-white border-b border-deep-teal/30 sticky top-0 z-10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-heading font-bold">Admin Dashboard</h1>
              <p className="text-white/80 text-sm">AccuCentral Operations Center</p>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/" className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition">
                View Site
              </Link>
              <button className="px-4 py-2 bg-white text-deep-teal font-semibold rounded-lg hover:bg-slate-100 transition">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Alert Bar */}
      {(pendingBookings.length > 0 || pendingProviders.length > 0 || renewalAlerts.length > 0) && (
        <div className="bg-warm-coral text-white py-3">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center gap-6 text-sm font-semibold">
              {pendingBookings.length > 0 && (
                <button onClick={() => setActiveTab('bookings')} className="hover:underline">
                  ⚠️ {pendingBookings.length} Bookings Need Assignment
                </button>
              )}
              {pendingProviders.length > 0 && (
                <button onClick={() => setActiveTab('providers')} className="hover:underline">
                  👤 {pendingProviders.length} Provider Applications
                </button>
              )}
              {renewalAlerts.length > 0 && (
                <button onClick={() => setActiveTab('patients')} className="hover:underline">
                  🔄 {renewalAlerts.length} Patients Need Renewal
                </button>
              )}
            </div>
            <span className="text-xs">Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Revenue Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-sage-green">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-semibold text-slate-600">Total Revenue</div>
              <div className="text-2xl">💰</div>
            </div>
            <div className="text-3xl font-bold text-sage-green-700 mb-1">
              ₹{stats.totalRevenue.toLocaleString()}
            </div>
            <div className="text-xs text-slate-500">
              This month: ₹{stats.revenueThisMonth.toLocaleString()} ({stats.revenueGrowth > 0 ? '+' : ''}{stats.revenueGrowth}%)
            </div>
          </div>

          {/* Bookings Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-deep-teal">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-semibold text-slate-600">Total Bookings</div>
              <div className="text-2xl">📅</div>
            </div>
            <div className="text-3xl font-bold text-deep-teal mb-1">{stats.totalBookings}</div>
            <div className="text-xs text-slate-500">
              Today: {stats.bookingsToday} | Pending: {stats.pendingBookings}
            </div>
          </div>

          {/* Patients Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-calm-blue">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-semibold text-slate-600">Active Patients</div>
              <div className="text-2xl">👥</div>
            </div>
            <div className="text-3xl font-bold text-calm-blue mb-1">{stats.activePatients}</div>
            <div className="text-xs text-slate-500">
              New this week: {stats.newPatientsThisWeek} | Need renewal: {stats.patientsNeedingRenewal}
            </div>
          </div>

          {/* Providers Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-warm-coral">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-semibold text-slate-600">Active Providers</div>
              <div className="text-2xl">🩺</div>
            </div>
            <div className="text-3xl font-bold text-warm-coral mb-1">{stats.activeProviders}</div>
            <div className="text-xs text-slate-500">
              Pending apps: {stats.pendingApplications} | Payouts: ₹{stats.pendingPayouts.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-sage-green-700 mb-2">{stats.averagePainReduction}%</div>
              <div className="text-sm text-slate-600">Avg Pain Reduction</div>
              <div className="text-xs text-slate-500 mt-1">Across all completed treatments</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-deep-teal mb-2">{stats.averageCompletionRate}%</div>
              <div className="text-sm text-slate-600">Completion Rate</div>
              <div className="text-xs text-slate-500 mt-1">Patients finishing packages</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-warm-coral mb-2">{stats.averageRating} ⭐</div>
              <div className="text-sm text-slate-600">Average Rating</div>
              <div className="text-xs text-slate-500 mt-1">Customer satisfaction</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="border-b border-slate-200">
            <nav className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-4 font-semibold border-b-2 whitespace-nowrap ${
                  activeTab === 'overview'
                    ? 'border-deep-teal text-deep-teal'
                    : 'border-transparent text-slate-600 hover:text-deep-teal'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`px-6 py-4 font-semibold border-b-2 whitespace-nowrap relative ${
                  activeTab === 'bookings'
                    ? 'border-deep-teal text-deep-teal'
                    : 'border-transparent text-slate-600 hover:text-deep-teal'
                }`}
              >
                Bookings
                {pendingBookings.length > 0 && (
                  <span className="absolute top-2 right-2 bg-warm-coral text-white text-xs font-bold px-2 py-1 rounded-full">
                    {pendingBookings.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('patients')}
                className={`px-6 py-4 font-semibold border-b-2 whitespace-nowrap ${
                  activeTab === 'patients'
                    ? 'border-deep-teal text-deep-teal'
                    : 'border-transparent text-slate-600 hover:text-deep-teal'
                }`}
              >
                Patients
              </button>
              <button
                onClick={() => setActiveTab('providers')}
                className={`px-6 py-4 font-semibold border-b-2 whitespace-nowrap relative ${
                  activeTab === 'providers'
                    ? 'border-deep-teal text-deep-teal'
                    : 'border-transparent text-slate-600 hover:text-deep-teal'
                }`}
              >
                Providers
                {pendingProviders.length > 0 && (
                  <span className="absolute top-2 right-2 bg-warm-coral text-white text-xs font-bold px-2 py-1 rounded-full">
                    {pendingProviders.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('payouts')}
                className={`px-6 py-4 font-semibold border-b-2 whitespace-nowrap ${
                  activeTab === 'payouts'
                    ? 'border-deep-teal text-deep-teal'
                    : 'border-transparent text-slate-600 hover:text-deep-teal'
                }`}
              >
                Payouts
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-deep-teal mb-4">Today's Priority Actions</h3>
                  <div className="space-y-3">
                    {pendingBookings.map(booking => (
                      <div key={booking.id} className="border-2 border-warm-coral/30 bg-warm-coral/5 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-bold text-deep-teal">{booking.customerName}</div>
                            <div className="text-sm text-slate-600">{booking.serviceName} - Session #{booking.sessionNumber}</div>
                            <div className="text-sm text-slate-500">
                              {booking.requestedDate} at {booking.requestedTime} • {booking.territory}
                            </div>
                          </div>
                          <Link
                            href="/admin/bookings"
                            className="px-4 py-2 bg-deep-teal text-white text-sm font-semibold rounded-lg hover:bg-deep-teal/90 transition"
                          >
                            Assign Provider →
                          </Link>
                        </div>
                      </div>
                    ))}

                    {pendingBookings.length === 0 && (
                      <div className="text-center py-8 text-slate-500">
                        ✅ All bookings assigned for today!
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-deep-teal mb-4">Renewal Opportunities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {renewalAlerts.map(patient => (
                      <div key={patient.id} className="border-2 border-slate-200 rounded-lg p-4 hover:border-sage-green transition">
                        <div className="font-bold text-deep-teal">{patient.name}</div>
                        <div className="text-sm text-slate-600">{patient.condition}</div>
                        <div className="text-sm text-warm-coral font-semibold mt-2">
                          {patient.activePackage.sessionsRemaining} sessions left
                        </div>
                        <div className="text-xs text-slate-500">
                          Pain: {patient.initialPainScore} → {patient.currentPainScore}
                        </div>
                        <a
                          href={`https://wa.me/${patient.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hi! Your package is almost complete. Would you like to renew?')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-block px-4 py-2 bg-[#25D366] text-white text-sm font-semibold rounded-lg hover:bg-[#20BA5A] transition"
                        >
                          Send Renewal Reminder
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-deep-teal">All Bookings</h3>
                  <Link
                    href="/admin/bookings"
                    className="px-6 py-3 bg-deep-teal text-white font-bold rounded-lg hover:bg-deep-teal/90 transition"
                  >
                    Manage Bookings
                  </Link>
                </div>
                <div className="space-y-3">
                  {mockBookings.map(booking => (
                    <div key={booking.id} className="border-2 border-slate-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-bold text-deep-teal">{booking.bookingNumber}</div>
                          <div className="text-sm text-slate-600">{booking.customerName} • {booking.serviceName}</div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                          booking.assignmentStatus === 'pending' ? 'bg-warm-coral text-white' :
                          booking.assignmentStatus === 'confirmed' ? 'bg-sage-green text-white' :
                          'bg-calm-blue text-white'
                        }`}>
                          {booking.assignmentStatus.toUpperCase()}
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm text-slate-600">
                        <div>📅 {booking.requestedDate}</div>
                        <div>⏰ {booking.requestedTime}</div>
                        <div>📍 {booking.territory}</div>
                      </div>
                      {booking.assignedProviderName && (
                        <div className="text-sm text-sage-green-700 font-semibold mt-2">
                          Assigned to: {booking.assignedProviderName}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Patients Tab */}
            {activeTab === 'patients' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-deep-teal">Patient Database</h3>
                  <div className="text-sm text-slate-600">
                    {stats.activePatients} Active | {stats.inactivePatients} Inactive
                  </div>
                </div>
                <div className="space-y-3">
                  {mockPatients.map(patient => (
                    <div key={patient.id} className="border-2 border-slate-200 rounded-lg p-4 hover:border-deep-teal transition">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-bold text-deep-teal">{patient.name}</div>
                          <div className="text-sm text-slate-600">{patient.condition}</div>
                          <div className="text-sm text-slate-500 mt-1">{patient.phone}</div>
                        </div>
                        <Link
                          href={`/patient/${patient.id}`}
                          className="px-4 py-2 bg-deep-teal text-white text-sm font-semibold rounded-lg hover:bg-deep-teal/90 transition"
                        >
                          View DTC →
                        </Link>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
                        <div>
                          <div className="text-xs text-slate-500">Pain Reduction</div>
                          <div className="font-bold text-sage-green-700">
                            {Math.round(((patient.initialPainScore - patient.currentPainScore) / patient.initialPainScore) * 100)}%
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500">Progress</div>
                          <div className="font-bold text-deep-teal">
                            {patient.activePackage.sessionsCompleted}/{patient.activePackage.totalSessions}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500">Status</div>
                          <div className={`font-bold ${
                            patient.activePackage.sessionsRemaining <= 2 ? 'text-warm-coral' : 'text-sage-green-700'
                          }`}>
                            {patient.activePackage.sessionsRemaining} left
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Providers Tab */}
            {activeTab === 'providers' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-deep-teal">Provider Management</h3>
                  <Link
                    href="/admin/providers"
                    className="px-6 py-3 bg-deep-teal text-white font-bold rounded-lg hover:bg-deep-teal/90 transition"
                  >
                    Review Applications
                  </Link>
                </div>

                {pendingProviders.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-bold text-deep-teal mb-3">Pending Applications ({pendingProviders.length})</h4>
                    <div className="space-y-3">
                      {pendingProviders.map(provider => (
                        <div key={provider.id} className="border-2 border-warm-coral/30 bg-warm-coral/5 rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-bold text-deep-teal">{provider.name}</div>
                              <div className="text-sm text-slate-600">
                                {provider.experienceYears} years exp • {provider.certificationBody}
                              </div>
                              <div className="text-sm text-slate-500">{provider.territory}</div>
                            </div>
                            <Link
                              href="/admin/providers"
                              className="px-4 py-2 bg-deep-teal text-white text-sm font-semibold rounded-lg hover:bg-deep-teal/90 transition"
                            >
                              Review →
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="text-center py-8 text-slate-500">
                  Total Active Providers: {stats.activeProviders}
                </div>
              </div>
            )}

            {/* Payouts Tab */}
            {activeTab === 'payouts' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-deep-teal">Commission & Payouts</h3>
                  <Link
                    href="/admin/payouts"
                    className="px-6 py-3 bg-deep-teal text-white font-bold rounded-lg hover:bg-deep-teal/90 transition"
                  >
                    Process Payouts
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="bg-warm-coral/10 border border-warm-coral/30 rounded-lg p-6">
                    <div className="text-sm text-slate-600 mb-2">Pending Payouts</div>
                    <div className="text-3xl font-bold text-warm-coral">₹{stats.pendingPayouts.toLocaleString()}</div>
                  </div>
                  <div className="bg-sage-green/10 border border-sage-green/30 rounded-lg p-6">
                    <div className="text-sm text-slate-600 mb-2">Paid This Week</div>
                    <div className="text-3xl font-bold text-sage-green-700">₹{stats.payoutsThisWeek.toLocaleString()}</div>
                  </div>
                </div>

                <div className="text-center py-8 text-slate-500">
                  Payout management interface coming soon
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/admin/bookings"
            className="block bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition border-2 border-transparent hover:border-deep-teal"
          >
            <div className="text-3xl mb-3">📋</div>
            <div className="font-bold text-deep-teal text-lg mb-2">Booking Dispatch</div>
            <div className="text-sm text-slate-600">Assign providers to incoming bookings</div>
          </Link>

          <Link
            href="/admin/providers"
            className="block bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition border-2 border-transparent hover:border-deep-teal"
          >
            <div className="text-3xl mb-3">✅</div>
            <div className="font-bold text-deep-teal text-lg mb-2">Provider Approval</div>
            <div className="text-sm text-slate-600">Review and approve new therapists</div>
          </Link>

          <Link
            href="/admin/sheets"
            className="block bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition border-2 border-transparent hover:border-deep-teal"
          >
            <div className="text-3xl mb-3">📊</div>
            <div className="font-bold text-deep-teal text-lg mb-2">Google Sheets Sync</div>
            <div className="text-sm text-slate-600">Export data to spreadsheets</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
