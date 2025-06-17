import React, { useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';

const { width } = Dimensions.get('window');

const AnimatedListeningCircle = () => {
  const animationRef = useRef(null);
  const [isListening, setIsListening] = useState(false);

  const handlePress = () => {
    if (isListening) {
      animationRef.current?.pause();
      setIsListening(false);
      // TODO: Sprachaufnahme stoppen
    } else {
      animationRef.current?.play();
      setIsListening(true);
      // TODO: Sprachaufnahme starten
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
      <View style={styles.container}>
        <LottieView
          ref={animationRef}
          source={require('../assets/mic.json')}
          loop
          autoPlay={false}
          style={styles.animation}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: (width * 0.7) / 2,
    backgroundColor: '#F0F0F0',
    padding: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  animation: {
    width: '100%',
    height: '100%',
  },
});

export default AnimatedListeningCircle;
