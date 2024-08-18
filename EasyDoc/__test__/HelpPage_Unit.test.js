import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HelpPage from '../src/HelpPage';
import { useThemeContext } from '../components/ThemeContext';
import i18n from '../locales/i18n';
import { ScrollView } from 'react-native';

jest.mock('../assets/HelpPage/easyDocNight.png', () => 1);
jest.mock('../assets/HelpPage/easyDoc.png', () => 1);
jest.mock('../assets/HelpPage/openCamera.gif', () => 1);
jest.mock('../assets/HelpPage/AR.gif', () => 1);
jest.mock('../assets/HelpPage/openChat.gif', () => 1);
jest.mock('../assets/HelpPage/text.gif', () => 1);
jest.mock('../assets/HelpPage/language.gif', () => 1);
jest.mock('../assets/HelpPage/theme.gif', () => 1);


jest.mock('../components/ThemeContext', () => ({
  useThemeContext: jest.fn(),
}));

jest.mock('../locales/i18n', () => ({
  t: jest.fn((key) => key),
  locale: 'en',
  setLocale: jest.fn(),
}));

jest.spyOn(ScrollView.prototype, 'scrollTo').mockImplementation(() => {});

describe('HelpPage Component', () => {
  beforeEach(() => {
    useThemeContext.mockReturnValue({
      isDarkTheme: false,
    });
  });

  // 测试组件是否正确渲染
  it('renders HelpPage correctly', async () => {
    const { getByText } = render(<HelpPage />);

    await waitFor(() => {
      expect(getByText('Welcome to EasyDoc!')).toBeTruthy();
      expect(getByText('What question')).toBeTruthy();
      expect(getByText('About AR')).toBeTruthy();
      expect(getByText('About chat assistant')).toBeTruthy();
      expect(getByText('About language/theme')).toBeTruthy();
    });
  });

  // 测试点击“About AR”按钮时是否触发滚动到正确的部分
  it('scrolls to section 1 when About AR button is pressed', async () => {
    const { getByTestId } = render(<HelpPage />);

    const aboutARButton = getByTestId('aboutARButton');
    fireEvent.press(aboutARButton);

    await waitFor(() => {
      expect(ScrollView.prototype.scrollTo).toHaveBeenCalledWith({
        y: 750,
        animated: true,
      });
    });
  });

  // 测试点击浮动按钮时是否滚动到顶部
  it('scrolls to top when floating button is pressed', async () => {
    const { getByTestId } = render(<HelpPage />);

    const scrollToTopButton = getByTestId('scrollToTopButton');
    fireEvent.press(scrollToTopButton);

    await waitFor(() => {
      expect(ScrollView.prototype.scrollTo).toHaveBeenCalledWith({
        y: 0,
        animated: true,
      });
    });
  });

  // 测试暗黑模式主题是否正确应用
  it('applies dark theme correctly', async () => {
    useThemeContext.mockReturnValue({
      isDarkTheme: true,
    });

    const { getByText, rerender } = render(<HelpPage />);

    await waitFor(() => {
      expect(getByText('Welcome to EasyDoc!')).toBeTruthy();
    });

    rerender(<HelpPage />);

    await waitFor(() => {
      const title = getByText('Welcome to EasyDoc!');
      expect(title.props.style).toContainEqual({ color: '#d0d0c0' });
    });
  });

  // 测试国际化功能是否正确加载翻译文本
  it('loads translated text correctly', async () => {
    i18n.t.mockImplementation((key) => `translated-${key}`);

    const { getByText } = render(<HelpPage />);

    await waitFor(() => {
      expect(getByText('translated-Welcome to EasyDoc!')).toBeTruthy();
      expect(getByText('translated-What question')).toBeTruthy();
      expect(getByText('translated-About AR')).toBeTruthy();
    });
  });
});
