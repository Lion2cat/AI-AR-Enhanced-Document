import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import GuidePage from '../src/GuidePage';
import { useThemeContext } from '../components/ThemeContext';
import i18n from '../locales/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('../assets/HelpPage/easyDoc.png', () => 1);
jest.mock('../assets/HelpPage/easyDocNight.png', () => 1);
jest.mock('../assets/HelpPage/openCamera.gif', () => 1);
jest.mock('../assets/HelpPage/tapCamera.gif', () => 1);
jest.mock('../assets/HelpPage/document.gif', () => 1);
jest.mock('../assets/HelpPage/openChat.gif', () => 1);
jest.mock('../assets/HelpPage/text.gif', () => 1);

jest.mock('../components/ThemeContext', () => ({
  useThemeContext: jest.fn(),
}));

jest.mock('../locales/i18n', () => ({
  t: (key) => key,
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(() => Promise.resolve()),
}));

jest.mock('react-native-swiper', () => {
  const React = require('react');
  const { Text } = require('react-native');

  return React.forwardRef(({ children, onIndexChanged }, ref) => {
    const [index, setIndex] = React.useState(0);

    const scrollBy = (step) => {
      const newIndex = index + step;
      if (newIndex >= 0 && newIndex < React.Children.count(children)) {
        setIndex(newIndex);
        onIndexChanged && onIndexChanged(newIndex);
      }
    };

    return (
      <>
        {React.Children.toArray(children)[index]}
        <Text testID="next-button" onPress={() => scrollBy(1)}>Next</Text>
        <Text testID="prev-button" onPress={() => scrollBy(-1)}>Previous</Text>
      </>
    );
  });
});

describe('GuidePage Integration Tests', () => {
  let mockNavigation;
  let isDarkThemeMock;

  beforeEach(() => {
    mockNavigation = { replace: jest.fn() };
    isDarkThemeMock = false;
    useThemeContext.mockReturnValue({ isDarkTheme: isDarkThemeMock });

    AsyncStorage.getItem.mockClear();
    AsyncStorage.setItem.mockClear();
  });

  it('should render the first slide and navigate through the slides', async () => {
    const { getByText, getByTestId } = render(<GuidePage navigation={mockNavigation} />);

    await waitFor(() => {
      expect(getByText('Welcome to EasyDoc!')).toBeTruthy();
      expect(getByText('Welcome message')).toBeTruthy();
    });

    const nextButton = getByTestId('next-button');
    fireEvent.press(nextButton);

    await waitFor(() => {
      expect(getByText('How to use AR')).toBeTruthy();
      expect(getByText('Scan the documentation2')).toBeTruthy();
    });

    fireEvent.press(nextButton);
    fireEvent.press(nextButton);
    fireEvent.press(nextButton);
    fireEvent.press(nextButton);

    const getStartedButton = getByText('Get Started');
    fireEvent.press(getStartedButton);

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('hasOnboarded', 'true');
      expect(mockNavigation.replace).toHaveBeenCalledWith('Home');
    });
  });

  it('should show previous and next buttons correctly', async () => {
    const { getByTestId, getByText } = render(<GuidePage navigation={mockNavigation} />);

    const prevButton = getByText('Previous');
    expect(prevButton).toBeTruthy();

    const nextButton = getByTestId('next-button');
    fireEvent.press(nextButton);

    await waitFor(() => {
      const enabledPrevButton = getByTestId('prev-button');
      expect(enabledPrevButton).toBeTruthy();
    });
  });

});
