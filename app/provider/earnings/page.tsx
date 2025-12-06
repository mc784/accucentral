'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useProviderAuth } from '@/lib/useProviderAuth';
import { mockGetEarnings, EarningsData } from '@/lib/mockApi';

export default function EarningsPage() {
  const { providerId, isLoading: authLoading } = useProviderAuth();
  const [earnings, setEarnings] = useState<EarningsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEarnings = async () => {
      if (!providerId) return;
      try {
        const data = await mockGetEarnings(providerId);
        setEarnings(data);
      } catch (err) {
        console.error('Failed to load earnings:', err);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading && providerId) {
      loadEarnings();
    }
  }, [providerId, authLoading]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-bg-app flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-brand-indigo border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading earnings...</p>
        </div>
      </div>
    );
  }

  if (!earnings) {
    return null;
  }

  const maxSessions = Math.max(...earnings.sessionsPerDay.map((d) => d.count), 1);

  return (
    <div className="min-h-screen bg-bg-app pb-28">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b-2 border-slate-200 px-4 py-4 sm:px-6 shadow-sm">
        <Link href="/provider/dashboard" className="text-brand-indigo hover:text-brand-indigo/80 font-semibold mb-2 inline-block text-sm">
          ← Back
        </Link>
        <h1 className="text-2xl font-bold text-brand-indigo">Your Earnings</h1>
        <p className="text-sm text-slate-600">This Week</p>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Main Earnings Card */}
        <div className="bg-gradient-to-br from-brand-indigo to-brand-indigo/80 rounded-2xl shadow-lg p-8 text-white mb-6">
          <p className="text-sm font-semibold opacity-90 mb-2">Total Earnings</p>
          <h2 className="text-5xl font-bold mb-4">₹{earnings.totalEarnings.toLocaleString('en-IN')}</h2>
          <div className="flex gap-6">
            <div>
              <p className="text-sm opacity-90">Sessions</p>
              <p className="text-2xl font-bold">{earnings.totalSessionsThisWeek}</p>
            </div>
            <div>
              <p className="text-sm opacity-90">Commission</p>
              <p className="text-2xl font-bold">{earnings.commission}%</p>
            </div>
          </div>
        </div>

        {/* Commission Badge */}
        <div className="bg-brand-indigo/10 border-l-4 border-brand-indigo rounded-lg p-4 mb-6">
          <p className="text-xs text-brand-indigo font-semibold mb-1">PILOT PROGRAM</p>
          <p className="text-sm text-brand-indigo">
            Commission: 0% (Pilot). You receive 100% of session fees during pilot phase.
          </p>
        </div>

        {/* Payout Info */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 pattern-bg">
          <h3 className="text-lg font-bold text-brand-charcoal mb-4">Payout Schedule</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Next Payout</span>
              <span className="font-bold text-brand-indigo">Every Monday</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Payment Method</span>
              <span className="font-bold text-brand-indigo">UPI</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Status</span>
              <span className="px-3 py-1 bg-brand-ochre/20 text-brand-ochre rounded-full text-sm font-semibold">
                Pending
              </span>
            </div>
          </div>
        </div>

        {/* Weekly Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 pattern-bg">
          <h3 className="text-lg font-bold text-brand-charcoal mb-4">Sessions Per Day</h3>
          <div className="space-y-3">
            {earnings.sessionsPerDay.map((day) => {
              const height = ((day.count / maxSessions) * 100) || 5;
              return (
                <div key={day.day} className="flex items-end gap-3 h-16">
                  <span className="w-12 text-center text-sm font-semibold text-slate-600">{day.day}</span>
                  <div className="flex-1 flex items-end gap-1">
                    <div
                      className="flex-1 bg-gradient-to-t from-brand-indigo to-brand-indigo/60 rounded-t-lg transition-all hover:from-brand-indigo/80"
                      style={{ height: `${height}%`, minHeight: '4px' }}
                    />
                  </div>
                  <span className="w-8 text-right text-sm font-semibold text-slate-600">{day.count}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-4 p-3 bg-slate-50 rounded-lg text-sm text-slate-600">
            <p>Total: {earnings.totalSessionsThisWeek} sessions this week</p>
          </div>
        </div>

        {/* Service Breakdown */}
        <div className="bg-white rounded-xl shadow-sm p-6 pattern-bg">
          <h3 className="text-lg font-bold text-brand-charcoal mb-4">Earnings by Service</h3>
          <div className="space-y-4">
            {earnings.breakdown.map((item, idx) => (
              <div key={idx} className="border-b border-slate-200 pb-4 last:border-0 last:pb-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-brand-charcoal">{item.service}</span>
                  <span className="font-bold text-brand-ochre">₹{item.earnings.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-brand-indigo to-brand-indigo/60"
                      style={{
                        width: `${(item.earnings / earnings.totalEarnings) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm text-slate-600 w-16 text-right">{item.sessions} sessions</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Footer */}
        <div className="mt-8 p-4 bg-brand-indigo/10 rounded-lg text-center text-sm text-brand-indigo">
          <p>Questions about your earnings?</p>
          <p className="mt-2">
            <a href="https://wa.me/919999999999" className="text-brand-indigo font-semibold hover:underline">
              Contact Admin on WhatsApp
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
