import jwt from 'jsonwebtoken';
import { UserRole } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET || 'accucentral-dev-secret-change-in-production';
const JWT_EXPIRES_IN = '30d'; // 30 days

export interface JWTPayload {
  userId: string;
  phone: string;
  role: UserRole;
}

/**
 * Generate JWT token for authenticated user
 */
export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

/**
 * Verify and decode JWT token
 */
export function verifyToken(token: string): JWTPayload {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}

/**
 * Generate 6-digit OTP
 */
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * OTP expires in 10 minutes
 */
export const OTP_EXPIRY_MINUTES = 10;

/**
 * In-memory OTP storage (dev only - use Redis in production)
 * Structure: { phone: { otp: string, expiresAt: number } }
 */
export const otpStore = new Map<string, { otp: string; expiresAt: number }>();

/**
 * Store OTP for phone number
 */
export function storeOTP(phone: string, otp: string): void {
  const expiresAt = Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000;
  otpStore.set(phone, { otp, expiresAt });
}

/**
 * Verify OTP for phone number
 */
export function verifyOTP(phone: string, otp: string): boolean {
  // DEV MODE: Accept any 6-digit OTP
  if (process.env.NODE_ENV === 'development') {
    if (/^\d{6}$/.test(otp)) {
      console.log(`[DEV MODE] Auto-accepting OTP: ${otp} for ${phone}`);
      return true;
    }
  }

  const stored = otpStore.get(phone);

  if (!stored) {
    return false;
  }

  // Check expiry
  if (Date.now() > stored.expiresAt) {
    otpStore.delete(phone);
    return false;
  }

  // Check OTP match
  if (stored.otp !== otp) {
    return false;
  }

  // Valid OTP - delete after use
  otpStore.delete(phone);
  return true;
}

/**
 * Send OTP via SMS (mock implementation - integrate with SMS provider in production)
 */
export async function sendOTPSMS(phone: string, otp: string): Promise<boolean> {
  // TODO: Integrate with SMS provider (Twilio, MSG91, etc.)
  console.log(`[DEV MODE] OTP for ${phone}: ${otp}`);

  // In production, replace with actual SMS API call:
  // await smsProvider.send({
  //   to: phone,
  //   message: `Your AccuCentral OTP is: ${otp}. Valid for ${OTP_EXPIRY_MINUTES} minutes.`
  // });

  return true;
}
