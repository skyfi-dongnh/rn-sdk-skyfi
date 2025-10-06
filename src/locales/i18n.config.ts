import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './en.json';
import vi from './vi.json';

// Language detector plugin
const languageDetector = {
  type: 'languageDetector' as const,
  async: true,
  detect: async (callback: (lang: string) => void) => {
    try {
      // Get saved language from AsyncStorage
      const savedLanguage = await AsyncStorage.getItem('user_language');
      if (savedLanguage) {
        callback(savedLanguage);
      } else {
        // Default to English if no language is saved
        callback('en');
      }
    } catch (error) {
      console.error('Error detecting language:', error);
      callback('en');
    }
  },
  init: () => {},
  cacheUserLanguage: async (language: string) => {
    try {
      await AsyncStorage.setItem('user_language', language);
    } catch (error) {
      console.error('Error caching language:', error);
    }
  },
};

// Initialize i18next
i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3', // For React Native compatibility
    fallbackLng: 'en',
    debug: __DEV__, // Enable debug in development
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    resources: {
      en: {
        translation: en,
      },
      vi: {
        translation: vi,
      },
    },
    react: {
      useSuspense: false, // Disable suspense for React Native
    },
  });

export default i18n;
