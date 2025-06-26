import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import AppContainer from '../components/AppContainer';
import PrimaryButton from '../components/PrimaryButton';
import theme from '../theme';

export default function AdminSettingsScreen() {
  const [company, setCompany] = useState('Mustermann AG');
  const [address, setAddress] = useState('Hauptstrasse 1, 8000 Zürich');
  const [layout, setLayout] = useState('Standard');
  const [iban, setIban] = useState('CH00 0000 0000 0000 0000 0');
  const [agb, setAgb] = useState('https://example.com/agb.pdf');

  return (
    <AppContainer>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>⚙️ Einstellungen</Text>

        <Text style={styles.label}>🏢 Firmenname</Text>
        <TextInput
          style={styles.input}
          value={company}
          onChangeText={setCompany}
        />

        <Text style={styles.label}>📍 Adresse</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
        />

        <Text style={styles.label}>🧾 Rechnungs-Layout</Text>
        <TextInput
          style={styles.input}
          value={layout}
          onChangeText={setLayout}
          placeholder="z. B. Standard, Kompakt, Elegant"
        />

        <Text style={styles.label}>🏦 IBAN / Bankverbindung</Text>
        <TextInput
          style={styles.input}
          value={iban}
          onChangeText={setIban}
        />

        <Text style={styles.label}>🎨 Logo / Farbschema hochladen</Text>
        <PrimaryButton title="🖼️ Logo hochladen" onPress={() => {}} />
        <PrimaryButton title="🎨 Farbschema wählen" onPress={() => {}} />

        <Text style={styles.label}>📜 Datenschutz & AGB</Text>
        <TextInput
          style={styles.input}
          value={agb}
          onChangeText={setAgb}
          placeholder="Link zu AGB oder PDF"
        />

        <PrimaryButton title="💾 Änderungen speichern" onPress={() => {}} />
      </ScrollView>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: theme.spacing.lg
  },
  title: {
    fontSize: theme.typography.fontSize.title,
    fontWeight: 'bold',
    textAlign: 'center',
    color: theme.colors.primary,
    marginVertical: theme.spacing.md
  },
  label: {
    fontSize: theme.typography.fontSize.small,
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.xs
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    padding: theme.spacing.sm
  }
});
