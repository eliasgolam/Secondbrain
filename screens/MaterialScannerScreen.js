import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform, StatusBar, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';

const MaterialScannerScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="#888" />;
  }

  if (hasPermission === false) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.center}>
          <Text style={styles.error}>❌ Kein Kamera-Zugriff. Bitte erlaube die Berechtigung.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        ratio="16:9"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  camera: {
    flex: 1
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    padding: 20
  }
});

export default MaterialScannerScreen;
