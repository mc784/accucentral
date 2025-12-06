'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useProviderAuth } from '@/lib/useProviderAuth';
import { mockGetProvider, MockProvider } from '@/lib/mockApi';
import { clearAuthToken } from '@/lib/auth';

export default function ProviderProfilePage() {
  const router = useRouter();
  const { providerId, providerName, providerPhone, isLoading: authLoading } = useProviderAuth();
  const [provider, setProvider] = useState<MockProvider | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProvider = async () => {
      if (!providerId) return;
      try {
        const data = await mockGetProvider(providerId);
        setProvider(data);
      } catch (err) {
        console.error('Failed to load provider:', err);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading && providerId) {
      loadProvider();
    }
  }, [providerId, authLoading]);

  const handleLogout = () => {
    clearAuthToken();
    router.push('/provider/login');
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-bg-app flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-calm-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!provider) {
    return null;
  }

  return (
    <div className="min-h-screen bg-bg-app pb-28">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b-2 border-slate-200 px-4 py-4 sm:px-6 shadow-sm">
        <Link href="/provider/dashboard" className="text-calm-blue hover:text-deep-teal font-semibold mb-2 inline-block text-sm">
          ← Back
        </Link>
        <h1 className="text-2xl font-bold text-deep-teal">Your Profile</h1>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border-t-4 border-calm-blue">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-calm-blue to-deep-teal rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {provider.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-slate-800">{provider.name}</h2>
              <p className="text-slate-600">{providerPhone}</p>
              <div className="flex gap-2 mt-2">
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                  ⭐ {provider.rating.toFixed(1)}
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                  {provider.totalBookings} Bookings
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Certification Info */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Certification</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-4">
              <span className="text-2xl">✓</span>
              <div>
                <p className="font-semibold text-slate-800">AYUSH Registered</p>
                <p className="text-sm text-slate-600">{provider.ayushNumber}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Services Offered</h3>
          <div className="space-y-2">
            {provider.services.map((service, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-calm-blue rounded-full"></span>
                <span className="text-slate-700">{service}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-4">Contact admin to update services</p>
        </div>

        {/* Availability */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Availability</h3>
          <div className="flex flex-wrap gap-2">
            {provider.availability.map((day, idx) => (
              <span key={idx} className="px-4 py-2 bg-calm-blue/10 text-deep-teal rounded-full text-sm font-semibold">
                {day}
              </span>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-4">Contact admin to update availability</p>
        </div>

        {/* Support Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Need Help?</h3>
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition text-center block mb-3"
          >
            💬 Message Admin on WhatsApp
          </a>
          <a
            href="mailto:support@accucentral.com"
            className="w-full bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold py-3 rounded-lg transition text-center block"
          >
            📧 Email Support
          </a>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition mb-4"
        >
          Logout
        </button>

        {/* Version Info */}
        <div className="text-center text-xs text-slate-500 mt-6">
          <p>AccuCentral Provider App v1.0</p>
          <p className="mt-1">Provider ID: {providerId}</p>
        </div>
      </div>
    </div>
  );
}
