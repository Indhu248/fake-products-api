import axios from 'axios';
import { Product, ProductFormData, ProductResponse, SingleProductResponse, CategoryResponse } from '../types/product';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url, config.data);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url, response.data);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.status, error.response?.data, error.message);
    return Promise.reject(error);
  }
);

// Products API
export const productsAPI = {
  // Get all products with pagination and filtering
  getAll: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    min_price?: number;
    max_price?: number;
    is_active?: boolean;
  }): Promise<ProductResponse> => {
    const response = await api.get('/products', { params });
    return response.data;
  },

  // Get single product by ID or SKU
  getById: async (id: string): Promise<SingleProductResponse> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // Create a new product
  create: async (productData: Omit<Product, '_id' | 'created_at' | 'updated_at'>): Promise<SingleProductResponse> => {
    console.log('API: Creating product with data:', productData);
    const response = await api.post('/products', productData);
    console.log('API: Product creation response:', response);
    return response.data;
  },

  // Update product
  update: async (id: string, product: Partial<ProductFormData>): Promise<SingleProductResponse> => {
    const response = await api.put(`/products/${id}`, product);
    return response.data;
  },

  // Delete product
  delete: async (id: string): Promise<{ status: string; message: string }> => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },

  // Bulk create products
  bulkCreate: async (products: ProductFormData[]): Promise<{ status: string; data: { count: number; products: Product[] } }> => {
    const response = await api.post('/products/bulk', { products });
    return response.data;
  },
};

// Categories API
export const categoriesAPI = {
  // Get all categories
  getAll: async (): Promise<CategoryResponse> => {
    console.log('Fetching categories from API...');
    const response = await api.get('/categories');
    console.log('Categories API response:', response);
    console.log('Categories API response data:', response.data);
    return response.data;
  },
};

// Health check
export const healthCheck = async () => {
  const response = await api.get('/health');
  return response.data;
};

export default api;
