import React, { useState } from "react";
import { ViroARScene, Viro3DObject, ViroMaterials, ViroButton, ViroImage } from "@reactvision/react-viro";
import * as Speech from 'expo-speech';
import i18n from '../locales/i18n';

const DetailSceneAR = (props) => {
  const { sceneNavigator, objectId, setShowInfo, setTextToRead } = props;
  const [activeObject, setActiveObject] = useState(null); // 管理当前被点击的对象

  const handleBack = () => {
    setShowInfo(false);
    sceneNavigator.pop();
    Speech.stop();
  };

  const onClick = (ObjectId) => {
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

    const textContent = textMap[ObjectId];

    if (activeObject === ObjectId) {
      // If the object is already active, deactivate it and close the info box
      setActiveObject(null);
      setShowInfo(false);
      Speech.stop();
    } else {
      // If the object is not active, activate it and open the info box
      setActiveObject(ObjectId);
      setTextToRead(textContent);
      setShowInfo(true);
    }
  };

  const objectMap = {
    "DBMSM": [
      {
        id: "DBMSM",
        source: require('./res/tesla/object_carobj.obj'),
        resources: [require('./res/tesla/object_carobj.mtl')],
        position: [0.0, 0.0594, 0],
        rotation: [0, 0, 0],
        defaultScale: [0.03, 0.06, 0.03],
        activeScale: [0.04, 0.06, 0.03],
        material: "cbskyblue",
      },
      {
        id: "DBInstance_n",
        source: require('./res/tesla/object_carobj.obj'),
        resources: [require('./res/tesla/object_carobj.mtl')],
        position: [0.0, 0.0286, 0],
        rotation: [0, 0, 0],
        defaultScale: [0.03, 0.03, 0.03],
        activeScale: [0.04, 0.03, 0.03],
        material: "cbgreen",
      },
      {
        id: "DBInstance_2",
        source: require('./res/tesla/object_carobj.obj'),
        resources: [require('./res/tesla/object_carobj.mtl')],
        position: [0.0, 0.0082, 0],
        rotation: [0, 0, 0],
        defaultScale: [0.03, 0.03, 0.03],
        activeScale: [0.04, 0.03, 0.03],
        material: "cbgreen",
      },
      {
        id: "DBInstance_1",
        source: require('./res/tesla/object_carobj.obj'),
        resources: [require('./res/tesla/object_carobj.mtl')],
        position: [0.0, -0.0122, 0],
        rotation: [0, 0, 0],
        defaultScale: [0.03, 0.03, 0.03],
        activeScale: [0.04, 0.03, 0.03],
        material: "cbgreen",
      },
    ],
    "DBInstance": [
      {
        id: "AppGM",
        source: require('./res/tesla/object_carobj.obj'),
        resources: [require('./res/tesla/object_carobj.mtl')],
        position: [0.0, 0.0594, 0],
        rotation: [0, 0, 0],
        defaultScale: [0.03, 0.06, 0.03],
        activeScale: [0.04, 0.06, 0.03],
        material: "cbgreen",
      },
      {
        id: "Heap",
        source: require('./res/tesla/object_carobj.obj'),
        resources: [require('./res/tesla/object_carobj.mtl')],
        position: [0.0, 0.0286, 0],
        rotation: [0, 0, 0],
        defaultScale: [0.03, 0.03, 0.03],
        activeScale: [0.04, 0.03, 0.03],
        material: "cbyellow",
      },
      {
        id: "Heap",
        source: require('./res/tesla/object_carobj.obj'),
        resources: [require('./res/tesla/object_carobj.mtl')],
        position: [0.0, 0.0082, 0],
        rotation: [0, 0, 0],
        defaultScale: [0.03, 0.03, 0.03],
        activeScale: [0.04, 0.03, 0.03],
        material: "cbyellow",
      },
      {
        id: "DBGM",
        source: require('./res/tesla/object_carobj.obj'),
        resources: [require('./res/tesla/object_carobj.mtl')],
        position: [0.0, -0.0122, 0],
        rotation: [0, 0, 0],
        defaultScale: [0.03, 0.03, 0.03],
        activeScale: [0.04, 0.03, 0.03],
        material: "cbblue",
      },
    ],
  };

  const currentObjects = objectMap[objectId] || objectMap[objectId.split('_')[0]] || [];

  return (
    <ViroARScene>
      {currentObjects.map((obj, index) => (
        <Viro3DObject
          key={index}
          source={obj.source}
          resources={obj.resources}
          position={obj.position}
          rotation={obj.rotation}
          scale={activeObject === obj.id ? obj.activeScale : obj.defaultScale}
          type="OBJ"
          materials={obj.material}
          onClick={() => {
            onClick(obj.id);
          }}
        />
      ))}
      <ViroImage
        source={require('./res/back_button.png')}
        position={[-0.1, 0.5, -1]}
         scale={[0.1, 0.1, 0.1]}
         onClick={handleBack}
         style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            borderRadius: 20,
         }}
      />
    </ViroARScene>
  );
};

ViroMaterials.createMaterials({
  cbblue: {
    diffuseTexture: require('./res/tesla/colourblind_blue.png'),
    specularTexture: require('./res/tesla/colourblind_blue.png'),
  },
  cbskyblue: {
    diffuseTexture: require('./res/tesla/colourblind_skyblue.png'),
    specularTexture: require('./res/tesla/colourblind_skyblue.png'),
  },
  cbgreen: {
    diffuseTexture: require('./res/tesla/colourblind_green.png'),
    specularTexture: require('./res/tesla/colourblind_green.png'),
  },
  cborange: {
    diffuseTexture: require('./res/tesla/colourblind_orange.png'),
    specularTexture: require('./res/tesla/colourblind_orange.png'),
  },
  cbyellow: {
    diffuseTexture: require('./res/tesla/colourblind_yellow.png'),
    specularTexture: require('./res/tesla/colourblind_yellow.png'),
  },
});

export default DetailSceneAR;
