import { useAppStore, appSelectors } from '../store';

/**
 * Custom hook for app settings
 * Provides convenient access to app settings state and actions
 */
export const useAppSettings = () => {
  const language = useAppStore(appSelectors.language);
  const theme = useAppStore(appSelectors.theme);
  const isOnboarded = useAppStore(appSelectors.isOnboarded);
  const notifications = useAppStore(appSelectors.notifications);
  const isLoading = useAppStore(appSelectors.isLoading);

  const setLanguage = useAppStore((state) => state.setLanguage);
  const setTheme = useAppStore((state) => state.setTheme);
  const setOnboarded = useAppStore((state) => state.setOnboarded);
  const toggleNotifications = useAppStore((state) => state.toggleNotifications);
  const toggleNotificationSound = useAppStore((state) => state.toggleNotificationSound);
  const toggleNotificationVibration = useAppStore((state) => state.toggleNotificationVibration);
  const resetAppSettings = useAppStore((state) => state.resetAppSettings);

  return {
    language,
    theme,
    isOnboarded,
    notifications,
    isLoading,
    setLanguage,
    setTheme,
    setOnboarded,
    toggleNotifications,
    toggleNotificationSound,
    toggleNotificationVibration,
    resetAppSettings,
  };
};
