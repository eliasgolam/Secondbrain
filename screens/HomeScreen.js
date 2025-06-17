import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import AnimatedListeningCircle from '../components/AnimatedListeningCircle';
import MicButton from '../components/MicButton';
import BottomNav from '../components/BottomNav';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Secondbrain</Text>
      </View>

      <View style={styles.circleContainer}>
        <AnimatedListeningCircle />
      </View>

      <BottomNav />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  circleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
