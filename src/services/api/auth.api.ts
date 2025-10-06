import axiosInstance from './axios.config';
import { ApiResponse } from '../../types/api.types';

// Auth Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

// Auth API
export const authAPI = {
  /**
   * Login user
   */
  login: async (credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    const response = await axiosInstance.post<ApiResponse<LoginResponse>>(
      '/auth/login',
      credentials
    );
    return response.data;
  },

  /**
   * Register new user
   */
  register: async (userData: RegisterRequest): Promise<ApiResponse<LoginResponse>> => {
    const response = await axiosInstance.post<ApiResponse<LoginResponse>>(
      '/auth/register',
      userData
    );
    return response.data;
  },

  /**
   * Logout user
   */
  logout: async (): Promise<ApiResponse<null>> => {
    const response = await axiosInstance.post<ApiResponse<null>>('/auth/logout');
    return response.data;
  },

  /**
   * Get current user profile
   */
  getCurrentUser: async (): Promise<ApiResponse<LoginResponse['user']>> => {
    const response = await axiosInstance.get<ApiResponse<LoginResponse['user']>>('/auth/me');
    return response.data;
  },

  /**
   * Refresh token
   */
  refreshToken: async (): Promise<ApiResponse<{ token: string }>> => {
    const response = await axiosInstance.post<ApiResponse<{ token: string }>>('/auth/refresh');
    return response.data;
  },
};
