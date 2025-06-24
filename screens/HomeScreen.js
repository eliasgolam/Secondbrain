// screens/HomeScreen.js

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import AppContainer from '../components/AppContainer';
import AnimatedListeningCircle from '../components/AnimatedListeningCircle';
import theme from '../theme';

export default function HomeScreen() {
  return (
    <AppContainer>
      <View style={styles.headerContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>SecondBrain</Text>
      </View>

      <View style={styles.circleContainer}>
        <AnimatedListeningCircle />
      </View>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.lg,
  },
  logo: {
    width: 800, // 250% größer als 160
    height: 150,
  },
  title: {
    fontSize: theme.typography.fontSize.title,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginTop: theme.spacing.sm,
  },
  circleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
