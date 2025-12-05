'use client'

import { useState } from 'react'
import Link from 'next/link'
import { mockPendingProviders } from '@/data/admin'
import type { PendingProvider } from '@/data/admin'

export default function ProviderApprovalPage() {
  const [providers, setProviders] = useState(mockPendingProviders)
  const [selectedProvider, setSelectedProvider] = useState<PendingProvider | null>(null)

  const approveProvider = (id: string) => {
    const provider = providers.find(p => p.id === id)
    if (!provider) return

    setProviders(prevProviders =>
      prevProviders.map(p =>
        p.id === id
          ? {
              ...p,
              status: 'approved' as const,
              reviewedAt: new Date().toISOString(),
              reviewedBy: 'Admin',
            }
          : p
      )
    )

    alert(`✅ ${provider.name} approved!\n\nNext steps:\n- Credentials sent via email\n- Welcome WhatsApp message sent\n- Added to provider database`)

    setSelectedProvider(null)
  }

  const rejectProvider = (id: string, reason: string) => {
    const provider = providers.find(p => p.id === id)
    if (!provider) return

    setProviders(prevProviders =>
      prevProviders.map(p =>
        p.id === id
          ? {
              ...p,
              status: 'rejected' as const,
              reviewedAt: new Date().toISOString(),
              reviewedBy: 'Admin',
              rejectionReason: reason,
            }
          : p
      )
    )

    alert(`❌ ${provider.name} rejected.\n\nReason: ${reason}\n\nRejection email sent.`)

    setSelectedProvider(null)
  }

  const pendingCount = providers.filter(p => p.status === 'pending').length
  const approvedCount = providers.filter(p => p.status === 'approved').length
  const rejectedCount = providers.filter(p => p.status === 'rejected').length

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
              <h1 className="text-3xl font-heading font-bold text-deep-teal">Provider Applications</h1>
              <p className="text-slate-600">Review and approve new therapist applications</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-warm-coral">
            <div className="text-2xl font-bold text-warm-coral">{pendingCount}</div>
            <div className="text-sm text-slate-600">Pending Review</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-sage-green">
            <div className="text-2xl font-bold text-sage-green-700">{approvedCount}</div>
            <div className="text-sm text-slate-600">Approved</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-slate-400">
            <div className="text-2xl font-bold text-slate-600">{rejectedCount}</div>
            <div className="text-sm text-slate-600">Rejected</div>
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-6">
          {providers.map(provider => (
            <div
              key={provider.id}
              className={`bg-white rounded-xl shadow-xl overflow-hidden border-2 ${
                provider.status === 'pending'
                  ? 'border-warm-coral'
                  : provider.status === 'approved'
                  ? 'border-sage-green'
                  : 'border-slate-300'
              }`}
            >
              {/* Status Header */}
              <div className={`px-6 py-3 ${
                provider.status === 'pending'
                  ? 'bg-warm-coral text-white'
                  : provider.status === 'approved'
                  ? 'bg-sage-green text-white'
                  : 'bg-slate-400 text-white'
              }`}>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm">Application ID: {provider.id}</span>
                  <span className="font-bold text-sm">{provider.status.toUpperCase()}</span>
                </div>
              </div>

              <div className="p-6">
                {/* Personal Info */}
                <div className="mb-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-deep-teal mb-1">{provider.name}</h3>
                      <div className="text-slate-600">{provider.email}</div>
                      <div className="text-slate-600">{provider.phone}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-slate-500">Applied</div>
                      <div className="font-semibold text-slate-900">{provider.applicationDate}</div>
                    </div>
                  </div>
                </div>

                {/* Certification Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <h4 className="font-bold text-deep-teal mb-3">Certification Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">AYUSH Certified:</span>
                        <span className={`font-semibold ${provider.ayushCertified ? 'text-sage-green-700' : 'text-slate-400'}`}>
                          {provider.ayushCertified ? '✓ Yes' : '✗ No'}
                        </span>
                      </div>
                      {provider.ayushCertified && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Body:</span>
                            <span className="font-semibold text-slate-900">{provider.certificationBody}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Cert Number:</span>
                            <span className="font-semibold text-slate-900">{provider.certificationNumber}</span>
                          </div>
                        </>
                      )}
                      <div className="flex justify-between">
                        <span className="text-slate-600">Experience:</span>
                        <span className="font-semibold text-slate-900">{provider.experienceYears} years</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-4">
                    <h4 className="font-bold text-deep-teal mb-3">Service Area</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Territory:</span>
                        <span className="font-semibold text-slate-900">{provider.territory}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Area:</span>
                        <span className="font-semibold text-slate-900 capitalize">{provider.serviceArea}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Services & Specializations */}
                <div className="mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-deep-teal mb-2">Requested Services</h4>
                      <div className="flex flex-wrap gap-2">
                        {provider.requestedServices.map((service, idx) => (
                          <span key={idx} className="px-3 py-1 bg-calm-blue/20 text-calm-blue border border-calm-blue/40 rounded-lg text-sm font-medium">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-deep-teal mb-2">Specializations</h4>
                      <div className="flex flex-wrap gap-2">
                        {provider.specializations.map((spec, idx) => (
                          <span key={idx} className="px-3 py-1 bg-sage-green/20 text-sage-green-700 border border-sage-green/40 rounded-lg text-sm font-medium">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Documents */}
                <div className="mb-6 bg-slate-50 rounded-lg p-4">
                  <h4 className="font-bold text-deep-teal mb-3">Uploaded Documents</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {provider.documents.photo && (
                      <div className="text-center p-3 bg-white rounded-lg border border-slate-200">
                        <div className="text-2xl mb-1">📷</div>
                        <div className="text-xs font-semibold text-slate-700">Photo</div>
                        <a href={provider.documents.photo} target="_blank" rel="noopener noreferrer" className="text-xs text-deep-teal hover:underline">
                          View
                        </a>
                      </div>
                    )}
                    {provider.documents.certificationFile && (
                      <div className="text-center p-3 bg-white rounded-lg border border-slate-200">
                        <div className="text-2xl mb-1">📜</div>
                        <div className="text-xs font-semibold text-slate-700">Certificate</div>
                        <a href={provider.documents.certificationFile} target="_blank" rel="noopener noreferrer" className="text-xs text-deep-teal hover:underline">
                          View
                        </a>
                      </div>
                    )}
                    {provider.documents.idProof && (
                      <div className="text-center p-3 bg-white rounded-lg border border-slate-200">
                        <div className="text-2xl mb-1">🆔</div>
                        <div className="text-xs font-semibold text-slate-700">ID Proof</div>
                        <a href={provider.documents.idProof} target="_blank" rel="noopener noreferrer" className="text-xs text-deep-teal hover:underline">
                          View
                        </a>
                      </div>
                    )}
                    {provider.documents.addressProof && (
                      <div className="text-center p-3 bg-white rounded-lg border border-slate-200">
                        <div className="text-2xl mb-1">🏠</div>
                        <div className="text-xs font-semibold text-slate-700">Address</div>
                        <a href={provider.documents.addressProof} target="_blank" rel="noopener noreferrer" className="text-xs text-deep-teal hover:underline">
                          View
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Admin Notes */}
                {provider.adminNotes && (
                  <div className="mb-6 bg-calm-blue/10 border border-calm-blue/30 rounded-lg p-4">
                    <h4 className="font-bold text-deep-teal mb-2">Admin Notes</h4>
                    <p className="text-sm text-slate-700">{provider.adminNotes}</p>
                  </div>
                )}

                {/* Review Section */}
                {provider.status === 'pending' ? (
                  <div className="flex gap-3">
                    <button
                      onClick={() => approveProvider(provider.id)}
                      className="flex-1 py-3 bg-sage-green text-white font-bold rounded-lg hover:bg-sage-green/90 transition-all shadow-lg"
                    >
                      ✓ Approve Application
                    </button>
                    <button
                      onClick={() => {
                        const reason = prompt('Reason for rejection:')
                        if (reason) rejectProvider(provider.id, reason)
                      }}
                      className="flex-1 py-3 bg-slate-400 text-white font-bold rounded-lg hover:bg-slate-500 transition-all shadow-lg"
                    >
                      ✗ Reject Application
                    </button>
                  </div>
                ) : (
                  <div className={`p-4 rounded-lg ${
                    provider.status === 'approved'
                      ? 'bg-sage-green/10 border border-sage-green/30'
                      : 'bg-slate-100 border border-slate-300'
                  }`}>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-bold text-deep-teal">
                          {provider.status === 'approved' ? 'Approved' : 'Rejected'}
                        </div>
                        <div className="text-sm text-slate-600">
                          Reviewed by {provider.reviewedBy} on {provider.reviewedAt}
                        </div>
                        {provider.rejectionReason && (
                          <div className="text-sm text-slate-700 mt-2">
                            Reason: {provider.rejectionReason}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {providers.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl shadow-lg">
              <div className="text-5xl mb-4">✅</div>
              <div className="text-xl font-semibold text-slate-600">No pending applications</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
