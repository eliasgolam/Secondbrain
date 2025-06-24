import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import AppContainer from '../components/AppContainer';
import theme from '../theme';

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
    Alert.alert('Gespeichert', 'Material wurde gespeichert.');
    navigation.goBack();
  };

  return (
    <AppContainer>
      <Text style={styles.title}>Neues Material erfassen</Text>

      <View style={styles.field}>
        <Text style={styles.label}>Bezeichnung:</Text>
        <TextInput
          style={styles.input}
          value={bezeichnung}
          onChangeText={setBezeichnung}
          placeholder="z. B. Silikon"
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

      <TouchableOpacity style={styles.qrButton} onPress={() => setQrVisible(true)}>
        <MaterialCommunityIcons name="qrcode" size={20} color={theme.colors.white} />
        <Text style={styles.qrButtonText}>QR-Code erstellen</Text>
      </TouchableOpacity>

      {qrVisible && (
        <View style={styles.qrContainer}>
          <QRCode value={generateQRCodeValue()} size={200} />
        </View>
      )}

      <TouchableOpacity style={styles.saveButton} onPress={handleSpeichern}>
        <Text style={styles.saveButtonText}>✅ Speichern</Text>
      </TouchableOpacity>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: theme.typography.fontSize.title,
    fontWeight: 'bold',
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
    color: theme.colors.text
  },
  field: {
    marginBottom: theme.spacing.md
  },
  label: {
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
    color: theme.colors.text
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm
  },
  qrButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    marginTop: theme.spacing.sm
  },
  qrButtonText: {
    color: theme.colors.white,
    fontWeight: '600',
    marginLeft: theme.spacing.sm
  },
  qrContainer: {
    alignItems: 'center',
    marginVertical: theme.spacing.lg
  },
  saveButton: {
    backgroundColor: '#28a745',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    marginTop: theme.spacing.md
  },
  saveButtonText: {
    color: theme.colors.white,
    fontWeight: 'bold',
    fontSize: theme.typography.fontSize.large
  }
});

export default MaterialFormScreen;
