'use client';

import Link from 'next/link';
import { useState } from 'react';

interface Screen {
  name: string;
  path: string;
  description: string;
  status: 'complete' | 'in-progress' | 'planned';
}

interface Category {
  title: string;
  icon: string;
  color: string;
  screens: Screen[];
}

const categories: Category[] = [
  {
    title: 'Patient PWA',
    icon: '📱',
    color: 'brand-ochre',
    screens: [
      {
        name: 'Booking Landing',
        path: '/patient/book',
        description: 'Mobile-first booking page with 3 services',
        status: 'complete',
      },
      {
        name: 'Login (OTP)',
        path: '/patient/login',
        description: 'Phone + OTP authentication flow',
        status: 'complete',
      },
      {
        name: 'Payment',
        path: '/patient/payment/demo-booking-123',
        description: 'Razorpay integration + WhatsApp fallback',
        status: 'complete',
      },
      {
        name: 'Payment Success',
        path: '/patient/payment/success',
        description: 'Booking confirmation page',
        status: 'complete',
      },
      {
        name: 'Patient Dashboard',
        path: '/patient/1',
        description: 'Pain tracking, sessions, progress',
        status: 'complete',
      },
    ],
  },
  {
    title: 'Provider PWA',
    icon: '👨‍⚕️',
    color: 'brand-indigo',
    screens: [
      {
        name: 'Provider Login',
        path: '/provider/login',
        description: 'Phone + OTP for providers',
        status: 'complete',
      },
      {
        name: 'Dashboard',
        path: '/provider/dashboard',
        description: "Today's bookings, pull-to-refresh",
        status: 'complete',
      },
      {
        name: 'Session Logger',
        path: '/provider/session/demo-booking-123',
        description: '45-min timer, pain scores, notes',
        status: 'complete',
      },
      {
        name: 'Earnings',
        path: '/provider/earnings',
        description: 'Weekly earnings, commission breakdown',
        status: 'complete',
      },
      {
        name: 'Profile',
        path: '/provider/profile',
        description: 'Provider profile management',
        status: 'complete',
      },
    ],
  },
  {
    title: 'Admin Dashboard',
    icon: '🔧',
    color: 'brand-charcoal',
    screens: [
      {
        name: 'Admin Login',
        path: '/admin/login',
        description: 'Email + password authentication',
        status: 'complete',
      },
      {
        name: 'Dashboard',
        path: '/admin/dashboard',
        description: 'Stats, booking queue, real-time updates',
        status: 'complete',
      },
      {
        name: 'Providers',
        path: '/admin/providers',
        description: 'Provider management, approval, earnings',
        status: 'complete',
      },
      {
        name: 'Bookings',
        path: '/admin/bookings',
        description: 'Advanced dispatch system',
        status: 'complete',
      },
    ],
  },
  {
    title: 'Content Pages',
    icon: '📚',
    color: 'sage-green',
    screens: [
      {
        name: 'Pressure Points',
        path: '/points',
        description: 'Acupressure points library',
        status: 'complete',
      },
      {
        name: 'Protocols',
        path: '/protocols',
        description: 'Treatment protocols',
        status: 'complete',
      },
      {
        name: 'Science',
        path: '/science',
        description: 'Scientific evidence',
        status: 'complete',
      },
      {
        name: 'About',
        path: '/about',
        description: 'About Accucentral',
        status: 'complete',
      },
    ],
  },
];

const statusConfig = {
  complete: { label: 'Complete', color: 'bg-brand-indigo/20 text-brand-indigo', icon: '✅' },
  'in-progress': { label: 'In Progress', color: 'bg-brand-ochre/20 text-brand-ochre', icon: '⏳' },
  planned: { label: 'Planned', color: 'bg-slate-200 text-slate-600', icon: '🚧' },
};

export default function MasterPage() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('Patient PWA');

  const toggleCategory = (title: string) => {
    setExpandedCategory(expandedCategory === title ? null : title);
  };

  return (
    <div className="min-h-screen bg-bg-app pb-20">
      {/* Header */}
      <header style={{ backgroundColor: '#3730A3' }} className="text-white px-4 py-6 sticky top-0 z-10 shadow-md">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-1">Accucentral UI Gallery</h1>
          <p className="text-white/80 text-sm">Pilot Build - All Screens</p>
          <div className="mt-3 text-xs rounded-lg px-3 py-2" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
            <span className="font-semibold">Branch:</span> master | 
            <span className="font-semibold"> Updated:</span> Dec 5, 2025
          </div>
        </div>
      </header>

      {/* Test Credentials */}
      <section className="px-4 py-4 bg-brand-ochre/10 border-b border-brand-ochre/20">
        <div className="max-w-md mx-auto">
          <h2 className="text-sm font-bold text-brand-charcoal mb-2">💡 Test Credentials</h2>
          <div className="space-y-1 text-xs text-slate-700">
            <p><span className="font-semibold">Patient/Provider OTP:</span> Any 10-digit phone + any 6-digit OTP</p>
            <p><span className="font-semibold">Admin Login:</span> admin@marma.com / admin123</p>
            <p><span className="font-semibold">Test Phone:</span> 9876543210, 9123456789</p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <div className="px-4 py-4 max-w-md mx-auto space-y-3">
        {categories.map((category) => {
          const isExpanded = expandedCategory === category.title;
          const completedCount = category.screens.filter(s => s.status === 'complete').length;
          const totalCount = category.screens.length;

          return (
            <div key={category.title} className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category.title)}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-50 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{category.icon}</span>
                  <div className="text-left">
                    <h3 className="font-bold text-brand-charcoal">{category.title}</h3>
                    <p className="text-xs text-slate-500">
                      {completedCount}/{totalCount} screens
                    </p>
                  </div>
                </div>
                <svg
                  className={`w-5 h-5 text-slate-400 transition-transform ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Screens List */}
              {isExpanded && (
                <div className="border-t border-slate-100 divide-y divide-slate-100">
                  {category.screens.map((screen) => {
                    const statusInfo = statusConfig[screen.status];
                    return (
                      <div key={screen.path} className="p-3 hover:bg-slate-50 transition">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex-1">
                            <h4 className="font-semibold text-brand-charcoal text-sm mb-0.5">
                              {screen.name}
                            </h4>
                            <p className="text-xs text-slate-600">{screen.description}</p>
                          </div>
                          <span className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${statusInfo.color}`}>
                            {statusInfo.icon} {statusInfo.label}
                          </span>
                        </div>
                        
                        <div className="flex gap-2">
                          <Link
                            href={screen.path}
                            className="flex-1 text-center bg-brand-indigo text-white text-xs font-semibold py-2 rounded-md hover:bg-brand-indigo/90 transition"
                          >
                            View Screen
                          </Link>
                          <Link
                            href={screen.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-md hover:bg-slate-200 transition"
                            title="Open in new tab"
                          >
                            ↗
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Stats Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-3 shadow-lg">
        <div className="max-w-md mx-auto flex justify-between items-center text-xs">
          <div>
            <span className="font-semibold text-brand-charcoal">
              {categories.reduce((acc, cat) => acc + cat.screens.filter(s => s.status === 'complete').length, 0)}
            </span>
            <span className="text-slate-600"> screens complete</span>
          </div>
          <div className="flex gap-3">
            <span className="text-brand-indigo">✅ Complete</span>
            <span className="text-brand-ochre">⏳ In Progress</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
