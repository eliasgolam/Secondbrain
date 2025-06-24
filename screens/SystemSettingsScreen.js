// screens/SystemSettingsScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Alert } from 'react-native';
import AppContainer from '../components/AppContainer';
import PrimaryButton from '../components/PrimaryButton';
import theme from '../theme';

export default function SystemSettingsScreen() {
  const [featureA, setFeatureA] = useState(true);
  const [featureB, setFeatureB] = useState(false);

  const triggerApiTest = () => {
    Alert.alert('API-Test', 'API-Endpunkt erfolgreich simuliert.');
  };

  const clearAppCache = () => {
    Alert.alert('Cache', 'Lokaler Speicher wurde simuliert gelöscht.');
  };

  return (
    <AppContainer>
      <View style={styles.section}>
        <Text style={styles.title}>Feature Flags</Text>
        <View style={styles.toggleRow}>
          <Text>Neues Rapport-System</Text>
          <Switch value={featureA} onValueChange={setFeatureA} />
        </View>
        <View style={styles.toggleRow}>
          <Text>Materialverwaltung aktiv</Text>
          <Switch value={featureB} onValueChange={setFeatureB} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Debug-Aktionen</Text>
        <PrimaryButton title="API-Endpunkt testen" onPress={triggerApiTest} />
        <PrimaryButton title="AppCache löschen" onPress={clearAppCache} />
      </View>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: theme.spacing.lg,
    padding: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.fontSize.title,
    fontWeight: 'bold',
    marginBottom: theme.spacing.sm,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
});
