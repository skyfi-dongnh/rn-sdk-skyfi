import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// API Configuration
const API_CONFIG = {
  baseURL: 'https://bss-api.skyfi.pro/api', // Replace with your API base URL
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
};

// Create axios instance
const axiosInstance: AxiosInstance = axios.create(API_CONFIG);

// Request Interceptor
axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      // Get token from AsyncStorage
      const token = await AsyncStorage.getItem('auth_token');

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Log request in development
      if (__DEV__) {
        console.log('API Request:', {
          url: `${config.baseURL}${config.url}`,
          method: config.method,
          data: config.data,
        });
      }

      return config;
    } catch (error) {
      console.error('Request interceptor error:', error);
      return config;
    }
  },
  (error: AxiosError) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response in development
    if (__DEV__) {
      console.log('API Response:', {
        url: response.config.url,
        status: response.status,
        data: response.data,
      });
    }

    return response;
  },
  async (error: AxiosError) => {
    // Handle common errors
    if (error.response) {
      const { status } = error.response;

      switch (status) {
        case 401:
          // Unauthorized - Clear token and redirect to login
          await AsyncStorage.removeItem('auth_token');
          // You can dispatch a logout action or navigate to login screen here
          console.error('Unauthorized - Token expired or invalid');
          break;

        case 403:
          console.error('Forbidden - Access denied');
          break;

        case 404:
          console.error('Not found');
          break;

        case 500:
          console.error('Internal server error');
          break;

        default:
          console.error(`API Error ${status}:`, error.response.data);
      }
    } else if (error.request) {
      // Network error
      console.error('Network Error:', error.message);
    } else {
      console.error('Error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
