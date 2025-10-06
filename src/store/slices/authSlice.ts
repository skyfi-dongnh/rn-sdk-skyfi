import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authAPI, LoginRequest, RegisterRequest } from '../../services/api';

// Auth State Types
interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Auth Actions
interface AuthActions {
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  loadStoredAuth: () => Promise<void>;
  clearError: () => void;
}

// Combined Auth Store Type
export type AuthStore = AuthState & AuthActions;

// Initial State
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Create Auth Store
export const useAuthStore = create<AuthStore>((set, get) => ({
  ...initialState,

  /**
   * Login user
   */
  login: async (credentials: LoginRequest) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authAPI.login(credentials);

      if (response.success && response.data) {
        const { token, user } = response.data;

        // Save token to AsyncStorage
        await AsyncStorage.setItem('auth_token', token);
        await AsyncStorage.setItem('user_data', JSON.stringify(user));

        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      }
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || 'Login failed',
      });
      throw error;
    }
  },

  /**
   * Register new user
   */
  register: async (userData: RegisterRequest) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authAPI.register(userData);

      if (response.success && response.data) {
        const { token, user } = response.data;

        // Save token to AsyncStorage
        await AsyncStorage.setItem('auth_token', token);
        await AsyncStorage.setItem('user_data', JSON.stringify(user));

        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      }
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || 'Registration failed',
      });
      throw error;
    }
  },

  /**
   * Logout user
   */
  logout: async () => {
    set({ isLoading: true });
    try {
      // Call logout API (optional)
      await authAPI.logout();
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      // Clear storage
      await AsyncStorage.removeItem('auth_token');
      await AsyncStorage.removeItem('user_data');

      // Reset state
      set({
        ...initialState,
      });
    }
  },

  /**
   * Set user data
   */
  setUser: (user: User | null) => {
    set({ user, isAuthenticated: !!user });
  },

  /**
   * Set authentication token
   */
  setToken: (token: string | null) => {
    set({ token, isAuthenticated: !!token });
  },

  /**
   * Load stored authentication data on app start
   */
  loadStoredAuth: async () => {
    set({ isLoading: true });
    try {
      const token = await AsyncStorage.getItem('auth_token');
      const userDataStr = await AsyncStorage.getItem('user_data');

      if (token && userDataStr) {
        const user = JSON.parse(userDataStr);
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.error('Error loading stored auth:', error);
      set({ isLoading: false });
    }
  },

  /**
   * Clear error state
   */
  clearError: () => {
    set({ error: null });
  },
}));

// Selectors (for better performance and cleaner code)
export const authSelectors = {
  user: (state: AuthStore) => state.user,
  token: (state: AuthStore) => state.token,
  isAuthenticated: (state: AuthStore) => state.isAuthenticated,
  isLoading: (state: AuthStore) => state.isLoading,
  error: (state: AuthStore) => state.error,
};
