import React from "react";
import { ViroARScene, Viro3DObject, ViroMaterials, ViroButton } from "@reactvision/react-viro";
import * as Speech from 'expo-speech';
import i18n from '../locales/i18n';

const DetailSceneAR = (props) => {
    const { sceneNavigator, objectId, setShowInfo, setTextToRead } = props;

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
      setTextToRead(textContent);
      setShowInfo(true);
    };

    const objectMap = {
      "DBMSM": [
          {
            source: require('./res/tesla/object_carobj.obj'),
            resources: [require('./res/tesla/object_carobj.mtl')],
            position: [0.0, 0.0594, 0],
            rotation: [0, 0, 0],
            scale: [0.03, 0.06, 0.03],
            material: "cbskyblue",
          },
          {
            source: require('./res/tesla/object_carobj.obj'),
            resources: [require('./res/tesla/object_carobj.mtl')],
            position: [0.0, 0.0286, 0],
            rotation: [0, 0, 0],
            scale: [0.03, 0.03, 0.03],
            material: "cbgreen",
            onClick: () => onClick("DBInstance_n"),
          },
          {
            source: require('./res/tesla/object_carobj.obj'),
            resources: [require('./res/tesla/object_carobj.mtl')],
            position: [0.0, 0.0082, 0],
            rotation: [0, 0, 0],
            scale: [0.03, 0.03, 0.03],
            material: "cbgreen",
            onClick: () => onClick("DBInstance_2"),
          },
          {
            source: require('./res/tesla/object_carobj.obj'),
            resources: [require('./res/tesla/object_carobj.mtl')],
            position: [0.0, -0.0122, 0],
            rotation: [0, 0, 0],
            scale: [0.03, 0.03, 0.03],
            material: "cbgreen",
            onClick: () => onClick("DBInstance_1"),
        },
      ],
      "DBInstance": [
        {
          source: require('./res/tesla/object_carobj.obj'),
          resources: [require('./res/tesla/object_carobj.mtl')],
          position: [0.0, 0.0594, 0],
          rotation: [0, 0, 0],
          scale: [0.03, 0.06, 0.03],
          material: "cbgreen",
          onClick: () => onClick("AppGM"),
        },
        {
          source: require('./res/tesla/object_carobj.obj'),
          resources: [require('./res/tesla/object_carobj.mtl')],
          position: [0.0, 0.0286, 0],
          rotation: [0, 0, 0],
          scale: [0.03, 0.03, 0.03],
          material: "cbyellow",
          onClick: () => onClick("Heap"),
        },
        {
          source: require('./res/tesla/object_carobj.obj'),
          resources: [require('./res/tesla/object_carobj.mtl')],
          position: [0.0, 0.0082, 0],
          rotation: [0, 0, 0],
          scale: [0.03, 0.03, 0.03],
          material: "cbyellow",
          onClick: () => onClick("Heap"),
        },
        {
          source: require('./res/tesla/object_carobj.obj'),
          resources: [require('./res/tesla/object_carobj.mtl')],
          position: [0.0, -0.0122, 0],
          rotation: [0, 0, 0],
          scale: [0.03, 0.03, 0.03],
          material: "cbblue",
          onClick: () => onClick("DBGM"),
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
              scale={obj.scale}
              type="OBJ"
              materials={obj.material}
              onClick={obj.onClick}
          />
        ))}
        <ViroButton
          source={require('./res/back_button.png')}
          position={[0.05, 0.08, 0]}
          scale={[0.1, 0.1, 0.1]}
          height={0.1}
          width={0.1}
          onClick={handleBack}
        />
      </ViroARScene>
    );
};

ViroMaterials.createMaterials({
    cbblue: {
        diffuseTexture: require('./res/tesla/colourblind_blue.png'),
        specularTexture: require('./res/tesla/colourblind_blue.png'),
    },
});

export default DetailSceneAR;
