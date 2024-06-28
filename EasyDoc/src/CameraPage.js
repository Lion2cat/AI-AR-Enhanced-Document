import {
  ViroARScene,
  ViroMaterials,
  ViroNode,
  ViroAnimations,
  Viro3DObject,
  ViroLightingEnvironment,
  ViroARImageMarker,
  ViroARTrackingTargets,
  ViroSphere,
  ViroSpotLight,
  ViroQuad,
  ViroARSceneNavigator,
  ViroTrackingStateConstants
} from "@reactvision/react-viro";
import React, { useState } from "react";
import { StyleSheet } from "react-native";

const HelloWorldSceneAR = () => {
  const [text, setText] = useState("Initializing AR...");

  function onInitialized(state, reason) {
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText("Hello World!");
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      // Handle loss of tracking
    }
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>

    <ViroLightingEnvironment source={require('./res/tesla/garage_1k.hdr')}/>

      <ViroARImageMarker target={"logo"}>
          <Viro3DObject
            scale={[0.05, 0.05, 0.05]}
            position={[0.0, 0.0, 0.0]}
            source={require('./res/tesla/object_car.obj')}
            resources={[require('./res/tesla/object_car_material.mtl'),
                        ]}
            type="OBJ"
            materials={"white"} />
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

export default () => {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: HelloWorldSceneAR,
      }}
      style={styles.f1}
    />
  );
};

var styles = StyleSheet.create({
  f1: { flex: 1 },
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center",
  },
});