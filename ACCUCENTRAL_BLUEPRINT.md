# Accucentral - Strategic Blueprint

## Vision: "The Google Maps of Your Body"

**Mission:** Transform ancient acupressure knowledge into an instantly searchable, scientifically-grounded digital platform for modern pain relief.

**Core Problem:** Acupressure knowledge is trapped in dusty textbooks and low-quality "woo-woo" blogs. Users can't easily find "Where exactly do I press for a migraine?"

**Solution:** A searchable, interactive, evidence-based acupressure knowledge engine combining traditional wisdom with modern interface design.

---

## Product Positioning

### VrikshaYoga vs Accucentral

| Aspect | VrikshaYoga | Accucentral |
|--------|-------------|-------------|
| **Medium** | Video Platform (Flow/Movement) | Knowledge Engine (Search/Map) |
| **Content** | Yoga poses & sequences | Pressure points & protocols |
| **Primary Action** | Watch & follow | Search & apply |
| **Key Feature** | Assessment Quiz → Protocols | Symptom Search → Points |
| **Pain Point** | Stress/Dysregulation | Physical pain/discomfort |
| **User Journey** | Browse → Watch → Practice | Search → Locate → Press |
| **Core Hook** | Cortisol regulation | Instant pain relief |

### Shared DNA
- Same tech stack (Next.js + Sanity + Tailwind)
- Same "Ancient Wisdom + Modern Science" positioning
- Same content library structure
- Same search-first UX philosophy
- Complementary wellness solutions (stress + pain)

---

## Core Features (Phase 1 MVP)

### 1. Symptom Decoder (Search Engine)
**The Hook:** Prominent search bar on homepage: *"Where does it hurt?"*

**Function:** User types symptom (e.g., "Nausea", "Lower Back Pain", "Migraine")

**Output:** Top 3-5 pressure points with:
- High-res location photo (exactly where to press)
- Anatomical description (e.g., "LI4 - Between thumb and index finger")
- TCM function (traditional Chinese medicine context)
- Clinical indications (what it treats)
- Pressure technique (5-second GIF or static illustration)
- AYUSH ministry references (Indian acupressure validation)

### 2. Point Library (The Database)
Definitive pages for each pressure point: `/library/point/[code]`

Example: `/library/point/LI4` (Large Intestine 4)

**Content Structure:**
- Point code and traditional name
- High-resolution location photo
- Anatomical landmarks
- TCM meridian and function
- Clinical indications (symptoms treated)
- Contraindications (when NOT to use)
- Pressure technique details
- Related points
- Scientific references

**SEO Strategy:** Dominate searches like "pressure point for headache", "acupressure for nausea", etc.

### 3. Daily Protocols (The Prescription)
Multi-point sequences for common modern ailments: `/protocol/[slug]`

**Launch Protocols:**
- **Tech-Neck Release** - 5-point sequence for desk workers
- **Insomnia Switch** - 3-point bedside routine
- **Anxiety Reset** - Discreet hand-point routine (meeting-safe)
- **Migraine Relief** - Head/hand point combination
- **Digestive Reset** - Abdominal + hand points for bloating/IBS

**Protocol Structure:**
- Problem statement (who this helps)
- Complete point sequence (numbered steps)
- Time estimate (e.g., "5 minutes")
- Best time to practice (e.g., "before bed", "at desk")
- Visual guide (numbered body diagram)

### 4. Meridian Science Hub
Educational content at `/science`

**Topics:**
- **The Biology of Pain** - Gate Control Theory explained
- **Fascia & Connective Tissue** - Scientific basis for meridians
- **HPA Axis Connection** - Stress + pain relationship (cross-link to VrikshaYoga)
- **Clinical Research** - Studies on acupressure efficacy
- **TCM Philosophy** - Qi, meridians, energy flow (accessible language)
- **AYUSH Guidelines** - Indian government acupressure standards

### 5. Appointment Booking
Simple Calendly embed for Chandan Accucenter appointments

**Placement:**
- Header CTA: "Book Consultation"
- Sticky button (after scrolling)
- Protocol page CTAs: "Need personalized help?"

---

## Content Categories (Symptom-Based)

### 1. Stress & Anxiety Relief
**Pain Points:** Chronic stress, nervous tension, emotional burnout
**Key Points:** PC6 (Pericardium 6), HT7 (Heart 7), GV20 (Governing Vessel 20)
**Visual Tone:** Calm, airy, soft blues/greys
**Protocols:** Anxiety Reset, Workplace Stress Relief

### 2. Chronic Pain Management
**Pain Points:** Headaches, back pain, neck pain, joint pain
**Key Points:** LI4 (Large Intestine 4), GB20 (Gallbladder 20), BL10 (Bladder 10)
**Visual Tone:** Grounded, clear, warm neutrals
**Protocols:** Tech-Neck Release, Migraine Relief, Lower Back Support

### 3. Sleep & Insomnia Support
**Pain Points:** Difficulty falling asleep, staying asleep, restless nights
**Key Points:** HT7, SP6 (Spleen 6), KI3 (Kidney 3)
**Visual Tone:** Tranquil blues/purples, soft gradients
**Protocols:** Insomnia Switch, Sleep Prep Routine

### 4. Digestive Health
**Pain Points:** Bloating, IBS, sluggish digestion, nausea
**Key Points:** ST36 (Stomach 36), PC6, CV12 (Conception Vessel 12)
**Visual Tone:** Light, uplifting greens
**Protocols:** Digestive Reset, Nausea Relief

---

## Design System

### Color Palette (Calm & Professional)

**Primary Colors:**
- **Calm Blue:** `#7FB3D5` - Headers, primary CTAs
- **Sage Green:** `#A9CBB7` - Accents, success states
- **Deep Teal:** `#4A7C7E` - Navigation, hover states

**Neutrals:**
- **White:** `#FFFFFF` - Backgrounds
- **Slate Gray:** `#64748B` - Body text
- **Charcoal:** `#334155` - Headings

**Accent:**
- **Warm Coral:** `#F4A261` - Important CTAs (book appointment)

### Typography
- **Headings:** Montserrat (bold, clean, professional)
- **Body:** Open Sans (readable, friendly)
- **Point Codes:** Monospace (e.g., "LI4", "PC6")

### Component Patterns (Inherited from VrikshaYoga)
- **ScienceNote** - Quote blocks with expert citations (gold → teal borders)
- **SearchHero** - Large search input with autocomplete
- **Card Grid** - Point/protocol browsing (3-column responsive)
- **StickyAssessmentButton** - Persistent "Book Consultation" CTA

---

## Technical Architecture

### Tech Stack (Identical to VrikshaYoga)
- **Framework:** Next.js 16 (App Router, React Server Components)
- **CMS:** Sanity Studio v4 (headless content management)
- **Styling:** Tailwind CSS v4
- **Deployment:** Vercel
- **Search:** Sanity GROQ queries (full-text search)

### Sanity Schema Changes

#### New Schema: `acupressurePoint`
```typescript
{
  name: 'acupressurePoint',
  type: 'document',
  fields: [
    { name: 'code', type: 'string' },           // e.g., "LI4"
    { name: 'traditionalName', type: 'string' }, // e.g., "Hegu (Joining Valley)"
    { name: 'meridian', type: 'string' },       // e.g., "Large Intestine"
    { name: 'location', type: 'text' },         // Anatomical description
    { name: 'locationPhoto', type: 'image' },   // High-res photo
    { name: 'techniqueGif', type: 'image' },    // Optional animated guide
    { name: 'tcmFunction', type: 'text' },      // Traditional function
    { name: 'symptoms', type: 'array', of: [{ type: 'string' }] }, // Searchable tags
    { name: 'contraindications', type: 'text' },
    { name: 'relatedPoints', type: 'array', of: [{ type: 'reference', to: [{ type: 'acupressurePoint' }] }] },
    { name: 'scientificReferences', type: 'array', of: [{ type: 'object', fields: [...] }] }
  ]
}
```

#### Modified Schema: `protocol`
```typescript
{
  name: 'protocol',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },          // e.g., "Tech-Neck Release"
    { name: 'slug', type: 'slug' },
    { name: 'problem', type: 'text' },          // Who this helps
    { name: 'points', type: 'array', of: [{ type: 'reference', to: [{ type: 'acupressurePoint' }] }] },
    { name: 'sequence', type: 'array', of: [{ type: 'block' }] }, // Step-by-step instructions
    { name: 'duration', type: 'number' },       // Minutes
    { name: 'bestTime', type: 'string' },       // "Before bed", "At desk", etc.
    { name: 'category', type: 'reference', to: [{ type: 'category' }] },
    { name: 'diagram', type: 'image' }          // Numbered body illustration
  ]
}
```

#### Keep from VrikshaYoga:
- `article` (for science content)
- `category` (symptom categories)
- `userProfile` & `userActivity` (future subscription features)

---

## Phase 1 MVP Checklist

### Foundation (Week 1)
- [x] Fork VrikshaYoga codebase
- [x] Clean up yoga-specific files
- [x] Initialize new Git repo
- [x] Update branding (package.json, README)
- [ ] Update Tailwind config (blue/green palette)
- [ ] Create new Sanity project (`accucentral-cms`)
- [ ] Define acupressurePoint schema
- [ ] Modify protocol schema

### Homepage (Week 1-2)
- [ ] Update hero: "The Google Maps of Your Body"
- [ ] Implement symptom search bar
- [ ] Update navigation (Points | Protocols | Science | Book)
- [ ] Create 4 category cards (Stress, Pain, Sleep, Digestive)
- [ ] Add "How It Works" section (3 steps: Search → Locate → Press)
- [ ] Update footer with Chandan Accucenter info

### Content (Week 2)
- [ ] Create 20 essential pressure points (LI4, PC6, ST36, GB20, etc.)
- [ ] Write 5 launch protocols
- [ ] Create location photos (stock or illustrated)
- [ ] Write science page content (Gate Control Theory, fascia, TCM basics)

### Point Library Pages (Week 2)
- [ ] Design point detail page template
- [ ] Implement dynamic routing: `/library/point/[code]`
- [ ] Add related points section
- [ ] Add "Book Consultation" CTA

### Protocol Pages (Week 2)
- [ ] Design protocol detail template
- [ ] Implement dynamic routing: `/protocol/[slug]`
- [ ] Add step-by-step numbered sequence
- [ ] Add protocol diagram/illustration

### Integration (Week 3)
- [ ] Calendly appointment embed
- [ ] Update sticky CTA to "Book Consultation"
- [ ] Test search functionality
- [ ] Mobile responsive check

### Deployment (Week 3)
- [ ] Create new Vercel project
- [ ] Configure environment variables
- [ ] Deploy to accucentral.com (or temporary domain)
- [ ] Test production build

---

## Phase 2: Enhancement (Future)

### Interactive Atlas
- 2D body SVG with clickable points
- Toggle layers (muscles, meridians, trigger points)
- Zoom/pan functionality
- Point highlighting on hover
- Mobile touch support

### Advanced Features
- User accounts (save favorite points/protocols)
- Progress tracking
- Custom protocol builder
- Practitioner directory
- Video demonstrations (technique close-ups)

### Business Model
- Free tier (20 points, 3 protocols)
- Premium subscription ($9.99/mo - full library)
- Certification courses ($299 - B2B)
- E-commerce (acupressure tools via Shopify)

---

## Success Metrics (Phase 1)

**Traffic:**
- 1,000 monthly visitors (organic search)
- Top 3 ranking for 5 symptom keywords

**Engagement:**
- 3+ pages per session
- 2+ minute average session
- 30% search usage rate

**Conversion:**
- 50 appointment bookings
- 20% email signup rate (future newsletter)

**Content:**
- 20 pressure points live
- 5 protocols published
- 10 science articles

---

## Key Differentiators

1. **Scientific Grounding** - Gate Control Theory, fascia research, AYUSH standards (not just TCM mysticism)
2. **Modern Search UX** - Google-like symptom search (not just browsing)
3. **Clinical Precision** - High-res photos, anatomical landmarks (not vague diagrams)
4. **Practical Protocols** - Modern use cases (tech-neck, workplace stress) not just traditional ailments
5. **Professional Aesthetics** - Medical-grade UI design (looks like medical software, not wellness blog)

---

## Cross-Promotion with VrikshaYoga

**Shared Mission:** Both solve dysregulation (stress + pain) using ancient wisdom + modern tech

**Integration Opportunities:**
- **Science Page Crosslinks:** "Stress increases pain sensitivity → VrikshaYoga for cortisol regulation"
- **Protocol Combos:** "Back hurts? Do this yoga pose + press these points"
- **Bundle Pricing:** "Stress + Pain Relief Suite" (future subscription)
- **Shared Design System:** Consistent components, brand language
- **Shared CMS Infrastructure:** Same Sanity workspace, different datasets

---

## Content Style Guide

### Voice & Tone
- **Authoritative but accessible** (not academic jargon)
- **Evidence-based** (cite studies, reference AYUSH/TCM)
- **Practical** (focus on "how to use" not "what to believe")
- **Modern** (tech-neck, workplace stress - not just ancient ailments)

### Writing Principles
1. **Lead with pain point** ("Desk work causing neck tension?")
2. **Provide precise location** ("Between thumb and index finger, in the muscle")
3. **Include technique** ("Press firmly for 30 seconds, circular motion")
4. **Validate with science** ("Gate Control Theory explains why...")
5. **Offer next step** ("Try this protocol" or "Book consultation")

### Visual Principles
1. **High-resolution photos** (clear anatomical landmarks)
2. **Numbered sequences** (for protocols)
3. **Minimal text on images** (let photos speak)
4. **Consistent lighting** (professional medical photography style)
5. **Body diversity** (various skin tones, ages, body types)

---

## Implementation Notes

### Reusable from VrikshaYoga
- SearchHero component (change placeholder text)
- ScienceNote component (change gold → teal border)
- Card grid layouts
- Navigation structure
- Footer pattern
- Sanity Studio configuration
- GROQ query patterns

### New Components Needed
- PointLocationPhoto (photo + anatomical labels)
- ProtocolSequence (numbered step list)
- SymptomSearchAutocomplete (search with suggestions)
- RelatedPointsGrid (point cross-references)
- BookingCTA (Calendly embed wrapper)

### Content Creation Workflow
1. Research authoritative sources (TCM textbooks, AYUSH guidelines, clinical studies)
2. Draft point content in Sanity Studio
3. Create/source location photos
4. Generate technique illustrations (photos or GIFs)
5. Write protocol sequences
6. Cross-reference related points
7. Add scientific citations
8. Publish and test search

---

## Launch Strategy

### Pre-Launch (Week 1-2)
- Build MVP (20 points, 5 protocols, science page)
- Create social media profiles
- Design logo and brand assets
- Write launch announcement

### Launch Week (Week 3)
- Deploy to production
- Announce on social media
- Email existing Chandan Accucenter clients
- Submit to wellness directories
- Post on Reddit (r/acupressure, r/wellness)

### Post-Launch (Month 1-3)
- Publish 1 science article per week
- Add 5 new points per week
- Monitor search analytics (what symptoms are users searching?)
- Optimize for top-performing keywords
- Collect user feedback
- Iterate on UX based on behavior

---

## Questions for User

1. **Domain:** Use accucentral.com or different domain?
2. **Chandan Accucenter Branding:** How prominent? Separate "About" page?
3. **Initial Content:** Do you have existing point descriptions to migrate?
4. **Photos:** Will you create custom location photos or use stock/illustrations?
5. **Certification Courses:** Phase 2 priority or later?
6. **Interactive Atlas:** MVP must-have or Phase 2?

---

**Next Step:** Update Tailwind config with blue/green palette and begin homepage hero adaptation.
