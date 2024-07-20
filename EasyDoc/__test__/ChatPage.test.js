import React from 'react';
import { render } from '@testing-library/react-native';
import ChatPage from '../src/ChatPage';

//测试是否正确调用web组件
jest.mock('react-native-webview', () => {
  const MockWebView = (props) => <div {...props} />;
  return { WebView: MockWebView };
});

describe('ChatPage', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<ChatPage />);
    const webview = getByTestId('webview');

    expect(webview).toBeTruthy();
  });
});
