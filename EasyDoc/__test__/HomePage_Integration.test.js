import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import HomePage from '../src/HomePage';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useThemeContext } from '../components/ThemeContext';
import i18n from '../locales/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';

jest.mock('react-native/Libraries/Image/Image', () => 'Image');

jest.mock('../assets/camera.png', () => 1);

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  const navigate = jest.fn();
  return {
    ...actualNav,
    useNavigation: jest.fn(() => ({ navigate })),
    useIsFocused: jest.fn(),
  };
});

jest.mock('../components/ThemeContext', () => {
  const actualThemeContext = jest.requireActual('../components/ThemeContext');
  return {
    ...actualThemeContext,
    useThemeContext: jest.fn(),
  };
});

jest.mock('../locales/i18n', () => ({
  t: (key) => key,
  locale: 'en',
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

jest.mock('expo-font', () => ({
  loadAsync: jest.fn(),
}));

describe('HomePage Integration Test', () => {
  let navigate;

  beforeEach(() => {
    useIsFocused.mockReturnValue(true);
    navigate = useNavigation().navigate;
    navigate.mockClear();
    AsyncStorage.getItem.mockClear();
    AsyncStorage.setItem.mockClear();
    Font.loadAsync.mockResolvedValue(true);
  });

  it('applies correct styles based on dark theme', async () => {
    useThemeContext.mockReturnValue({ isDarkTheme: true });

    const { getByTestId } = render(<HomePage />);

    await waitFor(() => {
      const container = getByTestId('container');
      expect(container.props.style).toContainEqual({ backgroundColor: '#242c40' });
    });
  });

  it('navigates to CameraPage on image press when privacy is agreed', async () => {
    AsyncStorage.getItem.mockResolvedValue('agree');

    const { getByLabelText } = render(<HomePage />);

    await waitFor(() => {
      const cameraButton = getByLabelText('CameraButton');
      fireEvent.press(cameraButton);
    });

    expect(navigate).toHaveBeenCalledWith('Camera');
  });

  it('shows privacy modal on image press when privacy is disagreed', async () => {
    AsyncStorage.getItem.mockResolvedValue('disagree');

    const { getByLabelText, getByText } = render(<HomePage />);

    await waitFor(() => {
      const cameraButton = getByLabelText('CameraButton');
      fireEvent.press(cameraButton);
    });

    expect(getByText('cameraAgreementText')).toBeTruthy();
  });

  it('navigates to CameraPage after agreeing to privacy policy', async () => {
    AsyncStorage.getItem.mockResolvedValue('disagree');
    const { getByLabelText, getByText } = render(<HomePage />);

    await waitFor(() => {
      const cameraButton = getByLabelText('CameraButton');
      fireEvent.press(cameraButton);
    });

    const agreeButton = getByText('agree');

    await act(async () => {
      fireEvent.press(agreeButton);
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith('privacyAgreement', 'agree');
    expect(navigate).toHaveBeenCalledWith('Camera');
  });

  it('navigates to Chat screen on chat button press', async () => {
    const { getByLabelText } = render(<HomePage />);

    await waitFor(() => {
      const chatButton = getByLabelText('ChatButton');
      fireEvent.press(chatButton);
    });

    expect(navigate).toHaveBeenCalledWith('Chat');
  });

  it('navigates to Help screen on help button press', async () => {
    const { getByLabelText } = render(<HomePage />);

    await waitFor(() => {
      const helpButton = getByLabelText('HelpButton');
      fireEvent.press(helpButton);
    });

    expect(navigate).toHaveBeenCalledWith('Help');
  });

  it('navigates to Settings screen on settings button press', async () => {
    const { getByLabelText } = render(<HomePage />);

    await waitFor(() => {
      const settingsButton = getByLabelText('SettingsButton');
      fireEvent.press(settingsButton);
    });

    expect(navigate).toHaveBeenCalledWith('Settings');
  });
});
