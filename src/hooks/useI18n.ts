import { useTranslation as useTranslationOriginal } from 'react-i18next';
import { changeLanguage, getCurrentLanguage, LANGUAGES } from '../locales';

/**
 * Custom hook for i18n functionality
 * Wrapper around react-i18next's useTranslation with additional utilities
 */
export const useI18n = () => {
  const { t, i18n } = useTranslationOriginal();

  return {
    t, // Translation function
    currentLanguage: getCurrentLanguage(),
    changeLanguage,
    languages: LANGUAGES,
    isLanguage: (lang: string) => getCurrentLanguage() === lang,
  };
};
