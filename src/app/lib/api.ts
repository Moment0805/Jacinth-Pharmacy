const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

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
  verifyPayment: (reference: string) =>
    apiRequest('/payments/verify', {
      method: 'POST',
      body: JSON.stringify({ reference }),
    }),
};

