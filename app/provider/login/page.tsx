'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { mockSendOTP, mockVerifyOTP, mockGetProvider } from '@/lib/mockApi';
import { saveAuthToken, generateJWT } from '@/lib/auth';

export default function ProviderLoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!phone || phone.length < 10) {
      setError('Enter a valid phone number');
      return;
    }

    setLoading(true);
    try {
      const result = await mockSendOTP(phone);
      if (result.success) {
        setSuccessMessage(result.message);
        setStep('otp');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Failed to send OTP. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!otp || otp.length !== 6) {
      setError('Enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    try {
      const result = await mockVerifyOTP(phone, otp);
      if (!result.success) {
        setError(result.message);
        return;
      }

      const providerId = result.providerId!;
      const provider = await mockGetProvider(providerId);

      if (!provider) {
        setError('Provider not found');
        return;
      }

      const token = generateJWT(providerId);
      saveAuthToken({
        providerId,
        phone,
        name: provider.name,
        token,
      });

      setSuccessMessage('Login successful! Redirecting...');
      setTimeout(() => {
        router.push('/provider/dashboard');
      }, 1000);
    } catch (err) {
      setError('Verification failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-app flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-brand-indigo mb-2">AccuCentral</h1>
          <p className="text-slate-600">Provider Portal</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 pattern-bg">
          {step === 'phone' ? (
            <form onSubmit={handleSendOTP}>
              <h2 className="text-2xl font-bold text-brand-charcoal mb-6">Login with OTP</h2>

              <div className="mb-6">
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-brand-indigo focus:outline-none text-lg"
                  disabled={loading}
                />
                <p className="text-xs text-slate-500 mt-2">Enter 10-digit mobile number</p>
              </div>

              {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>}

              {successMessage && (
                <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm">{successMessage}</div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-warm-coral hover:bg-orange-600 disabled:bg-slate-300 text-white font-bold py-3 rounded-lg transition mb-4"
              >
                {loading ? 'Sending...' : 'Send OTP'}
              </button>

              <p className="text-xs text-slate-500 text-center">
                You'll receive a 6-digit OTP via SMS
              </p>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP}>
              <h2 className="text-2xl font-bold text-brand-charcoal mb-2">Enter OTP</h2>
              <p className="text-slate-600 text-sm mb-6">Sent to {phone}</p>

              <div className="mb-6">
                <label htmlFor="otp" className="block text-sm font-medium text-slate-700 mb-2">
                  6-Digit OTP
                </label>
                <input
                  id="otp"
                  type="text"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  maxLength={6}
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-brand-indigo focus:outline-none text-lg text-center font-mono tracking-widest"
                  disabled={loading}
                />
              </div>

              {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>}

              {successMessage && (
                <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm">{successMessage}</div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-ochre hover:bg-brand-ochre/90 disabled:bg-slate-300 text-white font-bold py-3 rounded-lg transition mb-4"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep('phone');
                  setOtp('');
                  setError('');
                }}
                className="w-full text-brand-indigo hover:text-brand-indigo/80 font-medium py-2"
              >
                Change Phone Number
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-slate-500">
          <p>By logging in, you agree to our Terms of Service</p>
          <p className="mt-2">For support, contact admin on WhatsApp</p>
        </div>
      </div>
    </div>
  );
}
