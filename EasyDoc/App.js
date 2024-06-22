import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './src/HomePage';
import CameraPage from './src/CameraPage';
import ChatPage from './src/ChatPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Help" component={HelpScreen} />
        <Stack.Screen name="Language" component={LanguageScreen} />
        <Stack.Screen name="Camera" component={CameraPage} />
        <Stack.Screen name="Chat" component={ChatPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const HelpScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Help Screen</Text>
    </View>
  );
};

const LanguageScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Language Screen</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

