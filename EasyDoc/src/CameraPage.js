import {
  ViroARScene,
  ViroMaterials,
  Viro3DObject,
  ViroLightingEnvironment,
  ViroARImageMarker,
  ViroARTrackingTargets,
  ViroARSceneNavigator,
  ViroTrackingStateConstants
} from "@reactvision/react-viro";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import * as Speech from 'expo-speech';

const HelloWorldSceneAR = ({ setShowInfo }) => {
  const [text, setText] = useState("Initializing AR...");
  const [scale, setScale] = useState([0.05, 0.05, 0.05]);

  function onInitialized(state, reason) {
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText("Hello World!");
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      // Handle loss of tracking
    }
  }

  function onModelClick() {
    setShowInfo(true); // 点击模型时显示说明文本窗口
    setScale([0.06, 0.05, 0.05]); // 设置模型的新比例
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroLightingEnvironment source={require('./res/tesla/garage_1k.hdr')} />

      <ViroARImageMarker target={"logo"}>
        <Viro3DObject
          scale={scale}
          position={[0.0, 0.0, 0.0]}
          source={require('./res/tesla/object_car.obj')}
          resources={[require('./res/tesla/object_car_material.mtl')]}
          type="OBJ"
          onClick={onModelClick} // 添加点击事件处理程序
        />
      </ViroARImageMarker>
    </ViroARScene>
  );
};

ViroARTrackingTargets.createTargets({
  "logo": {
    source: require('./res/logo.png'),
    orientation: "Up",
    physicalWidth: 0.1 // real world width in meters
  },
});

ViroMaterials.createMaterials({
  white: {
    diffuseTexture: require('./res/tesla/object_car_main_Base_Color.png'),
    specularTexture: require('./res/tesla/object_car_main_Base_Color.png'),
  },
});

const ARCameraScreen = () => {
  const [showInfo, setShowInfo] = useState(false); // 状态变量控制说明文本的显示
  const [isSpeaking, setIsSpeaking] = useState(false); // 状态变量控制语音播放状态
  const [selectedVoice, setSelectedVoice] = useState(null); // 状态变量控制选择的语音
  const textToRead = "This is a car model. It's very detailed and well-rendered. You can add more information here about the car model or anything relevant to the AR experience. This text is scrollable, so you can add as much content as you need.";

  useEffect(() => {
    const loadVoices = async () => {
      const voices = await Speech.getAvailableVoicesAsync();
      // 找到一个更拟人的语音
      const humanLikeVoice = voices.find(voice => voice.name.includes("en-US") && voice.quality === "Enhanced");
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
          scene: (props) => <HelloWorldSceneAR setShowInfo={setShowInfo} {...props} />,
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
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // 半透明黑色背景
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
