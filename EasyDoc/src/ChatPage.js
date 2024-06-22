import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const WebViewComponent = () => {
  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={require('../assets/watsonChat.html')}
        style={styles.webview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  webview: {
    flex: 1,
  },
});

export default WebViewComponent;
