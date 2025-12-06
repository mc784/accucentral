'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useProviderAuth } from '@/lib/useProviderAuth';
import { mockGetTodaysBookings, MockBooking } from '@/lib/mockApi';

export default function ProviderDashboardPage() {
  const { providerId, providerName, isLoading } = useProviderAuth();
  const [bookings, setBookings] = useState<MockBooking[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const pullStartY = useRef(0);

  const loadBookings = async () => {
    if (!providerId) return;
    setDataLoading(true);
    try {
      const data = await mockGetTodaysBookings(providerId);
      setBookings(data);
    } catch (err) {
      console.error('Failed to load bookings:', err);
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoading && providerId) {
      loadBookings();
    }
  }, [providerId, isLoading]);

  const handlePullToRefresh = (e: React.TouchEvent) => {
    if (e.type === 'touchstart') {
      pullStartY.current = e.touches[0].clientY;
    } else if (e.type === 'touchmove') {
      const currentY = e.touches[0].clientY;
      if (currentY > pullStartY.current && window.scrollY === 0) {
        setRefreshing(true);
      }
    } else if (e.type === 'touchend') {
      if (refreshing) {
        loadBookings();
        setRefreshing(false);
      }
    }
  };

  if (isLoading || dataLoading) {
    return (
      <div className="min-h-screen bg-bg-app flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-brand-indigo border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading bookings...</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-brand-ochre/20 text-brand-ochre';
      case 'In Progress':
        return 'bg-brand-ochre/30 text-brand-ochre';
      case 'Completed':
        return 'bg-brand-indigo/20 text-brand-indigo';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div
      className="min-h-screen bg-bg-app pb-28"
      onTouchStart={handlePullToRefresh}
      onTouchMove={handlePullToRefresh}
      onTouchEnd={handlePullToRefresh}
    >
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b-2 border-slate-200 px-4 py-4 sm:px-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-brand-indigo">Today&apos;s Bookings</h1>
            <p className="text-sm text-slate-600">Hello, {providerName}</p>
          </div>
          {refreshing && <div className="w-6 h-6 border-2 border-brand-indigo border-t-transparent rounded-full animate-spin"></div>}
        </div>
      </div>

      {/* Bookings List */}
      <div className="px-4 py-4 sm:px-6">
        {bookings.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">📅</div>
            <p className="text-slate-600">No bookings today</p>
            <p className="text-sm text-slate-500 mt-2">Great! You have a free day ahead</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings
              .sort((a, b) => {
                const timeA = a.timeSlot.split(' ')[0];
                const timeB = b.timeSlot.split(' ')[0];
                return timeA.localeCompare(timeB);
              })
              .map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white rounded-xl shadow-sm border-l-4 border-brand-indigo p-4 hover:shadow-md transition pattern-bg"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-brand-charcoal">{booking.serviceName}</h3>
                      <p className="text-sm text-slate-600">Patient: {booking.patientName}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm mb-4">
                    <span className="text-slate-600">🕐 {booking.timeSlot}</span>
                    <span className="text-slate-500 text-xs">{booking.bookingNumber}</span>
                  </div>

                  {booking.status === 'In Progress' && booking.painScoreBefore !== undefined && (
                    <div className="mb-4 p-2 bg-yellow-50 rounded-lg">
                      <p className="text-xs text-yellow-800">Pain before: {booking.painScoreBefore}/10</p>
                    </div>
                  )}

                  <Link
                    href={`/provider/session/${booking.id}`}
                    className="w-full bg-brand-ochre hover:bg-brand-ochre/90 text-white font-semibold py-2 rounded-lg transition text-center text-sm"
                  >
                    {booking.status === 'Completed' ? 'View Session' : 'Start Session'}
                  </Link>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Pull-to-refresh hint */}
      <div className="fixed bottom-32 left-0 right-0 text-center">
        <p className="text-xs text-slate-400">Pull down to refresh</p>
      </div>
    </div>
  );
}
