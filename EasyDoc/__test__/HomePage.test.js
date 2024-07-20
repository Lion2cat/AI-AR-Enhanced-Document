//这是HomePage的单元测试

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HomePage from '../src/HomePage';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useThemeContext } from '../components/ThemeContext';
import i18n from '../locales/i18n';

jest.mock('react-native/Libraries/Image/Image', () => 'Image');

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  const navigate = jest.fn();
  return {
    ...actualNav,
    useNavigation: jest.fn(() => ({ navigate })),
    useIsFocused: jest.fn(),
  };
});

jest.mock('../components/ThemeContext', () => ({
  useThemeContext: () => ({
    isDarkTheme: false,
  }),
}));

jest.mock('../locales/i18n', () => ({
  t: (key) => key,
  locale: 'en',
}));

describe('HomePage', () => {
  let navigate;

  beforeEach(() => {
    useIsFocused.mockReturnValue(true);
    navigate = useNavigation().navigate;
    navigate.mockClear();
  });

  it('Page renders correctly', async () => {
    const { getByText } = render(<HomePage />);

    await waitFor(() => {
      expect(getByText('title')).toBeTruthy();
      expect(getByText('subtitle')).toBeTruthy();//测试页面文本
    });
  });

  it('Navigate to CameraPage on image press', async () => {
    const { getByLabelText } = render(<HomePage />);

    // Wait for fonts to load
    await waitFor(() => {
      const cameraButton = getByLabelText('CameraButton');
      fireEvent.press(cameraButton);
    });
    //console.log('navigation.navigate calls:', navigate.mock.calls);
    expect(navigate).toHaveBeenCalledWith('Camera');//点击图片跳转CameraPage
  });

  it('navigates to Chat screen on chat button press', async () => {
    const { getByLabelText } = render(<HomePage />);

    await waitFor(() => {
      const chatButton = getByLabelText('ChatButton');
      fireEvent.press(chatButton);
    });

    expect(navigate).toHaveBeenCalledWith('Chat');//点击按钮跳转ChatPage
  });

  it('navigates to Help screen on help button press', async () => {
    const { getByLabelText } = render(<HomePage />);

    await waitFor(() => {
      const helpButton = getByLabelText('HelpButton');
      fireEvent.press(helpButton);
    });

    expect(navigate).toHaveBeenCalledWith('Help');//点击按钮跳转HelpPage
  });

  it('navigates to Settings screen on settings button press', async () => {
    const { getByLabelText } = render(<HomePage />);

    await waitFor(() => {
      const settingsButton = getByLabelText('SettingsButton');
      fireEvent.press(settingsButton);
    });

    expect(navigate).toHaveBeenCalledWith('Settings');//点击按钮跳转SetPage
  });
});
