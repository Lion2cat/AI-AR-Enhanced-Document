import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SetPage from '../src/SetPage';
import { useThemeContext } from '../components/ThemeContext';
import i18n, { setLocale } from '../locales/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('../components/ThemeContext', () => ({
  useThemeContext: jest.fn(),
}));

jest.mock('../locales/i18n', () => ({
  t: (key) => key,
  locale: 'en',
  setLocale: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(() => Promise.resolve()),
}));


jest.mock('react-native-dropdown-picker', () => {
  const React = require('react');
  const { View, Text } = require('react-native');

  return {
    __esModule: true,
    default: jest.fn(({ testID, value, onChangeValue }) => {
      return (
        <View testID={testID}>
          <Text
            testID={`${testID}-change-button`}
            onPress={() => {
              if (testID === 'language-picker') {
                onChangeValue('zh');
              } else if (testID === 'themePicker') {
                onChangeValue('dark');
              }
            }}
          >
            Change
          </Text>
        </View>
      );
    }),
  };
});

describe('SetPage', () => {
  let toggleThemeMock, isDarkThemeMock;

  beforeEach(() => {
    toggleThemeMock = jest.fn();
    isDarkThemeMock = false;

    useThemeContext.mockReturnValue({
      toggleTheme: toggleThemeMock,
      isDarkTheme: isDarkThemeMock,
    });

    setLocale.mockClear();
    toggleThemeMock.mockClear();
    AsyncStorage.getItem.mockClear();
    AsyncStorage.setItem.mockClear();
  });

  it('SetPage renders correctly', async () => {
    const { getByText } = render(<SetPage />);

    await waitFor(() => {
      expect(getByText('language')).toBeTruthy();
      expect(getByText('theme')).toBeTruthy();
      expect(getByText('privacy_agreement')).toBeTruthy();
    });
  });

  it('loads saved settings from AsyncStorage', async () => {
    AsyncStorage.getItem.mockImplementation((key) => {
      if (key === 'selectedLanguage') return Promise.resolve('fr');
      if (key === 'privacyAgreement') return Promise.resolve('agree');
      return Promise.resolve(null);
    });

    const { getByTestId } = render(<SetPage />);

    await waitFor(() => {
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('selectedLanguage');
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('privacyAgreement');
    });

    const languagePicker = getByTestId('language-picker');
    expect(languagePicker.props.testID).toBe('language-picker');
  });

  it('changes language and saves to AsyncStorage', async () => {
    const { getByTestId } = render(<SetPage />);

    await waitFor(() => {
      const changeLanguageButton = getByTestId('language-picker-change-button');
      fireEvent.press(changeLanguageButton);
    });

    expect(setLocale).toHaveBeenCalledWith('zh');
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('selectedLanguage', 'zh');
  });

  it('changes theme and toggles if needed', async () => {
    const { getByTestId } = render(<SetPage />);

    await waitFor(() => {
      const themePickerButton = getByTestId('themePicker-change-button');
      fireEvent.press(themePickerButton);
    });

    expect(toggleThemeMock).toHaveBeenCalled();
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('selectedTheme', 'dark');
  });

  it('opens and agrees to privacy agreement', async () => {
    const { getByText, getByTestId } = render(<SetPage />);

    fireEvent.press(getByText('privacy_agreement'));

    await waitFor(() => {
      const agreeButton = getByTestId('privacy-agree-button');
      fireEvent.press(agreeButton);
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith('privacyAgreement', 'agree');
  });

  it('opens and disagrees to privacy agreement', async () => {
    const { getByText, getByTestId } = render(<SetPage />);

    fireEvent.press(getByText('privacy_agreement'));

    await waitFor(() => {
      const disagreeButton = getByTestId('privacy-disagree-button');
      fireEvent.press(disagreeButton);
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith('privacyAgreement', 'disagree');
  });
});
