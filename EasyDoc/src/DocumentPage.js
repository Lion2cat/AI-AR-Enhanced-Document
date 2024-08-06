import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Modal, Image, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { Picker } from '@react-native-picker/picker';
import * as Speech from 'expo-speech';
import i18n, { setLocale, getCurrentLocale } from '../locales/i18n';
import imageMappings from './imgMapper/DB2ImageMapper.json';
import imageConfig from './imageConfig.json';
import documentationUrls from './documentationUrls.json';

const WebViewComponent = () => {
  const [isImageVisible, setImageVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [currentImages, setCurrentImages] = useState(null);

  // 保存当前全局语言设置到临时变量
  const globalLanguage = getCurrentLocale();
  const [language, setLanguage] = useState(globalLanguage);

  useEffect(() => {
    const loadVoices = async () => {
      const voices = await Speech.getAvailableVoicesAsync();
      let humanLikeVoice;
      switch (language) {
        case 'en':
          humanLikeVoice = voices.find(voice => voice.name.includes("en-UK") && voice.quality === "Enhanced");
          break;
        case 'zh':
          humanLikeVoice = voices.find(voice => voice.name.includes("zh-TW") && voice.quality === "Enhanced");
          break;
        case 'fr':
          humanLikeVoice = voices.find(voice => voice.name.includes("fr-FR") && voice.quality === "Enhanced");
          break;
        default:
          humanLikeVoice = voices.find(voice => voice.quality === "Enhanced");
          break;
      }
      setSelectedVoice(humanLikeVoice);
    };

    loadVoices();

    // 当组件卸载时恢复全局语言设置
    return () => {
      setLocale(globalLanguage);
    };
  }, [language]);

  const injectedJavaScript = `
    (function() {
      const imageMappings = ${JSON.stringify(imageMappings)};
      document.querySelectorAll('img').forEach((img) => {
        const src = img.getAttribute('src');
        const imageName = src.match(/[^/]+(?=\\.[^/.]+$)/)[0];
        if (imageMappings[imageName]) {
          img.style.border = '2px solid red';
        }
        img.addEventListener('click', () => {
          if (imageMappings[imageName]) {
            window.ReactNativeWebView.postMessage(imageName);
          }
        });
      });
    })();
  `;

  const onMessage = (event) => {
    const figureId = event.nativeEvent.data;
    const imageKey = imageMappings[figureId];
    if (imageKey && imageConfig[imageKey]) {
      const loadedImages = imageConfig[imageKey].map(img => ({
        ...img,
        path: images[img.key],
        text: i18n.t(img.textKey, { locale: language })
      }));
      setCurrentImages(loadedImages);
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
        const textToRead = i18n.translations[language][currentImages[currentImageIndex].textKey];
        Speech.speak(textToRead, {
          voice: selectedVoice ? selectedVoice.identifier : null,
          onDone: () => setIsSpeaking(false),
          onStopped: () => setIsSpeaking(false)
        });
        setIsSpeaking(true);
      }
    });
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
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

  const getDocumentationUrl = () => {
    return documentationUrls[language] || documentationUrls['en'];
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={language}
        onValueChange={handleLanguageChange}
        style={{ height: 50, width: 150 }}
      >
        <Picker.Item label="English" value="en" />
        <Picker.Item label="中文" value="zh" />
        <Picker.Item label="Français" value="fr" />
      </Picker>
      <WebView
        originWhitelist={['*']}
        source={{ uri: getDocumentationUrl() }}
        style={styles.webview}
        injectedJavaScript={injectedJavaScript}
        onMessage={onMessage}
      />
      {currentImages && (
        <Modal
          visible={isImageVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={handleCloseInfo}
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
                onPress={handleCloseImage}
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
