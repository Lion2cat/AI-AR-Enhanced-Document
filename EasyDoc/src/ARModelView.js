import React from 'react';
import { ViroARSceneNavigator } from "@reactvision/react-viro";
import HelloWorldSceneAR from "./HelloWorldSceneAR";

const ARModelView = () => {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: HelloWorldSceneAR,
      }}
      style={{ flex: 1, width: '100%', height: '100%' }}
    />
  );
};

export default ARModelView;
