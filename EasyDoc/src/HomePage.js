import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useThemeContext } from '../components/ThemeContext';
import i18n from '../locales/i18n';

const HomePage = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [locale, setLocaleState] = useState(i18n.locale);
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

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={[styles.container, themeContainerStyle]}>
      <Text style={[styles.title, themeTextStyle]}>{i18n.t('title')}</Text>
      <Text style={[styles.subtitle, themeTextStyle]}>{i18n.t('subtitle')}</Text>

      <Animated.View style={[styles.imageContainer, animatedStyle]}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Camera')}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Image
            source={require('../assets/camera.png')}
            style={styles.image}
          />
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.iconButtonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Chat')}>
          <Text style={styles.buttonText} numberOfLines={1} adjustsFontSizeToFit>{i18n.t('chat')}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.iconButtonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Help')}>
          <Text style={styles.buttonText} numberOfLines={1} adjustsFontSizeToFit>{i18n.t('help')}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.iconButtonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.buttonText} numberOfLines={1} adjustsFontSizeToFit>{i18n.t('setting')}</Text>
        </TouchableOpacity>
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
});

export default HomePage;
