import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { useThemeContext } from '../components/ThemeContext';

const SetPage = () => {
  const { toggleTheme, isDarkTheme } = useThemeContext();

  return (
    <View style={isDarkTheme ? styles.darkContainer : styles.lightContainer}>
      <Text style={isDarkTheme ? styles.darkThemeText : styles.lightThemeText}>Settings</Text>
      <Button title="Toggle Theme" onPress={toggleTheme} />
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
  lightContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d0d0c0',
  },
  darkContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#242c40',
  },
  lightThemeText: {
    color: '#242c40',
    fontSize: 20,
  },
  darkThemeText: {
    color: '#d0d0c0',
    fontSize: 20,
  },
});

export default SetPage;
