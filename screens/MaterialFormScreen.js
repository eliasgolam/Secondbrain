import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Alert
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';

const MaterialFormScreen = ({ navigation }) => {
  const [bezeichnung, setBezeichnung] = useState('');
  const [beschreibung, setBeschreibung] = useState('');
  const [menge, setMenge] = useState('1');
  const [qrVisible, setQrVisible] = useState(false);

  const generateQRCodeValue = () => {
    return JSON.stringify({
      name: bezeichnung,
      description: beschreibung,
      amount: menge
    });
  };

  const handleSpeichern = () => {
    if (!bezeichnung.trim()) {
      Alert.alert('Fehler', 'Bezeichnung ist erforderlich.');
      return;
    }
    // ⬇ Hier könntest du die Daten später speichern oder weitergeben
    Alert.alert('Gespeichert', 'Material wurde gespeichert.');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Neues Material erfassen</Text>

        <View style={styles.field}>
          <Text style={styles.label}>Bezeichnung:</Text>
          <TextInput
            style={styles.input}
            value={bezeichnung}
            onChangeText={setBezeichnung}
            placeholder="z. B. Silikon"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Beschreibung:</Text>
          <TextInput
            style={styles.input}
            value={beschreibung}
            onChangeText={setBeschreibung}
            placeholder="Optional"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Menge pro Scan:</Text>
          <TextInput
            style={styles.input}
            value={menge}
            onChangeText={setMenge}
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setQrVisible(true)}
        >
          <MaterialCommunityIcons name="qrcode" size={20} color="#fff" />
          <Text style={styles.buttonText}>QR-Code erstellen</Text>
        </TouchableOpacity>

        {qrVisible && (
          <View style={styles.qrContainer}>
            <QRCode value={generateQRCodeValue()} size={200} />
          </View>
        )}

        <TouchableOpacity style={styles.saveButton} onPress={handleSpeichern}>
          <Text style={styles.saveButtonText}>✅ Speichern</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  field: {
    marginBottom: 16
  },
  label: {
    fontWeight: '600',
    marginBottom: 4
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    marginTop: 12
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 10
  },
  qrContainer: {
    alignItems: 'center',
    marginVertical: 20
  },
  saveButton: {
    backgroundColor: '#28a745',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});

export default MaterialFormScreen;