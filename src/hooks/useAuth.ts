import { useAuthStore, authSelectors } from '../store';

/**
 * Custom hook for authentication
 * Provides convenient access to auth state and actions
 */
export const useAuth = () => {
  const user = useAuthStore(authSelectors.user);
  const token = useAuthStore(authSelectors.token);
  const isAuthenticated = useAuthStore(authSelectors.isAuthenticated);
  const isLoading = useAuthStore(authSelectors.isLoading);
  const error = useAuthStore(authSelectors.error);

  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const register = useAuthStore((state) => state.register);
  const clearError = useAuthStore((state) => state.clearError);

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    register,
    clearError,
  };
};
