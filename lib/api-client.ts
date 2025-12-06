// API Client for Accucentral Backend
// Replace BASE_URL with your actual backend URL once Stream A is deployed

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

interface ApiError {
  error: string;
  message?: string;
}

// Helper function to get auth token
function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
}

// Helper function for API calls
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (options.headers && typeof options.headers === 'object') {
    Object.assign(headers, options.headers);
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error: ApiError = await response.json();
    throw new Error(error.message || error.error || 'API request failed');
  }

  return response.json();
}

// Auth APIs
export const authApi = {
  sendOTP: async (phone: string) => {
    return apiCall<{ success: boolean; message: string }>('/auth/send-otp', {
      method: 'POST',
      body: JSON.stringify({ phone }),
    });
  },

  verifyOTP: async (phone: string, otp: string) => {
    return apiCall<{ token: string; patientId: string }>('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ phone, otp }),
    });
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('patient_id');
    }
  },
};

// Patient APIs
export const patientApi = {
  getProfile: async (patientId: string) => {
    return apiCall<any>(`/patients/${patientId}`);
  },

  updateProfile: async (patientId: string, data: any) => {
    return apiCall<any>(`/patients/${patientId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  getSessions: async (patientId: string) => {
    return apiCall<any[]>(`/patients/${patientId}/sessions`);
  },

  getProgress: async (patientId: string) => {
    return apiCall<any>(`/patients/${patientId}/progress`);
  },
};

// Booking APIs
export const bookingApi = {
  getBooking: async (bookingId: string) => {
    return apiCall<any>(`/bookings/${bookingId}`);
  },

  createBooking: async (data: {
    patientId: string;
    providerId: string;
    serviceId: string;
    date: string;
    time: string;
  }) => {
    return apiCall<{ bookingId: string }>('/bookings', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  cancelBooking: async (bookingId: string) => {
    return apiCall<{ success: boolean }>(`/bookings/${bookingId}/cancel`, {
      method: 'POST',
    });
  },

  getPatientBookings: async (patientId: string) => {
    return apiCall<any[]>(`/patients/${patientId}/bookings`);
  },
};

// Service APIs
export const serviceApi = {
  getServices: async () => {
    return apiCall<any[]>('/services');
  },

  getService: async (serviceId: string) => {
    return apiCall<any>(`/services/${serviceId}`);
  },
};

// Provider APIs
export const providerApi = {
  getProviders: async () => {
    return apiCall<any[]>('/providers');
  },

  getProvider: async (providerId: string) => {
    return apiCall<any>(`/providers/${providerId}`);
  },

  getAvailability: async (providerId: string, date: string) => {
    return apiCall<any>(`/providers/${providerId}/availability?date=${date}`);
  },
};

// Payment APIs
export const paymentApi = {
  createOrder: async (bookingId: string, amount: number) => {
    return apiCall<{ orderId: string; amount: number; currency: string }>(
      '/payment/create-order',
      {
        method: 'POST',
        body: JSON.stringify({ bookingId, amount }),
      }
    );
  },

  verifyPayment: async (data: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
    bookingId: string;
  }) => {
    return apiCall<{ success: boolean; paymentId: string }>(
      '/payment/verify',
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    );
  },

  getPaymentHistory: async (patientId: string) => {
    return apiCall<any[]>(`/patients/${patientId}/payments`);
  },
};

// Session APIs
export const sessionApi = {
  logPainScore: async (sessionId: string, data: {
    painBefore: number;
    painAfter: number;
    notes?: string;
  }) => {
    return apiCall<{ success: boolean }>(`/sessions/${sessionId}/pain-score`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  completeSession: async (sessionId: string) => {
    return apiCall<{ success: boolean }>(`/sessions/${sessionId}/complete`, {
      method: 'POST',
    });
  },
};

export default {
  auth: authApi,
  patient: patientApi,
  booking: bookingApi,
  service: serviceApi,
  provider: providerApi,
  payment: paymentApi,
  session: sessionApi,
};
