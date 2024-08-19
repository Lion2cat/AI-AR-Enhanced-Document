import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import * as Speech from 'expo-speech';
import {
  ViroARSceneNavigator,
} from "@reactvision/react-viro";
import HelloWorldSceneAR from "./HelloWorldSceneAR";
import i18n from "../locales/i18n";

const ARCameraScreen = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [textToRead, setTextToRead] = useState("placeholder");

  useEffect(() => {
    const loadVoices = async () => {
      const voices = await Speech.getAvailableVoicesAsync();
      let humanLikeVoice;
      switch (i18n.locale) {
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
  }, []);

  const handleSpeak = () => {
    Speech.isSpeakingAsync().then((speaking) => {
      if (speaking) {
        Speech.stop();
        setIsSpeaking(false);
      } else {
        Speech.speak(textToRead, {
          voice: selectedVoice ? selectedVoice.identifier : null,
          onDone: () => setIsSpeaking(false),
          onStopped: () => setIsSpeaking(false)
        });
        setIsSpeaking(true);
      }
    });
  };

  const handleCloseInfo = () => {
    setShowInfo(false);
    Speech.stop();
  };

  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  return (
    <View style={styles.flex1}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: (props) => <HelloWorldSceneAR setShowInfo={setShowInfo} setTextToRead={setTextToRead} {...props} />,
        }}
        style={styles.flex1}
      />
      {showInfo && (
        <View style={styles.infoContainer}>
          <View style={styles.infoWindow}>
            <TouchableOpacity onPress={handleCloseInfo} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <Text style={styles.infoText}>
                {textToRead}
              </Text>
            </ScrollView>
            <TouchableOpacity onPress={handleSpeak} style={styles.speakerButton}>
              <Text style={styles.speakerButtonText}>🔊</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  infoContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoWindow: {
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
});

export default ARCameraScreen;
