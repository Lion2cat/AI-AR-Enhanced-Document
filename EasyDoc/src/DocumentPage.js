import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Modal, Image, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Speech from 'expo-speech';
import i18n from '../locales/i18n';
import imageMappings from './imgMapper/DB2ImageMapper.json';

const WebViewComponent = () => {
  const [isImageVisible, setImageVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(false); // 状态变量控制说明文本的显示
  const [isSpeaking, setIsSpeaking] = useState(false); // 状态变量控制语音播放状态
  const [selectedVoice, setSelectedVoice] = useState(null); // 状态变量控制选择的语音
  const [currentImages, setCurrentImages] = useState(null); // 用于保存当前加载的图片集

  const memory_allocation = [
    { name: 'MemoryText', path: require('../assets/documentPage/memory_allocation/memory_allocation.png'), text: i18n.t('MemoryText') },
    { name: 'DBMSMText', path: require('../assets/documentPage/memory_allocation/dbmsm.png'), text: i18n.t('DBMSMText') },
    { name: 'DBInstanceText', path: require('../assets/documentPage/memory_allocation/dbInstance.png'), text: i18n.t('DBInstanceText') },
  ];

  const images = {
    'memory_allocation': memory_allocation
  };

  useEffect(() => {
    const loadVoices = async () => {
      const voices = await Speech.getAvailableVoicesAsync();
      const humanLikeVoice = voices.find(voice => voice.name.includes("en-UK") && voice.quality === "Enhanced");
      setSelectedVoice(humanLikeVoice);
    };

    loadVoices();
  }, []);

  const injectedJavaScript = `
    document.querySelectorAll('figure').forEach((figure) => {
      figure.addEventListener('click', () => {
        const figureId = figure.id;
        window.ReactNativeWebView.postMessage(figureId);
      });
    });
  `;

  const onMessage = (event) => {
    const figureId = event.nativeEvent.data;
    const imageKey = imageMappings[figureId];
    if (imageKey && images[imageKey]) {
      setCurrentImages(images[imageKey]);
      setCurrentImageIndex(0);
      setImageVisible(true);
      setShowInfo(true);
    }
  };

  const handleSpeak = () => {
    Speech.isSpeakingAsync().then((speaking) => {
      if (speaking) {
        Speech.stop();
        setIsSpeaking(false);
      } else {
        Speech.speak(currentImages[currentImageIndex].text, {
          voice: selectedVoice ? selectedVoice.identifier : null,
          onDone: () => setIsSpeaking(false),
          onStopped: () => setIsSpeaking(false)
        });
        setIsSpeaking(true);
      }
    });
  };

  const handleNextImage = () => {
    if (currentImageIndex < currentImages.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handlePreviousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleCloseInfo = () => {
    setShowInfo(false);
    Speech.stop();
  };

  const handleCloseImage = () => {
    handleCloseInfo();
    setImageVisible(false);
  };

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ uri: 'https://www.ibm.com/docs/en/db2/11.5?topic=utilization-memory-allocation' }}
        style={styles.webview}
        injectedJavaScript={injectedJavaScript}
        onMessage={onMessage}
      />
      {currentImages && (
        <Modal
          visible={isImageVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => handleCloseInfo()}
        >
          <View style={styles.modalContainer}>
            <View style={styles.imageContainer}>
              <Image 
                source={currentImages[currentImageIndex].path}
                style={styles.image}
              />
              <TouchableOpacity style={styles.infoButton} onPress={() => setShowInfo(true)}>
                <Text style={styles.infoButtonText}>?</Text>
              </TouchableOpacity>
            </View>
            {showInfo && (
              <View style={styles.infoContainer}>
                <View style={styles.infoWindow}>
                  <TouchableOpacity onPress={handleCloseInfo} style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>X</Text>
                  </TouchableOpacity>
                  <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <Text style={styles.infoText}>
                      {currentImages[currentImageIndex].text}
                    </Text>
                  </ScrollView>
                  <TouchableOpacity onPress={handleSpeak} style={styles.speakerButton}>
                    <Text style={styles.speakerButtonText}>🔊</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={handlePreviousImage}
                disabled={currentImageIndex === 0}
                style={[
                  styles.button,
                  { backgroundColor: currentImageIndex === 0 ? 'gray' : 'blue' }
                ]}
              >
                <Text style={styles.buttonText}>{i18n.t('prev')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleCloseImage()}
                style={styles.button}
              >
                <Text style={styles.buttonText}>{i18n.t('close')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleNextImage}
                disabled={currentImageIndex === currentImages.length - 1}
                style={[
                  styles.button,
                  { backgroundColor: currentImageIndex === currentImages.length - 1 ? 'gray' : 'blue' }
                ]}
              >
                <Text style={styles.buttonText}>{i18n.t('next')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
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
  },
  imageContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  infoButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  infoContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoWindow: {
    width: '90%',
    height: Dimensions.get('window').height / 3, 
    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  infoText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'left',
  },
  speakerButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  speakerButtonText: {
    fontSize: 24,
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  button: {
    width: 100,
    padding: 10,
    height: 40,
    backgroundColor: 'blue',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default WebViewComponent;
