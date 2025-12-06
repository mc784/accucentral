'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface PaymentPageProps {
  params: Promise<{
    bookingId: string
  }>
}

interface Booking {
  id: string
  serviceName: string
  providerName: string
  date: string
  time: string
  duration: string
  amount: number
  patientName: string
  patientPhone: string
}

export default function PaymentPage({ params }: PaymentPageProps) {
  const router = useRouter()
  const [bookingId, setBookingId] = useState<string>('')
  const [booking, setBooking] = useState<Booking | null>(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    params.then(p => {
      setBookingId(p.bookingId)
      fetchBooking(p.bookingId)
    })
  }, [params])

  const fetchBooking = async (id: string) => {
    try {
      // TODO: Replace with actual API call
      const response = await fetch(`/api/bookings/${id}`)
      if (!response.ok) throw new Error('Booking not found')
      
      const data = await response.json()
      setBooking(data)
    } catch (err) {
      setError('Failed to load booking details')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handlePayment = async () => {
    if (!booking) return

    setProcessing(true)
    setError('')

    try {
      // TODO: Replace with actual Razorpay integration
      // Step 1: Create order on backend
      const orderResponse = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId: booking.id,
          amount: booking.amount,
        }),
      })

      if (!orderResponse.ok) throw new Error('Failed to create order')

      const orderData = await orderResponse.json()

      // Step 2: Initialize Razorpay
      if (typeof window !== 'undefined' && (window as any).Razorpay) {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Add to .env.local
          amount: booking.amount * 100, // Razorpay expects paise
          currency: 'INR',
          name: 'Marma Acupressure',
          description: `${booking.serviceName} - ${booking.date}`,
          order_id: orderData.orderId,
          handler: async function (response: any) {
            // Step 3: Verify payment on backend
            try {
              const verifyResponse = await fetch('/api/payment/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  bookingId: booking.id,
                }),
              })

              if (!verifyResponse.ok) throw new Error('Payment verification failed')

              // Redirect to success page
              router.push(`/patient/payment/success?bookingId=${booking.id}`)
            } catch (err) {
              setError('Payment verification failed. Please contact support.')
              console.error(err)
            }
          },
          prefill: {
            name: booking.patientName,
            contact: booking.patientPhone,
          },
          theme: {
            color: '#4A7C7E', // deep-teal
          },
          modal: {
            ondismiss: function () {
              setProcessing(false)
              setError('Payment cancelled')
            },
          },
        }

        const razorpay = new (window as any).Razorpay(options)
        razorpay.open()
      } else {
        throw new Error('Razorpay not loaded')
      }
    } catch (err) {
      setError('Payment failed. Please try again.')
      console.error(err)
      setProcessing(false)
    }
  }

  const handleWhatsAppPayment = () => {
    const message = encodeURIComponent(
      `Hi! I'd like to pay for my booking:\n\n` +
      `Booking ID: ${booking?.id}\n` +
      `Service: ${booking?.serviceName}\n` +
      `Date: ${booking?.date} at ${booking?.time}\n` +
      `Amount: ₹${booking?.amount}\n\n` +
      `Please send me payment details.`
    )
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-app flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-brand-indigo border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600">Loading payment details...</p>
        </div>
      </div>
    )
  }

  if (error && !booking) {
    return (
      <div className="min-h-screen bg-bg-app flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-brand-charcoal mb-3">Booking Not Found</h1>
          <p className="text-slate-600 mb-6">{error}</p>
          <Link
            href="/patient/book"
            className="inline-block px-6 py-3 bg-brand-indigo text-white font-bold rounded-xl hover:bg-brand-indigo/90 transition-colors"
          >
            Book New Session
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg-app">
      {/* Razorpay Script */}
      <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-heading font-bold text-brand-indigo">
            Marma
          </Link>
          <Link href="/patient/book" className="text-sm text-slate-600 hover:text-brand-indigo">
            ← Back
          </Link>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-8">
        {/* Hero */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brand-indigo/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">💳</span>
          </div>
          <h1 className="text-3xl font-bold text-brand-charcoal mb-2">Complete Payment</h1>
          <p className="text-slate-600">Secure your booking with payment</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-brand-ochre/20 border border-brand-ochre/30 text-brand-ochre">
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Booking Summary */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 pattern-bg">
          <h2 className="text-lg font-bold text-brand-charcoal mb-4">Booking Summary</h2>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-slate-600">Service</span>
              <span className="font-semibold text-brand-charcoal">{booking?.serviceName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Practitioner</span>
              <span className="font-semibold text-brand-charcoal">{booking?.providerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Date & Time</span>
              <span className="font-semibold text-brand-charcoal">
                {booking?.date} at {booking?.time}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Duration</span>
              <span className="font-semibold text-brand-charcoal">{booking?.duration}</span>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-600">Original Price</span>
              <span className="text-slate-400 line-through">₹{(booking?.amount || 0) * 2}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-brand-indigo font-semibold">Pilot Discount (50%)</span>
              <span className="text-brand-indigo font-semibold">-₹{booking?.amount}</span>
            </div>
            <div className="flex justify-between items-center text-2xl font-bold">
              <span className="text-brand-charcoal">Total</span>
              <span className="text-brand-indigo">₹{booking?.amount}</span>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-4 mb-6">
          {/* Razorpay Payment */}
          <button
            onClick={handlePayment}
            disabled={processing}
            className="w-full bg-brand-indigo hover:bg-brand-indigo/90 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-colors shadow-lg flex items-center justify-center gap-3"
          >
            {processing ? (
              <>
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                Processing...
              </>
            ) : (
              <>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Pay ₹{booking?.amount} Now
              </>
            )}
          </button>

          {/* WhatsApp Alternative */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-slate-50 text-slate-500">or</span>
            </div>
          </div>

          <button
            onClick={handleWhatsAppPayment}
            className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold py-4 rounded-xl transition-colors shadow-lg flex items-center justify-center gap-3"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Pay via WhatsApp
          </button>
        </div>

        {/* Security Badges */}
        <div className="bg-white rounded-xl p-6 mb-6">
          <h3 className="text-sm font-semibold text-brand-charcoal mb-4 text-center">
            Secure Payment Powered By
          </h3>
          <div className="flex justify-center items-center gap-6">
            <div className="text-2xl font-bold text-slate-600">Razorpay</div>
            <div className="text-slate-300">|</div>
            <div className="flex gap-2">
              <div className="text-xs bg-slate-100 px-2 py-1 rounded">128-bit SSL</div>
              <div className="text-xs bg-slate-100 px-2 py-1 rounded">PCI DSS</div>
            </div>
          </div>
        </div>

        {/* Payment Info */}
        <div className="bg-brand-indigo/10 border border-brand-indigo/30 rounded-xl p-6">
          <h3 className="font-semibold text-brand-charcoal mb-3 flex items-center gap-2">
            <span>ℹ️</span>
            Payment Information
          </h3>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>• 50% pilot discount applied automatically</li>
            <li>• Secure payment via Razorpay or bank transfer</li>
            <li>• Full refund available if cancelled 24hrs before</li>
            <li>• Receipt sent to your WhatsApp/SMS immediately</li>
          </ul>
        </div>

        {/* Help */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-600 mb-2">Need help?</p>
          <a
            href="https://wa.me/919876543210?text=I need help with payment"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-indigo font-semibold hover:underline"
          >
            Contact Support on WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
