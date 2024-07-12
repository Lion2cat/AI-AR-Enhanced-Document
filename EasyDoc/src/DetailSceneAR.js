import React from "react";
import { ViroARScene, Viro3DObject, ViroText, ViroMaterials, } from "@reactvision/react-viro";
import { View, StyleSheet, Dimensions } from "react-native";

const DetailSceneAR = (props) => {
    //console.log(props);
    const { objectId, textContent } = props;

    return (
      <ViroARScene>
        <Viro3DObject
          scale={objectId === "memory" ? [0.06, 0.22, 0.05] : [0.05, 0.22, 0.05]}
          position={[-0.2, 0.0, 0.018]}
          rotation={[90,0,0]}
          source={require('./res/tesla/object_carobj.obj')}
          resources={[require('./res/tesla/object_carobj.mtl')]}
          type="OBJ"
          materials={"cbblue"}
        />
        <ViroText
          text={textContent}
          position={[0.5, 0, -1]}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    width: Dimensions.get('window').width / 2,
    padding: 20,
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
});

export default DetailSceneAR;
