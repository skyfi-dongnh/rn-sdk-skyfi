import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { changeLanguage } from '../../locales';

// App State Types
interface AppState {
  language: string;
  theme: 'light' | 'dark';
  isOnboarded: boolean;
  notifications: {
    enabled: boolean;
    sound: boolean;
    vibration: boolean;
  };
  isLoading: boolean;
}

// App Actions
interface AppActions {
  setLanguage: (language: string) => Promise<void>;
  setTheme: (theme: 'light' | 'dark') => Promise<void>;
  setOnboarded: (value: boolean) => Promise<void>;
  toggleNotifications: (enabled: boolean) => Promise<void>;
  toggleNotificationSound: (enabled: boolean) => Promise<void>;
  toggleNotificationVibration: (enabled: boolean) => Promise<void>;
  loadAppSettings: () => Promise<void>;
  resetAppSettings: () => Promise<void>;
}

// Combined App Store Type
export type AppStore = AppState & AppActions;

// Initial State
const initialState: AppState = {
  language: 'en',
  theme: 'light',
  isOnboarded: false,
  notifications: {
    enabled: true,
    sound: true,
    vibration: true,
  },
  isLoading: false,
};

// Storage Keys
const STORAGE_KEYS = {
  LANGUAGE: 'app_language',
  THEME: 'app_theme',
  ONBOARDED: 'app_onboarded',
  NOTIFICATIONS: 'app_notifications',
};

// Create App Store
export const useAppStore = create<AppStore>((set, get) => ({
  ...initialState,

  /**
   * Set app language
   */
  setLanguage: async (language: string) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.LANGUAGE, language);
      changeLanguage(language); // Update i18n
      set({ language });
    } catch (error) {
      console.error('Error saving language:', error);
    }
  },

  /**
   * Set app theme
   */
  setTheme: async (theme: 'light' | 'dark') => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.THEME, theme);
      set({ theme });
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  },

  /**
   * Mark onboarding as completed
   */
  setOnboarded: async (value: boolean) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.ONBOARDED, JSON.stringify(value));
      set({ isOnboarded: value });
    } catch (error) {
      console.error('Error saving onboarded status:', error);
    }
  },

  /**
   * Toggle notifications on/off
   */
  toggleNotifications: async (enabled: boolean) => {
    try {
      const notifications = { ...get().notifications, enabled };
      await AsyncStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
      set({ notifications });
    } catch (error) {
      console.error('Error toggling notifications:', error);
    }
  },

  /**
   * Toggle notification sound
   */
  toggleNotificationSound: async (enabled: boolean) => {
    try {
      const notifications = { ...get().notifications, sound: enabled };
      await AsyncStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
      set({ notifications });
    } catch (error) {
      console.error('Error toggling notification sound:', error);
    }
  },

  /**
   * Toggle notification vibration
   */
  toggleNotificationVibration: async (enabled: boolean) => {
    try {
      const notifications = { ...get().notifications, vibration: enabled };
      await AsyncStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
      set({ notifications });
    } catch (error) {
      console.error('Error toggling notification vibration:', error);
    }
  },

  /**
   * Load app settings from storage on app start
   */
  loadAppSettings: async () => {
    set({ isLoading: true });
    try {
      const [language, theme, onboarded, notifications] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.LANGUAGE),
        AsyncStorage.getItem(STORAGE_KEYS.THEME),
        AsyncStorage.getItem(STORAGE_KEYS.ONBOARDED),
        AsyncStorage.getItem(STORAGE_KEYS.NOTIFICATIONS),
      ]);

      const settings: Partial<AppState> = {};

      if (language) {
        settings.language = language;
        changeLanguage(language); // Sync with i18n
      }

      if (theme) {
        settings.theme = theme as 'light' | 'dark';
      }

      if (onboarded) {
        settings.isOnboarded = JSON.parse(onboarded);
      }

      if (notifications) {
        settings.notifications = JSON.parse(notifications);
      }

      set({ ...settings, isLoading: false });
    } catch (error) {
      console.error('Error loading app settings:', error);
      set({ isLoading: false });
    }
  },

  /**
   * Reset app settings to defaults
   */
  resetAppSettings: async () => {
    try {
      await Promise.all([
        AsyncStorage.removeItem(STORAGE_KEYS.LANGUAGE),
        AsyncStorage.removeItem(STORAGE_KEYS.THEME),
        AsyncStorage.removeItem(STORAGE_KEYS.ONBOARDED),
        AsyncStorage.removeItem(STORAGE_KEYS.NOTIFICATIONS),
      ]);

      set({ ...initialState });
    } catch (error) {
      console.error('Error resetting app settings:', error);
    }
  },
}));

// Selectors
export const appSelectors = {
  language: (state: AppStore) => state.language,
  theme: (state: AppStore) => state.theme,
  isOnboarded: (state: AppStore) => state.isOnboarded,
  notifications: (state: AppStore) => state.notifications,
  isLoading: (state: AppStore) => state.isLoading,
};
