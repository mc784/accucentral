'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useProviderAuth } from '@/lib/useProviderAuth';
import { mockGetSessionData, mockLogSession, SessionData } from '@/lib/mockApi';

export default function SessionLoggerPage() {
  const params = useParams();
  const router = useRouter();
  const { isLoading: authLoading } = useProviderAuth();
  const bookingId = params.bookingId as string;

  const [session, setSession] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(45 * 60); // 45 minutes in seconds
  const [painBefore, setPainBefore] = useState<number | null>(null);
  const [painAfter, setPainAfter] = useState<number | null>(null);
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadSession = async () => {
      try {
        const data = await mockGetSessionData(bookingId);
        if (!data) {
          setError('Session not found');
        } else {
          setSession(data);
          setPainBefore(data.painScoreBefore ?? null);
        }
      } catch (err) {
        setError('Failed to load session');
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      loadSession();
    }
  }, [bookingId, authLoading]);

  // Timer effect
  useEffect(() => {
    if (!sessionStarted || timerSeconds <= 0) return;

    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [sessionStarted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartSession = () => {
    if (painBefore === null) {
      setError('Please enter pain score before starting');
      return;
    }
    setSessionStarted(true);
    setError('');
  };

  const handleCompleteSession = async (e: React.FormEvent) => {
    e.preventDefault();

    if (painAfter === null) {
      setError('Please enter pain score after session');
      return;
    }

    if (!painBefore) {
      setError('Missing initial pain score');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const result = await mockLogSession(bookingId, painBefore, painAfter, notes);
      if (result.success) {
        setTimeout(() => {
          router.push('/provider/dashboard');
        }, 1500);
      } else {
        setError('Failed to log session');
      }
    } catch (err) {
      setError('Failed to complete session');
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-bg-app flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-brand-indigo border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading session...</p>
        </div>
      </div>
    );
  }

  if (error && !session) {
    return (
      <div className="min-h-screen bg-bg-app flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Link href="/provider/dashboard" className="text-brand-indigo hover:text-brand-indigo/80 font-semibold">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-bg-app pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b-2 border-slate-200 px-4 py-4 sm:px-6 shadow-sm">
        <Link href="/provider/dashboard" className="text-brand-indigo hover:text-brand-indigo/80 font-semibold mb-2 inline-block">
          ← Back
        </Link>
        <h1 className="text-2xl font-bold text-brand-indigo">{session.serviceName}</h1>
        <p className="text-sm text-slate-600">Patient: {session.patientName}</p>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Session Timer */}
        {sessionStarted && (
          <div className="bg-gradient-to-r from-brand-ochre to-brand-ochre/80 rounded-2xl p-6 mb-6 text-white text-center">
            <p className="text-sm font-semibold mb-2 opacity-90">Session Time Remaining</p>
            <p className="text-5xl font-bold font-mono">{formatTime(timerSeconds)}</p>
          </div>
        )}

        {/* Before Session Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border-l-4 border-brand-indigo pattern-bg">
          <h2 className="text-lg font-bold text-brand-charcoal mb-4">Before Session</h2>

          {session.previousPainScores.length > 0 && (
            <div className="mb-6 p-4 bg-brand-indigo/10 rounded-lg">
              <p className="text-sm text-slate-600 font-semibold mb-2">Patient&apos;s Previous Pain Scores:</p>
              <div className="flex gap-2">
                {session.previousPainScores.map((score, idx) => (
                  <span
                    key={idx}
                    className="inline-block bg-brand-indigo/20 text-brand-indigo px-3 py-1 rounded-full text-sm font-semibold"
                  >
                    {score}/10
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <label htmlFor="painBefore" className="block text-sm font-semibold text-slate-700 mb-3">
              Current Pain Level: <span className="text-2xl font-bold text-brand-ochre">{painBefore}</span>/10
            </label>
            <input
              id="painBefore"
              type="range"
              min="0"
              max="10"
              value={painBefore || 0}
              onChange={(e) => setPainBefore(parseInt(e.target.value))}
              disabled={sessionStarted}
              className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-indigo disabled:opacity-50"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-2">
              <span>No Pain</span>
              <span>Worst Pain</span>
            </div>
          </div>

          {!sessionStarted && (
            <button
              onClick={handleStartSession}
              className="w-full mt-6 bg-brand-ochre hover:bg-brand-ochre/90 text-white font-bold py-3 rounded-lg transition"
            >
              Start Session ▶
            </button>
          )}
        </div>

        {/* During Session */}
        {sessionStarted && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border-l-4 border-brand-ochre">
            <h2 className="text-lg font-bold text-brand-charcoal mb-4">Session in Progress</h2>
            <p className="text-slate-600 text-sm mb-4">Perform the acupressure session. Timer will alert when time is up.</p>
            <div className="bg-brand-ochre/10 border-l-4 border-brand-ochre p-3 rounded text-sm text-brand-ochre">
              ⏱ Timer is running. Complete the session before time runs out.
            </div>
          </div>
        )}

        {/* After Session Section */}
        {sessionStarted && (
          <form onSubmit={handleCompleteSession} className="bg-white rounded-xl shadow-sm p-6 mb-6 border-l-4 border-brand-indigo pattern-bg">
            <h2 className="text-lg font-bold text-brand-charcoal mb-4">After Session</h2>

            {/* Pain After */}
            <div className="mb-6">
              <label htmlFor="painAfter" className="block text-sm font-semibold text-slate-700 mb-3">
                Patient&apos;s Pain Level Now: <span className="text-2xl font-bold text-brand-ochre">{painAfter ?? '-'}</span>/10
              </label>
              <input
                id="painAfter"
                type="range"
                min="0"
                max="10"
                value={painAfter ?? 0}
                onChange={(e) => setPainAfter(parseInt(e.target.value))}
                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-indigo"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>No Pain</span>
                <span>Worst Pain</span>
              </div>
            </div>

            {/* Improvement Display */}
            {painAfter !== null && painBefore && (
              <div className={`mb-6 p-4 rounded-lg text-center ${
                painAfter < painBefore
                  ? 'bg-brand-indigo/10 border-l-4 border-brand-indigo'
                  : 'bg-slate-50 border-l-4 border-slate-300'
              }`}>
                <p className="text-sm text-slate-600 mb-1">Pain Improvement</p>
                <p className={`text-3xl font-bold ${painAfter < painBefore ? 'text-brand-indigo' : 'text-slate-600'}`}>
                  {Math.round(((painBefore - painAfter) / painBefore) * 100)}%
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  {painBefore} → {painAfter}
                </p>
              </div>
            )}

            {/* Notes */}
            <div className="mb-6">
              <label htmlFor="notes" className="block text-sm font-semibold text-slate-700 mb-2">
                Session Notes (Optional)
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g., Patient responded well, recommend follow-up..."
                rows={3}
                className="w-full px-3 py-2 border-2 border-slate-300 rounded-lg focus:border-brand-indigo focus:outline-none text-sm"
              />
            </div>

            {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>}

            <button
              type="submit"
              disabled={submitting || painAfter === null}
              className="w-full bg-brand-indigo hover:bg-brand-indigo/90 disabled:bg-slate-300 text-white font-bold py-3 rounded-lg transition"
            >
              {submitting ? 'Completing...' : 'Complete & Notify Patient ✓'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
