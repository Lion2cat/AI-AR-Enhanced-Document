import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, ScrollView, TouchableOpacity } from 'react-native';
import { useThemeContext } from '../components/ThemeContext';
import i18n, { setLocale } from '../locales/i18n';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LANGUAGE_KEY = 'selectedLanguage';
const PRIVACY_KEY = 'privacyAgreement';

const SetPage = () => {
  const { toggleTheme, isDarkTheme } = useThemeContext();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.locale);
  const [selectedTheme, setSelectedTheme] = useState(isDarkTheme ? 'dark' : 'light');
  const [privacyAgreement, setPrivacyAgreement] = useState(false);
  const [privacyModalVisible, setPrivacyModalVisible] = useState(false);

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

    AsyncStorage.setItem('selectedTheme', theme);
  };

  const changePrivacyAgreement = async (agreement) => {
    setPrivacyAgreement(agreement);
    await AsyncStorage.setItem(PRIVACY_KEY, agreement);
    setPrivacyModalVisible(false);
  };

  useEffect(() => {
    const loadSettings = async () => {
      const storedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
      if (storedLanguage) {
        setSelectedLanguage(storedLanguage);
      }

      const storedPrivacyAgreement = await AsyncStorage.getItem(PRIVACY_KEY);
      if (storedPrivacyAgreement) {
        setPrivacyAgreement(storedPrivacyAgreement);
      }
    };

    loadSettings();
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
            testID="themePicker"
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
            dropDownDirection="DOWN"
          />
        </View>
      </View>

      <View style={styles.settingContainer}>
        <Text style={isDarkTheme ? styles.darkThemeText : styles.lightThemeText}>{i18n.t('language')}</Text>
        <View style={styles.dropdownWrapper}>
          <DropDownPicker
            testID="language-picker"
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
            dropDownDirection="DOWN"
          />
        </View>
      </View>

      <View style={styles.privacyLinkContainer}>
        <TouchableOpacity testID="privacy-agreement-button" onPress={() => setPrivacyModalVisible(true)}>
          <Text style={styles.privacyLink}>{i18n.t('privacy_agreement')}</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        visible={privacyModalVisible}
        onRequestClose={() => setPrivacyModalVisible(false)}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, isDarkTheme ? styles.darkModalContent : styles.lightModalContent]}>
            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setPrivacyModalVisible(false)}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <ScrollView style={styles.scrollView}>
              <Text style={isDarkTheme ? styles.darkModalText : styles.lightModalText}>
                {i18n.t('privacy_agreement_details')}
              </Text>
            </ScrollView>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity testID="privacy-disagree-button" style={styles.modalButton} onPress={() => changePrivacyAgreement('disagree')}>
                <Text style={styles.buttonText}>{i18n.t('disagree')}</Text>
              </TouchableOpacity>
              <TouchableOpacity testID="privacy-agree-button" style={styles.modalButton} onPress={() => changePrivacyAgreement('agree')}>
                <Text style={styles.buttonText}>{i18n.t('agree')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    fontSize: 72,
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
    marginBottom: 20,
    marginTop: 60,
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
  privacyLinkContainer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    alignItems: 'center',
  },
  privacyLink: {
    color: '#0000EE',
    textDecorationLine: 'underline',
    fontSize: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    maxHeight: '80%',
    padding: 20,
    borderRadius: 10,
  },
  lightModalContent: {
    backgroundColor: '#ffffff',
  },
  darkModalContent: {
    backgroundColor: '#333333',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF0000',
  },
  scrollView: {
    marginVertical: 20,
  },
  lightModalText: {
    fontSize: 16,
    color: '#242c40',
  },
  darkModalText: {
    fontSize: 16,
    color: '#d0d0c0',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    backgroundColor: '#4C5483',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default SetPage;
