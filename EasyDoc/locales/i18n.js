import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from './en.json';
import zh from './zh.json';
import fr from './fr.json';

const translations = {
  'en': en,
  'zh': zh,
  'fr': fr
};

const i18n = new I18n(translations);

const LANGUAGE_KEY = 'selectedLanguage';

const loadLocale = async () => {
  const storedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
  if (storedLanguage) {
    i18n.locale = storedLanguage;
  } else {
    i18n.locale = getLocales()[0].languageTag ?? 'en';
  }
};

loadLocale();

i18n.enableFallback = true;

const listeners = new Set();

export const setLocale = async (locale) => {
  i18n.locale = locale;
  await AsyncStorage.setItem(LANGUAGE_KEY, locale);
  listeners.forEach(listener => listener(locale));
};

export const addLocaleChangeListener = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const getCurrentLocale = () => i18n.locale;

export default i18n;
