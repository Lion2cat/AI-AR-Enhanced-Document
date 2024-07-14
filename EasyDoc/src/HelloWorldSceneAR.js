import React, { useState } from "react";
import {
  ViroARScene,
  Viro3DObject,
  ViroARImageMarker,
  ViroARTrackingTargets,
  ViroMaterials,
} from "@reactvision/react-viro";
import i18n from '../locales/i18n';
import DetailSceneAR from "./DetailSceneAR";

const HelloWorldSceneAR = (props) => {
  const { sceneNavigator, setShowInfo, setActiveObject } = props;
  const [activeObject, setActiveObjectLocal] = useState(null);

  function onModelClick(objectId) {
    const textMap = {
      "memory": i18n.t('MemoryText'),
      "DBMSM": i18n.t('DBMSMText'),
      "DBInstance_n": i18n.t('DBInstanceText'),
      "DBInstance_1": i18n.t('DBInstanceText'),
      "DBInstance_2": i18n.t('DBInstanceText'),
      "AppGM": i18n.t('AppGMText'),
      "Heap": i18n.t('HeapText'),
      "DBGM": i18n.t('DBGMText')
    };

    const textContent = textMap[objectId];
    setActiveObjectLocal(objectId);
    setShowInfo(true);
    setActiveObject(objectId);

    sceneNavigator.push({
      scene: DetailSceneAR,
      passProps: { objectId, textContent }
    });
  }

  return (
    <ViroARScene>
      <ViroARImageMarker target={"target"}>
        {/* top */}
        <Viro3DObject
          scale={activeObject === "DBMSM" ? [0.05, 0.22, 0.05] : [0.02, 0.05, 0.02]}
          position={[0, 0.0, -0.17]}
          rotation={[0, 0, 90]}
          source={require('../assets/2D_model/1.obj')}
          resources={[require('../assets/2D_model/1.mtl')]}
          type="OBJ"
          materials={"cube01"}
          onClick={() => onModelClick("DBMSM")}
        />

        {/* right */}
        <Viro3DObject
          scale={activeObject === "DBInstance_n" ? [0.05, 0.22, 0.05] : [0.02, 0.06, 0.05]}
          position={[0.1, 0, 0]}
          rotation={[0, 0, 90]}
          source={require('../assets/2D_model/2.obj')}
          resources={[require('../assets/2D_model/2.mtl')]}
          type="OBJ"
          materials={"cbblue"}
          onClick={() => onModelClick("DBInstance_n")}
        />
        <Viro3DObject
          scale={activeObject === "AppGM" ? [0.05, 0.22, 0.05] : [0.02, 0.07, 0.02]}
          position={[0.1, 0.01, -0.02]}
          rotation={[0, 0, 90]}
          source={require('../assets/2D_model/1.obj')}
          resources={[require('../assets/2D_model/1.mtl')]}
          type="OBJ"
          materials={"cube01"}
          onClick={() => onModelClick("AppGM")}
        />
        <Viro3DObject
          scale={activeObject === "DBGM" ? [0.05, 0.22, 0.05] : [0.02, 0.07, 0.02]}
          position={[0.1, 0.01, 0.05]}
          rotation={[0, 0, 90]}
          source={require('../assets/2D_model/1.obj')}
          resources={[require('../assets/2D_model/1.mtl')]}
          type="OBJ"
          materials={"cube01"}
          onClick={() => onModelClick("DBGM")}
        />
        {/* left */}
        <Viro3DObject
          scale={activeObject === "DBInstance_1" ? [0.05, 0.22, 0.05] : [0.02, 0.06, 0.05]}
          position={[-0.1, 0, 0]}
          rotation={[0, 0, 90]}
          source={require('../assets/2D_model/2.obj')}
          resources={[require('../assets/2D_model/2.mtl')]}
          type="OBJ"
          materials={"cbblue"}
          onClick={() => onModelClick("DBInstance_1")}
        />
        <Viro3DObject
          scale={activeObject === "AppGM" ? [0.05, 0.22, 0.05] : [0.02, 0.07, 0.03]}
          position={[-0.1, 0.01, -0.005]}
          rotation={[0, 0, 90]}
          source={require('../assets/2D_model/1.obj')}
          resources={[require('../assets/2D_model/1.mtl')]}
          type="OBJ"
          materials={"cube01"}
          onClick={() => onModelClick("AppGM")}
        />
        <Viro3DObject
          scale={activeObject === "Heap" ? [0.05, 0.22, 0.05] : [0.02, 0.06, 0.025]}
          position={[-0.13, 0.02, -0.005]}
          rotation={[0, 0, 90]}
          source={require('../assets/2D_model/4.obj')}
          resources={[require('../assets/2D_model/4.mtl')]}
          type="OBJ"
          materials={"cborange"}
          onClick={() => onModelClick("Heap")}
        />
        <Viro3DObject
          scale={activeObject === "Heap" ? [0.05, 0.22, 0.05] : [0.02, 0.06, 0.025]}
          position={[-0.065, 0.02, -0.005]}
          rotation={[0, 0, 90]}
          source={require('../assets/2D_model/4.obj')}
          resources={[require('../assets/2D_model/4.mtl')]}
          type="OBJ"
          materials={"cborange"}
          onClick={() => onModelClick("Heap")}
        />
        <Viro3DObject
          scale={activeObject === "DBGM" ? [0.05, 0.22, 0.05] : [0.02, 0.1, 0.01]}
          position={[-0.1, 0.01, 0.07]}
          rotation={[0, 0, 90]}
          source={require('../assets/2D_model/3.obj')}
          resources={[require('../assets/2D_model/3.mtl')]}
          type="OBJ"
          materials={"cbgreen"}
          onClick={() => onModelClick("DBGM")}
        />
      </ViroARImageMarker>
    </ViroARScene>
  );
};

ViroARTrackingTargets.createTargets({
  "target": {
    source: require('./res/target.png'),
    orientation: "Up",
    physicalWidth: 0.1
  }
});

ViroMaterials.createMaterials({
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
  cube01: {
    diffuseTexture: require('../assets/2D_model/colour/Cube01.png'),
    specularTexture: require('../assets/2D_model/colour/Cube01.png'),
  },
});

export default HelloWorldSceneAR;
