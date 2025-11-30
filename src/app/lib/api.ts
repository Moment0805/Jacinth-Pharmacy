const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface ApiError {
  message: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}

export async function apiRequest(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });
}

export async function handleApiResponse<T = any>(response: Response): Promise<T> {
  const data = await response.json();

  if (!response.ok) {
    const error: ApiError = {
      message: data.message || 'An error occurred',
      statusCode: response.status,
      errors: data.errors,
    };
    throw error;
  }

  return data;
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'object' && error !== null && 'message' in error) {
    return String((error as ApiError).message);
  }
  return 'An unexpected error occurred';
}

export function setAuthToken(token: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
}

export function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
}

export function removeAuthToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
}

export function isAuthenticated(): boolean {
  return getAuthToken() !== null;
}

export const api = {
  // Products
  getProducts: (params?: Record<string, string>) => {
    const queryString = params ? new URLSearchParams(params).toString() : '';
    return apiRequest(`/products${queryString ? `?${queryString}` : ''}`);
  },
  getProduct: (slug: string) => apiRequest(`/products/${slug}`),

  // Categories
  getCategories: () => apiRequest('/categories'),
  getCategory: (slug: string) => apiRequest(`/categories/${slug}`),

  // Cart
  getCart: () => apiRequest('/cart'),
  addToCart: (productId: string, quantity: number) =>
    apiRequest('/cart/items', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    }),
  updateCartItem: (itemId: string, quantity: number) =>
    apiRequest(`/cart/items/${itemId}`, {
      method: 'PATCH',
      body: JSON.stringify({ quantity }),
    }),
  removeCartItem: (itemId: string) =>
    apiRequest(`/cart/items/${itemId}`, {
      method: 'DELETE',
    }),
  clearCart: () =>
    apiRequest('/cart', {
      method: 'DELETE',
    }),

  // Orders
  createOrder: (data: Record<string, unknown>) =>
    apiRequest('/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  getOrders: () => apiRequest('/orders'),
  getOrder: (id: string) => apiRequest(`/orders/${id}`),

  // Payments
  initializePayment: (data: Record<string, unknown>) =>
    apiRequest('/payments/initialize', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  verifyPayment: (data: { reference: string; provider?: string }) =>
    apiRequest('/payments/verify', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  getUserTransactions: (page?: number, limit?: number) => {
    const params = new URLSearchParams();
    if (page) params.append('page', page.toString());
    if (limit) params.append('limit', limit.toString());
    return apiRequest(`/payments/transactions${params.toString() ? `?${params.toString()}` : ''}`);
  },

  // Auth
  signup: (data: { fullName: string; email: string }) =>
    apiRequest('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  verifyOtp: (data: { email: string; code: string }) =>
    apiRequest('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  setupAccount: (email: string, data: {
    firstName: string;
    lastName?: string;
    phoneNumber?: string;
    countryCode?: string;
    password: string;
  }) =>
    apiRequest('/auth/setup-account', {
      method: 'POST',
      body: JSON.stringify({ email, ...data }),
    }),
  login: (data: { email: string; password: string }) =>
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  resetPassword: (data: { email: string }) =>
    apiRequest('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  resetPasswordConfirm: (data: { email: string; code: string; newPassword: string }) =>
    apiRequest('/auth/reset-password-confirm', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  sendPhoneOtp: (data: { phoneNumber: string }) =>
    apiRequest('/auth/send-phone-otp', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  verifyPhoneOtp: (data: { phoneNumber: string; code: string }) =>
    apiRequest('/auth/verify-phone-otp', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Products
  getProductBySlug: (slug: string) => apiRequest(`/products/slug/${slug}`),

  // Users
  getUserProfile: () => apiRequest('/users/me'),
};

