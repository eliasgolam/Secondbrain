import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform, StatusBar } from 'react-native';
import { Camera } from 'expo-camera';

const MaterialScannerScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <Text>Kameraberechtigung wird angefragt...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Zugriff auf Kamera wurde verweigert.</Text>;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Material scannen (Testmodus)</Text>

        <Camera
          style={styles.camera}
          ref={cameraRef}
          onCameraReady={() => setCameraReady(true)}
          ratio="16:9"
        />

        <Text style={styles.info}>📷 Kamera läuft – QR-Code Scan folgt später.</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  camera: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden'
  },
  info: {
    color: '#ccc',
    textAlign: 'center',
    marginTop: 10
  }
});

export default MaterialScannerScreen;
