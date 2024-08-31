import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { useThemeContext } from '../components/ThemeContext';
import i18n from '../locales/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: screenWidth } = Dimensions.get('window');

const GuidePage = ({ navigation }) => {
  const { isDarkTheme } = useThemeContext();
  const themeTextStyle = isDarkTheme ? styles.darkThemeText : styles.lightThemeText;
  const themeContainerStyle = isDarkTheme ? styles.darkContainer : styles.lightContainer;

  const slides = [
    {
      title: i18n.t('Welcome to EasyDoc!'),
      subtitle: i18n.t('Welcome message'),
      image: isDarkTheme
        ? require('../assets/HelpPage/easyDocNight.png')
        : require('../assets/HelpPage/easyDoc.png')
    },
    {
      title: i18n.t('How to use AR'),
      subtitle: i18n.t('Scan the documentation2'),
      image: require('../assets/HelpPage/openCamera.gif')
    },
    {
      title: i18n.t('How to use AR'),
      subtitle: i18n.t('Touch AR2'),
      image: require('../assets/HelpPage/tapCamera.gif')
    },
    {
      title: i18n.t('View the document'),
      subtitle: i18n.t('View the document directly'),
      image: require('../assets/HelpPage/document.gif')
    },
    {
      title: i18n.t('How to use Chat Assistant2'),
      subtitle: i18n.t('Click text box'),
      image: require('../assets/HelpPage/openChat.gif')
    },
    {
      title: i18n.t('How to use Chat Assistant2'),
      subtitle: i18n.t('Do the best2'),
      image: require('../assets/HelpPage/text.gif')
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const swiperRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRefresh(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(1);
    }
  };

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(-1);
    }
  };

  const goToHome = async () => {
    await AsyncStorage.setItem('hasOnboarded', 'true');
    navigation.replace('Home');
  };

  const renderSlides = slides.map((slide, index) => (
    <View key={index} style={[styles.slide, themeContainerStyle]}>
      <View style={styles.contentContainer}>
        <Text style={[styles.title, themeTextStyle]}>{slide.title}</Text>
        <Image source={slide.image} style={styles.image} />
        <Text style={[styles.subtitle, themeTextStyle]}>{slide.subtitle}</Text>
        {slide.extraSubtitle && (
          <>
            <Image source={slide.image} style={styles.image} />
            <Text style={[styles.subtitle, themeTextStyle]}>{slide.extraSubtitle}</Text>
          </>
        )}
      </View>
    </View>
  ));

  return (
    <View style={[styles.container, themeContainerStyle]}>
      <Swiper
        ref={swiperRef}
        loop={false}
        showsPagination={true}
        paginationStyle={styles.paginationContainer}
        activeDot={<View style={styles.paginationDot} />}
        dot={<View style={styles.paginationDotInactive} />}
        onIndexChanged={(index) => setCurrentIndex(index)}
      >
        {renderSlides}
      </Swiper>
      <View style={styles.buttonContainer}>
        {currentIndex > 0 ? (
          <TouchableOpacity style={[styles.navButton, styles.prevButton]} onPress={handlePrev}>
            <Text style={styles.navButtonText}>{i18n.t('Previous')}</Text>
          </TouchableOpacity>
        ) : (
          <View style={[styles.navButton, styles.prevButton]} />
        )}
        {currentIndex < slides.length - 1 ? (
          <TouchableOpacity style={[styles.navButton, styles.nextButton]} onPress={handleNext}>
            <Text style={styles.navButtonText}>{i18n.t('Next')}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.floatingButton} onPress={goToHome}>
            <Text style={styles.floatingButtonText}>{i18n.t('Get Started')}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5CC',
  },
  title: {
    fontFamily: 'Outfit-Bold',
    fontSize: 30,
    marginTop: 40,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: 'Outfit-SemiBold',
  },
  lightContainer: {
    backgroundColor: '#E5E5CC',
  },
  darkContainer: {
    backgroundColor: '#2e3549',
  },
  lightThemeText: {
    color: '#242c40',
  },
  darkThemeText: {
    color: '#d0d0c0',
  },
  slide: {
    width: screenWidth,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    width: '85%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFF0',
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
  },
  image: {
    width: '90%',
    aspectRatio: 1,
    height: undefined,
    resizeMode: 'contain',
    marginVertical: 5,
  },
  paginationContainer: {
    bottom: 140,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
    backgroundColor: '#4C5483',
  },
  paginationDotInactive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
    backgroundColor: 'gray',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 70,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButton: {
    backgroundColor: '#4C5483',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  prevButton: {
    marginRight: 20,
  },
  nextButton: {
    marginLeft: 20,
  },
  navButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  floatingButton: {
    backgroundColor: '#4C5483',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default GuidePage;
