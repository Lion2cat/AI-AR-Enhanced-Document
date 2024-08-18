import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HelpPage from '../src/HelpPage';
import { useThemeContext } from '../components/ThemeContext';
import i18n from '../locales/i18n';
import { ScrollView } from 'react-native';

jest.mock('../assets/camera.png', () => 1);

jest.mock('../components/ThemeContext', () => ({
  useThemeContext: jest.fn(),
}));

jest.mock('../locales/i18n', () => ({
  t: jest.fn((key) => key),
  locale: 'en',
  setLocale: jest.fn(),
}));

jest.spyOn(ScrollView.prototype, 'scrollTo').mockImplementation(() => {});

describe('HelpPage Integration Test', () => {
  beforeEach(() => {
    useThemeContext.mockReturnValue({
      isDarkTheme: false,
    });
    i18n.t.mockImplementation((key) => key);
  });

  // 测试 HelpPage 渲染和主题切换的集成
  it('renders correctly and handles theme switching', async () => {
    const { getByText, rerender } = render(<HelpPage />);

    await waitFor(() => {
      expect(getByText('Welcome to EasyDoc!')).toBeTruthy();
      expect(getByText('What question')).toBeTruthy();
    });

    useThemeContext.mockReturnValue({
      isDarkTheme: true,
    });

    rerender(<HelpPage />);

    await waitFor(() => {
      const title = getByText('Welcome to EasyDoc!');
      expect(title.props.style).toContainEqual({ color: '#d0d0c0' });
    });
  });

  // 测试国际化与组件的集成
  it('handles language change and updates text accordingly', async () => {
    i18n.t.mockImplementation((key) => `translated-${key}`);

    const { getByText, rerender } = render(<HelpPage />);

    await waitFor(() => {
      expect(getByText('translated-Welcome to EasyDoc!')).toBeTruthy();
      expect(getByText('translated-What question')).toBeTruthy();
    });

    i18n.t.mockImplementation((key) => `newLanguage-${key}`);
    rerender(<HelpPage />);

    await waitFor(() => {
      expect(getByText('newLanguage-Welcome to EasyDoc!')).toBeTruthy();
    });
  });

  // 测试组件间的滚动交互
  it('handles scroll interaction between sections', async () => {
    const { getByTestId } = render(<HelpPage />);

    const aboutARButton = getByTestId('aboutARButton');
    fireEvent.press(aboutARButton);

    await waitFor(() => {
      expect(ScrollView.prototype.scrollTo).toHaveBeenCalledWith({
        y: 750,
        animated: true,
      });
    });

    const aboutChatButton = getByTestId('aboutChatButton');
    fireEvent.press(aboutChatButton);

    await waitFor(() => {
      expect(ScrollView.prototype.scrollTo).toHaveBeenCalledWith({
        y: 1900,
        animated: true,
      });
    });

    // 测试点击“About language/theme”按钮滚动到对应部分
    const aboutLanguageButton = getByTestId('aboutLanguageButton');
    fireEvent.press(aboutLanguageButton);

    await waitFor(() => {
      expect(ScrollView.prototype.scrollTo).toHaveBeenCalledWith({
        y: 3050,
        animated: true,
      });
    });

    const scrollToTopButton = getByTestId('scrollToTopButton');
    fireEvent.press(scrollToTopButton);

    await waitFor(() => {
      expect(ScrollView.prototype.scrollTo).toHaveBeenCalledWith({
        y: 0,
        animated: true,
      });
    });
  });

  // 综合测试所有交互
  it('integrates all functionalities together', async () => {
    const { getByTestId, getByText, rerender } = render(<HelpPage />);

    await waitFor(() => {
      expect(getByText('Welcome to EasyDoc!')).toBeTruthy();
    });

    useThemeContext.mockReturnValue({ isDarkTheme: true });
    rerender(<HelpPage />);

    await waitFor(() => {
      const title = getByText('Welcome to EasyDoc!');
      expect(title.props.style).toContainEqual({ color: '#d0d0c0' });
    });

    const aboutARButton = getByTestId('aboutARButton');
    fireEvent.press(aboutARButton);

    await waitFor(() => {
      expect(ScrollView.prototype.scrollTo).toHaveBeenCalledWith({
        y: 750,
        animated: true,
      });
    });

    i18n.t.mockImplementation((key) => `newLanguage-${key}`);
    rerender(<HelpPage />);

    await waitFor(() => {
      expect(getByText('newLanguage-Welcome to EasyDoc!')).toBeTruthy();
    });
  });
});
