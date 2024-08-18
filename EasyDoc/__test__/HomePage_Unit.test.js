import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import HomePage from '../src/HomePage';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useThemeContext } from '../components/ThemeContext';
import i18n from '../locales/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

jest.mock('../components/ThemeContext', () => ({
  useThemeContext: () => ({
    isDarkTheme: false,
  }),
}));

jest.mock('../locales/i18n', () => ({
  t: (key) => key,
  locale: 'en',
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe('HomePage', () => {
  let navigate;

  beforeEach(() => {
    useIsFocused.mockReturnValue(true);
    navigate = useNavigation().navigate;
    navigate.mockClear();
    AsyncStorage.getItem.mockClear();
    AsyncStorage.setItem.mockClear();
  });

  // 测试页面是否正确渲染标题和副标题
  it('Page renders correctly', async () => {
    const { getByText } = render(<HomePage />);

    await waitFor(() => {
      expect(getByText('title')).toBeTruthy();
      expect(getByText('subtitle')).toBeTruthy();
    });
  });

  // 测试在隐私协议同意的情况下点击图片是否跳转到Camera页面
  it('Navigate to CameraPage on image press when privacy is agreed', async () => {
    AsyncStorage.getItem.mockResolvedValue('agree');

    const { getByLabelText } = render(<HomePage />);

    await waitFor(() => {
      const cameraButton = getByLabelText('CameraButton');
      fireEvent.press(cameraButton);
    });

    expect(navigate).toHaveBeenCalledWith('Camera');
  });

  // 测试在隐私协议未同意的情况下点击图片是否显示隐私协议弹窗
  it('Shows privacy modal on image press when privacy is disagreed', async () => {
    AsyncStorage.getItem.mockResolvedValue('disagree');

    const { getByLabelText, getByText } = render(<HomePage />);

    await waitFor(() => {
      const cameraButton = getByLabelText('CameraButton');
      fireEvent.press(cameraButton);
    });

    expect(getByText('cameraAgreementText')).toBeTruthy();
  });

  // 测试用户在隐私协议未同意的情况下点击"同意"按钮后是否跳转到Camera页面
  it('Navigates to CameraPage after agreeing to privacy policy', async () => {
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

  // 测试点击"聊天"按钮是否跳转到Chat页面
  it('navigates to Chat screen on chat button press', async () => {
    const { getByLabelText } = render(<HomePage />);

    await waitFor(() => {
      const chatButton = getByLabelText('ChatButton');
      fireEvent.press(chatButton);
    });

    expect(navigate).toHaveBeenCalledWith('Chat');
  });

  // 测试点击"帮助"按钮是否跳转到Help页面
  it('navigates to Help screen on help button press', async () => {
    const { getByLabelText } = render(<HomePage />);

    await waitFor(() => {
      const helpButton = getByLabelText('HelpButton');
      fireEvent.press(helpButton);
    });

    expect(navigate).toHaveBeenCalledWith('Help');
  });

  // 测试点击"设置"按钮是否跳转到Settings页面
  it('navigates to Settings screen on settings button press', async () => {
    const { getByLabelText } = render(<HomePage />);

    await waitFor(() => {
      const settingsButton = getByLabelText('SettingsButton');
      fireEvent.press(settingsButton);
    });

    expect(navigate).toHaveBeenCalledWith('Settings');
  });
});
