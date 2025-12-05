-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('PATIENT', 'PROVIDER', 'ADMIN', 'SUPER_ADMIN');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED', 'BANNED');

-- CreateEnum
CREATE TYPE "PatientStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'COMPLETED', 'CHURNED');

-- CreateEnum
CREATE TYPE "PackageType" AS ENUM ('BASIC', 'STANDARD', 'PREMIUM');

-- CreateEnum
CREATE TYPE "PackageStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'EXPIRED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ProviderStatus" AS ENUM ('PENDING_APPROVAL', 'ACTIVE', 'ON_HOLD', 'SUSPENDED', 'DEACTIVATED');

-- CreateEnum
CREATE TYPE "BadgeLevel" AS ENUM ('LEVEL_1', 'LEVEL_2', 'LEVEL_3', 'ACCUCENTRAL_VERIFIED');

-- CreateEnum
CREATE TYPE "ServiceArea" AS ENUM ('FARIDABAD', 'DELHI', 'GURGAON', 'NOIDA');

-- CreateEnum
CREATE TYPE "ServiceCategory" AS ENUM ('CHRONIC_PAIN', 'MUSCULOSKELETAL', 'SENIOR_CARE');

-- CreateEnum
CREATE TYPE "ServiceStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'FEATURED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'ASSIGNED', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'NO_SHOW');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('PREPAID', 'CASH', 'ONLINE', 'UPI');

-- CreateEnum
CREATE TYPE "PayoutStatus" AS ENUM ('PENDING', 'PROCESSING', 'PAID', 'ON_HOLD', 'FAILED');

-- CreateEnum
CREATE TYPE "AuditAction" AS ENUM ('CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT', 'BOOKING_ASSIGNED', 'PAYMENT_RECEIVED', 'SESSION_COMPLETED', 'PROVIDER_APPROVED', 'PROVIDER_SUSPENDED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patients" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "PatientStatus" NOT NULL DEFAULT 'ACTIVE',
    "initialPainScore" INTEGER NOT NULL,
    "currentPainScore" INTEGER NOT NULL,
    "homeworkVideoUrl" TEXT,
    "homeworkTitle" TEXT,
    "homeworkFrequency" TEXT,
    "lastSessionDate" TIMESTAMP(3),
    "nextSessionDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "patients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pain_scores" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "sessionNumber" INTEGER NOT NULL,
    "painScore" INTEGER NOT NULL,
    "notes" TEXT,
    "providerId" TEXT NOT NULL,
    "bookingId" TEXT,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pain_scores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "packages" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "packageType" "PackageType" NOT NULL,
    "totalSessions" INTEGER NOT NULL,
    "sessionsCompleted" INTEGER NOT NULL DEFAULT 0,
    "sessionsRemaining" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "purchaseDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiryDate" TIMESTAMP(3),
    "status" "PackageStatus" NOT NULL DEFAULT 'ACTIVE',
    "paymentId" TEXT,
    "paymentMethod" TEXT,
    "paymentStatus" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "packages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "providers" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "photo" TEXT,
    "gender" TEXT NOT NULL,
    "languages" TEXT[],
    "badgeLevel" "BadgeLevel" NOT NULL,
    "badgeTitle" TEXT NOT NULL,
    "ayushCertified" BOOLEAN NOT NULL DEFAULT false,
    "certificationBody" TEXT,
    "certificationNumber" TEXT,
    "territory" TEXT NOT NULL,
    "territoryCode" TEXT NOT NULL,
    "serviceArea" "ServiceArea" NOT NULL,
    "serviceRadius" TEXT NOT NULL,
    "totalBookings" INTEGER NOT NULL DEFAULT 0,
    "experienceYears" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "completionRate" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "backgroundCheck" BOOLEAN NOT NULL DEFAULT false,
    "covidVaccinated" BOOLEAN NOT NULL DEFAULT false,
    "ayushRegistered" BOOLEAN NOT NULL DEFAULT false,
    "kycComplete" BOOLEAN NOT NULL DEFAULT false,
    "portableTable" BOOLEAN NOT NULL DEFAULT false,
    "bringsMats" BOOLEAN NOT NULL DEFAULT false,
    "oilFree" BOOLEAN NOT NULL DEFAULT false,
    "availableDays" TEXT[],
    "preferredTimeSlots" TEXT[],
    "specializations" TEXT[],
    "tags" TEXT[],
    "commissionRate" DOUBLE PRECISION NOT NULL DEFAULT 0.75,
    "bankAccountNumber" TEXT,
    "ifscCode" TEXT,
    "panNumber" TEXT,
    "upiId" TEXT,
    "status" "ProviderStatus" NOT NULL DEFAULT 'PENDING_APPROVAL',
    "femaleClientsOnly" BOOLEAN DEFAULT false,
    "joinedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "providers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "provider_applications" (
    "id" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "applicationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "photoUrl" TEXT,
    "certificationFileUrl" TEXT,
    "idProofUrl" TEXT,
    "addressProofUrl" TEXT,
    "covidCertUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "reviewedBy" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "rejectionReason" TEXT,
    "adminNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "provider_applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "category" "ServiceCategory" NOT NULL,
    "targetIssue" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "originalPrice" INTEGER,
    "scope" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "outcomes" TEXT[],
    "idealFor" TEXT[],
    "status" "ServiceStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pressure_points" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "pressure_points_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "provider_services" (
    "id" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "provider_services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookings" (
    "id" TEXT NOT NULL,
    "bookingNumber" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "customerAddress" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "serviceName" TEXT NOT NULL,
    "servicePrice" INTEGER NOT NULL,
    "sessionNumber" INTEGER NOT NULL,
    "requestedDate" TEXT NOT NULL,
    "requestedTime" TEXT NOT NULL,
    "confirmedDate" TEXT,
    "confirmedTime" TEXT,
    "providerId" TEXT,
    "assignedProviderName" TEXT,
    "assignmentStatus" "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "territory" TEXT NOT NULL,
    "serviceArea" "ServiceArea" NOT NULL,
    "packageId" TEXT NOT NULL,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "paymentMethod" "PaymentMethod" NOT NULL DEFAULT 'PREPAID',
    "painScoreBefore" INTEGER,
    "painScoreAfter" INTEGER,
    "sessionNotes" TEXT,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "commissions" (
    "id" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "sessionPrice" INTEGER NOT NULL,
    "commissionRate" DOUBLE PRECISION NOT NULL,
    "commissionAmount" INTEGER NOT NULL,
    "platformFee" INTEGER NOT NULL,
    "tdsAmount" INTEGER NOT NULL,
    "netPayout" INTEGER NOT NULL,
    "payoutStatus" "PayoutStatus" NOT NULL DEFAULT 'PENDING',
    "payoutDate" TIMESTAMP(3),
    "payoutMethod" TEXT,
    "transactionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "commissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "bookingId" TEXT,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admins" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "userRole" "UserRole",
    "action" "AuditAction" NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "changes" JSONB,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_phone_idx" ON "users"("phone");

-- CreateIndex
CREATE INDEX "users_role_status_idx" ON "users"("role", "status");

-- CreateIndex
CREATE UNIQUE INDEX "patients_userId_key" ON "patients"("userId");

-- CreateIndex
CREATE INDEX "patients_userId_idx" ON "patients"("userId");

-- CreateIndex
CREATE INDEX "patients_phone_idx" ON "patients"("phone");

-- CreateIndex
CREATE INDEX "patients_status_idx" ON "patients"("status");

-- CreateIndex
CREATE UNIQUE INDEX "pain_scores_bookingId_key" ON "pain_scores"("bookingId");

-- CreateIndex
CREATE INDEX "pain_scores_patientId_recordedAt_idx" ON "pain_scores"("patientId", "recordedAt");

-- CreateIndex
CREATE INDEX "pain_scores_providerId_idx" ON "pain_scores"("providerId");

-- CreateIndex
CREATE INDEX "packages_patientId_status_idx" ON "packages"("patientId", "status");

-- CreateIndex
CREATE INDEX "packages_status_expiryDate_idx" ON "packages"("status", "expiryDate");

-- CreateIndex
CREATE UNIQUE INDEX "providers_userId_key" ON "providers"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "providers_slug_key" ON "providers"("slug");

-- CreateIndex
CREATE INDEX "providers_userId_idx" ON "providers"("userId");

-- CreateIndex
CREATE INDEX "providers_slug_idx" ON "providers"("slug");

-- CreateIndex
CREATE INDEX "providers_status_idx" ON "providers"("status");

-- CreateIndex
CREATE INDEX "providers_serviceArea_status_idx" ON "providers"("serviceArea", "status");

-- CreateIndex
CREATE UNIQUE INDEX "provider_applications_providerId_key" ON "provider_applications"("providerId");

-- CreateIndex
CREATE INDEX "provider_applications_status_idx" ON "provider_applications"("status");

-- CreateIndex
CREATE UNIQUE INDEX "services_slug_key" ON "services"("slug");

-- CreateIndex
CREATE INDEX "services_slug_idx" ON "services"("slug");

-- CreateIndex
CREATE INDEX "services_status_idx" ON "services"("status");

-- CreateIndex
CREATE INDEX "services_category_status_idx" ON "services"("category", "status");

-- CreateIndex
CREATE INDEX "pressure_points_serviceId_idx" ON "pressure_points"("serviceId");

-- CreateIndex
CREATE INDEX "provider_services_providerId_isActive_idx" ON "provider_services"("providerId", "isActive");

-- CreateIndex
CREATE INDEX "provider_services_serviceId_isActive_idx" ON "provider_services"("serviceId", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "provider_services_providerId_serviceId_key" ON "provider_services"("providerId", "serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "bookings_bookingNumber_key" ON "bookings"("bookingNumber");

-- CreateIndex
CREATE INDEX "bookings_bookingNumber_idx" ON "bookings"("bookingNumber");

-- CreateIndex
CREATE INDEX "bookings_patientId_idx" ON "bookings"("patientId");

-- CreateIndex
CREATE INDEX "bookings_providerId_idx" ON "bookings"("providerId");

-- CreateIndex
CREATE INDEX "bookings_assignmentStatus_idx" ON "bookings"("assignmentStatus");

-- CreateIndex
CREATE INDEX "bookings_serviceArea_assignmentStatus_idx" ON "bookings"("serviceArea", "assignmentStatus");

-- CreateIndex
CREATE INDEX "bookings_requestedDate_idx" ON "bookings"("requestedDate");

-- CreateIndex
CREATE UNIQUE INDEX "commissions_bookingId_key" ON "commissions"("bookingId");

-- CreateIndex
CREATE INDEX "commissions_providerId_payoutStatus_idx" ON "commissions"("providerId", "payoutStatus");

-- CreateIndex
CREATE INDEX "commissions_payoutStatus_idx" ON "commissions"("payoutStatus");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_bookingId_key" ON "reviews"("bookingId");

-- CreateIndex
CREATE INDEX "reviews_providerId_idx" ON "reviews"("providerId");

-- CreateIndex
CREATE INDEX "reviews_patientId_idx" ON "reviews"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "admins_userId_key" ON "admins"("userId");

-- CreateIndex
CREATE INDEX "admins_userId_idx" ON "admins"("userId");

-- CreateIndex
CREATE INDEX "audit_logs_userId_timestamp_idx" ON "audit_logs"("userId", "timestamp");

-- CreateIndex
CREATE INDEX "audit_logs_entity_entityId_idx" ON "audit_logs"("entity", "entityId");

-- CreateIndex
CREATE INDEX "audit_logs_timestamp_idx" ON "audit_logs"("timestamp");

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pain_scores" ADD CONSTRAINT "pain_scores_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pain_scores" ADD CONSTRAINT "pain_scores_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "providers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pain_scores" ADD CONSTRAINT "pain_scores_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "bookings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "packages" ADD CONSTRAINT "packages_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "providers" ADD CONSTRAINT "providers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "provider_applications" ADD CONSTRAINT "provider_applications_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "providers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pressure_points" ADD CONSTRAINT "pressure_points_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "provider_services" ADD CONSTRAINT "provider_services_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "providers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "provider_services" ADD CONSTRAINT "provider_services_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "providers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "packages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commissions" ADD CONSTRAINT "commissions_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "providers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commissions" ADD CONSTRAINT "commissions_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "bookings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "providers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admins" ADD CONSTRAINT "admins_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
