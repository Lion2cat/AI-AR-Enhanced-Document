import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';
import en from './en.json';
import zh from './zh.json';
import fr from './fr.json';

const translations = {
  'en': en,
  'zh': zh,
  'fr': fr
};

const i18n = new I18n(translations);

i18n.locale = getLocales()[0].languageTag ?? 'en';
i18n.enableFallback = true;

const listeners = new Set();

export const setLocale = (locale) => {
    i18n.locale = locale;
    listeners.forEach(listener => listener(locale));
};

export const addLocaleChangeListener = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
};

export const getCurrentLocale = () => i18n.locale;

export default i18n;
