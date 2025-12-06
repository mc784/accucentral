export interface AuthToken {
  providerId: string;
  token: string;
  expiresAt: number;
}

export interface ProviderAuth {
  providerId: string;
  phone: string;
  name: string;
  token: string;
}

const TOKEN_KEY = 'provider_auth_token';
const EXPIRES_IN = 7 * 24 * 60 * 60 * 1000; // 7 days

export const generateJWT = (providerId: string): string => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(
    JSON.stringify({
      providerId,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + EXPIRES_IN / 1000,
    })
  );
  const signature = btoa(`${header}.${payload}.secret`);
  return `${header}.${payload}.${signature}`;
};

export const saveAuthToken = (auth: ProviderAuth) => {
  if (typeof window === 'undefined') return;
  const tokenData: AuthToken = {
    providerId: auth.providerId,
    token: auth.token,
    expiresAt: Date.now() + EXPIRES_IN,
  };
  localStorage.setItem(TOKEN_KEY, JSON.stringify(tokenData));
  localStorage.setItem('provider_phone', auth.phone);
  localStorage.setItem('provider_name', auth.name);
};

export const getAuthToken = (): AuthToken | null => {
  if (typeof window === 'undefined') return null;
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return null;

  try {
    const auth = JSON.parse(token);
    if (auth.expiresAt < Date.now()) {
      clearAuthToken();
      return null;
    }
    return auth;
  } catch {
    return null;
  }
};

export const clearAuthToken = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem('provider_phone');
  localStorage.removeItem('provider_name');
};

export const isAuthenticated = (): boolean => {
  return getAuthToken() !== null;
};

export const getProviderPhone = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('provider_phone');
};

export const getProviderName = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('provider_name');
};

export const getProviderId = (): string | null => {
  const auth = getAuthToken();
  return auth?.providerId || null;
};
