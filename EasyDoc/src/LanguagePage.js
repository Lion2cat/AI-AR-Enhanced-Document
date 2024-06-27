// LanguagePage.js
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import i18n, { setLocale } from '../locales/i18n';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'zh', label: '中文' },
  { code: 'fr', label: 'Français'}
  // Add more languages here if needed
];

export default function LanguagePage({ navigation }) {
  const changeLanguage = (code) => {
    setLocale(code);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t('select_language')}</Text>
      {languages.map((lang) => (
        <TouchableOpacity key={lang.code} style={styles.button} onPress={() => changeLanguage(lang.code)}>
          <Text style={styles.buttonText}>{lang.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
