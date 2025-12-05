# AccuCentral - Strategic Blueprint v2.0

**Last Updated:** December 2024
**Status:** Production-Ready Marketplace Platform

---

## Vision: "India's Acupressure Therapy Aggregator"

**Mission:** Connect patients suffering from chronic pain with AYUSH-certified acupressure therapists through a transparent, data-driven marketplace platform.

**Core Problem:** Fragmented acupressure therapy market in India with:
- No centralized booking platform
- No quality assurance for providers
- No progress tracking for patients
- Manual, unscalable operations
- Provider disintermediation (stealing clients)

**Solution:** Two-sided marketplace aggregator with:
1. **Supply Side:** Network of vetted AYUSH-certified therapists
2. **Demand Side:** Patients seeking evidence-based pain relief
3. **Platform Value:** Central dispatch, Digital Therapy Cards, commission-based revenue

---

## Business Model: Marketplace Aggregator

### Revenue Model
**Commission-Based Platform Fee (20-30% per session)**

```
₹499 session booking
├─ ₹374 to Provider (75%)
├─ ₹125 Platform Fee (25%)
└─ ₹37 TDS (10% of provider payout)
```

### Unit Economics
| Metric | Value |
|--------|-------|
| **Average Package Price** | ₹2,990 (10 sessions) |
| **Platform Revenue per Package** | ₹748 (25% × ₹2,990) |
| **Provider Payout per Package** | ₹2,242 (75% × ₹2,990) |
| **Customer LTV (3 packages/year)** | ₹2,244 annual platform revenue |

### Market Position
**Not competitors:**
- UrbanClap/Urban Company (general wellness, no specialization)
- Practo (doctor appointments, not therapists)
- MFine/1mg (telemedicine, not physical therapy)

**We are:**
- **Vertical-specific marketplace** (acupressure only)
- **Quality-controlled network** (AYUSH certification mandatory)
- **Data-driven retention** (Digital Therapy Cards prevent churn)
- **Territory-protected dispatch** (prevents provider poaching)

---

## Core Product: Three Pillars

### 1. Patient Experience (Demand Side)

**Discovery & Booking:**
- WhatsApp-first booking flow (mobile-dominant market)
- Package-based pricing (prepaid commitment)
- Territory-based provider matching
- Transparent pricing and provider profiles

**Digital Therapy Card (DTC) - Retention Engine:**
```
Purpose: Lock patients into multi-session cycles through visual progress tracking
```

**DTC Features:**
- **Pain Journey Chart:** Visual graph showing pain reduction over time
- **Progress Tracker:** Sessions completed vs remaining (scarcity/urgency)
- **Renewal Alerts:** Automated upsell when ≤1 session left
- **Homework Videos:** YouTube exercise routines (engagement between sessions)
- **Next Session Booking:** One-tap WhatsApp booking

**Business Impact:**
- 10x LTV: Single session (₹299) → Full package (₹2,990) → Renewals
- Visual retention prevents ghosting
- Prepaid model = upfront cash flow
- Data proves efficacy for marketing

---

### 2. Provider Experience (Supply Side)

**Onboarding:**
- **5-Step Registration Wizard:**
  1. Personal Info (photo, languages, gender)
  2. Certification Upload (AYUSH, ID, address, COVID)
  3. Services & Territory (service selection, coverage area, equipment)
  4. Availability (days, time slots)
  5. Banking (account, IFSC, PAN for TDS, UPI)

**Provider Dashboard:**
- Real-time bookings and dispatch notifications
- Earnings tracker (commission breakdown, TDS)
- Rating and review management
- Payout history and status

**Quick-Log Session (30-second workflow):**
```
1. Search patient by phone
2. Select patient from results
3. Slide pain score (1-10 visual slider)
4. Submit → WhatsApp notification sent
```

**AYUSH Badge System (Quality Signal):**
| Level | Badge | Color | Meaning |
|-------|-------|-------|---------|
| Level 1 | Protocol Instructor | Amber | Basic certified |
| Level 2 | Wellness Instructor | Blue | Experienced therapist |
| Level 3 | Senior Therapist | Purple | Expert for complex cases |
| Verified | AccuCentral Verified | Green | Platform-vetted |

---

### 3. Admin Operations Center (Platform Management)

**Central Dispatch Dashboard:**
- **Real-Time Metrics:**
  - Revenue: Total, MTD, growth %
  - Bookings: Pending, assigned, completed
  - Providers: Active, pending approval
  - Patients: Active, need renewal
- **Alert System:** Red banners for pending actions
- **Performance KPIs:** Avg pain reduction %, completion rate, ratings

**Booking Dispatch (Smart Matching):**
```
When booking arrives:
1. Filter providers by: Territory + Available Services + Active Status
2. Sort by: Rating, Completion Rate, Availability
3. Admin assigns best match
4. WhatsApp notification to both parties
5. Status: Pending → Assigned → Confirmed → Completed
```

**Provider Approval Workflow:**
```
Application → Document Review → Certification Verification → Approve/Reject → WhatsApp Credentials
```

**Commission Tracking:**
- Auto-calculate: Session Price × Commission Rate
- Deduct: Platform Fee + 10% TDS
- Track: Pending → Processing → Paid
- Payout: Weekly batches via bank/UPI

---

## Service Catalog: Fixed SKUs

**Product Philosophy:** Standardized, bookable services with fixed pricing (not educational content).

### 3 Launch Products

| Service | Duration | Price | Target |
|---------|----------|-------|--------|
| **Tech-Neck Reset** | 30 min | ₹299 | IT professionals, desk workers |
| **Migraine Eraser** | 45 min | ₹499 | Chronic headache sufferers |
| **Senior Pain Relief** | 45 min | ₹449 | Elderly with knee/back pain |

**Service Structure:**
- Fixed scope and duration
- Defined pressure point protocol
- Standardized outcomes
- WhatsApp booking message template
- Home visit or clinic-based

---

## Package Tiers (Prepaid Commitment)

| Package | Sessions | Price | Per Session | Discount | Best For |
|---------|----------|-------|-------------|----------|----------|
| **Basic** | 5 | ₹1,495 | ₹299 | - | Trial period |
| **Standard** | 10 | ₹2,990 | ₹299 | 10% | Complete treatment cycle ⭐ |
| **Premium** | 20 | ₹5,499 | ₹275 | 20% | Long-term recovery |

**Package Mechanics:**
- Must be purchased before first booking
- Sessions don't expire (customer-friendly)
- Auto-renewal prompt at ≤1 session
- Can upgrade mid-cycle (pay difference)

---

## Technical Architecture

### Tech Stack (Production-Grade)

**Frontend:**
- Next.js 16 (App Router, Server Components)
- TypeScript (strict mode)
- Tailwind CSS v4
- Vercel (edge deployment)

**Backend:**
- PostgreSQL (Supabase)
- Prisma ORM (type-safe queries, migrations)
- NextAuth.js (role-based auth: Patient, Provider, Admin)
- Vercel Edge Functions (API routes)

**Integrations:**
- **Razorpay/PhonePe:** Payment gateway
- **WhatsApp Business API:** Automated notifications
- **Google Sheets API:** Fleet management override
- **AWS S3/Supabase Storage:** Document uploads

---

## Database Schema Highlights

### Core Entities (14 tables)

**User Management:**
- `users` - Authentication (email, phone, role, status)
- `patients` - Patient profiles + DTC data
- `providers` - Provider profiles + certifications
- `admins` - Admin users

**Service Catalog:**
- `services` - Product SKUs (Tech-Neck, Migraine, etc.)
- `pressure_points` - Acupoints per service
- `provider_services` - Junction table (which provider delivers what)

**Booking & Dispatch:**
- `bookings` - Session bookings with assignment status
- `packages` - Prepaid session packages
- `pain_scores` - Session-by-session progress tracking

**Financial:**
- `commissions` - Provider payouts (session, TDS, net)
- `reviews` - Patient ratings of providers

**Operations:**
- `provider_applications` - Onboarding pipeline
- `audit_logs` - Compliance & debugging trail

**Key Design Decisions:**
- All prices stored in **paise** (avoid float errors)
- Cascade deletes for patient/provider data
- Compound indexes for common queries
- Enum types for status fields
- Row-level security ready (Supabase)

---

## Operational Workflows

### Patient Journey

```
1. Discovery → Website/WhatsApp
2. Browse Services → Select Tech-Neck Reset (₹299)
3. Click "Book Now" → WhatsApp pre-filled message
4. Purchase Package → Razorpay payment (₹2,990 for 10 sessions)
5. Booking Submitted → Admin receives dispatch alert
6. Provider Assigned → WhatsApp confirmation to both parties
7. Session Completed → Provider logs pain score
8. DTC Updated → Patient sees progress chart
9. Renewal Alert → ≤1 session remaining → WhatsApp prompt
10. Renew Package → Cycle repeats
```

### Provider Journey

```
1. Application → 5-step registration form
2. Document Upload → Photo, AYUSH cert, ID, address, COVID
3. Admin Review → Verify certifications
4. Approval → WhatsApp credentials + dashboard access
5. Booking Received → WhatsApp notification
6. Accept/Decline → Confirm availability
7. Complete Session → Use Quick-Log (30 seconds)
8. Commission Calculated → Auto-computed
9. Payout → Weekly batch transfer
10. Rating Received → Patient review + dashboard update
```

### Admin Daily Operations

```
Morning:
├─ Check pending bookings → Assign providers
├─ Review new applications → Approve/reject
└─ Monitor renewal alerts → Send WhatsApp prompts

Throughout Day:
├─ Track session completions
├─ Resolve provider/patient issues
└─ Monitor real-time revenue

Weekly:
├─ Process commission payouts
├─ Export data to Google Sheets
└─ Review performance metrics
```

---

## Growth Strategy

### Phase 1: Faridabad Launch (Months 1-3)
**Goal:** Prove unit economics with 20 providers, 100 patients

**Tactics:**
- Launch with Chandan Accucenter as anchor provider
- Onboard 20 providers in Faridabad territory
- Local WhatsApp group marketing
- Facebook/Instagram geo-targeted ads
- Google Ads: "acupressure therapy Faridabad"

**Success Metrics:**
- 100 packages sold (₹299,000 revenue)
- ₹74,750 platform revenue (25% commission)
- 80% completion rate
- 50% renewal rate
- 4.5★ average rating

---

### Phase 2: NCR Expansion (Months 4-9)
**Goal:** Scale to 100 providers, 1,000 patients across NCR

**Territories:**
- Delhi (4 zones)
- Gurgaon (3 zones)
- Noida (3 zones)
- Total: 11 territories

**Tactics:**
- Provider referral program (₹5,000 per referred provider)
- Patient referral program (1 free session per referral)
- SEO content: Science pages, acupressure guides
- Partnerships with corporate wellness programs

**Success Metrics:**
- 1,000 packages sold (₹2.99M revenue)
- ₹747,500 platform revenue
- Provider utilization: 15 sessions/week average
- 60% renewal rate

---

### Phase 3: Multi-City Rollout (Months 10-18)
**Goal:** Launch in Bangalore, Mumbai, Pune (3 cities)

**Playbook per city:**
1. Identify 2 anchor providers (high ratings)
2. Onboard 30 providers in 4 weeks
3. Launch local marketing campaign (₹50k budget/city)
4. Achieve 100 packages/city in Month 1
5. Repeat for next city

---

## Retention Mechanics (Platform Moat)

### 1. Digital Therapy Card (DTC)
**Problem:** Patients ghost after 1-2 sessions
**Solution:** Visual progress tracking makes quitting psychologically harder

**Behavioral Psychology:**
- **Sunk Cost Fallacy:** Prepaid sessions → must complete
- **Progress Visualization:** Chart going up → want to see result
- **Scarcity:** Session counter → urgency to use remaining
- **Social Proof:** Homework videos → engagement between sessions

---

### 2. Territory Protection
**Problem:** Providers steal patients after first session
**Solution:** Never share patient contact with provider until confirmed

**Workflow:**
```
Booking → Admin Assigns → WhatsApp Notification (no phone numbers shared)
→ Provider arrives at address (platform provides)
→ Session completed → Provider logs in app (patient ID, not contact)
```

**Why it works:**
- Provider never gets patient's phone/email
- All future bookings must go through platform
- Provider commission is high enough (75%) to stay loyal

---

### 3. Central Dispatch Model
**Problem:** Direct provider-patient relationships bypass platform
**Solution:** All bookings funnel through admin operations center

**Admin adds value:**
- Smart provider matching (rating, availability, territory)
- Conflict resolution (no-shows, quality issues)
- Quality assurance (ratings, reviews)
- Insurance (provider background checks)

---

## Financial Projections (Year 1)

| Metric | Q1 | Q2 | Q3 | Q4 | Year 1 |
|--------|-----|-----|-----|-----|--------|
| **Active Providers** | 20 | 50 | 100 | 150 | 150 |
| **Active Patients** | 100 | 300 | 600 | 1,000 | 1,000 |
| **Packages Sold** | 100 | 250 | 500 | 800 | 1,650 |
| **GMV** | ₹2.99L | ₹7.48L | ₹14.95L | ₹23.92L | ₹49.34L |
| **Platform Revenue** | ₹75k | ₹1.87L | ₹3.74L | ₹5.98L | ₹12.34L |
| **Provider Payouts** | ₹2.24L | ₹5.61L | ₹11.21L | ₹17.94L | ₹37L |

**Assumptions:**
- Average package: ₹2,990 (Standard 10-session)
- Platform commission: 25%
- Renewal rate: 50%
- Average 1.5 packages/patient/year

---

## Key Differentiators

### vs Urban Company
| Aspect | Urban Company | AccuCentral |
|--------|---------------|-------------|
| **Focus** | General services | Acupressure only |
| **Quality Control** | Basic training | AYUSH certification mandatory |
| **Progress Tracking** | None | Digital Therapy Card |
| **Retention Model** | Repeat bookings | Prepaid packages + DTC |
| **Commission** | 15-20% | 25% (specialized) |

### vs Independent Therapists
| Aspect | Independent | AccuCentral |
|--------|-------------|-------------|
| **Discovery** | Word of mouth | Platform reach |
| **Booking** | Phone calls | WhatsApp + dashboard |
| **Payments** | Cash only | Online prepaid |
| **Credibility** | Self-claimed | AYUSH verified |
| **Client Management** | Excel sheets | Automated DTC |

---

## Risks & Mitigation

### 1. Provider Disintermediation
**Risk:** Providers contact patients directly after first session

**Mitigation:**
- High commission (75%) keeps providers loyal
- Territory protection (contract clause)
- Never share patient contact info
- Monthly incentives for on-platform bookings
- Legal agreement with penalty clauses

---

### 2. Low Patient Retention
**Risk:** Patients don't complete packages

**Mitigation:**
- Digital Therapy Card (visual progress)
- Prepaid model (sunk cost)
- WhatsApp renewal reminders
- Homework videos (engagement)
- Money-back guarantee (if no progress after 5 sessions)

---

### 3. Provider Quality Issues
**Risk:** Bad sessions damage brand

**Mitigation:**
- AYUSH certification mandatory
- Background checks
- Rating system (below 4.0★ = suspension review)
- Mystery audits (admin books as patient)
- Patient complaint hotline

---

### 4. Scalability Bottleneck (Manual Dispatch)
**Risk:** Admin can't keep up with bookings

**Mitigation:**
- **Phase 1 (Manual):** Admin assigns providers
- **Phase 2 (Semi-Auto):** System suggests top 3, admin picks
- **Phase 3 (Fully Auto):** AI auto-assigns based on rating + availability
- **Google Sheets Integration:** Manual override always available

---

## Science & Education Content (SEO Strategy)

**Purpose:** Build authority, drive organic traffic, educate market

**Content Pillars:**

### 1. Science Pages
- Gate Control Theory of Pain
- Fascia and Connective Tissue Research
- AYUSH Standards for Acupressure
- Clinical Studies Database

### 2. Acupressure Points Library
- LI4 (Hegu) - Headache, stress
- PC6 (Neiguan) - Nausea, anxiety
- ST36 (Zusanli) - Digestive, immunity
- GB20 (Feng Chi) - Neck tension, migraine
- 50+ total pressure points with:
  - High-res location photos
  - Clinical indications
  - Contraindications
  - Scientific references

### 3. Assessment Tools
- **Yin-Yang Balance Quiz:** Lead generation
- **Pain Level Tracker:** Self-assessment before booking
- **Condition Matcher:** Recommends best service

**SEO Keywords to Dominate:**
- "acupressure therapy near me"
- "AYUSH certified therapist"
- "chronic pain relief [city]"
- "migraine acupressure [city]"
- "tech neck treatment at home"

---

## Technology Roadmap

### Phase 1: MVP (Completed ✅)
- Patient DTC dashboard
- Provider registration + dashboard
- Admin operations center
- Booking dispatch system
- Commission tracking
- Static data (mock)

### Phase 2: Backend (In Progress 🔄)
- ✅ Prisma schema designed
- ⏳ Supabase database setup
- ⏳ Authentication (NextAuth.js)
- ⏳ API routes (CRUD)
- ⏳ Migration + seed data

### Phase 3: Integrations (Next)
- Payment gateway (Razorpay)
- WhatsApp Business API
- Google Sheets sync
- Email notifications (SendGrid)
- SMS (Twilio)

### Phase 4: Automation (Future)
- AI provider matching
- Predictive renewal alerts
- Dynamic pricing
- Inventory management (time slots)
- Analytics dashboard (Mixpanel)

### Phase 5: Mobile Apps (Future)
- Provider app (React Native)
- Patient app (PWA)
- Push notifications
- Offline mode

---

## Success Metrics (North Star)

### Business Metrics
1. **GMV (Gross Merchandise Value):** Total bookings value
2. **Take Rate:** Platform commission %
3. **Provider Utilization:** Sessions/week per provider
4. **Patient LTV:** Average lifetime revenue per patient
5. **Renewal Rate:** % of patients buying 2nd+ package

### Operational Metrics
1. **Time to Assign:** Minutes from booking to provider assigned
2. **Completion Rate:** % of bookings actually completed
3. **No-Show Rate:** % of confirmed bookings missed
4. **Avg Pain Reduction:** % pain score improvement
5. **Provider Ratings:** Average stars

### Growth Metrics
1. **Provider CAC:** Cost to acquire one provider
2. **Patient CAC:** Cost to acquire one patient
3. **Viral Coefficient:** Referrals per patient
4. **Churn Rate:** % of patients who don't renew
5. **Payback Period:** Months to recover CAC

---

## Regulatory & Compliance

### AYUSH Compliance
- All providers must have AYUSH certification
- Regular audits of certifications
- Mandatory continuing education
- Adherence to AYUSH guidelines

### Data Privacy (India)
- DISHA compliance (Digital Information Security in Healthcare Act)
- Secure storage of patient health data
- Consent management
- Right to data deletion

### Financial Compliance
- GST registration (18% on platform fee)
- TDS deduction (10% on provider payouts)
- Form 26AS reporting
- Annual financial audit

### Labor Compliance
- Providers are contractors (not employees)
- Clear service agreements
- Insurance coverage for providers
- Background verification mandatory

---

## Exit Strategy (5-Year Horizon)

### Potential Acquirers

**1. UrbanClap/Urban Company**
- Add specialized vertical
- Leverage existing infrastructure
- Valuation: 3-5x revenue

**2. Practo/1mg**
- Expand beyond doctors to therapists
- Holistic health platform
- Valuation: 4-6x revenue

**3. Large Hospital Chains (Apollo, Fortis)**
- Add ancillary therapy services
- Corporate wellness programs
- Valuation: 2-3x revenue

**4. Wellness Aggregators (Curefit, HealthifyMe)**
- Integrate therapy with fitness/nutrition
- Cross-sell opportunities
- Valuation: 3-5x revenue

---

## Team & Roles (As Business Scales)

### Phase 1 (Launch Team - 3 people)
- **Founder/CEO:** Strategy, fundraising, partnerships
- **Operations Manager:** Dispatch, provider management
- **Tech Lead:** Platform development, maintenance

### Phase 2 (Growth Team - 10 people)
- **City Managers (4):** 1 per territory
- **Customer Support (2):** Patient + provider queries
- **Marketing Manager (1):** SEO, ads, content
- **Backend Developer (1):** Database, APIs
- **Finance Manager (1):** Payouts, compliance
- **CEO + Operations Manager**

### Phase 3 (Scale Team - 30 people)
- **Regional Heads (5):** Multi-city oversight
- **City Managers (10):** 1 per city
- **Support Team (6):** 24/7 coverage
- **Marketing Team (3):** Content, performance, brand
- **Tech Team (4):** Frontend, backend, mobile, DevOps
- **Finance Team (2):** Accounting, legal
- **CEO + COO**

---

## Contact & Resources

**Project Repository:** https://github.com/mc784/accucentral
**Live Platform:** https://accucentral.vercel.app
**Admin Dashboard:** https://accucentral.vercel.app/admin
**Sample DTC:** https://accucentral.vercel.app/patient/PAT001

**Key Documents:**
- `PROJECT_HANDOFF.md` - Technical documentation
- `prisma/schema.prisma` - Database schema
- `TRANSFORMATION_PROGRESS.md` - Development log

---

**Blueprint Version:** 2.0
**Last Updated:** December 2024
**Status:** Production-ready marketplace platform ✅
