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
  const { sceneNavigator, setShowInfo, setTextToRead } = props;

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

    if (objectId === "DBMSM" || objectId === "DBInstance_1" || objectId === "DBInstance_n") {
      const textContent = textMap[objectId];
      setShowInfo(true);
      setTextToRead(textContent);

      sceneNavigator.push({
        scene: DetailSceneAR,
        passProps: { objectId, sceneNavigator, setShowInfo, setTextToRead }
      });
    } 
  }

  return (
    <ViroARScene>
      <ViroARImageMarker target={"target"}>
        {/* top */}
        <Viro3DObject
          scale= {[0.02, 0.05, 0.02]}
          position={[0, 0.0, -0.17]}
          rotation={[0, 0, 90]}
          source={require('../assets/2D_model/cube01-2.obj')}
          resources={[require('../assets/2D_model/cube01-2m.mtl')]}
          type="OBJ"
          materials={"dbmsm"}
          onClick={() => onModelClick("DBMSM")}
        />
        {/* right */}
        <Viro3DObject
          scale={[0.02, 0.06, 0.05]}
          position={[0.1, 0, 0]}
          rotation={[0, 0, 90]}
          source={require('../assets/2D_model/cube02-1.obj')}
          resources={[require('../assets/2D_model/cube02-1m.mtl')]}
          type="OBJ"
          materials={"dbr"}
          onClick={() => onModelClick("DBInstance_n")}
        />
        <Viro3DObject
          scale={[0.02, 0.07, 0.02]}
          position={[0.1, 0.01, -0.02]}
          rotation={[0, 0, 90]}
          source={require('../assets/2D_model/cube01-3.obj')}
          resources={[require('../assets/2D_model/cube01-3m.mtl')]}
          type="OBJ"
          materials={"appgm"}
          onClick={() => onModelClick("AppGM")}
        />
        <Viro3DObject
          scale={[0.02, 0.07, 0.02]}
          position={[0.1, 0.01, 0.05]}
          rotation={[0, 0, 90]}
          source={require('../assets/2D_model/cube01-4.obj')}
          resources={[require('../assets/2D_model/cube01-4m.mtl')]}
          type="OBJ"
          materials={"dbgm"}
          onClick={() => onModelClick("DBGM")}
        />
        {/* left */}
        <Viro3DObject
          scale={[0.02, 0.06, 0.05]}
          position={[-0.1, 0, 0]}
          rotation={[0, 0, 90]}
          source={require('../assets/2D_model/cube02-2.obj')}
          resources={[require('../assets/2D_model/cube02-2m.mtl')]}
          type="OBJ"
          materials={"dbl"}
          onClick={() => onModelClick("DBInstance_1")}
        />
        <Viro3DObject
          scale={[0.02, 0.07, 0.03]}
          position={[-0.1, 0.01, -0.005]}
          rotation={[0, 0, 90]}
          source={require('../assets/2D_model/cube01-5.obj')}
          resources={[require('../assets/2D_model/cube01-5m.mtl')]}
          type="OBJ"
          materials={"appgml"}
          onClick={() => onModelClick("AppGM")}
        />
        <Viro3DObject
          scale={[0.02, 0.06, 0.025]}
          position={[-0.13, 0.02, -0.005]}
          rotation={[0, 0, 90]}
          source={require('../assets/2D_model/cube04-1.obj')}
          resources={[require('../assets/2D_model/cube04-1m.mtl')]}
          type="OBJ"
          materials={"heap"}
          onClick={() => onModelClick("Heap")}
        />
        <Viro3DObject
          scale={[0.02, 0.06, 0.025]}
          position={[-0.065, 0.02, -0.005]}
          rotation={[0, 0, 90]}
          source={require('../assets/2D_model/cube04-2.obj')}
          resources={[require('../assets/2D_model/cube04-2m.mtl')]}
          type="OBJ"
          materials={"heap"}
          onClick={() => onModelClick("Heap")}
        />
        <Viro3DObject
          scale={[0.03, 0.03, 0.035]}
          position={[-0.1, 0.01, 0.07]}
          rotation={[-90, 0, 90]}
          source={require('../assets/2D_model/cube03-1.obj')}
          resources={[require('../assets/2D_model/cube03-1m.mtl')]}
          type="OBJ"
          materials={"dbgml"}
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
  dbmsm: {
    diffuseTexture: require('../assets/2D_model/colour/dbmsm.png'),
    specularTexture: require('../assets/2D_model/colour/dbmsm.png'),
  },
  appgm: {
    diffuseTexture: require('../assets/2D_model/colour/appgm.png'),
    specularTexture: require('../assets/2D_model/colour/appgm.png'),
  },
  appgml: {
    diffuseTexture: require('../assets/2D_model/colour/appgm_l.png'),
    specularTexture: require('../assets/2D_model/colour/appgm_l.png'),
  },
  dbgm: {
    diffuseTexture: require('../assets/2D_model/colour/dbgm.png'),
    specularTexture: require('../assets/2D_model/colour/dbgm.png'),
  },
  dbgml: {
    diffuseTexture: require('../assets/2D_model/colour/dbgm_l.png'),
    specularTexture: require('../assets/2D_model/colour/dbgm_l.png'),
  },
  heap: {
    diffuseTexture: require('../assets/2D_model/colour/heap.png'),
    specularTexture: require('../assets/2D_model/colour/heap.png'),
  },
  dbr: {
    diffuseTexture: require('../assets/2D_model/colour/dbr.png'),
    specularTexture: require('../assets/2D_model/colour/dbr.png'),
  },
  dbl: {
    diffuseTexture: require('../assets/2D_model/colour/dbl.png'),
    specularTexture: require('../assets/2D_model/colour/dbl.png'),
  },
});

export default HelloWorldSceneAR;
