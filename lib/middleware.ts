import { NextResponse } from 'next/server';
import { verifyToken, type JWTPayload } from './auth-server';
import { UserRole } from '@prisma/client';

/**
 * Extract JWT token from Authorization header
 */
export function extractToken(request: Request): string | null {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7);
}

/**
 * Authenticate request and return user payload
 */
export function authenticate(request: Request): JWTPayload | null {
  const token = extractToken(request);
  if (!token) {
    return null;
  }

  try {
    return verifyToken(token);
  } catch (error) {
    return null;
  }
}

/**
 * Middleware wrapper to protect routes
 * Returns user payload if authenticated, otherwise returns 401 response
 */
export function withAuth<T = any>(
  handler: (request: Request, user: JWTPayload, ...args: any[]) => Promise<NextResponse<any>>
) {
  return async (request: Request, ...args: any[]): Promise<NextResponse<any>> => {
    const user = authenticate(request);

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized. Please login.' },
        { status: 401 }
      );
    }

    return handler(request, user, ...args);
  };
}

/**
 * Middleware wrapper to protect routes with role-based access control
 */
export function withRole<T = any>(
  roles: UserRole[],
  handler: (request: Request, user: JWTPayload, ...args: any[]) => Promise<NextResponse<any>>
) {
  return async (request: Request, ...args: any[]): Promise<NextResponse<any>> => {
    const user = authenticate(request);

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized. Please login.' },
        { status: 401 }
      );
    }

    if (!roles.includes(user.role)) {
      return NextResponse.json(
        { error: 'Forbidden. Insufficient permissions.' },
        { status: 403 }
      );
    }

    return handler(request, user, ...args);
  };
}

/**
 * Helper to create protected API routes
 * Usage:
 *
 * export const GET = withAuth(async (request, user) => {
 *   // user is authenticated
 *   return NextResponse.json({ data: 'protected' });
 * });
 */
