//这是HomePage的集成测试

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HomePage from '../src/HomePage';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useThemeContext } from '../components/ThemeContext';
import i18n from '../locales/i18n';
import { StyleSheet } from 'react-native';

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
  useThemeContext: jest.fn(),
}));

jest.mock('../locales/i18n', () => ({
  t: jest.fn((key) => key),
  locale: 'en',
  setLocale: jest.fn(),
}));

const styles = StyleSheet.create({
  lightContainer: {
    backgroundColor: '#d0d0c0',
  },
  darkContainer: {
    backgroundColor: '#242c40',
  },
  lightThemeText: {
    color: '#242c40',
  },
  darkThemeText: {
    color: '#d0d0c0',
  },
});

describe('HomePage Integration Test', () => {
  let navigate;

  beforeEach(() => {
    navigate = useNavigation().navigate;
    navigate.mockClear();
    useIsFocused.mockReturnValue(true);

    useThemeContext.mockReturnValue({
      isDarkTheme: false,
    });
  });

  it('Render HomePage correctly', async () => {
    const { getByText } = render(<HomePage />);

    await waitFor(() => {
      expect(getByText('title')).toBeTruthy();
      expect(getByText('subtitle')).toBeTruthy();//检测是否成功加载页面
    });
  });

  it('Navigate to CameraPage on image press', async () => {
    const { getByLabelText } = render(<HomePage />);

    await waitFor(() => {
      const cameraButton = getByLabelText('CameraButton');
      fireEvent.press(cameraButton);
    });

    expect(navigate).toHaveBeenCalledWith('Camera');//检测是否成功调用navigate方法，并传入'Camera'
  });

  it('Navigate to ChatPage on chat button press', async () => {
    const { getByLabelText } = render(<HomePage />);

    await waitFor(() => {
      const chatButton = getByLabelText('ChatButton');
      fireEvent.press(chatButton);
    });

    expect(navigate).toHaveBeenCalledWith('Chat');//检测是否成功调用navigate方法，并传入'Chat'
  });

  it('Navigate to HelpPage on help button press', async () => {
    const { getByLabelText } = render(<HomePage />);

    await waitFor(() => {
      const helpButton = getByLabelText('HelpButton');
      fireEvent.press(helpButton);
    });

    expect(navigate).toHaveBeenCalledWith('Help');//检测是否成功调用navigate方法，并传入'Help'
  });

  it('Navigate to SettingsPage on settings button press', async () => {
    const { getByLabelText } = render(<HomePage />);

    await waitFor(() => {
      const settingsButton = getByLabelText('SettingsButton');
      fireEvent.press(settingsButton);
    });

    expect(navigate).toHaveBeenCalledWith('Settings');//检测是否成功调用navigate方法，并传入'Settings'
  });

  it('Check theme context integration', async () => {
    useThemeContext.mockReturnValue({
      isDarkTheme: true,
    });

    const { getByText, getByTestId, rerender } = render(<HomePage />);

    await waitFor(() => {
      expect(getByText('title')).toBeTruthy();
    });

    rerender(<HomePage />);

    await waitFor(() => {
      const container = getByTestId('container');
      const title = getByTestId('textStyle');
      expect(container.props.style).toContainEqual(styles.darkContainer); // 检测背景是否成功切换成对应主题
      expect(title.props.style).toContainEqual(styles.darkThemeText); // 检测title的样式是否更新
    });
  });

  it('checks i18n integration for language change', async () => {
    i18n.t.mockImplementation((key) => `translated-${key}`);

    const { getByText } = render(<HomePage />);

    await waitFor(() => {
      expect(getByText('translated-title')).toBeTruthy();
      expect(getByText('translated-subtitle')).toBeTruthy();//检测翻译文本是否正确加载
    });
  });
});
