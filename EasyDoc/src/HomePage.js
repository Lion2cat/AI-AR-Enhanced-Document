import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useThemeContext } from '../components/ThemeContext';

const HomePage = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const navigation = useNavigation();
  const scale = useSharedValue(1);
  const { isDarkTheme } = useThemeContext();

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
      <Text style={[styles.title, themeTextStyle]}>EasyDoc</Text>
      <Text style={[styles.subtitle, themeTextStyle]}>Open your camera to enhance your DOC</Text>

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
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Language')}>
          <Text style={styles.buttonText}>Language</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.iconButtonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Help')}>
          <Text style={styles.buttonText}>Help</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.iconButtonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Chat')}>
          <Text style={styles.buttonText}>Chat</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.iconButtonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.buttonText}>Settings</Text>
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
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Outfit-SemiBold',
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