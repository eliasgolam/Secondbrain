// ForgotPasswordScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import AppContainer from '../components/AppContainer';
import PrimaryButton from '../components/PrimaryButton';
import theme from '../theme';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    // später Anbindung an E-Mail-Service
    alert(`Ein Link wird künftig an ${email} versendet.`);
    navigation.goBack();
  };

  return (
    <AppContainer>
      <Text style={styles.title}>🔐 Passwort vergessen</Text>
      <Text style={styles.subtitle}>Gib deine E-Mail-Adresse ein</Text>

      <TextInput
        style={styles.input}
        placeholder="Email-Adresse"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <PrimaryButton title="Link anfordern" onPress={handleSubmit} fullWidth />
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: theme.typography.fontSize.title,
    fontWeight: 'bold',
    marginBottom: theme.spacing.md,
    textAlign: 'center',
    color: theme.colors.text
  },
  subtitle: {
    fontSize: theme.typography.fontSize.normal,
    color: theme.colors.secondary,
    marginBottom: theme.spacing.md,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.md
  }
});
