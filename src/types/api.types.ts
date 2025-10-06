// Base API Response
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
}

// API Error Response
export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
  code?: string;
}

// Pagination
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Common API types
export interface ApiRequestConfig {
  params?: Record<string, any>;
  headers?: Record<string, string>;
}
