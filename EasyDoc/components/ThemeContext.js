import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemTheme = useColorScheme();
  const [isDarkTheme, setIsDarkTheme] = useState(systemTheme === 'dark');

  useEffect(() => {
    setIsDarkTheme(systemTheme === 'dark');
  }, [systemTheme]);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
