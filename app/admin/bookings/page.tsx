'use client'

import { useState } from 'react'
import Link from 'next/link'
import { mockBookings } from '@/data/admin'
import { providers as mockProviders } from '@/data/providers'
import type { Booking } from '@/data/admin'

export default function BookingDispatchPage() {
  const [bookings, setBookings] = useState(mockBookings)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filteredBookings = filterStatus === 'all'
    ? bookings
    : bookings.filter(b => b.assignmentStatus === filterStatus)

  const assignProvider = (bookingId: string, providerId: string) => {
    const provider = mockProviders.find(p => p.id === providerId)
    if (!provider) return

    setBookings(prevBookings =>
      prevBookings.map(booking =>
        booking.id === bookingId
          ? {
              ...booking,
              assignedProviderId: provider.id,
              assignedProviderName: provider.name,
              assignmentStatus: 'assigned' as const,
              confirmedDate: booking.requestedDate,
              confirmedTime: booking.requestedTime,
              updatedAt: new Date().toISOString(),
            }
          : booking
      )
    )

    // In real app: Send WhatsApp to provider and customer
    alert(`✅ ${provider.name} assigned!\n\nNotifications sent via WhatsApp to:\n- Provider: ${provider.name}\n- Customer: ${selectedBooking?.customerName}`)

    setSelectedBooking(null)
  }

  const getSuggestedProviders = (booking: Booking) => {
    // Find providers in same service area who offer this service
    return mockProviders.filter(
      provider =>
        provider.serviceArea === booking.serviceArea &&
        provider.availableServices.includes(booking.serviceId) &&
        provider.status === 'active'
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/admin" className="text-sm text-slate-600 hover:text-deep-teal mb-2 inline-block">
                ← Back to Dashboard
              </Link>
              <h1 className="text-3xl font-heading font-bold text-deep-teal">Booking Dispatch</h1>
              <p className="text-slate-600">Assign providers to customer bookings</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-warm-coral">
            <div className="text-2xl font-bold text-warm-coral">
              {bookings.filter(b => b.assignmentStatus === 'pending').length}
            </div>
            <div className="text-sm text-slate-600">Pending Assignment</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-deep-teal">
            <div className="text-2xl font-bold text-deep-teal">
              {bookings.filter(b => b.assignmentStatus === 'assigned').length}
            </div>
            <div className="text-sm text-slate-600">Assigned</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-sage-green">
            <div className="text-2xl font-bold text-sage-green-700">
              {bookings.filter(b => b.assignmentStatus === 'confirmed').length}
            </div>
            <div className="text-sm text-slate-600">Confirmed</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-calm-blue">
            <div className="text-2xl font-bold text-calm-blue">
              {bookings.filter(b => b.assignmentStatus === 'completed').length}
            </div>
            <div className="text-sm text-slate-600">Completed</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="border-b border-slate-200 px-6 py-4">
            <div className="flex gap-4 overflow-x-auto">
              {[
                { value: 'all', label: 'All Bookings', count: bookings.length },
                { value: 'pending', label: 'Pending', count: bookings.filter(b => b.assignmentStatus === 'pending').length },
                { value: 'assigned', label: 'Assigned', count: bookings.filter(b => b.assignmentStatus === 'assigned').length },
                { value: 'confirmed', label: 'Confirmed', count: bookings.filter(b => b.assignmentStatus === 'confirmed').length },
                { value: 'completed', label: 'Completed', count: bookings.filter(b => b.assignmentStatus === 'completed').length },
              ].map(tab => (
                <button
                  key={tab.value}
                  onClick={() => setFilterStatus(tab.value)}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition ${
                    filterStatus === tab.value
                      ? 'bg-deep-teal text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>
          </div>

          {/* Bookings List */}
          <div className="p-6">
            {filteredBookings.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                <div className="text-5xl mb-4">✅</div>
                <div className="text-lg font-semibold">No {filterStatus} bookings</div>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredBookings.map(booking => {
                  const suggestedProviders = getSuggestedProviders(booking)

                  return (
                    <div
                      key={booking.id}
                      className={`border-2 rounded-xl p-6 transition ${
                        booking.assignmentStatus === 'pending'
                          ? 'border-warm-coral/50 bg-warm-coral/5'
                          : 'border-slate-200 hover:border-deep-teal'
                      }`}
                    >
                      {/* Booking Header */}
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-xs font-bold text-slate-500">{booking.bookingNumber}</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              booking.assignmentStatus === 'pending' ? 'bg-warm-coral text-white' :
                              booking.assignmentStatus === 'assigned' ? 'bg-deep-teal text-white' :
                              booking.assignmentStatus === 'confirmed' ? 'bg-sage-green text-white' :
                              'bg-calm-blue text-white'
                            }`}>
                              {booking.assignmentStatus.toUpperCase()}
                            </span>
                          </div>
                          <div className="text-xl font-bold text-deep-teal mb-1">{booking.customerName}</div>
                          <div className="text-slate-600">{booking.customerPhone}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-deep-teal">₹{booking.servicePrice}</div>
                          <div className="text-sm text-slate-600">Session #{booking.sessionNumber}</div>
                        </div>
                      </div>

                      {/* Booking Details Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 pb-4 border-b border-slate-200">
                        <div>
                          <div className="text-xs text-slate-500 mb-1">Service</div>
                          <div className="font-semibold text-slate-900">{booking.serviceName}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 mb-1">Date & Time</div>
                          <div className="font-semibold text-slate-900">
                            {booking.requestedDate}<br/>{booking.requestedTime}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 mb-1">Location</div>
                          <div className="font-semibold text-slate-900">
                            {booking.territory}<br/>{booking.serviceArea}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 mb-1">Payment</div>
                          <div className="font-semibold text-sage-green-700">
                            {booking.isPaid ? '✓ Paid' : 'Pending'}<br/>
                            <span className="text-xs">{booking.paymentMethod}</span>
                          </div>
                        </div>
                      </div>

                      {/* Assignment Section */}
                      {booking.assignmentStatus === 'pending' ? (
                        <div>
                          <div className="font-semibold text-deep-teal mb-3">
                            Suggested Providers ({suggestedProviders.length})
                          </div>
                          {suggestedProviders.length === 0 ? (
                            <div className="bg-warm-coral/10 border border-warm-coral/30 rounded-lg p-4 text-center">
                              <p className="text-warm-coral font-semibold">⚠️ No providers available in {booking.serviceArea}</p>
                              <p className="text-sm text-slate-600 mt-1">Consider expanding service area or onboarding new providers</p>
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {suggestedProviders.map(provider => (
                                <div
                                  key={provider.id}
                                  className="border-2 border-slate-200 rounded-lg p-4 hover:border-deep-teal transition"
                                >
                                  <div className="flex justify-between items-start mb-2">
                                    <div>
                                      <div className="font-bold text-deep-teal">{provider.name}</div>
                                      <div className="text-sm text-slate-600">{provider.territory}</div>
                                    </div>
                                    <div className="text-right text-xs">
                                      <div className="text-sage-green-700 font-bold">{provider.rating} ⭐</div>
                                      <div className="text-slate-500">{provider.totalBookings} sessions</div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2 text-xs text-slate-600 mb-3">
                                    <span>{provider.experienceYears}y exp</span>
                                    <span>•</span>
                                    <span>{provider.completionRate}% completion</span>
                                  </div>
                                  <button
                                    onClick={() => {
                                      setSelectedBooking(booking)
                                      assignProvider(booking.id, provider.id)
                                    }}
                                    className="w-full py-2 bg-deep-teal text-white font-bold rounded-lg hover:bg-deep-teal/90 transition"
                                  >
                                    Assign {provider.name} →
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="bg-sage-green/10 border border-sage-green/30 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-sm text-slate-600">Assigned Provider</div>
                              <div className="font-bold text-deep-teal text-lg">{booking.assignedProviderName}</div>
                              {booking.confirmedDate && (
                                <div className="text-sm text-slate-600 mt-1">
                                  Confirmed: {booking.confirmedDate} at {booking.confirmedTime}
                                </div>
                              )}
                            </div>
                            <a
                              href={`https://wa.me/919876543210?text=${encodeURIComponent(`Booking ${booking.bookingNumber} status check`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#20BA5A] transition text-sm"
                            >
                              Contact Provider
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="font-bold text-deep-teal mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 border-2 border-slate-200 rounded-lg hover:border-[#25D366] transition"
            >
              <div className="text-3xl">📱</div>
              <div>
                <div className="font-semibold text-deep-teal">WhatsApp Dispatch</div>
                <div className="text-xs text-slate-600">Send assignments via WhatsApp</div>
              </div>
            </a>

            <Link
              href="/admin/providers"
              className="flex items-center gap-3 p-4 border-2 border-slate-200 rounded-lg hover:border-deep-teal transition"
            >
              <div className="text-3xl">👥</div>
              <div>
                <div className="font-semibold text-deep-teal">View All Providers</div>
                <div className="text-xs text-slate-600">Check availability & stats</div>
              </div>
            </Link>

            <Link
              href="/admin/sheets"
              className="flex items-center gap-3 p-4 border-2 border-slate-200 rounded-lg hover:border-deep-teal transition"
            >
              <div className="text-3xl">📊</div>
              <div>
                <div className="font-semibold text-deep-teal">Export to Sheets</div>
                <div className="text-xs text-slate-600">Sync bookings to Google Sheets</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
