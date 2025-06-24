import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AppContainer from '../components/AppContainer';
import theme from '../theme';

export default function RegisterScreen({ navigation }) {
  return (
    <AppContainer>
      <Text style={styles.title}>📄 Account erstellen</Text>
      <Text style={styles.subtitle}>Wähle ein Beispiel-Abo:</Text>

      <TouchableOpacity style={styles.optionBox}>
        <Text style={styles.optionTitle}>🚀 Basic</Text>
        <Text style={styles.optionDesc}>Basisfunktionen für kleine Teams</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionBox}>
        <Text style={styles.optionTitle}>💼 Standard</Text>
        <Text style={styles.optionDesc}>Erweiterte Funktionen & Support</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionBox}>
        <Text style={styles.optionTitle}>🏢 Premium</Text>
        <Text style={styles.optionDesc}>Alle Funktionen + Integrationen</Text>
      </TouchableOpacity>

      <Text style={styles.info}>Hinweis: Registrierung & Bezahlung folgen später.</Text>
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
  optionBox: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.sm
  },
  optionTitle: {
    fontSize: theme.typography.fontSize.large,
    fontWeight: 'bold',
    marginBottom: 4,
    color: theme.colors.primary
  },
  optionDesc: {
    color: theme.colors.secondary
  },
  info: {
    fontSize: theme.typography.fontSize.small,
    marginTop: theme.spacing.lg,
    textAlign: 'center',
    color: '#888'
  }
});
