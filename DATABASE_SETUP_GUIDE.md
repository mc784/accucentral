# AccuCentral - Database Setup Guide

**Production-Grade Database Setup with Supabase + Prisma**

---

## Prerequisites

- Supabase account (you already have one ✅)
- Node.js 18+ installed
- Git bash or terminal

---

## Step 1: Get Supabase Connection Strings

### 1.1 Go to your Supabase project dashboard
```
https://supabase.com/dashboard
```

### 1.2 Navigate to Project Settings
```
Project Settings → Database → Connection String
```

### 1.3 Copy both connection strings

**Connection pooling (for Prisma migrations & queries):**
```
postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
```

**Direct connection (for migrations only):**
```
postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

### 1.4 Update `.env.local`

Replace the placeholder values:
```env
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
```

---

## Step 2: Validate Prisma Schema

Run Prisma's format and validation:

```bash
npx prisma format
npx prisma validate
```

Expected output:
```
✔ Prisma schema loaded from prisma/schema.prisma
✔ Your Prisma schema is valid!
```

---

## Step 3: Create Initial Migration

This will:
1. Create the database schema in Supabase
2. Generate Prisma Client (TypeScript types)
3. Create a migration history

```bash
npx prisma migrate dev --name init
```

**What happens:**
- Creates `prisma/migrations/` folder
- Applies schema to Supabase database
- Generates `node_modules/@prisma/client`

Expected output:
```
Your database is now in sync with your schema.

✔ Generated Prisma Client (7.1.0) to ./node_modules/@prisma/client
```

---

## Step 4: Verify Database Tables

### Option A: Prisma Studio (Visual DB Browser)
```bash
npx prisma studio
```

Opens at `http://localhost:5555` - you can browse all tables visually.

### Option B: Supabase Dashboard
```
Go to: https://supabase.com/dashboard/project/_/editor
```

You should see 14 tables:
- `users`
- `patients`
- `pain_scores`
- `packages`
- `providers`
- `provider_applications`
- `provider_services`
- `services`
- `pressure_points`
- `bookings`
- `commissions`
- `reviews`
- `admins`
- `audit_logs`

---

## Step 5: Seed Initial Data

Create a seed file to populate with mock data:

```bash
# Create seed file
npx prisma db seed
```

---

## Step 6: Generate Prisma Client

Anytime you change the schema, regenerate the client:

```bash
npx prisma generate
```

This updates TypeScript types for type-safe database queries.

---

## Common Prisma Commands

### Development Workflow

**1. Make schema changes:**
Edit `prisma/schema.prisma`

**2. Create migration:**
```bash
npx prisma migrate dev --name describe_your_change
```

**3. Generate client (types):**
```bash
npx prisma generate
```

**4. Reset database (WARNING: Deletes all data):**
```bash
npx prisma migrate reset
```

---

### Production Deployment

**Deploy migrations to production Supabase:**
```bash
npx prisma migrate deploy
```

---

## Row-Level Security (RLS) Setup

Supabase has built-in Row-Level Security. Here's how to configure it:

### 1. Enable RLS on all tables

Run this SQL in Supabase SQL Editor:

```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE pain_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE pressure_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
```

### 2. Create RLS Policies

**Patients can only see their own data:**
```sql
CREATE POLICY "Patients can view own data"
ON patients FOR SELECT
USING (auth.uid()::text = user_id);

CREATE POLICY "Patients can update own data"
ON patients FOR UPDATE
USING (auth.uid()::text = user_id);
```

**Providers can only see their own data:**
```sql
CREATE POLICY "Providers can view own data"
ON providers FOR SELECT
USING (auth.uid()::text = user_id);

CREATE POLICY "Providers can update own data"
ON providers FOR UPDATE
USING (auth.uid()::text = user_id);
```

**Admins can see everything:**
```sql
CREATE POLICY "Admins can view all data"
ON patients FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()::text
    AND users.role = 'ADMIN'
  )
);

-- Repeat for all tables with role = 'ADMIN' or 'SUPER_ADMIN'
```

**Services are public (read-only):**
```sql
CREATE POLICY "Services are publicly readable"
ON services FOR SELECT
TO PUBLIC
USING (status = 'PUBLISHED' OR status = 'FEATURED');
```

---

## Database Backup Strategy

### Automatic Backups (Supabase)
Supabase automatically backs up your database daily.

### Manual Backup
```bash
# Export entire database
npx prisma db pull
```

Creates `schema.prisma` with current database state.

---

## Performance Optimization

### 1. Indexes (Already in Schema ✅)
All critical queries have indexes:
- User lookups: `users.email`, `users.phone`
- Booking queries: `bookings.patient_id`, `bookings.provider_id`
- Territory filtering: `providers.service_area`

### 2. Connection Pooling (Configured ✅)
Using Supabase's PgBouncer for connection pooling:
```
?pgbouncer=true
```

### 3. Query Optimization

Use Prisma's `select` to fetch only needed fields:

```typescript
// ❌ Bad: Fetches everything
const patient = await prisma.patient.findUnique({
  where: { id: patientId }
})

// ✅ Good: Fetches only needed fields
const patient = await prisma.patient.findUnique({
  where: { id: patientId },
  select: {
    id: true,
    name: true,
    currentPainScore: true
  }
})
```

---

## Monitoring & Debugging

### 1. Enable Query Logging (Development)

Already configured in `lib/prisma.ts`:
```typescript
log: ['query', 'error', 'warn']
```

### 2. Slow Query Detection

Check Supabase dashboard:
```
Reports → Query Performance
```

### 3. Database Metrics

Supabase Dashboard → Database → Usage

Monitor:
- Connection count
- Active queries
- Database size

---

## Troubleshooting

### Error: "Can't reach database server"

**Solution:**
1. Check Supabase project is running
2. Verify connection string in `.env.local`
3. Check firewall/network

```bash
# Test connection
npx prisma db pull
```

---

### Error: "Migration failed"

**Solution:**
1. Check if Supabase dashboard is accessible
2. Verify DIRECT_URL is correct
3. Reset and retry:

```bash
npx prisma migrate reset
npx prisma migrate dev
```

---

### Error: "Type errors after schema change"

**Solution:**
Regenerate Prisma Client:

```bash
npx prisma generate
# Then restart Next.js dev server
npm run dev
```

---

## Next Steps After Database Setup

1. ✅ **Database Schema** - Done
2. ⏳ **Authentication** - Setup NextAuth.js
3. ⏳ **API Routes** - Create CRUD endpoints
4. ⏳ **Seed Data** - Populate with mock data
5. ⏳ **Testing** - Verify all queries work

---

## Quick Reference

### Essential Commands

| Command | Purpose |
|---------|---------|
| `npx prisma studio` | Open visual database browser |
| `npx prisma migrate dev` | Create + apply migration |
| `npx prisma migrate deploy` | Deploy to production |
| `npx prisma generate` | Generate TypeScript types |
| `npx prisma db push` | Quick prototype (skip migrations) |
| `npx prisma db pull` | Introspect existing database |
| `npx prisma migrate reset` | Reset database (⚠️ deletes data) |

---

## Support & Resources

**Prisma Docs:** https://www.prisma.io/docs
**Supabase Docs:** https://supabase.com/docs
**Schema Reference:** `prisma/schema.prisma`

---

**Setup Status:** Ready for database connection ✅
**Last Updated:** December 2024
