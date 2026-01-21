import axios from 'axios';

/**
 * API Service Layer
 * Handles all communication with backend API
 * Base URL is configured via environment variable
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Create axios instance with base configuration
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor for logging in development
api.interceptors.request.use(
    (config) => {
        if (import.meta.env.DEV) {
            console.log(`API Request: ${config.method.toUpperCase()} ${config.url}`);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor for error handling
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const message = error.response?.data?.error || error.message || 'An error occurred';
        console.error('API Error:', message);
        return Promise.reject(new Error(message));
    }
);

/**
 * Product API
 */
export const productAPI = {
    // Get all products
    getAll: () => api.get('/products'),

    // Get single product
    getById: (id) => api.get(`/products/${id}`),
};

/**
 * Cart API
 */
export const cartAPI = {
    // Get cart
    get: (sessionId) => api.get(`/cart/${sessionId}`),

    // Add item to cart
    addItem: (sessionId, productId, quantity = 1) =>
        api.post(`/cart/${sessionId}/items`, { productId, quantity }),

    // Update item quantity
    updateItem: (sessionId, productId, quantity) =>
        api.put(`/cart/${sessionId}/items/${productId}`, { quantity }),

    // Remove item from cart
    removeItem: (sessionId, productId) =>
        api.delete(`/cart/${sessionId}/items/${productId}`),

    // Clear cart
    clear: (sessionId) => api.delete(`/cart/${sessionId}`),
};

/**
 * Order API
 */
export const orderAPI = {
    // Create order
    create: (sessionId, customer) =>
        api.post('/orders', { sessionId, customer }),

    // Get order history
    getHistory: (sessionId) =>
        api.get(`/orders/history/${sessionId}`),

    // Get single order
    getById: (orderId) =>
        api.get(`/orders/${orderId}`),
};

export default api;
