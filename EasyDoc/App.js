  import React, { useState, useEffect } from 'react';
  import { NavigationContainer } from '@react-navigation/native';
  import { createStackNavigator } from '@react-navigation/stack';
  import HomePage from './src/HomePage';
  import CameraPage from './src/ARCameraScreen';
  import ChatPage from './src/ChatPage';
  import SetPage from './src/SetPage';
  import HelpPage from './src/HelpPage';
  import DocumentPage from './src/DocumentPage';
  import { ThemeProvider } from './components/ThemeContext';
  import i18n, { addLocaleChangeListener } from './locales/i18n';

  const Stack = createStackNavigator();

  const AppContent = () => {
    const[locale, setLocaleState] = useState(i18n.locale);

    useEffect(() => {
      const handleLocaleChange = (newLocale) => {
        setLocaleState(newLocale);
      };

      const unsubscribe = addLocaleChangeListener(handleLocaleChange);

      return () => {
        unsubscribe();
      };
    }, []);

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={i18n.t('home')}>
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

  export default function App() {
    return (
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    );
  }
