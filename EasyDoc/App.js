import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './src/HomePage';
import CameraPage from './src/CameraPage';
import ChatPage from './src/ChatPage';
import SetPage from './src/SetPage';
import { ThemeProvider } from './components/ThemeContext';
import { View, Text } from 'react-native';

const Stack = createStackNavigator();

const AppContent = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Camera" component={CameraPage} />
        <Stack.Screen name="Chat" component={ChatPage} />
        <Stack.Screen name="Settings" component={SetPage} />
        <Stack.Screen name="Help" component={HelpScreen} />
        <Stack.Screen name="Language" component={LanguageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HelpScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Help Screen</Text>
  </View>
);

const LanguageScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Language Screen</Text>
  </View>
);

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
