# VrikshaYoga Gen2 - AI Yoga Content Factory

Production-ready serverless application that uses AI to generate high-quality yoga pose content.

## Architecture

- **Frontend:** Next.js 16 (App Router) + TypeScript + Tailwind CSS
- **CMS:** Sanity Studio (embedded at `/studio`)
- **Infrastructure:** AWS Amplify Gen 2 (Code-first IaC)
- **Auth:** AWS Cognito with Admin Group
- **Error Tracking:** DynamoDB FailedGenerations table
- **AI Backend:** AWS Bedrock (Claude 3 Haiku + Sonnet 3.5 + Titan Image) - Phase 2

## Project Status

### ✅ Phase 1: Foundation (COMPLETE)
- [x] Next.js project scaffolding
- [x] Amplify Gen 2 setup (auth + data)
- [x] Sanity CMS integration
- [x] Embedded Studio at `/studio`
- [x] yogaPose schema defined
- [x] DynamoDB FailedGenerations table
- [x] Cognito with Admins group

### 🔜 Phase 2: AI Agents (Coming Next)
- [ ] AWS Step Functions state machine
- [ ] Python Lambda: Research Agent (Claude 3 Haiku)
- [ ] Python Lambda: Writer Agent (Claude 3.5 Sonnet)
- [ ] Python Lambda: Artist Agent (Titan Image v2)
- [ ] Python Lambda: Draft Builder (Sanity API client)
- [ ] Admin UI trigger page

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- AWS account with credentials configured
- Sanity account (create at https://sanity.io/)

### Steps

1. Install dependencies: `npm install`
2. Configure Sanity: Update `.env.local` with your Project ID and API token
3. Start Amplify: `npx ampx sandbox`
4. Start Next.js: `npm run dev`
5. Access Studio: http://localhost:3000/studio

## Next Steps

See v-yoga.md for Phase 2 implementation plan.
