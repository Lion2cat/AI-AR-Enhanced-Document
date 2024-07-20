import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useThemeContext } from '../components/ThemeContext';
import i18n, { setLocale } from '../locales/i18n';
import { Picker } from '@react-native-picker/picker';

const SetPage = () => {
  const { toggleTheme, isDarkTheme } = useThemeContext();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.locale);
  const [selectedTheme, setSelectedTheme] = useState(isDarkTheme ? 'dark' : 'light');

  const changeLanguage = (lang) => {
    setLocale(lang);
    setSelectedLanguage(lang);
  };

  const changeTheme = (theme) => {
    if (theme === 'dark' && !isDarkTheme) {
      toggleTheme();
    } else if (theme === 'light' && isDarkTheme) {
      toggleTheme();
    }
    setSelectedTheme(theme);
  };

  return (
    <View style={isDarkTheme ? styles.darkContainer : styles.lightContainer}>
      
      <View style={styles.settingContainer}>
        <Text style={isDarkTheme ? styles.darkThemeText : styles.lightThemeText}>{i18n.t('language')}</Text>
        <Picker
          selectedValue={selectedLanguage}
          style={styles.picker}
          onValueChange={(itemValue) => changeLanguage(itemValue)}
          testID="language-picker"//测试相关
        >
          <Picker.Item label="English" value="en" />
          <Picker.Item label="中文" value="zh" />
          <Picker.Item label="Français" value="fr" />
        </Picker>
      </View>

      <View style={styles.settingContainer}>
        <Text style={isDarkTheme ? styles.darkThemeText : styles.lightThemeText}>{i18n.t('theme')}</Text>
        <Picker
          selectedValue={selectedTheme}
          style={styles.picker}
          onValueChange={(itemValue) => changeTheme(itemValue)}
          testID="theme-picker"//测试相关
        >
          <Picker.Item label={i18n.t('theme_light')} value="light" />
          <Picker.Item label={i18n.t('theme_dark')} value="dark" />
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  lightContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d0d0c0',
    padding: 20,
  },
  darkContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#242c40',
    padding: 20,
  },
  lightThemeText: {
    color: '#242c40',
    fontSize: 20,
    marginRight: 10,
  },
  darkThemeText: {
    color: '#d0d0c0',
    fontSize: 20,
    marginRight: 10,
  },
  picker: {
    height: 50,
    width: 150,
  },
  settingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
});

export default SetPage;
