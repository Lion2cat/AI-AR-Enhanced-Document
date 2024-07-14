import React, { useState, useEffect } from "react";
import { ViroARScene, Viro3DObject, ViroMaterials } from "@reactvision/react-viro";
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import * as Speech from 'expo-speech';

const DetailSceneAR = (props) => {
    const { objectId, textContent } = props;
    const [showInfo, setShowInfo] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [selectedVoice, setSelectedVoice] = useState(null);

    useEffect(() => {
        const loadVoices = async () => {
            const voices = await Speech.getAvailableVoicesAsync();
            const humanLikeVoice = voices.find(voice => voice.name.includes("en-US") && voice.quality === "Enhanced");
            setSelectedVoice(humanLikeVoice);
        };

        loadVoices();
    }, []);

    const handleSpeak = () => {
        Speech.isSpeakingAsync().then((speaking) => {
            if (speaking) {
                Speech.stop();
                setIsSpeaking(false);
            } else {
                Speech.speak(textContent, {
                    voice: selectedVoice ? selectedVoice.identifier : null,
                    onDone: () => setIsSpeaking(false),
                    onStopped: () => setIsSpeaking(false)
                });
                setIsSpeaking(true);
            }
        });
    };

    const handleCloseInfo = () => {
        setShowInfo(false);
        Speech.stop();
    };

    return (
        <View style={{ flex: 1 }}>
            <ViroARScene>
                <Viro3DObject
                    scale={objectId === "memory" ? [0.06, 0.22, 0.05] : [0.05, 0.22, 0.05]}
                    position={[-0.2, 0.0, 0.018]}
                    rotation={[90, 0, 0]}
                    source={require('./res/tesla/object_carobj.obj')}
                    resources={[require('./res/tesla/object_carobj.mtl')]}
                    type="OBJ"
                    materials={"cbblue"}
                    //onClick={() => setShowInfo(true)}
                />
            </ViroARScene>
            {showInfo && (
                <View style={styles.infoContainer}>
                    <View style={styles.infoWindow}>
                        <TouchableOpacity onPress={handleCloseInfo} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>X</Text>
                        </TouchableOpacity>
                        <ScrollView contentContainerStyle={styles.scrollViewContent}>
                            <Text style={styles.infoText}>
                                {textContent}
                            </Text>
                        </ScrollView>
                        <TouchableOpacity onPress={handleSpeak} style={styles.speakerButton}>
                            <Text style={styles.speakerButtonText}>🔊</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
};

ViroMaterials.createMaterials({
    cbblue: {
        diffuseTexture: require('./res/tesla/colourblind_blue.png'),
        specularTexture: require('./res/tesla/colourblind_blue.png'),
    },
});

const styles = StyleSheet.create({
    infoContainer: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoWindow: {
        height: Dimensions.get('window').height / 3,
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // 半透明黑色背景
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 10,
    },
    closeButton: {
        alignSelf: 'flex-end',
        padding: 5,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    infoText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'left',
    },
    speakerButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    speakerButtonText: {
        fontSize: 24,
        color: '#fff',
    },
});

export default DetailSceneAR;
