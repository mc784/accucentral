# Accucentral - The Google Maps of Your Body

Modern acupressure knowledge platform for instant pain relief through searchable pressure points and interactive body mapping.

## Architecture

- **Frontend:** Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
- **CMS:** Sanity Studio (embedded at `/studio`)
- **Deployment:** Vercel
- **Search:** Symptom-based point discovery
- **Interactive Atlas:** Body mapping visualization (Phase 2)

## Core Features

### Current (MVP)
- Symptom search engine ("Where does it hurt?")
- Pressure point library with high-res location photos
- Daily protocols (Tech-Neck Release, Insomnia Switch, Anxiety Reset, etc.)
- Meridian science education
- Appointment booking integration

### Coming Soon
- Interactive 2D/3D body atlas
- Practitioner directory
- Certification courses
- E-commerce (acupressure tools)

## Project Foundation

Built on proven VrikshaYoga architecture:
- Same tech stack (Next.js + Sanity + Tailwind)
- Adapted content model (poses → pressure points)
- Enhanced with acupressure-specific features

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- Sanity account (create at https://sanity.io/)
- Vercel account for deployment

### Steps

1. Install dependencies: `npm install`
2. Configure Sanity: Update `.env.local` with your Project ID and API token
3. Start Next.js: `npm run dev`
4. Access Studio: http://localhost:3000/studio

## Vision

**"The Google Maps of the Body"** - Making ancient acupressure knowledge instantly accessible through modern search and visualization technology.
