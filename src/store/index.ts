// Re-export all stores and types
export * from './slices';

// Optional: Export combined store initialization hook
import { useEffect } from 'react';
import { useAuthStore } from './slices/authSlice';
import { useAppStore } from './slices/appSlice';

/**
 * Initialize all stores
 * Call this hook in your App component or root provider
 */
export const useInitializeStores = () => {
  const loadStoredAuth = useAuthStore((state) => state.loadStoredAuth);
  const loadAppSettings = useAppStore((state) => state.loadAppSettings);

  useEffect(() => {
    // Load stored data on app start
    loadStoredAuth();
    loadAppSettings();
  }, [loadStoredAuth, loadAppSettings]);
};
