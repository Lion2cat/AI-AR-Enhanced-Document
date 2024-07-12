// ARCameraScreen.js
import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { ViroARSceneNavigator } from "@reactvision/react-viro";
import HelloWorldSceneAR from './HelloWorldSceneAR';

const ARCameraScreen = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [textToRead, setTextToRead] = useState("");

  return (
    <View style={styles.flex1}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: HelloWorldSceneAR,
          passProps: { setShowInfo, setTextToRead },
        }}
        style={styles.flex1}
      />
      {showInfo && (
        <View style={styles.infoContainer}>
          {/* Info Window Component */}
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
});

export default ARCameraScreen;
