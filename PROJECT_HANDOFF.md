# AccuCentral - Project Handoff Document
**Version:** 1.0
**Last Updated:** December 4, 2024
**Project Status:** ~70% Complete - Operational MVP Ready

---

## Executive Summary

AccuCentral is a **dual-sided marketplace platform** for acupressure therapy services with a sophisticated **Digital Therapy Card (DTC)** retention system. The platform connects patients with AYUSH-certified therapists while preventing platform disintermediation through visual progress tracking and prepaid package models.

**Current State:** Fully operational admin dashboard, provider onboarding, patient retention system, and booking dispatch. Ready for Google Sheets integration and payment gateway.

**Tech Stack:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS v4
- Vercel (deployed)
- GitHub: https://github.com/mc784/accucentral

**Live URLs:**
- Production: https://accucentral.vercel.app
- Admin Dashboard: https://accucentral.vercel.app/admin
- Patient DTC Example: https://accucentral.vercel.app/patient/PAT001

---

## Business Model

### Revenue Streams
1. **Prepaid Packages:**
   - Basic: ₹1,495 (5 sessions)
   - Standard: ₹2,990 (10 sessions) - Most Popular
   - Premium: ₹5,499 (20 sessions)

2. **Commission Structure:**
   - Platform takes 20-30% per session
   - Providers earn 70-80% per session
   - Weekly payouts with TDS deduction

3. **Three Core Products (SKUs):**
   - Tech-Neck Reset: ₹299 (30min)
   - Migraine Eraser: ₹499 (45min)
   - Senior Citizen Pain Relief: ₹449 (45min)

### Key Metrics (Current Mock Data)
- Total Revenue: ₹145,620
- Active Patients: 89
- Active Providers: 20
- Avg Pain Reduction: 58.3%
- Completion Rate: 96.1%
- Avg Rating: 4.7★

---

## What's Been Built (Complete ✅)

### 1. **Core Website & Marketing**
**Status:** ✅ Complete

**Pages:**
- `/` - Homepage with hero, service cards, navigation pills
- `/protocols` - Product showcase with pricing and WhatsApp booking
- `/protocol/[slug]` - Individual product detail pages
- `/packages` - Package comparison and purchase page
- `/specialists` - Provider directory with badges and stats
- `/specialists/[slug]` - Individual provider profiles
- `/points` - Acupressure points library
- `/science` - Science page with Yin-Yang assessment CTA
- `/assessment` - Interactive Yin-Yang balance questionnaire
- `/about` - About page

**Key Features:**
- Consistent navigation across all pages
- WhatsApp booking integration
- AYUSH certification badge system
- Territory-based provider display

**Files:**
- `app/page.tsx` - Homepage
- `app/protocols/page.tsx` - Products listing
- `app/protocol/[slug]/page.tsx` - Product details
- `app/packages/page.tsx` - Package store
- `app/specialists/page.tsx` - Provider directory
- `app/specialists/[slug]/page.tsx` - Provider profiles
- `app/points/page.tsx` - Acupressure points
- `app/science/page.tsx` - Science content
- `app/assessment/page.tsx` - Yin-Yang assessment
- `app/about/page.tsx` - About page

---

### 2. **Digital Therapy Card (DTC) System** - Patient Retention Engine
**Status:** ✅ Complete

**Purpose:** Prevent platform leakage by locking patients into treatment cycles through visual progress tracking.

**Patient Dashboard** (`app/patient/[id]/page.tsx`):
- **Pain Journey Chart:** Line graph showing pain reduction over time (Day 1 → Today)
- **Stats Cards:**
  - Pain Reduction % (e.g., 56% improvement)
  - Progress % (sessions completed/total)
  - Trend Indicator (📈 Improving / ➡️ Stable / 📉 Attention)
- **Session Balance Tracker:** Visual checkboxes (✓ completed vs pending)
- **Renewal Alert Banner:** Prominent when ≤1 session remaining
- **Homework Video Embed:** YouTube exercises with frequency instructions
- **Next Session Booking:** WhatsApp confirmation CTA

**Data Structure** (`data/patients.ts`):
```typescript
interface Patient {
  id: string;
  name: string;
  phone: string;
  condition: string; // e.g., "Sciatica Relief"
  initialPainScore: number; // 1-10
  currentPainScore: number;
  painScoreHistory: PainScoreEntry[];
  activePackage: TreatmentPackage;
  packageHistory: TreatmentPackage[];
  homeworkVideoUrl?: string;
  status: 'active' | 'inactive' | 'completed';
}

interface PainScoreEntry {
  date: string;
  sessionNumber: number;
  painScore: number; // 1-10
  providerId: string;
  providerName: string;
}

interface TreatmentPackage {
  id: string;
  packageType: 'basic' | 'standard' | 'premium';
  totalSessions: number;
  sessionsCompleted: number;
  sessionsRemaining: number;
  price: number;
  status: 'active' | 'completed' | 'expired';
}
```

**Helper Functions:**
- `calculateProgress()` - Returns percentComplete, painReduction, trend
- `shouldShowRenewalAlert()` - Returns true when ≤1 session remaining
- `getNextPackageRecommendation()` - Suggests upsell based on progress

**Mock Data:**
- 2 sample patients (PAT001: Amit Kumar, PAT002: Priya Mehta)
- Complete pain score histories
- Active packages with session tracking

**Business Impact:**
- 10x LTV: Single session (₹299) → Full package (₹2,990)
- Visual retention prevents ghosting
- Prepaid model = upfront cash flow
- Data proves efficacy for marketing

---

### 3. **Provider Management System**
**Status:** ✅ Complete

**Provider Registration** (`app/providers/register/page.tsx`):
- **5-step wizard:**
  1. Personal Info (name, email, phone, gender, photo, languages)
  2. Certification (AYUSH cert upload, ID proof, address proof, COVID cert)
  3. Services & Territory (service selection, specializations, location, equipment)
  4. Availability (days of week, time slots)
  5. Banking (account info, IFSC, PAN for TDS)
- Progress bar showing completion status
- Form validation and file uploads
- Commission structure explanation (70-80% payout)

**Provider Dashboard** (`app/providers/dashboard/page.tsx`):
- **Stats:** Total bookings, rating, earnings, pending payout
- **4 tabs:** Overview, Bookings, Earnings, Profile
- **Quick Log Session button:** Fast access to pain score entry
- Status banners for pending/suspended accounts
- Payout information and TDS details

**Provider Quick-Log** (`app/providers/log-session/page.tsx`):
- Phone number search to find patients
- Auto-complete with patient selection
- Pain score slider (1-10 scale) with color gradient
- Visual feedback showing patient's last pain score
- 30-second completion time target ⏱️
- Success animation and WhatsApp notification simulation

**Data Structure** (`data/providers.ts`):
```typescript
interface Provider {
  id: string;
  slug: string;
  name: string;
  photo: string;

  // Badge & Certification
  badgeLevel: 'level-1' | 'level-2' | 'level-3' | 'accucentral-verified';
  ayushCertified: boolean;
  certificationBody?: string;

  // Location
  territory: string;
  serviceArea: 'faridabad' | 'delhi' | 'gurgaon' | 'noida';
  serviceRadius: string;

  // Stats
  totalBookings: number;
  experienceYears: number;
  rating: number;
  completionRate: number;

  // Services
  availableServices: string[]; // Service slugs
  specializations: string[];

  // Availability
  availableDays: ('mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun')[];
  preferredTimeSlots: string[];

  // Equipment
  equipment: {
    portableTable: boolean;
    bringsMats: boolean;
    oilFree: boolean;
  };

  // Commission
  commissionRate: number; // 0.70 = 70%

  status: 'active' | 'inactive' | 'suspended';
}
```

**AYUSH Badge System:**
- Level 1: Protocol Instructor (Amber)
- Level 2: Wellness Instructor (Blue)
- Level 3: Senior Therapist (Purple)
- AccuCentral Verified (Special)

**Mock Data:**
- 3 sample providers (Rahul Sharma, Anita Verma, Suresh Kumar)
- Complete profiles with badges, stats, and territories

---

### 4. **Admin Dashboard & Operations Center**
**Status:** ✅ Complete

**Admin Dashboard** (`app/admin/page.tsx`):
- **Real-time metrics:**
  - Revenue: ₹145,620 total, ₹32,450 this month (+23.5%)
  - Bookings: 487 total, 12 pending, 3 today
  - Patients: 89 active, 15 need renewal
  - Providers: 20 active, 3 pending applications
- **Alert System:** Red banner for pending bookings, applications, renewals
- **Performance Metrics:** 58.3% avg pain reduction, 96.1% completion rate, 4.7★ rating
- **5 Tabs:**
  1. **Overview:** Priority actions, renewal opportunities with WhatsApp CTAs
  2. **Bookings:** All bookings with status tracking
  3. **Patients:** Database with DTC links and progress metrics
  4. **Providers:** Application management
  5. **Payouts:** Commission tracking (₹12,450 pending)

**Booking Dispatch** (`app/admin/bookings/page.tsx`):
- **Smart Provider Matching:**
  - Auto-suggests based on service area + available services + active status
  - Shows rating, sessions completed, experience, completion rate
  - Territory protection (won't suggest out-of-area)
- **One-Click Assignment:**
  - Assigns provider to booking
  - Sends WhatsApp to both provider and customer
  - Updates booking status (Pending → Assigned → Confirmed)
- **Status Filters:** View by Pending/Assigned/Confirmed/Completed
- **Stats Cards:** Count of bookings in each status

**Provider Approval** (`app/admin/providers/page.tsx`):
- **Application Review Interface:**
  - View all uploaded documents (photo, cert, ID, address, COVID)
  - Certification verification (body, number, years exp)
  - Service area and specializations
  - Admin notes section
- **One-Click Actions:**
  - ✓ Approve: Sends credentials, adds to DB, WhatsApp welcome
  - ✗ Reject: Reason input, rejection email
- **Stats:** Pending/Approved/Rejected counts

**Data Structure** (`data/admin.ts`):
```typescript
interface Booking {
  id: string;
  bookingNumber: string; // "ACC-2024-001"

  // Customer
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;

  // Service
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  sessionNumber: number;

  // Scheduling
  requestedDate: string;
  requestedTime: string;
  confirmedDate?: string;
  confirmedTime?: string;

  // Assignment
  assignedProviderId?: string;
  assignedProviderName?: string;
  assignmentStatus: 'pending' | 'assigned' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';

  // Location
  territory: string;
  serviceArea: 'faridabad' | 'delhi' | 'gurgaon' | 'noida';

  // Payment
  packageId: string;
  isPaid: boolean;
  paymentMethod: 'prepaid' | 'cash' | 'online';

  // Session Data (post-completion)
  painScoreBefore?: number;
  painScoreAfter?: number;
  sessionNotes?: string;
  completedAt?: string;
}

interface PendingProvider {
  id: string;
  applicationDate: string;
  name: string;
  email: string;
  phone: string;
  ayushCertified: boolean;
  certificationBody?: string;
  experienceYears: number;
  requestedServices: string[];
  specializations: string[];
  territory: string;
  serviceArea: string;
  documents: {
    photo?: string;
    certificationFile?: string;
    idProof?: string;
    addressProof?: string;
    covidCert?: string;
  };
  status: 'pending' | 'under-review' | 'approved' | 'rejected';
  adminNotes?: string;
}

interface Commission {
  id: string;
  providerId: string;
  bookingId: string;
  sessionPrice: number;
  commissionRate: number; // 0.75 = 75%
  commissionAmount: number;
  platformFee: number;
  tdsAmount: number; // 10% TDS
  netPayout: number;
  payoutStatus: 'pending' | 'processing' | 'paid' | 'on-hold';
}
```

**Mock Data:**
- 2 sample bookings (1 pending, 1 confirmed)
- 1 pending provider application
- 2 commission records
- Complete admin stats

---

### 5. **Data Layer & Services**
**Status:** ✅ Complete

**Files:**
- `data/services.ts` - Product catalog (3 SKUs with pricing)
- `data/patients.ts` - Patient profiles and DTC data
- `data/providers.ts` - Provider profiles and badges
- `data/admin.ts` - Bookings, applications, commissions

**Service Catalog** (`data/services.ts`):
```typescript
interface Service {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: 'chronic-pain' | 'musculoskeletal' | 'senior-care';
  targetIssue: string;
  duration: string;
  price: number;
  originalPrice?: number;
  scope: string; // What's included
  description: string;
  pressurePoints: PressurePoint[];
  outcomes: string[];
  idealFor: string[];
  whatsappMessage: string; // Pre-filled booking message
  status: 'draft' | 'published' | 'featured';
}
```

**3 Products:**
1. Tech-Neck Reset: ₹299 (30min) - IT professionals
2. Migraine Eraser: ₹499 (45min) - Chronic headaches
3. Senior Citizen Pain Relief: ₹449 (45min) - Knee/back pain

**WhatsApp Integration:**
- `getWhatsAppBookingLink(service)` - Generates booking link with pre-filled message
- `getProviderBookingLink(provider)` - Generates dispatch booking link

---

## What Needs to Be Built (Roadmap 📋)

### Priority 1: Backend & Data Persistence
**Status:** ❌ Not Started

**Required:**
1. **Database Setup:**
   - PostgreSQL/Supabase/Firebase
   - Schema for patients, providers, bookings, commissions
   - Migrations and seeding

2. **API Routes:**
   - `/api/patients` - CRUD operations
   - `/api/providers` - CRUD + application submission
   - `/api/bookings` - Create, assign, update status
   - `/api/sessions` - Log pain scores
   - `/api/commissions` - Calculate and track
   - `/api/admin` - Stats and metrics

3. **Authentication:**
   - NextAuth.js or Clerk
   - Role-based access (Admin, Provider, Patient)
   - Secure routes and API endpoints

**Files to Create:**
- `lib/db.ts` - Database connection
- `lib/auth.ts` - Authentication helpers
- `app/api/**/*.ts` - API route handlers
- `middleware.ts` - Auth middleware

---

### Priority 2: Google Sheets Integration (Fleet Management)
**Status:** ❌ Not Started

**Purpose:** Manual override and data export capability as originally planned.

**Required:**
1. **Google Sheets API Setup:**
   - Service account credentials
   - Sheet templates for: Bookings, Providers, Patients, Commissions

2. **Sync Functions:**
   - Auto-sync bookings to Sheet on creation
   - Provider session logs → Sheet
   - Commission calculations in Sheet
   - Manual provider assignment via Sheet edits

3. **Admin Interface:**
   - `/admin/sheets` - Export/import controls
   - One-click sync buttons
   - Sheet URL configuration
   - Sync status indicators

**Files to Create:**
- `lib/google-sheets.ts` - Google Sheets API wrapper
- `app/admin/sheets/page.tsx` - Sheets management UI
- `.env.local` - Google credentials (GOOGLE_SHEETS_CLIENT_EMAIL, PRIVATE_KEY, SHEET_ID)

**Implementation Guide:**
```typescript
// lib/google-sheets.ts
import { google } from 'googleapis';

export async function syncBookingToSheet(booking: Booking) {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.BOOKINGS_SHEET_ID,
    range: 'Bookings!A:Z',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[
        booking.bookingNumber,
        booking.customerName,
        booking.serviceName,
        booking.requestedDate,
        booking.assignedProviderName,
        booking.servicePrice,
        booking.assignmentStatus,
      ]],
    },
  });
}
```

---

### Priority 3: Payment Gateway Integration
**Status:** ❌ Not Started

**Required:**
1. **Razorpay/PhonePe Integration:**
   - Package purchase flow
   - Payment confirmation
   - Webhook handling

2. **Payment Pages:**
   - `/checkout` - Payment form
   - `/payment/success` - Confirmation page
   - `/payment/failed` - Error handling

3. **Features:**
   - Create patient account on successful payment
   - Send DTC access link via WhatsApp/Email
   - Automatic package activation
   - Payment history tracking

**Files to Create:**
- `app/checkout/page.tsx` - Payment form
- `app/api/payment/create-order/route.ts` - Razorpay order creation
- `app/api/payment/verify/route.ts` - Payment verification
- `app/api/webhooks/razorpay/route.ts` - Webhook handler
- `lib/razorpay.ts` - Razorpay SDK wrapper

---

### Priority 4: WhatsApp Automation
**Status:** ⚠️ Partially Complete (Manual links only)

**Current:** WhatsApp links with pre-filled messages
**Needed:** Automated message sending

**Required:**
1. **WhatsApp Business API:**
   - Account setup
   - Message templates
   - Template approval

2. **Automated Messages:**
   - Booking confirmation to customer
   - Provider assignment notification
   - Session reminder (1 day before)
   - DTC access link after first session
   - Package renewal reminder (1 session left)
   - Payment confirmation

3. **Integration Points:**
   - After booking creation
   - After provider assignment
   - After session logging
   - When package balance ≤1

**Files to Create:**
- `lib/whatsapp.ts` - WhatsApp API wrapper
- `app/api/webhooks/whatsapp/route.ts` - Incoming message handler

---

### Priority 5: Customer Booking Flow (Self-Service)
**Status:** ⚠️ Partially Complete (WhatsApp-only)

**Current:** Manual WhatsApp booking
**Needed:** Full self-service booking interface

**Required:**
1. **Booking Form:**
   - Service selection
   - Date/time picker with availability
   - Address input
   - Phone/email capture

2. **Provider Matching:**
   - Auto-suggest based on location + availability
   - Show provider profiles and ratings
   - Real-time availability check

3. **Confirmation Flow:**
   - Booking summary
   - Payment (if not prepaid)
   - Confirmation email/WhatsApp
   - Calendar invite

**Files to Create:**
- `app/book-service/page.tsx` - Booking form
- `app/api/bookings/check-availability/route.ts` - Availability checker
- `app/api/bookings/create/route.ts` - Booking creation

---

### Priority 6: Provider Mobile App (Future)
**Status:** ❌ Not Started

**Purpose:** Dedicated mobile experience for providers

**Features:**
- Native mobile app (React Native/Flutter)
- Push notifications for new bookings
- Quick session logging with camera for pain scale
- Navigation to customer location
- Earnings dashboard
- Offline mode with sync

---

### Priority 7: Advanced Features
**Status:** ❌ Not Started

**Features to Add:**
1. **Reviews & Ratings:**
   - Patient can rate provider after session
   - Display on provider profiles
   - Aggregate into provider dashboard

2. **Customer Dashboard:**
   - Full patient account portal
   - View all bookings
   - DTC access for all packages
   - Payment history
   - Renewal management

3. **Analytics Dashboard:**
   - Revenue trends over time
   - Provider performance leaderboard
   - Patient retention cohorts
   - Service popularity metrics

4. **Notifications System:**
   - In-app notifications
   - Email notifications
   - SMS alerts

5. **Referral Program:**
   - Patient referral links
   - Provider referral bonuses
   - Tracking and attribution

6. **Interactive Tutorial System:**
   - Cursor-based tooltips
   - Step-by-step walkthroughs
   - Role-specific tours (Admin, Provider, Patient)
   - Progress tracking

---

## File Structure

```
accucentral/
├── app/
│   ├── page.tsx                          # Homepage ✅
│   ├── layout.tsx                        # Root layout ✅
│   │
│   ├── protocols/
│   │   └── page.tsx                      # Products listing ✅
│   ├── protocol/[slug]/
│   │   └── page.tsx                      # Product details ✅
│   │
│   ├── specialists/
│   │   ├── page.tsx                      # Provider directory ✅
│   │   └── [slug]/page.tsx               # Provider profile ✅
│   │
│   ├── patient/[id]/
│   │   └── page.tsx                      # Digital Therapy Card ✅
│   │
│   ├── providers/
│   │   ├── register/page.tsx             # Provider registration ✅
│   │   ├── dashboard/page.tsx            # Provider dashboard ✅
│   │   └── log-session/page.tsx          # Quick pain score logging ✅
│   │
│   ├── admin/
│   │   ├── page.tsx                      # Admin dashboard ✅
│   │   ├── bookings/page.tsx             # Booking dispatch ✅
│   │   ├── providers/page.tsx            # Provider approval ✅
│   │   └── sheets/page.tsx               # Google Sheets sync ❌
│   │
│   ├── packages/page.tsx                 # Package store ✅
│   ├── assessment/page.tsx               # Yin-Yang assessment ✅
│   ├── points/page.tsx                   # Acupressure points ✅
│   ├── science/page.tsx                  # Science content ✅
│   ├── about/page.tsx                    # About page ✅
│   ├── book/page.tsx                     # Booking page ✅
│   │
│   └── api/                              # API routes ❌ (Not built yet)
│       ├── patients/
│       ├── providers/
│       ├── bookings/
│       ├── sessions/
│       ├── commissions/
│       ├── payment/
│       └── webhooks/
│
├── data/
│   ├── services.ts                       # Product catalog ✅
│   ├── patients.ts                       # Patient/DTC data ✅
│   ├── providers.ts                      # Provider profiles ✅
│   └── admin.ts                          # Admin data ✅
│
├── components/                           # Shared components ✅
├── lib/                                  # Utilities ❌ (Needs DB, auth, etc.)
├── public/                               # Static assets ✅
└── tailwind.config.ts                    # Tailwind config ✅
```

---

## Key Design Decisions & Patterns

### 1. **Product-Based Model (vs Service-Based)**
- Changed from educational content to fixed SKUs with pricing
- Removed: complexity, frequency, tips, contraindications
- Added: price, originalPrice, scope, whatsappMessage
- WhatsApp booking buttons instead of "Learn More"

### 2. **Digital Therapy Card Strategy**
- Visual progress = retention tool
- Prepaid packages = upfront commitment
- Session counter = scarcity/urgency
- Renewal alerts = automated upsell
- Homework videos = engagement between sessions

### 3. **Central Dispatch Model**
- All bookings go through platform (not direct to provider)
- Admin assigns providers based on territory + availability
- WhatsApp notifications to both parties
- Prevents provider from stealing customers

### 4. **AYUSH Certification Badge System**
- 3 levels of expertise (Protocol, Wellness, Senior)
- Visible trust indicators
- AccuCentral verification badge

### 5. **Territory-Based Provider Matching**
- Prevents out-of-area assignments
- Service radius tracking (3km, 5km, 7km, 10km)
- Service area codes (Faridabad, Delhi, Gurgaon, Noida)

### 6. **Commission Tracking**
- 70-80% to provider (based on level)
- 20-30% platform fee
- 10% TDS deduction
- Weekly payout batches

---

## Environment Variables Needed

```env
# Database (when implemented)
DATABASE_URL=
DIRECT_URL=

# Authentication (when implemented)
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# Google Sheets
GOOGLE_SHEETS_CLIENT_EMAIL=
GOOGLE_SHEETS_PRIVATE_KEY=
BOOKINGS_SHEET_ID=
PROVIDERS_SHEET_ID=
PATIENTS_SHEET_ID=
COMMISSIONS_SHEET_ID=

# Payment Gateway (Razorpay)
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=

# WhatsApp Business API
WHATSAPP_PHONE_NUMBER_ID=
WHATSAPP_ACCESS_TOKEN=
WHATSAPP_BUSINESS_ACCOUNT_ID=

# General
NEXT_PUBLIC_SITE_URL=https://accucentral.vercel.app
ADMIN_EMAIL=admin@accucentral.com
SUPPORT_WHATSAPP=919876543210  # Replace with real number
```

---

## Common Tasks & Code Snippets

### Adding a New Service/Product

```typescript
// data/services.ts
const newService: Service = {
  id: 'unique-id',
  slug: 'service-slug',
  title: 'Service Name',
  tagline: 'One-line description',
  category: 'chronic-pain',
  targetIssue: 'What it treats',
  duration: '45 Minutes',
  price: 449,
  originalPrice: 599,
  scope: 'What\'s included in the session',
  description: 'Detailed description...',
  pressurePoints: [
    {
      code: 'LI4',
      name: 'Large Intestine 4',
      location: 'Hand',
      benefit: 'Pain relief',
    },
  ],
  outcomes: ['Outcome 1', 'Outcome 2'],
  idealFor: ['Who it\'s for'],
  whatsappMessage: `Hi, I want to book Service Name for ₹449...`,
  status: 'published',
};
```

### Adding a New Provider

```typescript
// data/providers.ts
const newProvider: Provider = {
  id: 'unique-id',
  slug: 'provider-slug',
  name: 'Provider Name',
  photo: '/images/providers/photo.jpg',
  badgeLevel: 'level-2',
  badgeTitle: 'Wellness Instructor (Level 2)',
  ayushCertified: true,
  certificationBody: 'ASPEUS',
  territory: 'Sector 20, Faridabad',
  territoryCode: 'FBD-S20',
  serviceArea: 'faridabad',
  serviceRadius: '5km radius',
  totalBookings: 120,
  experienceYears: 5,
  rating: 4.8,
  completionRate: 98,
  availableServices: ['tech-neck-reset', 'migraine-eraser'],
  specializations: ['Tech-neck relief', 'Chronic pain management'],
  verified: {
    backgroundCheck: true,
    covidVaccinated: true,
    ayushRegistered: true,
    kycComplete: true,
  },
  equipment: {
    portableTable: true,
    bringsMats: true,
    oilFree: true,
  },
  availableDays: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
  preferredTimeSlots: ['Morning (8 AM - 12 PM)', 'Evening (4 PM - 8 PM)'],
  languages: ['Hindi', 'English'],
  commissionRate: 0.75,
  status: 'active',
};
```

### Adding a New Patient with DTC

```typescript
// data/patients.ts
const newPatient: Patient = {
  id: 'PAT003',
  name: 'Patient Name',
  phone: '+91 98765 43210',
  email: 'patient@example.com',
  condition: 'Condition Name',
  startDate: '2024-12-01',
  initialPainScore: 8,
  currentPainScore: 4,
  painScoreHistory: [
    { date: '2024-12-01', sessionNumber: 1, painScore: 8, providerId: '1', providerName: 'Provider' },
    { date: '2024-12-04', sessionNumber: 2, painScore: 6, providerId: '1', providerName: 'Provider' },
  ],
  activePackage: {
    id: 'PKG003',
    packageType: 'standard',
    totalSessions: 10,
    sessionsCompleted: 2,
    sessionsRemaining: 8,
    price: 2990,
    purchaseDate: '2024-12-01',
    status: 'active',
  },
  packageHistory: [],
  homeworkVideoUrl: 'https://www.youtube.com/watch?v=VIDEO_ID',
  homeworkTitle: 'Exercise Name',
  homeworkFrequency: '2x daily',
  status: 'active',
  lastSessionDate: '2024-12-04',
  nextSessionDate: '2024-12-07',
};
```

---

## Testing Guide

### Manual Testing Checklist

**Homepage & Navigation:**
- [ ] All navigation links work
- [ ] Hero pills navigate correctly
- [ ] WhatsApp booking buttons open with correct message

**Products:**
- [ ] Product cards display pricing
- [ ] Individual product pages load
- [ ] WhatsApp booking works with pre-filled message

**Specialists:**
- [ ] Provider directory shows all providers
- [ ] Badge colors render correctly
- [ ] Individual provider profiles load
- [ ] "Join as Provider" CTA visible

**Digital Therapy Card:**
- [ ] `/patient/PAT001` shows Amit Kumar's progress
- [ ] Pain chart renders correctly
- [ ] Session balance tracker shows completed/remaining
- [ ] Renewal alert appears when sessionsRemaining ≤ 1
- [ ] Homework video embeds

**Provider Flows:**
- [ ] Registration form works through all 5 steps
- [ ] Dashboard shows stats correctly
- [ ] Quick Log Session finds patients by phone
- [ ] Pain score slider works (1-10)

**Admin Flows:**
- [ ] Dashboard shows stats and alerts
- [ ] Booking dispatch shows pending bookings
- [ ] Provider assignment updates status
- [ ] Provider approval shows applications
- [ ] Approve/reject actions work

**Packages:**
- [ ] All 3 packages display with pricing
- [ ] Discount badges show correctly
- [ ] WhatsApp purchase links work

---

## Known Issues & Limitations

### Current Limitations:
1. **No Authentication:** All pages are publicly accessible
2. **No Database:** All data is static/mock
3. **No Real Payment:** WhatsApp-only booking
4. **No Email System:** Relies on WhatsApp for all communication
5. **No File Storage:** Document uploads don't actually save
6. **No Real-time Updates:** Page refresh required to see changes
7. **Mock WhatsApp Number:** Using placeholder `919876543210` throughout

### Technical Debt:
1. Need to add TypeScript strict mode checks
2. Need to implement error boundaries
3. Need to add loading states
4. Need to add form validation (currently client-side only)
5. Need to optimize images (Next.js Image component)
6. Need to add SEO metadata to all pages
7. Need to implement accessibility (ARIA labels, keyboard navigation)

---

## Deployment & Infrastructure

**Current Setup:**
- Vercel (auto-deploy on git push to master)
- GitHub: https://github.com/mc784/accucentral
- No custom domain yet
- No CDN for assets
- No separate staging environment

**Production URL:** https://accucentral.vercel.app

**Recommended Next Steps:**
1. Add custom domain
2. Setup staging environment (separate Vercel project)
3. Add monitoring (Sentry, LogRocket)
4. Setup analytics (Google Analytics, Mixpanel)
5. Add uptime monitoring
6. Setup backup strategy for database (when implemented)

---

## Business Metrics to Track (When Backend Ready)

### Key Metrics:
1. **Acquisition:**
   - New patients per week
   - Provider applications per week
   - Traffic sources
   - Conversion rate (visitor → booking)

2. **Retention:**
   - Package completion rate
   - Renewal rate after package ends
   - Days between sessions
   - DTC engagement (views per patient)

3. **Revenue:**
   - GMV (Gross Merchandise Value)
   - Revenue per patient (RPP)
   - Average package size
   - Commission earned
   - Provider payouts

4. **Quality:**
   - Average pain reduction %
   - Session completion rate
   - Provider ratings
   - Patient satisfaction scores
   - No-show rate

5. **Operations:**
   - Avg time to assign provider
   - Provider utilization rate
   - Territory coverage
   - Bookings per provider per week

---

## Handoff Instructions for Next Developer

### Getting Started:
1. Clone repo: `git clone https://github.com/mc784/accucentral.git`
2. Install dependencies: `npm install`
3. Run dev server: `npm run dev`
4. Open http://localhost:3000

### First Tasks (Recommended Order):
1. **Week 1:** Setup database + authentication
2. **Week 2:** Build API routes for core flows
3. **Week 3:** Google Sheets integration
4. **Week 4:** Payment gateway integration

### Quick Wins:
- Replace mock WhatsApp number with real one
- Add real provider photos
- Setup Google Analytics
- Add SEO metadata
- Create sitemap

### Need Help Understanding:
- **DTC System:** Read BRD in previous commit messages
- **Data Flow:** Check `data/*.ts` files for structure
- **Business Logic:** Review helper functions in patient/provider data files

---

## Contact & Support

**Project Owner:** [Your Name]
**GitHub:** https://github.com/mc784/accucentral
**Vercel:** https://accucentral.vercel.app

**Key Documents:**
- This handoff doc: `PROJECT_HANDOFF.md`
- Git commit history for detailed decisions
- Tailwind config: `tailwind.config.ts`
- TypeScript config: `tsconfig.json`

---

## Appendix: Technology Choices Explained

### Why Next.js 14?
- Server components for performance
- App Router for better organization
- Built-in API routes
- Easy Vercel deployment

### Why Tailwind v4?
- Utility-first CSS
- Responsive design system
- Fast development
- Small bundle size

### Why TypeScript?
- Type safety
- Better IDE support
- Catch errors early
- Self-documenting code

### Why Vercel?
- Zero-config deployment
- Auto-preview for PRs
- Edge network
- Built for Next.js

---

**Document Version:** 1.0
**Last Updated:** December 4, 2024
**Status:** Ready for handoff ✅
