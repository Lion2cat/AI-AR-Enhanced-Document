import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useThemeContext } from '../components/ThemeContext';
import i18n, { setLocale } from '../locales/i18n';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LANGUAGE_KEY = 'selectedLanguage';

const SetPage = () => {
  const { toggleTheme, isDarkTheme } = useThemeContext();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.locale);
  const [selectedTheme, setSelectedTheme] = useState(isDarkTheme ? 'dark' : 'light');

  const [languageOpen, setLanguageOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);

  const [languageItems, setLanguageItems] = useState([
    { label: 'English', value: 'en' },
    { label: '中文', value: 'zh' },
    { label: 'Français', value: 'fr' },
  ]);

  const [themeItems, setThemeItems] = useState([
    { label: i18n.t('theme_light'), value: 'light' },
    { label: i18n.t('theme_dark'), value: 'dark' },
  ]);

  const changeLanguage = async (lang) => {
    setLocale(lang);
    setSelectedLanguage(lang);
    await AsyncStorage.setItem(LANGUAGE_KEY, lang);
  };

  const changeTheme = (theme) => {
    if (theme === 'dark' && !isDarkTheme) {
      toggleTheme();
    } else if (theme === 'light' && isDarkTheme) {
      toggleTheme();
    }
    setSelectedTheme(theme);
  };

  useEffect(() => {
    const loadLanguageSetting = async () => {
      const storedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
      if (storedLanguage) {
        setSelectedLanguage(storedLanguage);
      } else {
        const deviceLanguage = getLocales()[0].languageTag;
        const languageCode = deviceLanguage.split('-')[0];
        if (['en', 'zh', 'fr'].includes(languageCode)) {
          setSelectedLanguage(languageCode);
        } else {
          setSelectedLanguage('en');
        }
      }
    };

    loadLanguageSetting();
  }, []);

  useEffect(() => {
    setLanguageItems([
      { label: 'English', value: 'en' },
      { label: '中文', value: 'zh' },
      { label: 'Français', value: 'fr' },
    ]);
    setThemeItems([
      { label: i18n.t('theme_light'), value: 'light' },
      { label: i18n.t('theme_dark'), value: 'dark' },
    ]);
  }, [selectedLanguage]);

  return (
    <View style={[styles.container, isDarkTheme ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.title, isDarkTheme ? styles.darkThemeText : styles.lightThemeText]}>{i18n.t('setting')}</Text>

      <View style={styles.settingContainer}>
        <Text style={isDarkTheme ? styles.darkThemeText : styles.lightThemeText}>{i18n.t('theme')}</Text>
        <View style={styles.dropdownWrapper}>
          <DropDownPicker
            open={themeOpen}
            value={selectedTheme}
            items={themeItems}
            setOpen={setThemeOpen}
            setValue={setSelectedTheme}
            setItems={setThemeItems}
            onChangeValue={(value) => changeTheme(value)}
            placeholder={i18n.t('select_theme')}
            style={isDarkTheme ? styles.darkPicker : styles.lightPicker}
            dropDownContainerStyle={isDarkTheme ? styles.darkDropdownContainer : styles.lightDropdownContainer}
            textStyle={isDarkTheme ? styles.darkPickerText : styles.lightPickerText}
            labelStyle={isDarkTheme ? styles.darkPickerText : styles.lightPickerText}
            theme={isDarkTheme ? 'DARK' : 'LIGHT'}
          />
        </View>
      </View>

      <View style={styles.settingContainer}>
        <Text style={isDarkTheme ? styles.darkThemeText : styles.lightThemeText}>{i18n.t('language')}</Text>
        <View style={styles.dropdownWrapper}>
          <DropDownPicker
            open={languageOpen}
            value={selectedLanguage}
            items={languageItems}
            setOpen={setLanguageOpen}
            setValue={setSelectedLanguage}
            setItems={setLanguageItems}
            onChangeValue={(value) => changeLanguage(value)}
            placeholder={i18n.t('select_language')}
            style={isDarkTheme ? styles.darkPicker : styles.lightPicker}
            dropDownContainerStyle={isDarkTheme ? styles.darkDropdownContainer : styles.lightDropdownContainer}
            textStyle={isDarkTheme ? styles.darkPickerText : styles.lightPickerText}
            labelStyle={isDarkTheme ? styles.darkPickerText : styles.lightPickerText}
            theme={isDarkTheme ? 'DARK' : 'LIGHT'}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontFamily: 'Outfit-Bold',
    fontSize: 36,
    marginBottom: 40,
    textAlign: 'center',
  },
  lightContainer: {
    backgroundColor: '#d0d0c0',
  },
  darkContainer: {
    backgroundColor: '#242c40',
  },
  lightThemeText: {
    color: '#242c40',
    fontSize: 20,
    marginBottom: 10,
  },
  darkThemeText: {
    color: '#d0d0c0',
    fontSize: 20,
    marginBottom: 10,
  },
  settingContainer: {
    alignItems: 'center',
    marginBottom: 40,
    width: '80%',
  },
  dropdownWrapper: {
    width: '100%',
  },
  lightPicker: {
    height: 50,
    borderColor: '#242c40',
    backgroundColor: '#f5f5f5',
  },
  darkPicker: {
    height: 50,
    borderColor: '#d0d0c0',
    backgroundColor: '#3b3b3b',
  },
  lightDropdownContainer: {
    borderColor: '#242c40',
  },
  darkDropdownContainer: {
    borderColor: '#d0d0c0',
  },
  lightPickerText: {
    color: '#242c40',
  },
  darkPickerText: {
    color: '#d0d0c0',
  },
});

export default SetPage;
