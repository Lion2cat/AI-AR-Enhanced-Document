import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HelpPage from '../src/HelpPage';
import { useThemeContext } from '../components/ThemeContext';
import i18n from '../locales/i18n';

jest.mock('react-native/Libraries/Image/Image', () => 'Image');

jest.mock('../components/ThemeContext', () => ({
  useThemeContext: () => ({
    isDarkTheme: false,
  }),
}));

jest.mock('../locales/i18n', () => ({
  t: (key) => key,
  locale: 'en',
}));

describe('HelpPage', () => {
  let scrollToMock;

  beforeEach(() => {
    scrollToMock = jest.fn();
    const mockRef = { current: { scrollTo: scrollToMock } };
    const mockCleanupRef = { current: null };

    jest.spyOn(React, 'useRef')
      .mockReturnValueOnce(mockRef)
      .mockReturnValueOnce(mockCleanupRef);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Page renders correctly', async () => {
    const { getByText } = render(<HelpPage />);

    await waitFor(() => {
      expect(getByText('Welcome to EasyDoc!')).toBeTruthy();
      expect(getByText('About AR')).toBeTruthy();
      expect(getByText('About chat assistant')).toBeTruthy();
      expect(getByText('About language/theme')).toBeTruthy();
    });
  });
});
