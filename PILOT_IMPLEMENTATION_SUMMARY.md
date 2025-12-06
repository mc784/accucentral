# Accucentral Pilot Program - Complete Implementation Summary

## Project Overview
Transform Accucentral from a single-practitioner site into a full AYUSH marketplace platform, starting with a 2-week pilot in Faridabad with 5 providers and 50 patients.

**Pilot Goals:**
- 5 providers (Chandan + 4 peers)
- 50 patients (existing clients via warm traffic)
- 30+ bookings, 25+ completed sessions
- 50% patient discount (₹750 vs ₹1500)
- Zero provider commission during pilot
- WhatsApp-first communication
- Pain score tracking (before/after)

**Timeline:** 2 weeks
**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Supabase/PostgreSQL, Razorpay, JWT auth

---

## Stream A - Backend & APIs
**Owner:** User (handled separately)

### Objectives
Build complete backend infrastructure and REST APIs for the pilot program.

### Database Schema (Supabase/PostgreSQL)

**Tables:**
1. **providers**
   - id, name, phone, whatsapp, email
   - ayush_reg, specialization, status
   - created_at, updated_at

2. **patients**
   - id, name, phone, whatsapp
   - created_at, last_session_date

3. **services**
   - id, provider_id, name, description
   - price, duration, category
   - created_at

4. **bookings**
   - id, patient_id, provider_id, service_id
   - date, time, status (pending/confirmed/completed/cancelled)
   - amount, payment_status (pending/paid/refunded)
   - pain_before, pain_after
   - created_at, updated_at

5. **sessions**
   - id, booking_id
   - pain_before, pain_after, notes
   - completed_at

6. **payment_orders**
   - id, booking_id, order_id, payment_id
   - amount, status
   - created_at

### API Endpoints Required

**Authentication:**
- `POST /api/auth/send-otp` - Generate and send OTP via SMS/WhatsApp
- `POST /api/auth/verify-otp` - Verify OTP and return JWT token

**Patient APIs:**
- `GET /api/patients/:id` - Get patient profile
- `PUT /api/patients/:id` - Update patient profile
- `GET /api/patients/:id/sessions` - Get patient session history
- `GET /api/patients/:id/progress` - Get pain score progress
- `GET /api/patients/:id/bookings` - Get patient bookings

**Booking APIs:**
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/:id` - Get booking details
- `PUT /api/bookings/:id/status` - Update booking status
- `POST /api/bookings/:id/cancel` - Cancel booking

**Provider APIs:**
- `GET /api/providers` - List all active providers
- `GET /api/providers/:id` - Get provider details
- `GET /api/providers/:id/availability` - Get provider availability

**Service APIs:**
- `GET /api/services` - List all services
- `GET /api/services/:id` - Get service details

**Payment APIs:**
- `POST /api/payment/create-order` - Create Razorpay order
- `POST /api/payment/verify` - Verify Razorpay payment signature
- `GET /api/patients/:id/payments` - Get payment history

**Session APIs:**
- `POST /api/sessions/:id/pain-score` - Log pain scores
- `POST /api/sessions/:id/complete` - Mark session complete

**Admin APIs:**
- `POST /api/admin/login` - Admin authentication
- `GET /api/admin/bookings` - Get all bookings
- `GET /api/admin/stats` - Dashboard statistics
- `PUT /api/admin/bookings/:id/status` - Update booking status
- `GET /api/admin/providers` - Get all providers
- `PUT /api/admin/providers/:id/status` - Update provider status

### Integration Points
- **OTP Service:** Twilio, AWS SNS, or custom SMS gateway
- **WhatsApp:** WhatsApp Business API (manual initially)
- **Payment Gateway:** Razorpay test mode
- **JWT Secret:** Secure random string in environment

### Environment Variables Needed
```bash
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET=your_secure_secret
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_PHONE_NUMBER=your_number
```

---

## Stream B - Patient PWA
**Owner:** Agent (Completed)

### ✅ Completed Features

#### 1. Patient Booking Landing Page (`/patient/book`)
- Mobile-first responsive design (320px-428px)
- 3 service cards with pilot pricing:
  - Tech-Neck Relief - ₹750 (50% off)
  - Migraine Relief - ₹750 (50% off)
  - Senior Wellness - ₹750 (50% off)
- Provider trust badges (5 practitioners)
- One-click WhatsApp booking with pre-filled messages
- Alternative phone call option
- Trust indicators (AYUSH certified, 50+ sessions)
- Link to patient dashboard

**Key Code:**
```typescript
// Pre-filled WhatsApp message
const generateWhatsAppLink = (serviceName: string) => {
  const message = encodeURIComponent(
    `Hi! I'd like to book a session:\n\n` +
    `- Service: ${serviceName}\n` +
    `- Preferred Date: Tomorrow\n` +
    `- Time: Morning/Afternoon/Evening\n\n` +
    `My name: \n` +
    `My number: +91`
  );
  return `https://wa.me/${whatsappNumber}?text=${message}`;
};
```

#### 2. Patient Dashboard (`/patient/[id]`)
- Full dashboard with progress tracking
- Pain reduction stats card (% improvement)
- Interactive pain journey chart (SVG-based)
- Session balance visual tracker
- Homework video assignments (YouTube embeds)
- Interactive onboarding tour
- Renewal alerts system
- Next session confirmation
- WhatsApp contact integration

**Features:**
- Progress stats: Pain reduction, sessions completed, trend
- Visual session tracker (checkboxes for completed)
- Pain level chart with data points
- Homework video player
- CTA buttons for renewal and support

#### 3. OTP Login System (`/patient/login`)
- Two-step authentication:
  1. Phone number entry (Indian format validation)
  2. 6-digit OTP verification
- JWT token generation and storage
- OTP resend functionality
- Change number option
- Trust badges & support links
- Auto-redirect to dashboard after login

**Security:**
- JWT stored in localStorage
- Token expiry: 30 days
- Phone validation: `/^[6-9]\d{9}$/`

#### 4. Payment Integration (`/patient/payment/[bookingId]`)
- Razorpay payment gateway integration
- Booking summary with pricing breakdown
- 50% pilot discount display
- Secure payment processing
- WhatsApp payment alternative
- Payment success page (`/patient/payment/success`)
- PCI DSS security badges

**Razorpay Flow:**
```typescript
1. Create order on backend → Order ID
2. Initialize Razorpay checkout
3. User completes payment
4. Verify signature on backend
5. Redirect to success page
```

#### 5. API Client Library (`lib/api-client.ts`)
Complete API integration layer with:
- Authentication APIs (sendOTP, verifyOTP, logout)
- Patient APIs (profile, sessions, progress)
- Booking APIs (create, cancel, fetch, getPatientBookings)
- Service & Provider APIs
- Payment APIs (createOrder, verifyPayment, history)
- Session tracking APIs (logPainScore, completeSession)

**Configuration:**
```typescript
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
// Automatic token injection in headers
// Error handling with typed responses
```

### Patient User Flow
```
1. Patient clicks provider's shared link → /patient/book
2. Views 3 services with ₹750 pricing
3. Clicks "Book via WhatsApp" (pre-filled message)
4. Confirms booking via WhatsApp conversation
5. Receives payment link → /patient/payment/[bookingId]
6. Completes Razorpay payment
7. Redirected to /patient/payment/success
8. Can login anytime at /patient/login (OTP)
9. Views progress at /patient/[id] (dashboard)
10. Tracks pain scores, sessions, homework
```

### Files Created
- `app/patient/book/page.tsx` - Landing page
- `app/patient/login/page.tsx` - OTP login
- `app/patient/[id]/page.tsx` - Dashboard (already existed)
- `app/patient/payment/[bookingId]/page.tsx` - Payment
- `app/patient/payment/success/page.tsx` - Success
- `app/api/auth/send-otp/route.ts` - OTP generation
- `app/api/auth/verify-otp/route.ts` - OTP verification
- `app/api/payment/create-order/route.ts` - Razorpay order
- `app/api/payment/verify/route.ts` - Payment verification
- `app/api/bookings/[id]/route.ts` - Booking details
- `lib/api-client.ts` - API integration layer
- `.env.local.example` - Environment variables template

---

## Stream C - Provider PWA
**Owner:** Not yet started

### Objectives
Build provider-facing PWA for managing bookings, logging sessions, and tracking earnings.

### Features Required

#### 1. Provider Login (`/provider/login`)
- Phone + OTP authentication
- JWT token generation
- Same flow as patient login
- Provider-specific dashboard redirect

#### 2. Provider Dashboard (`/provider/dashboard`)
- Today's bookings list
- Upcoming sessions (next 7 days)
- Completed sessions count
- Earnings summary
- Average rating
- Quick actions:
  - Log new session
  - View booking details
  - Contact patient

#### 3. Bookings List (`/provider/bookings`)
- Filter by status: Upcoming, Completed, Cancelled
- Booking cards with:
  - Patient name, phone
  - Service name
  - Date, time, duration
  - Payment status
  - Actions: Call, WhatsApp, Log Session

#### 4. Session Logger (`/provider/log-session/:bookingId`)
- Pain score entry form:
  - Pain before session (1-10)
  - Pain after session (1-10)
  - Session notes (optional)
  - Duration
- Take photo (optional)
- Submit → Mark booking complete

#### 5. Earnings View (`/provider/earnings`)
- Current week earnings
- Current month earnings
- Payment pending amount
- Transaction history
- Payout schedule info

#### 6. Profile Management (`/provider/profile`)
- View/edit provider details
- AYUSH registration info
- Specializations
- Availability settings
- Change password

### API Endpoints Needed
- `POST /api/provider/login` - Provider authentication
- `GET /api/provider/dashboard` - Dashboard data
- `GET /api/provider/bookings` - Provider bookings
- `GET /api/provider/bookings/:id` - Booking details
- `POST /api/provider/sessions` - Log session
- `GET /api/provider/earnings` - Earnings data
- `PUT /api/provider/profile` - Update profile

### Provider User Flow
```
1. Provider logs in at /provider/login (OTP)
2. Views dashboard with today's bookings
3. Clicks "Log Session" on completed booking
4. Enters pain scores (before: 8, after: 3)
5. Adds session notes
6. Submits → Booking marked complete
7. Patient gets notification
8. Views earnings in /provider/earnings
9. Checks payment schedule
```

### Design Notes
- Mobile-first (providers use phones)
- Quick session logging (< 30 seconds)
- WhatsApp integration for patient communication
- Offline-first (PWA with service worker)
- Bottom navigation for mobile

---

## Stream D - Admin Dashboard
**Owner:** Agent (Completed)

### ✅ Completed Features

#### 1. Admin Login (`/admin/login`)
- Email + password authentication
- JWT token generation (24h expiry)
- Session management in localStorage
- Remember me functionality
- Demo credentials for development
- Elegant dark gradient design

**Demo Credentials (Development):**
- Email: `admin@marma.com`
- Password: `admin123`

#### 2. Admin Dashboard (`/admin/dashboard`)
Real-time pilot program management interface.

**6 Stats Cards:**
1. Total Bookings - 32
2. Pending Bookings - 5 (warm coral)
3. Completed Sessions - 18 (sage green)
4. Total Revenue - ₹24,000
5. Active Providers - 5
6. Active Patients - 28

**Pending Bookings Queue:**
- Filter tabs: Pending, Confirmed, Completed, All
- Auto-refresh every 30 seconds
- Manual refresh button
- Booking cards showing:
  - Patient name, phone
  - Service, provider, date/time
  - Amount, payment status
  - Pain scores (if completed)
  - Actions: Confirm, Mark Complete, View Details, WhatsApp

**Quick Actions:**
- Confirm pending bookings → Status: Confirmed
- Mark confirmed bookings → Status: Completed
- Contact patients via WhatsApp
- View booking details

**Quick Links:**
- Manage Providers → `/admin/providers`
- Patient Database → `/admin/patients` (TODO)
- Analytics & Reports → `/admin/reports` (TODO)

#### 3. Provider Management (`/admin/providers`)
Complete provider directory and approval system.

**Summary Cards:**
- Total Providers: 5
- Active: 3 (sage green)
- Pending Approval: 1 (warm coral)
- Total Sessions: 143

**Provider Cards:**
Each provider card shows:
- Name, photo placeholder
- Status badge (Active/Pending/Inactive)
- Specialization
- AYUSH Registration number
- Phone & WhatsApp (clickable)
- Stats:
  - Sessions: 42/45 completed
  - Rating: ⭐ 4.8
  - Earnings: ₹31,500
  - Join date: Nov 15, 2025

**Actions:**
- Approve pending providers
- Deactivate/Reactivate providers
- View provider details
- Message via WhatsApp

**Provider Status Flow:**
```
Pending → Admin approves → Active
Active → Admin deactivates → Inactive
Inactive → Admin reactivates → Active
```

#### 4. Backend API Routes
- `POST /api/admin/login` - Admin authentication
- `GET /api/admin/bookings` - Fetch all bookings (mock data)
- `GET /api/admin/stats` - Dashboard statistics
- `PUT /api/admin/bookings/:id/status` - Update booking status
- `GET /api/admin/providers` - Fetch all providers (mock data)
- `PUT /api/admin/providers/:id/status` - Update provider status

### Admin User Flow
```
1. Admin logs in at /admin/login
2. Views dashboard at /admin/dashboard
3. Sees 5 pending bookings
4. Reviews booking details (patient, service, provider, payment)
5. Clicks "Confirm" → Booking status: Confirmed
6. TODO: Patient & Provider get WhatsApp notification
7. After session, clicks "Mark Complete"
8. Booking status: Completed
9. Pain score visible (8 → 3, 62% reduction)
10. Navigates to /admin/providers
11. Sees 1 pending provider (Rajesh Kumar)
12. Reviews AYUSH registration
13. Clicks "Approve" → Provider status: Active
14. TODO: Provider gets credentials email + WhatsApp
```

### Design Features
- **Color-coded status:**
  - Pending: Warm coral (#F4A261)
  - Confirmed/Active: Deep teal (#4A7C7E)
  - Completed: Sage green (#7D9D7C)
  - Paid: Sage green
  - Payment pending: Yellow

- **Real-time updates:**
  - Auto-refresh every 30 seconds
  - Manual refresh button
  - Loading states with spinners

- **Responsive:**
  - Desktop: Multi-column grids
  - Mobile: Single column, touch-friendly

### Files Created
- `app/admin/login/page.tsx` - Login page
- `app/admin/dashboard/page.tsx` - Main dashboard
- `app/admin/providers/page.tsx` - Provider management
- `app/api/admin/login/route.ts` - Auth endpoint
- `app/api/admin/bookings/route.ts` - Bookings data
- `app/api/admin/stats/route.ts` - Stats endpoint
- `app/api/admin/bookings/[id]/status/route.ts` - Update booking
- `app/api/admin/providers/route.ts` - Providers data
- `app/api/admin/providers/[id]/status/route.ts` - Update provider

---

## Integration Checklist

### Stream A → Stream B Integration
- [ ] Deploy backend APIs to production URL
- [ ] Update `NEXT_PUBLIC_API_URL` in `.env.local`
- [ ] Replace mock patient data in `/patient/[id]` with API calls
- [ ] Connect OTP APIs to actual SMS/WhatsApp service
- [ ] Enable real payment verification with Razorpay
- [ ] Test full patient flow end-to-end

### Stream A → Stream C Integration
- [ ] Build provider authentication endpoint
- [ ] Create provider dashboard API
- [ ] Build session logging endpoint
- [ ] Create earnings calculation logic
- [ ] Test provider flow end-to-end

### Stream A → Stream D Integration
- [ ] Connect admin dashboard to real booking data
- [ ] Replace mock providers with database query
- [ ] Implement booking status change notifications
- [ ] Add provider approval email/WhatsApp
- [ ] Build analytics aggregation queries

### Cross-Stream Features
- [ ] WhatsApp Business API integration (or manual initially)
- [ ] SMS OTP service (Twilio/AWS SNS)
- [ ] Razorpay live mode (after pilot)
- [ ] Real-time notifications (WebSocket optional)
- [ ] Image upload for session photos
- [ ] PDF receipt generation

---

## Deployment Plan

### Phase 1: Pre-Pilot (Week 0)
1. Deploy Stream A (Backend) to production
2. Deploy Stream B (Patient PWA) to Vercel
3. Deploy Stream D (Admin Dashboard)
4. Configure Razorpay test mode
5. Set up SMS/WhatsApp for OTP
6. Create 5 provider accounts
7. Test all flows with dummy data

### Phase 2: Soft Launch (Day 1-3)
1. Share `/patient/book` link with Chandan
2. Chandan shares with 10 existing clients
3. Monitor first bookings in admin dashboard
4. Test payment flow with real transactions
5. Log first sessions with pain scores
6. Fix any critical bugs

### Phase 3: Full Pilot (Day 4-14)
1. Roll out to all 5 providers
2. Each provider brings 10 clients (50 total)
3. Target: 30+ bookings, 25+ completed
4. Daily admin monitoring
5. Collect feedback from providers & patients
6. Track pain score improvements

### Phase 4: Analysis (Week 3)
1. Export all data from dashboard
2. Calculate key metrics:
   - Booking → Session completion rate
   - Average pain reduction %
   - Patient satisfaction (manual survey)
   - Provider satisfaction
3. Financial analysis:
   - Revenue per patient
   - Cost per acquisition
   - Provider earnings
4. Decide: Scale or pivot

---

## Success Metrics

### Pilot Success Criteria
- [ ] 5 providers onboarded and active
- [ ] 50+ patients registered
- [ ] 30+ bookings created
- [ ] 25+ sessions completed (>80% completion rate)
- [ ] Average pain reduction: >40%
- [ ] Payment success rate: >95%
- [ ] Zero critical bugs during pilot

### Key Performance Indicators
1. **Booking Conversion:** Link clicks → Bookings (target: >60%)
2. **Session Completion:** Bookings → Sessions (target: >80%)
3. **Pain Reduction:** Average improvement (target: >40%)
4. **Patient Retention:** Rebooking rate (target: >30%)
5. **Provider Utilization:** Sessions per provider per week (target: >6)
6. **Revenue per Patient:** ₹750 pilot, ₹1500 full (target: 3+ sessions average)

---

## Post-Pilot Roadmap

### If Successful → Scale
1. Build Stream C (Provider PWA)
2. Add more providers (20+ in Faridabad)
3. Expand services (Yoga, Ayurveda, etc.)
4. Add more cities (Gurgaon, Delhi, Noida)
5. Build marketplace features:
   - Provider discovery
   - Reviews & ratings
   - Package deals
   - Subscription plans
6. Revenue model: 15-20% commission

### Tech Debt to Address
- Add automated testing (Jest, Playwright)
- Implement proper error monitoring (Sentry)
- Add analytics (Mixpanel, GA4)
- Build admin analytics dashboard
- Add bulk operations (CSV import/export)
- Implement role-based access control
- Add audit logs
- Build notification service
- Implement search & filters
- Add caching layer (Redis)

---

## Files Structure

```
app/
├── patient/
│   ├── book/page.tsx              ✅ Stream B - Booking landing
│   ├── login/page.tsx             ✅ Stream B - OTP login
│   ├── [id]/page.tsx              ✅ Stream B - Dashboard
│   └── payment/
│       ├── [bookingId]/page.tsx   ✅ Stream B - Payment
│       └── success/page.tsx       ✅ Stream B - Success
├── provider/
│   ├── login/page.tsx             ⏳ Stream C - TODO
│   ├── dashboard/page.tsx         ⏳ Stream C - TODO
│   ├── bookings/page.tsx          ⏳ Stream C - TODO
│   ├── log-session/[id]/page.tsx  ⏳ Stream C - TODO
│   ├── earnings/page.tsx          ⏳ Stream C - TODO
│   └── profile/page.tsx           ⏳ Stream C - TODO
├── admin/
│   ├── login/page.tsx             ✅ Stream D - Login
│   ├── dashboard/page.tsx         ✅ Stream D - Dashboard
│   └── providers/page.tsx         ✅ Stream D - Providers
├── api/
│   ├── auth/
│   │   ├── send-otp/route.ts      ✅ Stream B - OTP send
│   │   └── verify-otp/route.ts    ✅ Stream B - OTP verify
│   ├── payment/
│   │   ├── create-order/route.ts  ✅ Stream B - Razorpay order
│   │   └── verify/route.ts        ✅ Stream B - Payment verify
│   ├── bookings/
│   │   └── [id]/route.ts          ✅ Stream B - Booking details
│   └── admin/
│       ├── login/route.ts         ✅ Stream D - Admin auth
│       ├── bookings/route.ts      ✅ Stream D - Bookings list
│       ├── stats/route.ts         ✅ Stream D - Stats
│       ├── bookings/[id]/status/  ✅ Stream D - Update booking
│       ├── providers/route.ts     ✅ Stream D - Providers list
│       └── providers/[id]/status/ ✅ Stream D - Update provider
lib/
└── api-client.ts                  ✅ Stream B - API integration
```

---

## Summary

### Completed (Streams B & D)
✅ Patient booking & payment flow
✅ Patient dashboard with progress tracking
✅ Admin login & dashboard
✅ Admin booking management
✅ Admin provider management
✅ API scaffolding with mock data

### Pending (Streams A & C)
⏳ Backend database & APIs (User handling separately)
⏳ Provider PWA (All features)
⏳ Real OTP/SMS integration
⏳ WhatsApp Business API
⏳ Real payment verification
⏳ Notification system

### Ready for Pilot
- Patient can book via WhatsApp
- Patient can pay via Razorpay
- Patient can track progress
- Admin can manage bookings
- Admin can manage providers

**Next Step:** Complete Stream A (Backend) and integrate with Streams B & D to enable full pilot launch.
