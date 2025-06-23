import React, { useRef, useState } from 'react';
import { Dimensions, TouchableOpacity, Platform } from 'react-native';

const { width } = Dimensions.get('window');

const AnimatedListeningCircle = () => {
  const animationRef = useRef(null);
  const [isListening, setIsListening] = useState(false);

  const handlePress = () => {
    if (Platform.OS === 'web') {
      if (isListening) {
        animationRef.current?.stop();
      } else {
        animationRef.current?.play();
      }
    } else {
      if (isListening) {
        animationRef.current?.pause();
      } else {
        animationRef.current?.play();
      }
    }
    setIsListening(!isListening);
  };

  const commonStyle = {
    width: width * 0.8,
    height: width * 0.8,
    alignSelf: 'center',
  };

  if (Platform.OS === 'web') {
    const LottieView = require('lottie-react').default;
    return (
      <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
        <LottieView
          lottieRef={animationRef}
          animationData={require('../assets/mic.json')}
          loop
          autoplay={false}
          style={commonStyle}
        />
      </TouchableOpacity>
    );
  } else {
    const LottieView = require('lottie-react-native').default;
    return (
      <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
        <LottieView
          ref={animationRef}
          source={require('../assets/mic.json')}
          loop
          autoPlay={false}
          style={commonStyle}
        />
      </TouchableOpacity>
    );
  }
};

export default AnimatedListeningCircle;
