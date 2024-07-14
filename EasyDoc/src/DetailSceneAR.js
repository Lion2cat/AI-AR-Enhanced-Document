// DetailSceneAR.js

import React from "react";
import { ViroARScene, Viro3DObject, ViroMaterials, ViroButton } from "@reactvision/react-viro";

const DetailSceneAR = (props) => {
    const { sceneNavigator, objectId, textContent } = props;

    const handleBack = () => {
        sceneNavigator.pop();
    };

    return (
        <ViroARScene>
            <Viro3DObject
                scale={objectId === "memory" ? [0.06, 0.22, 0.05] : [0.05, 0.22, 0.05]}
                position={[-0.2, 0.0, 0.018]}
                rotation={[90, 0, 0]}
                source={require('./res/tesla/object_carobj.obj')}
                resources={[require('./res/tesla/object_carobj.mtl')]}
                type="OBJ"
                materials={"cbblue"}
            />
            <ViroButton
                source={require('./res/back_button.png')}
                position={[0, -0.5, -1]}
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
