import axiosInstance from './axios.config';
import { ApiResponse, PaginatedResponse } from '../../types/api.types';

// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserRequest {
  name?: string;
  avatar?: string;
}

// User API
export const userAPI = {
  /**
   * Get user by ID
   */
  getById: async (userId: string): Promise<ApiResponse<User>> => {
    const response = await axiosInstance.get<ApiResponse<User>>(`/users/${userId}`);
    return response.data;
  },

  /**
   * Get all users with pagination
   */
  getAll: async (params?: { page?: number; limit?: number }): Promise<ApiResponse<PaginatedResponse<User>>> => {
    const response = await axiosInstance.get<ApiResponse<PaginatedResponse<User>>>('/users', {
      params,
    });
    return response.data;
  },

  /**
   * Update user
   */
  update: async (userId: string, data: UpdateUserRequest): Promise<ApiResponse<User>> => {
    const response = await axiosInstance.put<ApiResponse<User>>(`/users/${userId}`, data);
    return response.data;
  },

  /**
   * Delete user
   */
  delete: async (userId: string): Promise<ApiResponse<null>> => {
    const response = await axiosInstance.delete<ApiResponse<null>>(`/users/${userId}`);
    return response.data;
  },
};
