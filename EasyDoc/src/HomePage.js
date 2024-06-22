// src/HomePage.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';

const HomePage = () => {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        const loadFonts = async () => {
        await Font.loadAsync({
            'Outfit-Regular': require('../assets/fonts/Outfit-Regular.ttf'),
            'Outfit-Bold': require('../assets/fonts/Outfit-Bold.ttf'),
            'Outfit-SemiBold': require('../assets/fonts/Outfit-SemiBold.ttf'),
        });
        setFontsLoaded(true);
        };

        loadFonts();
    }, []);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>EasyDoc</Text>
            <Text style={styles.subtitle}>Open your camera to Create your AR</Text>
            
            <View style={styles.imageContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Camera')}>
                <Image
                    source={require('../assets/camera.png')}
                    style={styles.image}
                />
                <Text style={styles.icon}></Text>
                </TouchableOpacity>
            </View>
            <View style={styles.iconButtonContainer}>
                <Text style={styles.icon}></Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Language')}>
                    <Text style={styles.buttonText}>Language</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.iconButtonContainer}>
                <Text style={styles.icon}></Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Help')}>
                    <Text style={styles.buttonText}>Help</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.iconButtonContainer}>
                <Text style={styles.icon}></Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Chat')}>
                    <Text style={styles.buttonText}>Chat</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F1F4F8',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: 'Outfit-Bold',
        fontSize: 36,
        marginTop: 40,
    },
    subtitle: {
        fontSize: 30,
        textAlign: 'center',
        marginVertical: 20,
        fontFamily: 'Outfit-SemiBold',
    },
    imageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: '70%',
        height: 300,
        resizeMode: 'contain',
    },
    iconButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 10,
    },
    button: {
        backgroundColor: '#4C5483',
        paddingVertical: 5,
        width: 130,
        borderRadius: 5,
        marginHorizontal: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'Outfit-SemiBold',
    },
    iconButton: {
        marginVertical: 10,
    },
    icon: {
        fontSize: 32,
    },
    });

export default HomePage;
