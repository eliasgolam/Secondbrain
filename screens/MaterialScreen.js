import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const MaterialScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Materialverwaltung</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('MaterialForm')}
        >
          <MaterialCommunityIcons name="plus-box" size={20} color="#fff" />
          <Text style={styles.buttonText}>Material erfassen</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('MaterialList')}
        >
          <MaterialCommunityIcons name="clipboard-list" size={20} color="#fff" />
          <Text style={styles.buttonText}>Materialliste</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('MaterialScanner')}
        >
          <MaterialCommunityIcons name="qrcode-scan" size={20} color="#fff" />
          <Text style={styles.buttonText}>Material scannen</Text>
        </TouchableOpacity>

        <View style={styles.hinweisContainer}>
          <Text style={styles.hinweisText}>⚠️ Erinnerung: Handschuhe fehlen</Text>
          <Text style={styles.hinweisText}>🟥 Warnung: Farbeimer leer</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center'
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 10,
    marginBottom: 16
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 10
  },
  hinweisContainer: {
    marginTop: 'auto',
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8
  },
  hinweisText: {
    color: '#d00',
    fontSize: 14,
    marginBottom: 4
  }
});

export default MaterialScreen;
