import i18n from './i18n.config';

export { i18n };
export { useTranslation } from 'react-i18next';

// Export language change helper
export const changeLanguage = (language: string) => {
  i18n.changeLanguage(language);
};

// Export current language getter
export const getCurrentLanguage = () => {
  return i18n.language;
};

// Export available languages
export const LANGUAGES = {
  EN: 'en',
  VI: 'vi',
} as const;
