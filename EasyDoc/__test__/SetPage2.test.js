//这是SetPage的集成测试

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SetPage from '../src/SetPage';
import { useThemeContext } from '../components/ThemeContext';
import i18n, { setLocale } from '../locales/i18n';

jest.mock('../components/ThemeContext', () => ({
  useThemeContext: jest.fn(),
}));

jest.mock('../locales/i18n', () => ({
  t: (key) => key,
  locale: 'en',
  setLocale: jest.fn(),
}));

describe('SetPage Integration Test', () => {
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
  });

  it('renders SetPage correctly with initial values', async () => {//检测所有组件是否渲染
    const { getByText, getByTestId } = render(<SetPage />);

    await waitFor(() => {
      expect(getByText('language')).toBeTruthy();
      expect(getByText('theme')).toBeTruthy();
      expect(getByTestId('language-picker')).toBeTruthy();
      expect(getByTestId('theme-picker')).toBeTruthy();
    });
  });

  //检测每次切换语言是否会调用相关方法
  it('Change language to 中文 and updates i18n locale', async () => {
    const { getByTestId } = render(<SetPage />);

    await waitFor(() => {
      const languagePicker = getByTestId('language-picker');
      fireEvent(languagePicker, 'valueChange', 'zh');
    });

    expect(setLocale).toHaveBeenCalledWith('zh');
  });

  it('Change language to English and updates i18n locale', async () => {
    const { getByTestId } = render(<SetPage />);

    await waitFor(() => {
      const languagePicker = getByTestId('language-picker');
      fireEvent(languagePicker, 'valueChange', 'en');
    });

    expect(setLocale).toHaveBeenCalledWith('en');
  });

  it('Change language to Français and updates i18n locale', async () => {
    const { getByTestId } = render(<SetPage />);

    await waitFor(() => {
      const languagePicker = getByTestId('language-picker');
      fireEvent(languagePicker, 'valueChange', 'fr');
    });

    expect(setLocale).toHaveBeenCalledWith('fr');
  });

  //检测每次切换主题是否会调用相关方法
  it('Change theme to dark', async () => {
    isDarkThemeMock = false;
    useThemeContext.mockReturnValue({
      toggleTheme: toggleThemeMock,
      isDarkTheme: isDarkThemeMock,
    });

    const { getByTestId } = render(<SetPage />);

    await waitFor(() => {
      const themePicker = getByTestId('theme-picker');
      fireEvent(themePicker, 'valueChange', 'dark');
    });

    expect(toggleThemeMock).toHaveBeenCalled();
  });

  it('Do not change theme if already dark', async () => {
    isDarkThemeMock = true;
    useThemeContext.mockReturnValue({
      toggleTheme: toggleThemeMock,
      isDarkTheme: isDarkThemeMock,
    });

    const { getByTestId } = render(<SetPage />);

    await waitFor(() => {
      const themePicker = getByTestId('theme-picker');
      fireEvent(themePicker, 'valueChange', 'dark');
    });

    expect(toggleThemeMock).not.toHaveBeenCalled();
  });

  it('Change theme to light', async () => {
    isDarkThemeMock = true;
    useThemeContext.mockReturnValue({
      toggleTheme: toggleThemeMock,
      isDarkTheme: isDarkThemeMock,
    });

    const { getByTestId } = render(<SetPage />);

    await waitFor(() => {
      const themePicker = getByTestId('theme-picker');
      fireEvent(themePicker, 'valueChange', 'light');
    });

    expect(toggleThemeMock).toHaveBeenCalled();
  });
});
