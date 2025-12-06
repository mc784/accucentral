'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ProviderRegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Information
    name: '',
    email: '',
    phone: '',
    gender: 'male' as 'male' | 'female',
    photo: null as File | null,

    // Certification
    ayushCertified: false,
    certificationBody: '',
    certificationNumber: '',
    certificationFile: null as File | null,
    experienceYears: 0,

    // Location & Service Area
    territory: '',
    territoryCode: '',
    serviceArea: 'faridabad' as 'faridabad' | 'delhi' | 'gurgaon' | 'noida',
    serviceRadius: '5km',
    address: '',

    // Services
    availableServices: [] as string[],
    specializations: [] as string[],

    // Equipment & Infrastructure
    portableTable: false,
    bringsMats: false,
    oilFree: false,

    // Availability
    availableDays: [] as string[],
    preferredTimeSlots: [] as string[],

    // Languages
    languages: [] as string[],

    // Verification Documents
    idProof: null as File | null,
    addressProof: null as File | null,
    covidVaccinationCert: null as File | null,

    // Banking
    bankAccountNumber: '',
    bankIfscCode: '',
    bankAccountHolder: '',
    panNumber: '',
  })

  const services = [
    { id: 'tech-neck-reset', name: 'Tech-Neck Reset (₹299)' },
    { id: 'migraine-eraser', name: 'The Migraine Eraser (₹499)' },
    { id: 'senior-citizen-pain-relief', name: 'Senior Citizen Pain Relief (₹449)' },
  ]

  const specializationOptions = [
    'Tech-neck relief',
    'Chronic pain management',
    'Senior care',
    'Migraine treatment',
    'Women\'s health',
    'Sports injuries',
    'Sciatica',
    'Complex pain cases',
  ]

  const languageOptions = ['Hindi', 'English', 'Punjabi', 'Urdu', 'Bengali']
  const daysOfWeek = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
  const timeSlots = [
    'Morning (8 AM - 12 PM)',
    'Afternoon (12 PM - 4 PM)',
    'Evening (4 PM - 8 PM)',
    'Night (8 PM - 10 PM)',
  ]

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleArrayToggle = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).includes(value)
        ? (prev[field as keyof typeof prev] as string[]).filter((item: string) => item !== value)
        : [...(prev[field as keyof typeof prev] as string[]), value]
    }))
  }

  const handleFileChange = (field: string, file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, this would submit to an API
    console.log('Form submitted:', formData)

    // Show success message and redirect
    alert('Application submitted successfully! We will review your profile and contact you within 2-3 business days.')
    router.push('/')
  }

  const nextStep = () => setStep(prev => Math.min(prev + 1, 5))
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

  return (
    <div className="min-h-screen bg-bg-app">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-heading font-bold text-deep-teal">
              Accucentral
            </Link>
            <Link href="/specialists" className="text-slate-gray hover:text-deep-teal font-medium transition-colors">
              ← Back to Specialists
            </Link>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3, 4, 5].map(num => (
              <div key={num} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step >= num ? 'bg-deep-teal text-white' : 'bg-slate-200 text-slate-500'
                }`}>
                  {num}
                </div>
                {num < 5 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step > num ? 'bg-deep-teal' : 'bg-slate-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-slate-600">
            <span>Personal</span>
            <span>Certification</span>
            <span>Services</span>
            <span>Availability</span>
            <span>Banking</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <div>
                <h2 className="text-3xl font-heading font-bold text-deep-teal mb-6">Personal Information</h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-deep-teal focus:outline-none"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Email *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-deep-teal focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-deep-teal focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Gender *</label>
                    <div className="flex gap-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="gender"
                          value="male"
                          checked={formData.gender === 'male'}
                          onChange={(e) => handleInputChange('gender', e.target.value)}
                          className="mr-2"
                        />
                        Male
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="gender"
                          value="female"
                          checked={formData.gender === 'female'}
                          onChange={(e) => handleInputChange('gender', e.target.value)}
                          className="mr-2"
                        />
                        Female
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Profile Photo *</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange('photo', e.target.files?.[0] || null)}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-deep-teal focus:outline-none"
                      required
                    />
                    <p className="text-xs text-slate-500 mt-1">Professional headshot, clear background preferred</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Languages Spoken *</label>
                    <div className="flex flex-wrap gap-3">
                      {languageOptions.map(lang => (
                        <label key={lang} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.languages.includes(lang)}
                            onChange={() => handleArrayToggle('languages', lang)}
                            className="mr-2"
                          />
                          {lang}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Certification & Experience */}
            {step === 2 && (
              <div>
                <h2 className="text-3xl font-heading font-bold text-deep-teal mb-6">Certification & Experience</h2>

                <div className="space-y-6">
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.ayushCertified}
                        onChange={(e) => handleInputChange('ayushCertified', e.target.checked)}
                        className="mr-3"
                      />
                      <span className="font-semibold text-slate-700">I am AYUSH Certified</span>
                    </label>
                  </div>

                  {formData.ayushCertified && (
                    <>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Certification Body *</label>
                        <select
                          value={formData.certificationBody}
                          onChange={(e) => handleInputChange('certificationBody', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-deep-teal focus:outline-none"
                          required
                        >
                          <option value="">Select...</option>
                          <option value="ASPEUS">ASPEUS</option>
                          <option value="QCI">QCI (Quality Council of India)</option>
                          <option value="IGNOU">IGNOU</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Certification Number *</label>
                        <input
                          type="text"
                          value={formData.certificationNumber}
                          onChange={(e) => handleInputChange('certificationNumber', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-deep-teal focus:outline-none"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Upload Certificate *</label>
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileChange('certificationFile', e.target.files?.[0] || null)}
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-deep-teal focus:outline-none"
                          required
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Years of Experience *</label>
                    <input
                      type="number"
                      min="0"
                      value={formData.experienceYears}
                      onChange={(e) => handleInputChange('experienceYears', parseInt(e.target.value))}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-deep-teal focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">ID Proof (Aadhaar/PAN) *</label>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange('idProof', e.target.files?.[0] || null)}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-deep-teal focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Address Proof *</label>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange('addressProof', e.target.files?.[0] || null)}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-deep-teal focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">COVID Vaccination Certificate</label>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange('covidVaccinationCert', e.target.files?.[0] || null)}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-deep-teal focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Services & Territory */}
            {step === 3 && (
              <div>
                <h2 className="text-3xl font-heading font-bold text-deep-teal mb-6">Services & Territory</h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Which services can you deliver? *</label>
                    <div className="space-y-3">
                      {services.map(service => (
                        <label key={service.id} className="flex items-center p-4 border-2 border-slate-200 rounded-lg hover:border-deep-teal cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.availableServices.includes(service.id)}
                            onChange={() => handleArrayToggle('availableServices', service.id)}
                            className="mr-3"
                          />
                          <span className="font-medium">{service.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Your Specializations *</label>
                    <div className="flex flex-wrap gap-3">
                      {specializationOptions.map(spec => (
                        <label key={spec} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.specializations.includes(spec)}
                            onChange={() => handleArrayToggle('specializations', spec)}
                            className="mr-2"
                          />
                          {spec}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Service Area *</label>
                    <select
                      value={formData.serviceArea}
                      onChange={(e) => handleInputChange('serviceArea', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-deep-teal focus:outline-none"
                      required
                    >
                      <option value="faridabad">Faridabad</option>
                      <option value="delhi">Delhi</option>
                      <option value="gurgaon">Gurgaon</option>
                      <option value="noida">Noida</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Territory (e.g., Sector 15) *</label>
                      <input
                        type="text"
                        value={formData.territory}
                        onChange={(e) => handleInputChange('territory', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-deep-teal focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Service Radius *</label>
                      <select
                        value={formData.serviceRadius}
                        onChange={(e) => handleInputChange('serviceRadius', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-deep-teal focus:outline-none"
                        required
                      >
                        <option value="3km">3km radius</option>
                        <option value="5km">5km radius</option>
                        <option value="7km">7km radius</option>
                        <option value="10km">10km radius</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Full Address *</label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-deep-teal focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Equipment You Have *</label>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.portableTable}
                          onChange={(e) => handleInputChange('portableTable', e.target.checked)}
                          className="mr-3"
                        />
                        <span>Portable Treatment Table</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.bringsMats}
                          onChange={(e) => handleInputChange('bringsMats', e.target.checked)}
                          className="mr-3"
                        />
                        <span>Yoga/Treatment Mats</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.oilFree}
                          onChange={(e) => handleInputChange('oilFree', e.target.checked)}
                          className="mr-3"
                        />
                        <span>Offer Oil-Free Sessions</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Availability */}
            {step === 4 && (
              <div>
                <h2 className="text-3xl font-heading font-bold text-deep-teal mb-6">Availability</h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Available Days *</label>
                    <div className="flex flex-wrap gap-3">
                      {daysOfWeek.map(day => (
                        <label key={day} className="flex items-center px-4 py-2 border-2 border-slate-200 rounded-lg hover:border-deep-teal cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.availableDays.includes(day)}
                            onChange={() => handleArrayToggle('availableDays', day)}
                            className="mr-2"
                          />
                          {day.toUpperCase()}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Preferred Time Slots *</label>
                    <div className="space-y-2">
                      {timeSlots.map(slot => (
                        <label key={slot} className="flex items-center p-3 border-2 border-slate-200 rounded-lg hover:border-deep-teal cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.preferredTimeSlots.includes(slot)}
                            onChange={() => handleArrayToggle('preferredTimeSlots', slot)}
                            className="mr-3"
                          />
                          {slot}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Banking Details */}
            {step === 5 && (
              <div>
                <h2 className="text-3xl font-heading font-bold text-deep-teal mb-6">Banking Details</h2>

                <div className="space-y-6">
                  <div className="bg-sage-green/10 border border-sage-green/30 rounded-lg p-4 mb-6">
                    <p className="text-sm text-slate-700">
                      <strong>Commission Structure:</strong> You will receive 70-80% of each session fee. Payments are processed weekly via bank transfer.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Account Holder Name *</label>
                    <input
                      type="text"
                      value={formData.bankAccountHolder}
                      onChange={(e) => handleInputChange('bankAccountHolder', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-deep-teal focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Bank Account Number *</label>
                    <input
                      type="text"
                      value={formData.bankAccountNumber}
                      onChange={(e) => handleInputChange('bankAccountNumber', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-deep-teal focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">IFSC Code *</label>
                    <input
                      type="text"
                      value={formData.bankIfscCode}
                      onChange={(e) => handleInputChange('bankIfscCode', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-deep-teal focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">PAN Number *</label>
                    <input
                      type="text"
                      value={formData.panNumber}
                      onChange={(e) => handleInputChange('panNumber', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-deep-teal focus:outline-none"
                      required
                    />
                    <p className="text-xs text-slate-500 mt-1">Required for TDS compliance</p>
                  </div>

                  <div className="bg-warm-coral/10 border border-warm-coral/30 rounded-lg p-4 mt-6">
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        required
                        className="mr-3 mt-1"
                      />
                      <span className="text-sm text-slate-700">
                        I confirm that all information provided is accurate and I agree to AccuCentral's terms of service,
                        provider agreement, and commission structure.
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-8 border-t border-slate-200">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-8 py-3 border-2 border-deep-teal text-deep-teal font-bold rounded-lg hover:bg-deep-teal hover:text-white transition"
                >
                  ← Previous
                </button>
              )}

              {step < 5 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="ml-auto px-8 py-3 bg-deep-teal text-white font-bold rounded-lg hover:bg-deep-teal/90 transition"
                >
                  Next →
                </button>
              ) : (
                <button
                  type="submit"
                  className="ml-auto px-8 py-3 bg-[#F4A261] hover:bg-[#E96F1C] text-white font-bold rounded-lg transition"
                >
                  Submit Application
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
