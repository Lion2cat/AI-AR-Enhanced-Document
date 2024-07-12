  import React, { useState, useEffect } from 'react';
  import { NavigationContainer } from '@react-navigation/native';
  import { createStackNavigator } from '@react-navigation/stack';
  import HomePage from './src/HomePage';
  import CameraPage from './src/ARCameraScreen';
  import ChatPage from './src/ChatPage';
  import SetPage from './src/SetPage';
  import { ThemeProvider } from './components/ThemeContext';
  import { View, Text } from 'react-native';
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
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomePage} options={{ title: i18n.t('home') }} />
          <Stack.Screen name="Camera" component={CameraPage} options={{ title: i18n.t('camera') }} />
          <Stack.Screen name="Chat" component={ChatPage} options={{ title: i18n.t('chat') }} />
          <Stack.Screen name="Settings" component={SetPage} options={{ title: i18n.t('setting') }} />
          <Stack.Screen name="Help" component={HelpScreen} options={{ title: i18n.t('help') }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

  const HelpScreen = () => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Help Screen</Text>
    </View>
  );


  export default function App() {
    return (
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    );
  }
