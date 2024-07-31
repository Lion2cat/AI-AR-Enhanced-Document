//这是SetPage的单元测试

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
  });

  it('SetPage renders correctly', async () => {
    const { getByText } = render(<SetPage />);

    await waitFor(() => {
      expect(getByText('language')).toBeTruthy();
      expect(getByText('theme')).toBeTruthy();//检测页面文本
    });
  });

  it('changes language to 中文', async () => {
    const { getByTestId } = render(<SetPage />);

    await waitFor(() => {
      const languagePicker = getByTestId('language-picker');
      fireEvent(languagePicker, 'valueChange', 'zh');
    });

    expect(setLocale).toHaveBeenCalledWith('zh');//切换中文
  });

  it('changes language to English', async () => {
    const { getByTestId } = render(<SetPage />);

    await waitFor(() => {
      const languagePicker = getByTestId('language-picker');
      fireEvent(languagePicker, 'valueChange', 'en');
    });

    expect(setLocale).toHaveBeenCalledWith('en');//切换英文
  });

  it('changes language to Français', async () => {
      const { getByTestId } = render(<SetPage />);

      await waitFor(() => {
        const languagePicker = getByTestId('language-picker');
        fireEvent(languagePicker, 'valueChange', 'fr');
      });

      expect(setLocale).toHaveBeenCalledWith('fr');//切换法文
    });

  it('Change the theme to dark', async () => {
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

    expect(toggleThemeMock).toHaveBeenCalled();//检测是否切换主题
  });

  it('Do not change the theme if already dark', async () => {
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

    expect(toggleThemeMock).not.toHaveBeenCalled();//尝试重复切换当前主题
  });

  it('changes theme to light', async () => {
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

    expect(toggleThemeMock).toHaveBeenCalled();//切换白天主题
  });
});
