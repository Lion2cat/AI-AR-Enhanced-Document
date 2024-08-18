import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useThemeContext } from '../components/ThemeContext';
import i18n, { setLocale } from '../locales/i18n';

const HelpPage = () => {
  const [locale, setLocaleState] = useState(i18n.locale);
  const { isDarkTheme } = useThemeContext();
  const scrollViewRef = useRef(null);

  const themeTextStyle = isDarkTheme ? styles.darkThemeText : styles.lightThemeText;
  const themeContainerStyle = isDarkTheme ? styles.darkContainer : styles.lightContainer;

  const scrollToSection1 = () => {
    scrollViewRef.current.scrollTo({
      y: 750,
      animated: true,
    });
  };

  const scrollToSection2 = () => {
    scrollViewRef.current.scrollTo({
      y: 1900,
      animated: true,
    });
  };

  const scrollToSection3 = () => {
    scrollViewRef.current.scrollTo({
      y: 3050,
      animated: true,
    });
  };

  const scrollToTop = () => {
    scrollViewRef.current.scrollTo({
      y: 0,
      animated: true,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView ref={scrollViewRef} contentContainerStyle={themeContainerStyle} testID="scrollView">
        <View style={styles.section1}>
          <Text style={[styles.title, themeTextStyle]}>{i18n.t('Welcome to EasyDoc!')}</Text>
          <Image
            source={isDarkTheme
              ? require('../assets/HelpPage/easyDocNight.png')
              : require('../assets/HelpPage/easyDoc.png')}
            style={styles.image}
          />
          <Text style={[styles.subtitle2, themeTextStyle]}>{i18n.t('What question')}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={scrollToSection1} >
              <Text testID="aboutARButton" style={styles.buttonText}>{i18n.t('About AR')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={scrollToSection2}>
              <Text testID="aboutChatButton" style={styles.buttonText}>{i18n.t('About chat assistant')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={scrollToSection3}>
              <Text testID="aboutLanguageButton" style={styles.buttonText}>{i18n.t('About language/theme')}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={[styles.title, themeTextStyle]}>{i18n.t('How to use AR')}</Text>
          <Image source={require('../assets/HelpPage/openCamera.gif')} style={styles.image} />
          <Text style={[styles.subtitle, themeTextStyle]}>{i18n.t('Scan the documentation')}</Text>
          <Image source={require('../assets/HelpPage/AR.gif')} style={styles.image} />
          <Text style={[styles.subtitle, themeTextStyle]}>{i18n.t('Touch AR')}</Text>
        </View>
        <View style={styles.section}>
          <Text style={[styles.title, themeTextStyle]}>{i18n.t('How to use Chat Assistant')}</Text>
          <Image source={require('../assets/HelpPage/openChat.gif')} style={styles.image} />
          <Text style={[styles.subtitle, themeTextStyle]}>{i18n.t('Click text box')}</Text>
          <Image source={require('../assets/HelpPage/text.gif')} style={styles.image} />
          <Text style={[styles.subtitle, themeTextStyle]}>{i18n.t('Do the best')}</Text>
        </View>
        <View style={styles.section}>
          <Text style={[styles.title, themeTextStyle]}>{i18n.t('Language and Theme Settings')}</Text>
          <Image source={require('../assets/HelpPage/language.gif')} style={styles.image} />
          <Text style={[styles.subtitle, themeTextStyle]}>{i18n.t('Set language')}</Text>
          <Image source={require('../assets/HelpPage/theme.gif')} style={styles.image} />
          <Text style={[styles.subtitle, themeTextStyle]}>{i18n.t('Set theme')}</Text>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.floatingButton} onPress={scrollToTop}>
        <Text testID="scrollToTopButton" style={styles.floatingButtonText}>↑</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Outfit-Bold',
    fontSize: 30,
    marginTop: 40,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'Outfit-SemiBold',
  },
  subtitle2: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 0,
    marginBottom: 10,
    fontFamily: 'Outfit-SemiBold',
  },
  lightContainer: {
    backgroundColor: '#e0e0d0',
    flexGrow: 1,
  },
  darkContainer: {
    backgroundColor: '#2e3549',
    flexGrow: 1,
  },
  lightThemeText: {
    color: '#242c40',
  },
  darkThemeText: {
    color: '#d0d0c0',
  },
  section1: {
    margin: 20,
    height: 700,
  },
  section: {
    margin: 20,
    height: 1100,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    height: undefined,
    resizeMode: 'contain',
    marginVertical: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#4C5483',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: '60%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 50,
    height: 50,
    backgroundColor: '#4C5483',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButtonText: {
    color: '#FFF',
    fontSize: 24,
  },
});

export default HelpPage;
