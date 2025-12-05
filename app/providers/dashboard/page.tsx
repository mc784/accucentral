'use client'

import { useState } from 'react'
import Link from 'next/link'

// Mock provider data - in real app this would come from authentication
const mockProvider = {
  id: '1',
  name: 'Rahul Sharma',
  email: 'rahul.sharma@example.com',
  phone: '+91 98765 43210',
  status: 'active' as 'active' | 'pending' | 'suspended',
  badgeLevel: 'level-2' as const,
  territory: 'Sector 15, Faridabad',
  rating: 4.8,
  totalBookings: 487,
  completedBookings: 468,
  cancelledBookings: 19,
  totalEarnings: 145620,
  pendingPayout: 12450,
  lastPayout: 8500,
  lastPayoutDate: '2024-11-28',
}

const upcomingBookings = [
  {
    id: 'BK001',
    customerName: 'Priya Mehta',
    service: 'Tech-Neck Reset',
    date: '2024-12-05',
    time: '10:00 AM',
    location: 'Sector 16, Faridabad',
    price: 299,
    status: 'confirmed',
  },
  {
    id: 'BK002',
    customerName: 'Amit Kumar',
    service: 'The Migraine Eraser',
    date: '2024-12-05',
    time: '3:00 PM',
    location: 'Sector 14, Faridabad',
    price: 499,
    status: 'confirmed',
  },
  {
    id: 'BK003',
    customerName: 'Sunita Devi',
    service: 'Senior Citizen Pain Relief',
    date: '2024-12-06',
    time: '11:00 AM',
    location: 'Sector 15, Faridabad',
    price: 449,
    status: 'pending',
  },
]

const recentBookings = [
  {
    id: 'BK000',
    customerName: 'Rajesh Gupta',
    service: 'Tech-Neck Reset',
    date: '2024-12-03',
    price: 299,
    status: 'completed',
    rating: 5,
  },
  {
    id: 'BK999',
    customerName: 'Neha Singh',
    service: 'The Migraine Eraser',
    date: '2024-12-02',
    price: 499,
    status: 'completed',
    rating: 4,
  },
]

export default function ProviderDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-heading font-bold text-deep-teal">
              Accucentral
            </Link>
            <div className="flex items-center gap-6">
              <span className="text-slate-600">Welcome, <strong>{mockProvider.name}</strong></span>
              <button className="text-slate-gray hover:text-deep-teal font-medium transition-colors">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Status Banner */}
      {mockProvider.status === 'pending' && (
        <div className="bg-warm-coral text-white py-4">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="font-semibold">⏳ Your application is under review. We'll contact you within 2-3 business days.</p>
          </div>
        </div>
      )}

      {mockProvider.status === 'suspended' && (
        <div className="bg-red-600 text-white py-4">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="font-semibold">⚠️ Your account has been suspended. Please contact support.</p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Quick Action Button */}
        <div className="mb-8">
          <Link
            href="/providers/log-session"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#F4A261] hover:bg-[#E96F1C] text-white font-bold text-lg rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-105"
          >
            📝 Quick Log Session
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-deep-teal">
            <div className="text-sm text-slate-600 mb-1">Total Bookings</div>
            <div className="text-3xl font-bold text-deep-teal">{mockProvider.totalBookings}</div>
            <div className="text-xs text-slate-500 mt-1">{mockProvider.completedBookings} completed</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-sage-green">
            <div className="text-sm text-slate-600 mb-1">Rating</div>
            <div className="text-3xl font-bold text-sage-green-700">{mockProvider.rating} ⭐</div>
            <div className="text-xs text-slate-500 mt-1">Average rating</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-warm-coral">
            <div className="text-sm text-slate-600 mb-1">Total Earnings</div>
            <div className="text-3xl font-bold text-warm-coral">₹{mockProvider.totalEarnings.toLocaleString()}</div>
            <div className="text-xs text-slate-500 mt-1">All time</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-calm-blue">
            <div className="text-sm text-slate-600 mb-1">Pending Payout</div>
            <div className="text-3xl font-bold text-calm-blue">₹{mockProvider.pendingPayout.toLocaleString()}</div>
            <div className="text-xs text-slate-500 mt-1">Next payout Friday</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="border-b border-slate-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-4 font-semibold border-b-2 transition-colors ${
                  activeTab === 'overview'
                    ? 'border-deep-teal text-deep-teal'
                    : 'border-transparent text-slate-600 hover:text-deep-teal'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`px-6 py-4 font-semibold border-b-2 transition-colors ${
                  activeTab === 'bookings'
                    ? 'border-deep-teal text-deep-teal'
                    : 'border-transparent text-slate-600 hover:text-deep-teal'
                }`}
              >
                Bookings
              </button>
              <button
                onClick={() => setActiveTab('earnings')}
                className={`px-6 py-4 font-semibold border-b-2 transition-colors ${
                  activeTab === 'earnings'
                    ? 'border-deep-teal text-deep-teal'
                    : 'border-transparent text-slate-600 hover:text-deep-teal'
                }`}
              >
                Earnings
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-6 py-4 font-semibold border-b-2 transition-colors ${
                  activeTab === 'profile'
                    ? 'border-deep-teal text-deep-teal'
                    : 'border-transparent text-slate-600 hover:text-deep-teal'
                }`}
              >
                Profile
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-deep-teal mb-4">Upcoming Sessions</h3>
                  <div className="space-y-3">
                    {upcomingBookings.map(booking => (
                      <div key={booking.id} className="border-2 border-slate-200 rounded-lg p-4 hover:border-deep-teal transition-all">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="font-bold text-lg text-deep-teal">{booking.customerName}</div>
                            <div className="text-sm text-slate-600">{booking.service}</div>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            booking.status === 'confirmed'
                              ? 'bg-sage-green/20 text-sage-green-700'
                              : 'bg-warm-coral/20 text-warm-coral'
                          }`}>
                            {booking.status.toUpperCase()}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                          <span>📅 {booking.date}</span>
                          <span>⏰ {booking.time}</span>
                          <span>📍 {booking.location}</span>
                          <span className="font-semibold text-deep-teal">₹{booking.price}</span>
                        </div>
                        <div className="flex gap-3 mt-3">
                          <button className="px-4 py-2 bg-deep-teal text-white rounded-lg text-sm font-semibold hover:bg-deep-teal/90 transition">
                            View Details
                          </button>
                          <button className="px-4 py-2 border-2 border-slate-200 text-slate-700 rounded-lg text-sm font-semibold hover:border-deep-teal transition">
                            Get Directions
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-deep-teal mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {recentBookings.map(booking => (
                      <div key={booking.id} className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-bold text-deep-teal">{booking.customerName}</div>
                            <div className="text-sm text-slate-600">{booking.service}</div>
                            <div className="text-xs text-slate-500 mt-1">{booking.date}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-deep-teal">₹{booking.price}</div>
                            <div className="text-sm text-sage-green-700 mt-1">
                              {'⭐'.repeat(booking.rating)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <div>
                <h3 className="text-xl font-bold text-deep-teal mb-4">All Bookings</h3>
                <div className="space-y-3">
                  {[...upcomingBookings, ...recentBookings].map((booking: any) => (
                    <div key={booking.id} className="border-2 border-slate-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-bold text-lg text-deep-teal">{booking.customerName}</div>
                          <div className="text-sm text-slate-600">{booking.service}</div>
                          <div className="text-sm text-slate-500 mt-1">
                            {booking.date} {booking.time && `• ${booking.time}`}
                          </div>
                          {booking.location && (
                            <div className="text-sm text-slate-500">📍 {booking.location}</div>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-xl text-deep-teal">₹{booking.price}</div>
                          <div className={`px-3 py-1 rounded-full text-xs font-semibold mt-2 ${
                            booking.status === 'confirmed'
                              ? 'bg-sage-green/20 text-sage-green-700'
                              : booking.status === 'completed'
                              ? 'bg-calm-blue/20 text-calm-blue'
                              : 'bg-warm-coral/20 text-warm-coral'
                          }`}>
                            {booking.status.toUpperCase()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Earnings Tab */}
            {activeTab === 'earnings' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-linear-to-br from-deep-teal to-calm-blue text-white rounded-xl p-6">
                    <div className="text-sm mb-2">Total Earnings</div>
                    <div className="text-3xl font-bold">₹{mockProvider.totalEarnings.toLocaleString()}</div>
                    <div className="text-xs mt-2 opacity-80">All time earnings</div>
                  </div>

                  <div className="bg-linear-to-br from-sage-green to-calm-blue text-white rounded-xl p-6">
                    <div className="text-sm mb-2">Pending Payout</div>
                    <div className="text-3xl font-bold">₹{mockProvider.pendingPayout.toLocaleString()}</div>
                    <div className="text-xs mt-2 opacity-80">Next Friday</div>
                  </div>

                  <div className="bg-linear-to-br from-warm-coral to-sage-green text-white rounded-xl p-6">
                    <div className="text-sm mb-2">Last Payout</div>
                    <div className="text-3xl font-bold">₹{mockProvider.lastPayout.toLocaleString()}</div>
                    <div className="text-xs mt-2 opacity-80">{mockProvider.lastPayoutDate}</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-deep-teal mb-4">Payout History</h3>
                  <div className="space-y-3">
                    {[
                      { date: '2024-11-28', amount: 8500, status: 'Completed' },
                      { date: '2024-11-21', amount: 12300, status: 'Completed' },
                      { date: '2024-11-14', amount: 9800, status: 'Completed' },
                    ].map((payout, idx) => (
                      <div key={idx} className="border border-slate-200 rounded-lg p-4 flex justify-between items-center">
                        <div>
                          <div className="font-semibold text-deep-teal">Payout {payout.date}</div>
                          <div className="text-sm text-slate-600">{payout.status}</div>
                        </div>
                        <div className="text-xl font-bold text-sage-green-700">+₹{payout.amount.toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-sage-green/10 border border-sage-green/30 rounded-lg p-6">
                  <h4 className="font-bold text-deep-teal mb-2">How Payouts Work</h4>
                  <ul className="text-sm text-slate-700 space-y-1">
                    <li>• Payouts are processed every Friday</li>
                    <li>• You receive 70-80% of each session fee (based on your level)</li>
                    <li>• Minimum payout threshold: ₹1000</li>
                    <li>• Funds are transferred to your registered bank account</li>
                    <li>• TDS is deducted as per income tax regulations</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-deep-teal mb-4">Profile Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-slate-600">Name</label>
                      <div className="text-lg font-medium text-slate-900">{mockProvider.name}</div>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-slate-600">Email</label>
                      <div className="text-lg font-medium text-slate-900">{mockProvider.email}</div>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-slate-600">Phone</label>
                      <div className="text-lg font-medium text-slate-900">{mockProvider.phone}</div>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-slate-600">Territory</label>
                      <div className="text-lg font-medium text-slate-900">{mockProvider.territory}</div>
                    </div>
                  </div>

                  <button className="mt-6 px-6 py-3 bg-deep-teal text-white font-bold rounded-lg hover:bg-deep-teal/90 transition">
                    Edit Profile
                  </button>
                </div>

                <div className="border-t border-slate-200 pt-6">
                  <h3 className="text-xl font-bold text-deep-teal mb-4">Support & Resources</h3>
                  <div className="space-y-3">
                    <a href="#" className="block p-4 border-2 border-slate-200 rounded-lg hover:border-deep-teal transition">
                      <div className="font-semibold text-deep-teal">📚 Treatment Protocols</div>
                      <div className="text-sm text-slate-600">Access standardized treatment guidelines</div>
                    </a>
                    <a href="#" className="block p-4 border-2 border-slate-200 rounded-lg hover:border-deep-teal transition">
                      <div className="font-semibold text-deep-teal">💬 Support Center</div>
                      <div className="text-sm text-slate-600">Get help with bookings or technical issues</div>
                    </a>
                    <a href="#" className="block p-4 border-2 border-slate-200 rounded-lg hover:border-deep-teal transition">
                      <div className="font-semibold text-deep-teal">📊 Performance Analytics</div>
                      <div className="text-sm text-slate-600">View detailed insights and trends</div>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
