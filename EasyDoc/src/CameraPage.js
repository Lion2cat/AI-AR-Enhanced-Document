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
import i18n, { getCurrentLocale, addLocaleChangeListener } from '../locales/i18n';

const HelloWorldSceneAR = ({ setShowInfo, setTextToRead }) => {
  const [text, setText] = useState("Initializing AR...");
  const [activeObject, setActiveObject] = useState(null); // 管理当前被点击的对象

  function onInitialized(state, reason) {
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText("Hello World!");
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      // Handle loss of tracking
    }
  }

  function onModelClick(objectId) {
    setShowInfo(true); // 点击模型时显示说明文本窗口
    setActiveObject(objectId); // 设置当前被点击的对象

    // 根据objectId设置对应的文本内容
    const textMap = {
      memory: i18n.t('MemoryText'),
      DBMSM: i18n.t('DBMSMText'),
      DBInstance_n: i18n.t('DBInstanceText'),
      DBInstance_1: i18n.t('DBInstanceText'),
      DBInstance_2: i18n.t('DBInstanceText'),
      AppGM: i18n.t('AppGMText'),
      Heap: i18n.t('HeapText'),
      DBGM: i18n.t('DBGMText')
    };

    setTextToRead(textMap[objectId]);
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroLightingEnvironment source={require('./res/tesla/garage_1k.hdr')} />

      <ViroARImageMarker target={"logo"}>
        {/* Memory */}
        <Viro3DObject
          scale={activeObject === "memory" ? [0.06, 0.22, 0.05] : [0.05, 0.22, 0.05]}
          position={[-0.2, 0.0, 0.018]}
          rotation={[90,0,0]}
          source={require('./res/tesla/object_carobj.obj')}
          resources={[require('./res/tesla/object_carobj.mtl')]}
          type="OBJ"
          //materials={"cborange"}
          materials={"cyan"}
          onClick={() => onModelClick("memory")} // 添加点击事件处理程序
        />
        <Viro3DObject
          scale={activeObject === "DBMSM" ? [0.06, 0.05, 0.05] : [0.05, 0.05, 0.05]}
          position={[-0.2, 0.0, 0.11]}
          rotation={[90,0,0]}
          source={require('./res/tesla/object_carobj.obj')}
          resources={[require('./res/tesla/object_carobj.mtl')]}
          type="OBJ"
          //materials={"cbskyblue"}
          materials={"blue"}
          onClick={() => onModelClick("DBMSM")}
        />
        
        {/* Database Manager Shared Memory */}
        <Viro3DObject
          scale={activeObject === "DBMSM" ? [0.06, 0.11, 0.05] : [0.05, 0.11, 0.05]}
          position={[0.0, 0.0, -0.0122]}
          rotation={[90,0,0]}
          source={require('./res/tesla/object_carobj.obj')}
          resources={[require('./res/tesla/object_carobj.mtl')]}
          type="OBJ"
          //materials={"cbskyblue"}
          materials={"blue"}
          onClick={() => onModelClick("DBMSM")} // 添加点击事件处理程序
        />
        <Viro3DObject
          scale={activeObject === "DBInstance_n" ? [0.06, 0.05, 0.05] : [0.05, 0.05, 0.05]}
          position={[0.0, 0.0, 0.042]}
          rotation={[90,0,0]}
          source={require('./res/tesla/object_carobj.obj')}
          resources={[require('./res/tesla/object_carobj.mtl')]}
          type="OBJ"
          //materials={"cbgreen"}
          materials={"purple"}
          onClick={() => onModelClick("DBInstance_n")} // 添加点击事件处理程序
        />
        <Viro3DObject
          scale={activeObject === "DBInstance_2" ? [0.06, 0.05, 0.05] : [0.05, 0.05, 0.05]}
          position={[0.0, 0.0, 0.076]}
          rotation={[90,0,0]}
          source={require('./res/tesla/object_carobj.obj')}
          resources={[require('./res/tesla/object_carobj.mtl')]}
          type="OBJ"
          //materials={"cbgreen"}
          materials={"purple"}
          onClick={() => onModelClick("DBInstance_2")} // 添加点击事件处理程序
        />
        <Viro3DObject
          scale={activeObject === "DBInstance_1" ? [0.06, 0.05, 0.05] : [0.05, 0.05, 0.05]}
          position={[0.0, 0.0, 0.11]}
          rotation={[90,0,0]}
          source={require('./res/tesla/object_carobj.obj')}
          resources={[require('./res/tesla/object_carobj.mtl')]}
          type="OBJ"
          //materials={"cbgreen"}
          materials={"purple"}
          onClick={() => onModelClick("DBInstance_1")} // 添加点击事件处理程序
        />

        {/* DBInstance_1 */}
        <Viro3DObject
          scale={activeObject === "AppGM" ? [0.06, 0.11, 0.05] : [0.05, 0.11, 0.05]}
          position={[0.2, 0.0, -0.0122]}
          rotation={[90,0,0]}
          source={require('./res/tesla/object_carobj.obj')}
          resources={[require('./res/tesla/object_carobj.mtl')]}
          type="OBJ"
          //materials={"cbgreen"}
          materials={"purple"}
          onClick={() => onModelClick("AppGM")}
        />
        <Viro3DObject
          scale={activeObject === "Heap" ? [0.06, 0.05, 0.05] : [0.05, 0.05, 0.05]}
          position={[0.2, 0.0, 0.042]}
          rotation={[90,0,0]}
          source={require('./res/tesla/object_carobj.obj')}
          resources={[require('./res/tesla/object_carobj.mtl')]}
          type="OBJ"
          //materials={"cbyellow"}
          materials={"yellow"}
          onClick={() => onModelClick("Heap")}
        />
        <Viro3DObject
          scale={activeObject === "Heap" ? [0.06, 0.05, 0.05] : [0.05, 0.05, 0.05]}
          position={[0.2, 0.0, 0.076]}
          rotation={[90,0,0]}
          source={require('./res/tesla/object_carobj.obj')}
          resources={[require('./res/tesla/object_carobj.mtl')]}
          type="OBJ"
          //materials={"cbyellow"}
          materials={"yellow"}
          onClick={() => onModelClick("Heap")}
        />
        <Viro3DObject
          scale={activeObject === "DBGM" ? [0.06, 0.05, 0.05] : [0.05, 0.05, 0.05]}
          position={[0.2, 0.0, 0.11]}
          rotation={[90,0,0]}
          source={require('./res/tesla/object_carobj.obj')}
          resources={[require('./res/tesla/object_carobj.mtl')]}
          type="OBJ"
          //materials={"cbblue"}
          materials={"pink"}
          onClick={() => onModelClick("DBGM")}
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
  }
});

ViroMaterials.createMaterials({
  // normal colour
  yellow: {
    diffuseTexture: require('./res/tesla/yellow.png'),
    specularTexture: require('./res/tesla/yellow.png'),
  },
  cyan: {
    diffuseTexture: require('./res/tesla/cyan.png'),
    specularTexture: require('./res/tesla/cyan.png'),
  },
  pink: {
    diffuseTexture: require('./res/tesla/pink.png'),
    specularTexture: require('./res/tesla/pink.png'),
  },
  blue: {
    diffuseTexture: require('./res/tesla/blue.png'),
    specularTexture: require('./res/tesla/blue.png'),
  },
  purple: {
    diffuseTexture: require('./res/tesla/purple.png'),
    specularTexture: require('./res/tesla/purple.png'),
  },

  // colour blind friendly
  cbblue: {
    diffuseTexture: require('./res/tesla/colourblind_blue.png'),
    specularTexture: require('./res/tesla/colourblind_blue.png'),
  },
  cbgreen: {
    diffuseTexture: require('./res/tesla/colourblind_green.png'),
    specularTexture: require('./res/tesla/colourblind_green.png'),
  },
  cborange: {
    diffuseTexture: require('./res/tesla/colourblind_orange.png'),
    specularTexture: require('./res/tesla/colourblind_orange.png'),
  },
  cbskyblue: {
    diffuseTexture: require('./res/tesla/colourblind_skyblue.png'),
    specularTexture: require('./res/tesla/colourblind_skyblue.png'),
  },
  cbyellow: {
    diffuseTexture: require('./res/tesla/colourblind_yellow.png'),
    specularTexture: require('./res/tesla/colourblind_yellow.png'),
  },
});

const ARCameraScreen = () => {
  const [showInfo, setShowInfo] = useState(false); // 状态变量控制说明文本的显示
  const [isSpeaking, setIsSpeaking] = useState(false); // 状态变量控制语音播放状态
  const [selectedVoice, setSelectedVoice] = useState(null); // 状态变量控制选择的语音
  const [textToRead, setTextToRead] = useState(""); // 状态变量控制显示的文本内容

  useEffect(() => {
    const loadVoices = async (languageCode) => {
      const voices = await Speech.getAvailableVoicesAsync();
      let suitableVoice;
      if (languageCode === 'zh') {
        suitableVoice = voices.find(voice => voice.language === 'zh-TW' && voice.quality === "Enhanced");
      } else if (languageCode === 'en') {
        suitableVoice = voices.find(voice => voice.language === 'en-UK' && voice.quality === "Enhanced");
      } else {
        suitableVoice = voices.find(voice => voice.language === languageCode && voice.quality === "Enhanced");
      }
      setSelectedVoice(suitableVoice || voices[0]);
    };
  
    loadVoices(getCurrentLocale());
  
    const unsubscribe = addLocaleChangeListener((locale) => {
      loadVoices(locale);
    });
  
    return () => {
      unsubscribe(); // 组件卸载时移除监听器
    };
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
