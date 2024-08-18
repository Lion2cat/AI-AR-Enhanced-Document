import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SetPage from '../src/SetPage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useThemeContext } from '../components/ThemeContext';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

jest.mock('../components/ThemeContext', () => ({
  useThemeContext: jest.fn(),
}));

jest.mock('expo-localization', () => ({
  getLocales: jest.fn(() => [
    { languageCode: 'en', isRTL: false },
  ]),
  getCountry: jest.fn(() => 'en'),
}));

jest.mock('react-native-dropdown-picker', () => {
  const React = require('react');
  const { useState } = React;
  const { View, Text } = require('react-native');

  return {
    __esModule: true,
    default: jest.fn(({ testID, value, onChangeValue }) => {
      const [selectedValue, setSelectedValue] = useState(value);

      return (
        <View testID={testID}>
          <Text testID={`${testID}-value`}>{selectedValue}</Text>
          <Text
            testID={`${testID}-change-button`}
            onPress={() => {
              const newValue = testID === 'language-picker' ? 'zh' : 'dark';
              setSelectedValue(newValue);
              onChangeValue(newValue);
            }}
          >
            Change
          </Text>
        </View>
      );
    }),
  };
});

describe('SetPage Integration Tests', () => {
  let toggleThemeMock, isDarkThemeMock;

  beforeEach(() => {
    toggleThemeMock = jest.fn();
    isDarkThemeMock = false;

    useThemeContext.mockReturnValue({
      toggleTheme: toggleThemeMock,
      isDarkTheme: isDarkThemeMock,
    });

    AsyncStorage.getItem.mockClear();
    AsyncStorage.setItem.mockClear();
  });

  it('loads initial settings from AsyncStorage', async () => {
    AsyncStorage.getItem.mockImplementation((key) => {
      if (key === 'selectedLanguage') return Promise.resolve('en');
      if (key === 'privacyAgreement') return Promise.resolve('agree');
      return Promise.resolve(null);
    });

    const { getByTestId } = render(<SetPage />);

    await waitFor(() => {
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('selectedLanguage');
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('privacyAgreement');
    });

    expect(getByTestId('language-picker-value').props.children).toBe('en');
  });

  it('changes language and saves to AsyncStorage', async () => {
    const { getByTestId } = render(<SetPage />);

    await waitFor(() => {
      const changeLanguageButton = getByTestId('language-picker-change-button');
      fireEvent.press(changeLanguageButton);
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith('selectedLanguage', 'zh');
  });

  it('changes theme and saves to AsyncStorage', async () => {
    const { getByTestId } = render(<SetPage />);

    await waitFor(() => {
      const themePickerButton = getByTestId('themePicker-change-button');
      fireEvent.press(themePickerButton);
    });

    expect(toggleThemeMock).toHaveBeenCalled();
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('selectedTheme', 'dark');
  });

  it('opens and agrees to privacy agreement', async () => {
    const { getByTestId } = render(<SetPage />);

    fireEvent.press(getByTestId('privacy-agreement-button'));

    await waitFor(() => {
      const agreeButton = getByTestId('privacy-agree-button');
      fireEvent.press(agreeButton);
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith('privacyAgreement', 'agree');
  });

  it('opens and disagrees to privacy agreement', async () => {
    const { getByTestId } = render(<SetPage />);

    fireEvent.press(getByTestId('privacy-agreement-button'));

    await waitFor(() => {
      const disagreeButton = getByTestId('privacy-disagree-button');
      fireEvent.press(disagreeButton);
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith('privacyAgreement', 'disagree');
  });
});
