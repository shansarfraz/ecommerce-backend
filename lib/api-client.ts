/**
 * API Client for Ecommerce API
 * Base URL: https://ecommerce.shansarfraz.com
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ecommerce.shansarfraz.com';

interface RequestOptions extends RequestInit {
  token?: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const { token, ...fetchOptions } = options;

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...fetchOptions,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: 'An error occurred',
      }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request<{
      accessToken: string;
      refreshToken: string;
      user: any;
    }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(email: string, password: string, name: string) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  }

  async getProfile(token: string) {
    return this.request('/auth/me', {
      token,
    });
  }

  // Products endpoints
  async getProducts(token: string, params?: any) {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    return this.request(`/products${query}`, {
      token,
    });
  }

  async getProduct(token: string, id: string) {
    return this.request(`/products/${id}`, {
      token,
    });
  }

  async createProduct(token: string, data: any) {
    return this.request('/vendors/me/products', {
      method: 'POST',
      token,
      body: JSON.stringify(data),
    });
  }

  async updateProduct(token: string, id: string, data: any) {
    return this.request(`/vendors/me/products/${id}`, {
      method: 'PATCH',
      token,
      body: JSON.stringify(data),
    });
  }

  async deleteProduct(token: string, id: string) {
    return this.request(`/vendors/me/products/${id}`, {
      method: 'DELETE',
      token,
    });
  }

  // Orders endpoints
  async getOrders(token: string, params?: any) {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    return this.request(`/orders${query}`, {
      token,
    });
  }

  async getOrder(token: string, id: string) {
    return this.request(`/orders/${id}`, {
      token,
    });
  }

  // Users/Customers endpoints
  async getUsers(token: string, params?: any) {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    return this.request(`/admin/users${query}`, {
      token,
    });
  }

  // Vendors endpoints
  async getVendors(token: string, params?: any) {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    return this.request(`/admin/vendors${query}`, {
      token,
    });
  }

  // Dashboard metrics
  async getDashboardMetrics(token: string) {
    return this.request('/admin/dashboard/metrics', {
      token,
    });
  }

  async getSalesReport(token: string, params?: any) {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    return this.request(`/admin/reports/sales${query}`, {
      token,
    });
  }

  async getProductsReport(token: string, params?: any) {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    return this.request(`/admin/reports/products${query}`, {
      token,
    });
  }

  // Admin Users Management
  async getUser(token: string, id: string) {
    return this.request(`/admin/users/${id}`, {
      token,
    });
  }

  async updateUser(token: string, id: string, data: any) {
    return this.request(`/admin/users/${id}`, {
      method: 'PATCH',
      token,
      body: JSON.stringify(data),
    });
  }

  async deleteUser(token: string, id: string) {
    return this.request(`/admin/users/${id}`, {
      method: 'DELETE',
      token,
    });
  }

  // Admin Vendors Management
  async getVendor(token: string, id: string) {
    return this.request(`/admin/vendors/${id}`, {
      token,
    });
  }

  async updateVendorStatus(token: string, id: string, status: string) {
    return this.request(`/admin/vendors/${id}/status`, {
      method: 'PATCH',
      token,
      body: JSON.stringify({ status }),
    });
  }

  async updateVendorCommission(token: string, id: string, commission: number) {
    return this.request(`/admin/vendors/${id}/commission`, {
      method: 'PATCH',
      token,
      body: JSON.stringify({ commission }),
    });
  }

  // Admin Categories Management
  async getCategories(token?: string) {
    return this.request('/categories', {
      token,
    });
  }

  async getCategory(token: string, id: string) {
    return this.request(`/categories/${id}`, {
      token,
    });
  }

  async createCategory(token: string, data: any) {
    return this.request('/admin/categories', {
      method: 'POST',
      token,
      body: JSON.stringify(data),
    });
  }

  async updateCategory(token: string, id: string, data: any) {
    return this.request(`/admin/categories/${id}`, {
      method: 'PATCH',
      token,
      body: JSON.stringify(data),
    });
  }

  async deleteCategory(token: string, id: string) {
    return this.request(`/admin/categories/${id}`, {
      method: 'DELETE',
      token,
    });
  }

  // Admin Products Management
  async getAdminProducts(token: string, params?: any) {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    return this.request(`/admin/products${query}`, {
      token,
    });
  }

  async updateAdminProduct(token: string, id: string, data: any) {
    return this.request(`/admin/products/${id}`, {
      method: 'PATCH',
      token,
      body: JSON.stringify(data),
    });
  }

  async deleteAdminProduct(token: string, id: string) {
    return this.request(`/admin/products/${id}`, {
      method: 'DELETE',
      token,
    });
  }

  // Admin Orders Management
  async getAdminOrders(token: string, params?: any) {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    return this.request(`/admin/orders${query}`, {
      token,
    });
  }

  async getAdminOrder(token: string, id: string) {
    return this.request(`/admin/orders/${id}`, {
      token,
    });
  }

  async updateAdminOrder(token: string, id: string, data: any) {
    return this.request(`/admin/orders/${id}`, {
      method: 'PATCH',
      token,
      body: JSON.stringify(data),
    });
  }

  // Admin Payouts
  async getPayouts(token: string, params?: any) {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    return this.request(`/admin/payouts${query}`, {
      token,
    });
  }

  // Admin Content Pages
  async getPages(token: string) {
    return this.request('/admin/pages', {
      token,
    });
  }

  async createPage(token: string, data: any) {
    return this.request('/admin/pages', {
      method: 'POST',
      token,
      body: JSON.stringify(data),
    });
  }

  async updatePage(token: string, id: string, data: any) {
    return this.request(`/admin/pages/${id}`, {
      method: 'PATCH',
      token,
      body: JSON.stringify(data),
    });
  }

  async deletePage(token: string, id: string) {
    return this.request(`/admin/pages/${id}`, {
      method: 'DELETE',
      token,
    });
  }

  // Admin Blog Posts
  async getBlogPosts(token: string) {
    return this.request('/blog/posts', {
      token,
    });
  }

  async createBlogPost(token: string, data: any) {
    return this.request('/admin/blog/posts', {
      method: 'POST',
      token,
      body: JSON.stringify(data),
    });
  }

  async updateBlogPost(token: string, id: string, data: any) {
    return this.request(`/admin/blog/posts/${id}`, {
      method: 'PATCH',
      token,
      body: JSON.stringify(data),
    });
  }

  async deleteBlogPost(token: string, id: string) {
    return this.request(`/admin/blog/posts/${id}`, {
      method: 'DELETE',
      token,
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
