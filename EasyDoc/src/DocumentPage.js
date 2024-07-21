import React, { useState } from 'react';
import { StyleSheet, View, Modal, Button } from 'react-native';
import { WebView } from 'react-native-webview';
import ARModelView from './ARModelView'; // AR 模型组件

const WebViewComponent = () => {
  const [isARVisible, setARVisible] = useState(false);

  const injectedJavaScript = `
    document.querySelectorAll('img').forEach(img => {
      img.addEventListener('click', () => {
        window.ReactNativeWebView.postMessage('imageClicked');
      });
    });
  `;

  const onMessage = (event) => {
    if (event.nativeEvent.data === 'imageClicked') {
      console.log("clicked.");
        setARVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ uri: 'https://www.ibm.com/docs/en/db2/11.5' }}
        style={styles.webview}
        injectedJavaScript={injectedJavaScript}
        onMessage={onMessage}
      />
      <Modal
        visible={isARVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setARVisible(false)}
      >
        <View style={styles.modalContainer}>
          <ARModelView />
          <Button title="Close AR" onPress={() => setARVisible(false)} />
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WebViewComponent;
