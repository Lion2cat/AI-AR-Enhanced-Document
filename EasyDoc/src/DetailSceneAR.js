import React, { useState } from "react";
import { ViroARScene, Viro3DObject, ViroMaterials, ViroButton, ViroImage } from "@reactvision/react-viro";
import * as Speech from 'expo-speech';
import i18n from '../locales/i18n';

const DetailSceneAR = (props) => {
  const { sceneNavigator, objectId, setShowInfo, setTextToRead } = props;
  const [activeObject, setActiveObject] = useState(null);

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
        scale: [0.02, 0.05, 0.02],
        position: [0, 0.08, -0.17],
        rotation: [0, -90, 90],
        source: require('../assets/2D_model/models/cube01.obj'),
        resources: [require('../assets/2D_model/materials/cube01.mtl')],
        material:"dbmsm",
      },
    ],
    "DBInstance": [
      {
        id: "DBInstance_1",
        scale: [0.02, 0.06, 0.05],
        position: [0, 0, -0.15],
        rotation: [0, -90, 90],
        source: require('../assets/2D_model/models/cube02.obj'),
        resources: [require('../assets/2D_model/materials/cube02.mtl')],
        material: "dbl",
      },
      {
        id: "AppGM",
        scale: [0.02, 0.07, 0.03],
        position: [0, 0.005, -0.14],
        rotation: [0, -90, 90],
        source: require('../assets/2D_model/models/cube01.obj'),
        resources: [require('../assets/2D_model/materials/cube01.mtl')],
        material: "appgml"
      },
      {
        id: "Heap",
        scale: [0.02, 0.06, 0.025],
        position: [-0.03, 0, -0.13],
        rotation: [0, -90, 90],
        source: require('../assets/2D_model/models/cube04.obj'),
        resources: [require('../assets/2D_model/materials/cube04.mtl')],
        material: "heap"
      },
      {
        id: "Heap",
        scale: [0.02, 0.06, 0.025],
        position: [0.035, 0, -0.13],
        rotation: [0, -90, 90],
        source: require('../assets/2D_model/models/cube04.obj'),
        resources: [require('../assets/2D_model/materials/cube04.mtl')],
        material: "heap"
      },
      {
        id: "DBGM",
        scale: [0.03, 0.03, 0.035],
        position: [0, -0.07, -0.14],
        rotation: [-90, -90, 90],
        source: require('../assets/2D_model/models/cube03.obj'),
        resources: [require('../assets/2D_model/materials/cube03.mtl')],
        material: "dbgml",
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
          onClick={() => {
            onClick(obj.id);
          }}
        />
      ))}
      <ViroImage
        source={require('./res/back_button.png')}
        position={[0.3, 0.25, -1]}
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

export default DetailSceneAR;
