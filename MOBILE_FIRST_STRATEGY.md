# AccuCentral - Mobile-First Strategy

**Reality:** 80% mobile-only, 15% hybrid, 5% desktop-only

---

## 📊 User Behavior Analysis

### **Patients (95% Mobile)**
**Primary Actions:**
1. WhatsApp booking (never leaves WhatsApp)
2. View DTC on phone (check progress chart)
3. Watch homework videos (YouTube embeds)
4. Book next session (WhatsApp link)

**Device:** Android (70%), iOS (30%)
**Network:** 3G/4G (60%), WiFi (40%)
**Screen:** 360x640 to 414x896

**Implications:**
- PWA mandatory (install to home screen)
- Offline-first architecture
- Image optimization critical (slow networks)
- Bottom navigation (thumb-friendly)
- Large tap targets (minimum 44x44px)

---

### **Providers (100% Mobile)**
**Primary Actions:**
1. Receive booking notification (WhatsApp)
2. Log pain scores (30-second flow)
3. View earnings (dashboard)
4. Check schedule (today's bookings)

**Device:** Android (90%), iOS (10%)
**Context:** In the field, between sessions, poor connectivity
**Critical:** Fast, offline-capable, thumb-friendly

**Implications:**
- **Provider mobile app** (React Native) is Priority 1
- Offline session logging (sync when online)
- Push notifications for new bookings
- Large buttons, minimal text
- Dark mode (battery saver)

---

### **Admin (Hybrid - 50/50)**
**Primary Actions:**
1. Assign providers to bookings
2. Review applications
3. Monitor dashboard
4. Process payouts

**Device:** Laptop (50%), Tablet (30%), Mobile (20%)
**Context:** Office, home, on-the-go

**Implications:**
- Desktop UI is fine here
- But mobile-responsive for tablet
- Google Sheets integration (mobile fallback)

---

## 🚀 Revised Technology Stack

### **Current (Desktop-First - Wrong)**
- Next.js web app
- Responsive design as afterthought
- No offline support
- No native mobile features

### **New (Mobile-First - Correct)**

#### **1. Patient Experience**
**Tech:** Next.js PWA + WhatsApp-first flow

**Flow:**
```
WhatsApp Booking → Payment (Razorpay mobile) → DTC via Web Link (PWA)
```

**Features:**
- Install to home screen
- Push notifications (renewal alerts)
- Offline DTC viewing (cached data)
- Camera access (future: upload photos)
- WhatsApp Share API integration

---

#### **2. Provider Experience**
**Tech:** React Native mobile app (Priority 1)

**Why Native:**
- Push notifications (critical for dispatch)
- Offline session logging (unreliable networks)
- Camera for pain point photos
- GPS for location verification
- Better performance

**App Features:**
- Login with phone OTP
- Today's bookings list
- One-tap "Complete Session" button
- Pain score slider (visual, easy)
- Earnings dashboard
- Payout history

**App Name:** "AccuCentral Provider"
**Platforms:** Android (priority), iOS (later)

---

#### **3. Admin Experience**
**Tech:** Next.js web app (desktop-optimized, mobile-responsive)

**Interface:**
- Desktop: Full dashboard (multiple columns)
- Tablet: Simplified layout
- Mobile: Essential actions only (approve/assign)

---

## 📱 PWA Implementation (Next.js)

### Install next-pwa

```bash
npm install next-pwa
```

### Update next.config.ts

```typescript
import withPWA from 'next-pwa';

export default withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})({
  // ... existing Next.js config
});
```

### Add manifest.json

```json
{
  "name": "AccuCentral",
  "short_name": "AccuCentral",
  "description": "Book acupressure therapy sessions",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#4A7C7E",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

---

## 🎨 Mobile-First UI Patterns

### **Bottom Navigation (Not Top)**

```
┌────────────────────┐
│                    │
│   Content Area     │
│                    │
│                    │
│                    │
├────────────────────┤
│ Home | DTC | Book  │  ← Thumb-friendly
└────────────────────┘
```

### **Large Tap Targets**

- Minimum 44x44px (Apple HIG)
- Spacing between elements: 8px minimum
- Primary CTAs: Full-width buttons
- Bottom-aligned CTAs (reachable)

### **Simplified Navigation**

**Desktop (Current):**
```
Services | Protocols | Points | Science | About | Book
```

**Mobile (New):**
```
☰ Menu
  ├─ Book Session
  ├─ My Progress
  ├─ Services
  └─ Help
```

### **Mobile-Optimized Forms**

- One field per screen (wizard-style)
- Large inputs (48px height minimum)
- Auto-focus next field
- Input type="tel" for phone numbers
- Input type="number" for pain scores

---

## 📦 Component Library Changes

### **Replace Desktop Components:**

| Desktop Component | Mobile Replacement |
|-------------------|-------------------|
| Horizontal nav | Bottom tab bar |
| Multi-column cards | Single-column stack |
| Hover states | Active/pressed states |
| Tooltips | Modal explanations |
| Sidebar | Drawer (hamburger) |

### **New Mobile Components Needed:**

1. **BottomTabBar.tsx** - Home, DTC, Book
2. **MobileHeader.tsx** - Logo + hamburger
3. **SwipeableDrawer.tsx** - Menu overlay
4. **FloatingActionButton.tsx** - Primary CTA
5. **MobileStepper.tsx** - Multi-step forms
6. **PullToRefresh.tsx** - Native-like updates
7. **BottomSheet.tsx** - Modal alternatives

---

## 🚀 Revised Priority Roadmap

### **Week 1: Mobile-First Foundation**
1. ✅ Database (Done)
2. **Install next-pwa** (30 min)
3. **Add manifest.json** (15 min)
4. **Create mobile navigation** (2 hours)
5. **Optimize images** (1 hour)

### **Week 2: Provider Mobile App (Critical)**
1. **Setup React Native project** (1 day)
2. **Build login flow** (OTP-based) (1 day)
3. **Today's bookings screen** (1 day)
4. **Quick-log pain score** (1 day)
5. **Push notifications** (1 day)

### **Week 3: Patient PWA Polish**
1. **Offline DTC caching** (1 day)
2. **Push notifications** (renewal alerts) (1 day)
3. **Camera integration** (future: photos) (1 day)
4. **WhatsApp Share API** (1 day)
5. **Performance optimization** (1 day)

### **Week 4: Integration & Testing**
1. Razorpay mobile SDK
2. WhatsApp Business API
3. End-to-end mobile testing
4. Network resilience testing

---

## 📊 Mobile Performance Targets

### **Patient PWA:**
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Lighthouse Score: > 90
- Bundle size: < 200KB (initial)
- Offline-capable: Yes

### **Provider App:**
- App size: < 10MB
- Cold start: < 2s
- Session logging: < 5 taps
- Offline mode: Full functionality
- Battery drain: < 5%/hour

---

## 🎯 WhatsApp-First Strategy

### **Patient Booking Flow (Zero Website Friction)**

```
1. See WhatsApp ad/post
2. Click "Book Now" → Opens WhatsApp chat
3. Send pre-filled message
4. Receive payment link (Razorpay)
5. Pay in WhatsApp browser
6. Receive DTC link (PWA)
7. Install PWA to home screen
```

**No website visit required!**

### **Provider Dispatch Flow**

```
1. Admin assigns booking
2. Provider receives WhatsApp notification
3. Click link → Opens Provider App
4. Tap "Accept Booking"
5. Navigate to location (Google Maps)
6. Complete session → Log pain score
7. Receive commission notification
```

---

## 📱 React Native Provider App Structure

```
accucentral-provider/
├── src/
│   ├── screens/
│   │   ├── LoginScreen.tsx           # Phone OTP
│   │   ├── HomeScreen.tsx            # Today's bookings
│   │   ├── BookingDetailScreen.tsx   # Session info
│   │   ├── LogSessionScreen.tsx      # Pain score entry
│   │   ├── EarningsScreen.tsx        # Dashboard
│   │   └── ProfileScreen.tsx         # Settings
│   ├── components/
│   │   ├── BookingCard.tsx           # Swipeable card
│   │   ├── PainScoreSlider.tsx       # Visual slider
│   │   ├── EarningsChart.tsx         # Weekly earnings
│   │   └── NotificationHandler.tsx   # Push notifications
│   ├── api/
│   │   ├── auth.ts                   # OTP verification
│   │   ├── bookings.ts               # Fetch bookings
│   │   └── sessions.ts               # Log pain scores
│   ├── store/
│   │   ├── authSlice.ts              # Redux auth state
│   │   ├── bookingsSlice.ts          # Offline queue
│   │   └── syncSlice.ts              # Sync manager
│   └── navigation/
│       └── AppNavigator.tsx          # Tab navigation
├── android/
└── ios/
```

---

## 🔋 Offline-First Architecture

### **Provider App (Critical)**

**Offline Capabilities:**
1. View today's bookings (cached)
2. Log pain scores (queued for sync)
3. View earnings (last synced)

**Sync Strategy:**
```
1. Queue actions locally (SQLite)
2. Sync when network available
3. Show sync status badge
4. Retry failed syncs
```

### **Patient PWA**

**Offline Capabilities:**
1. View DTC (cached data)
2. Watch homework videos (downloaded)
3. View service catalog (cached)

**Service Worker:**
```typescript
// Cache DTC data for 24 hours
// Cache images for 7 days
// Network-first for booking
```

---

## 📐 Mobile UI Specifications

### **Typography (Mobile-Optimized)**

```
H1: 28px (bold)          // Page titles
H2: 24px (semibold)      // Section headers
H3: 18px (semibold)      // Card titles
Body: 16px (regular)     // Default text
Small: 14px (regular)    // Labels, captions
Tiny: 12px (regular)     // Timestamps
```

### **Spacing (8px Grid)**

```
xs: 4px   // Icon padding
sm: 8px   // Between elements
md: 16px  // Section padding
lg: 24px  // Page margins
xl: 32px  // Major sections
```

### **Touch Targets**

```
Minimum: 44x44px (iOS HIG)
Recommended: 48x48px (Material)
Icon buttons: 56x56px
Primary CTAs: Full-width, 56px height
```

---

## 🚀 Implementation Plan: Provider Mobile App

### **Phase 1: Core App (Week 2)**

**Day 1: Setup**
```bash
npx react-native init AccuCentralProvider
cd AccuCentralProvider
npm install @react-navigation/native @react-navigation/bottom-tabs
npm install @react-native-firebase/messaging # Push notifications
npm install @reduxjs/toolkit react-redux
npm install axios
npm install react-native-vector-icons
```

**Day 2: Authentication**
- Phone number input screen
- OTP verification
- Token storage (AsyncStorage)
- Auto-login on app open

**Day 3: Bookings List**
- Fetch today's bookings API
- Swipeable booking cards
- Pull-to-refresh
- Empty state (no bookings today)

**Day 4: Log Session**
- Pain score slider (1-10)
- Visual feedback (colors)
- Submit to API
- Success animation

**Day 5: Push Notifications**
- Firebase Cloud Messaging setup
- Handle booking assignments
- Foreground/background handlers
- Notification tap actions

---

## 📊 Mobile Analytics Events

### **Patient PWA:**
```
- pwa_installed
- dtc_viewed
- session_booked (via WhatsApp)
- renewal_alert_shown
- homework_video_watched
```

### **Provider App:**
```
- app_opened
- booking_accepted
- booking_declined
- session_logged
- earnings_viewed
- push_notification_tapped
```

---

## 🎯 Success Metrics (Mobile-Specific)

### **Patient PWA:**
- PWA install rate: > 30%
- WhatsApp booking completion: > 60%
- DTC views per patient: > 5/week
- Renewal rate: > 50%

### **Provider App:**
- Daily active providers: > 70%
- Session log time: < 30 seconds
- Offline session logs: > 20%
- Booking acceptance rate: > 85%

---

## 🔄 Migration Strategy

### **What to Keep:**
- Database schema (unchanged)
- API routes (add mobile endpoints)
- Admin dashboard (desktop-optimized)

### **What to Build New:**
- Provider mobile app (React Native)
- Mobile-first PWA components
- Bottom navigation
- Offline sync logic

### **What to Deprecate:**
- Desktop-first hero sections
- Multi-column layouts (mobile)
- Hover interactions
- Complex navigation

---

**Next Decision:** Should I start building the Provider Mobile App or optimize the Patient PWA first?

Which gives you faster time-to-market? 🚀
