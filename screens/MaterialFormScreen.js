import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import AppContainer from '../components/AppContainer';
import PrimaryButton from '../components/PrimaryButton';
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

      <PrimaryButton
        title="📷 QR-Code erstellen"
        onPress={() => setQrVisible(true)}
      />

      {qrVisible && (
        <View style={styles.qrContainer}>
          <QRCode value={generateQRCodeValue()} size={200} />
        </View>
      )}

      <PrimaryButton
        title="✅ Speichern"
        onPress={handleSpeichern}
      />
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
  qrContainer: {
    alignItems: 'center',
    marginVertical: theme.spacing.lg
  }
});

export default MaterialFormScreen;