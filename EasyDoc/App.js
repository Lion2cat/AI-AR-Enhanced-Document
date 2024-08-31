import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './src/HomePage';
import CameraPage from './src/ARCameraScreen';
import ChatPage from './src/ChatPage';
import SetPage from './src/SetPage';
import HelpPage from './src/HelpPage';
import DocumentPage from './src/DocumentPage';
import GuidePage from './src/GuidePage';
import { ThemeProvider } from './components/ThemeContext';
import i18n, { addLocaleChangeListener } from './locales/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet } from 'react-native';

const Stack = createStackNavigator();

const AppContent = () => {
  const [locale, setLocaleState] = useState(i18n.locale);
  const [hasOnboarded, setHasOnboarded] = useState(null);
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Outfit-Regular': require('./assets/fonts/Outfit-Regular.ttf'),
        'Outfit-Bold': require('./assets/fonts/Outfit-Bold.ttf'),
        'Outfit-SemiBold': require('./assets/fonts/Outfit-SemiBold.ttf'),
      });
      setIsFontLoaded(true);
    };

    loadFonts();
  }, []);

  useEffect(() => {
    const handleLocaleChange = (newLocale) => {
      setLocaleState(newLocale);
    };

    const checkOnboardingStatus = async () => {
      const onboarded = await AsyncStorage.getItem('hasOnboarded');
      setHasOnboarded(onboarded === 'true');// ===
    };

    const unsubscribe = addLocaleChangeListener(handleLocaleChange);
    checkOnboardingStatus();

    return () => {
      unsubscribe();
    };
  }, []);

  if (hasOnboarded === null || !isFontLoaded) {
    return <View style={styles.loadingContainer}><Text>Loading...</Text></View>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={hasOnboarded ? 'Home' : 'Guide'}>
        <Stack.Screen name="Guide" component={GuidePage} options={{ title: i18n.t('guide') }} />
        <Stack.Screen name="Home" component={HomePage} options={{ title: i18n.t('home') }} />
        <Stack.Screen name="Camera" component={CameraPage} options={{ title: i18n.t('camera') }} />
        <Stack.Screen name="Document" component={DocumentPage} options={{ title: i18n.t('document') }} />
        <Stack.Screen name="Chat" component={ChatPage} options={{ title: i18n.t('chat') }} />
        <Stack.Screen name="Settings" component={SetPage} options={{ title: i18n.t('setting') }} />
        <Stack.Screen name="Help" component={HelpPage} options={{ title: i18n.t('help') }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
