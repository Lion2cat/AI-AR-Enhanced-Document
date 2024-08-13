import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useThemeContext } from '../components/ThemeContext';
import i18n from '../locales/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PRIVACY_KEY = 'privacyAgreement';

const HomePage = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [locale, setLocaleState] = useState(i18n.locale);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const scale = useSharedValue(1);
  const { isDarkTheme } = useThemeContext();
  const isFocused = useIsFocused();

  const themeTextStyle = isDarkTheme ? styles.darkThemeText : styles.lightThemeText;
  const themeContainerStyle = isDarkTheme ? styles.darkContainer : styles.lightContainer;

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Outfit-Regular': require('../assets/fonts/Outfit-Regular.ttf'),
        'Outfit-Bold': require('../assets/fonts/Outfit-Bold.ttf'),
        'Outfit-SemiBold': require('../assets/fonts/Outfit-SemiBold.ttf'),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  useEffect(() => {
    if (isFocused) {
      setLocaleState(i18n.locale);
    }
  }, [isFocused]);

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handleCameraPress = async () => {
    const privacyAgreement = await AsyncStorage.getItem(PRIVACY_KEY);
    if (privacyAgreement === 'disagree') {
      setModalVisible(true);
    } else {
      navigation.navigate('Camera');
    }
  };

  const handleAgree = async () => {
    await AsyncStorage.setItem(PRIVACY_KEY, 'agree');
    setModalVisible(false);
    navigation.navigate('Camera');
  };

  const handleDisagree = () => {
    setModalVisible(false);
  };

  return (
    <View style={[styles.container, themeContainerStyle]} testID="container">
      <Text style={[styles.title, themeTextStyle]} testID="textStyle">{i18n.t('title')}</Text>
      <Text style={[styles.subtitle, themeTextStyle]}>{i18n.t('subtitle')}</Text>

      <Animated.View style={[styles.imageContainer, animatedStyle]}>
        <TouchableOpacity
          onPress={handleCameraPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          accessibilityRole="button"
          accessibilityLabel="CameraButton"
        >
          <Image
            source={require('../assets/camera.png')}
            style={styles.image}
          />
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.iconButtonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Document')}>
          <Text style={styles.buttonText} numberOfLines={1} adjustsFontSizeToFit>{i18n.t('document')}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.iconButtonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Chat')}
          accessibilityRole="button"
          accessibilityLabel="ChatButton"
        >
          <Text style={styles.buttonText} numberOfLines={1} adjustsFontSizeToFit>{i18n.t('chat')}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.iconButtonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Help')}
          accessibilityRole="button"
          accessibilityLabel="HelpButton"
        >
          <Text style={styles.buttonText} numberOfLines={1} adjustsFontSizeToFit>{i18n.t('help')}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.iconButtonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Settings')}
          accessibilityRole="button"
          accessibilityLabel="SettingsButton"
        >
          <Text style={styles.buttonText} numberOfLines={1} adjustsFontSizeToFit>{i18n.t('setting')}</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, themeContainerStyle]}>
            <Text style={[styles.modalText, themeTextStyle]}>{i18n.t('cameraAgreementText')}</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={[styles.modalButton, styles.modalButtonCancel]} onPress={handleDisagree}>
                <Text style={styles.buttonText}>{i18n.t('disagree')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleAgree}>
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
    fontSize: 36,
    marginTop: 40,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'Outfit-SemiBold',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  iconButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#4C5483',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 50,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Outfit-SemiBold',
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
  },
  darkThemeText: {
    color: '#d0d0c0',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontFamily: 'Outfit-SemiBold',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: 'row',
  },
  modalButton: {
    backgroundColor: '#4C5483',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonCancel: {
    backgroundColor: '#d9534f',
  },
});

export default HomePage;
