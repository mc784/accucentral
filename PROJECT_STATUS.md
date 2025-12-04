# Accucentral - Project Setup Status

## ✅ Completed Tasks

### 1. Repository Setup
- ✅ Copied VrikshaYoga codebase to new directory: `C:\Users\manee\Documents\1_AI_ALL\accucentral`
- ✅ Cleaned up all VrikshaYoga-specific documentation files
- ✅ Initialized new Git repository
- ✅ Committed initial state

### 2. Branding Updates
- ✅ Updated `package.json` name from `vrikshayoga-gen2` → `accucentral`
- ✅ Rewrote `README.md` with Accucentral vision and architecture
- ✅ Created comprehensive `ACCUCENTRAL_BLUEPRINT.md` (strategic manifesto)

### 3. Design System Updates
- ✅ Updated Tailwind config with new color palette:
  - **calm-blue** (#7FB3D5) - Primary brand color
  - **sage-green** (#A9CBB7) - Accent, balance
  - **deep-teal** (#4A7C7E) - Professional, navigation
  - **warm-coral** (#F4A261) - CTAs, energy
  - Kept **slate-medical** (#F0F4F8) - Clean backgrounds
- ✅ Updated fonts:
  - **Montserrat** - Headings (bold, professional)
  - **Open Sans** - Body text (clean, readable)
  - **Monospace** - Point codes (LI4, PC6, etc.)

### 4. Git Commits
```
c12a596 - Update branding: Accucentral color palette and Blueprint documentation
c7a8c0f - Initial commit: Accucentral project forked from VrikshaYoga
```

---

## 🔄 Next Steps - Ready for Review

### Immediate (Homepage Adaptation)
The homepage currently has VrikshaYoga content. Here's what needs to change:

#### Header/Navigation
**Current:**
- Logo: "VrikshaYoga"
- Nav: Protocols | Poses | Science | About | Take Assessment
- Colors: navy-500 (dark blue) + coral CTAs

**Proposed for Accucentral:**
- Logo: "Accucentral"
- Nav: Services | Protocols | Science | About | **Book Consultation**
- Colors: deep-teal (navigation) + warm-coral (CTA)

#### Hero Section (SearchHero component)
**Current:**
- Searches for yoga poses
- Message: yoga/cortisol focused

**Proposed:**
- Search for symptoms/pressure points
- Placeholder: "Where does it hurt?" or "Search symptoms (e.g., headache, nausea)"
- Headline: "The Google Maps of Your Body"
- Subheadline: "Instant pain relief through searchable pressure points"

#### Content Sections Order
**Current VrikshaYoga:**
1. Search Hero
2. Protocols (3 cards)
3. Explore Library (Categories + Featured Poses)
4. Science CTA
5. Footer

**Proposed Accucentral:**
1. Search Hero ("Where does it hurt?")
2. How It Works (3 steps: Search → Locate → Press)
3. Symptom Categories (4 cards: Stress, Pain, Sleep, Digestive)
4. Featured Protocols (5 cards: Tech-Neck, Insomnia, Anxiety, Migraine, Digestive)
5. Featured Points (6 cards: LI4, PC6, ST36, GB20, HT7, SP6)
6. Science CTA (Gate Control Theory intro)
7. Footer (Chandan Accucenter branding)

---

## 📊 Content Model Changes Needed

### Sanity Schemas

#### ✅ Keep As-Is (Minor Tweaks):
- `protocol` schema - Works for both yoga sequences and acupressure protocols
- `article` schema - For science content
- `userProfile` & `userActivity` - Future subscription features

#### 🔄 Major Changes Needed:

**1. Create New: `acupressurePoint` schema**
Replace `yogaPose` with `acupressurePoint`:
```typescript
{
  name: 'acupressurePoint',
  fields: [
    'code',              // e.g., "LI4"
    'traditionalName',   // e.g., "Hegu (Joining Valley)"
    'meridian',          // e.g., "Large Intestine"
    'location',          // Anatomical description
    'locationPhoto',     // High-res image
    'techniqueGif',      // Optional animated guide
    'tcmFunction',       // Traditional Chinese Medicine function
    'symptoms',          // Array of searchable symptoms
    'contraindications', // When NOT to use
    'relatedPoints',     // References to other points
    'scientificReferences' // Citations
  ]
}
```

**2. Routing/Components Update**
- Neutralized legacy components: `PoseCard.tsx`, `PoseFilters.tsx`, `PosesClient.tsx`
- `/pose/[slug]` and `/poses` now redirect to `/protocols`

---

## ⚠️ Dependencies That Need Attention

### Environment Variables (.env.local)
Currently points to VrikshaYoga Sanity project:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-vriksha-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-token
```

**Action Needed:**
1. Create new Sanity project: "accucentral-cms"
2. Update `.env.local` with new project ID
3. Deploy new schemas to Sanity Studio

### External Images (raw-images folder)
Currently contains yoga pose images:
- boat pose.png
- downward facing dog.png
- etc.

**Action Needed:**
- Replace with acupressure point location photos
- Or use placeholder images initially

---

## 🎯 Recommended Implementation Order

### Phase 1A: Visual Rebrand (Quick Wins - 2-3 hours)
1. Update homepage header/navigation
2. Update SearchHero component text
3. Replace categories (yoga → symptoms)
4. Update footer with Chandan Accucenter branding
5. Test color palette across all pages

### Phase 1B: Sanity Setup (4-6 hours)
1. Create new Sanity project
2. Define acupressurePoint schema
3. Update protocol schema fields
4. Deploy to Sanity Studio
5. Create 5-10 sample pressure points

### Phase 1C: Component Refactor (3-4 hours)
1. Rename pose → point components
2. Update routing (/pose → /point)
3. Adapt PoseCard to display point data
4. Update search logic for symptoms
5. Test all pages

### Phase 2: Content Population (Ongoing)
1. Create 20 essential pressure points
2. Write 5 daily protocols
3. Create science page content
4. Add appointment booking (Calendly)

---

## 🤔 Questions for User

Before proceeding with homepage changes, please confirm:

1. **Sanity Project:**
   - Should I create a new Sanity project now, or continue with existing VrikshaYoga project for testing?
   - Preferred dataset name: "production" or "accucentral"?

2. **Homepage Sections:**
   - Do you approve the proposed section order (listed above)?
   - Any changes to the "How It Works" 3-step flow?

3. **Navigation:**
   - "Book Consultation" as primary CTA, or different wording?
   - Should "Assessment" page stay (repurposed for symptom quiz)?

4. **Content:**
   - Do you have existing acupressure point descriptions to migrate?
   - Should I create placeholder content for initial 10 points?

5. **Domain:**
   - Planning to use accucentral.com or different domain?
   - When would you like to deploy (after content is ready, or placeholder site first)?

---

## 📁 Current Project Structure

```
accucentral/
├── .env.local (needs Sanity update)
├── ACCUCENTRAL_BLUEPRINT.md ✅
├── README.md ✅
├── package.json ✅
├── tailwind.config.ts ✅
├── app/
│   ├── page.tsx (needs homepage updates)
│   ├── layout.tsx (needs font updates)
│   ├── about/ (needs content rewrite)
│   ├── assessment/ (redirects to /book)
│   ├── pose/ (redirects to /protocols)
│   ├── poses/ (redirects to /protocols)
│   ├── protocol/ (keep, update content)
│   ├── protocols/ (keep, update content)
│   ├── science/ (needs content rewrite)
│   └── studio/ (Sanity Studio - new project)
├── components/
│   ├── PoseCard.tsx (neutralized)
│   ├── PoseFilters.tsx (neutralized)
│   ├── PosesClient.tsx (neutralized)
│   ├── SearchHero.tsx (updated to services-first)
│   ├── ScienceNote.tsx (keep, change gold → teal borders)
│   └── StickyAssessmentButton.tsx → StickyBookingButton.tsx
├── sanity/
│   ├── schemas/
│   │   ├── yogaPose.ts → acupressurePoint.ts (needs rewrite)
│   │   ├── protocol.ts (minor updates)
│   │   └── article.ts (keep as-is)
│   └── sanity.config.ts (needs new project ID)
└── public/
    └── raw-images/ (needs acupressure point photos)
```

---

## 🚀 Ready to Proceed?

I've completed the foundation work:
- ✅ Repository setup
- ✅ Branding updates
- ✅ Color palette
- ✅ Blueprint documentation

**Next immediate task:** Adapt homepage hero and navigation.

Would you like me to:
1. **Proceed with homepage visual updates** (using placeholder content)?
2. **Set up new Sanity project first** (requires your input on naming)?
3. **Create sample acupressure point content** (to test with)?
4. **Show you a detailed diff of proposed homepage changes** before implementing?

Let me know your preference and I'll continue!
