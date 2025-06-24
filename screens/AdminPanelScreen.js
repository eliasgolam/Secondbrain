
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppContainer from '../components/AppContainer';
import theme from '../theme';

export default function AdminPanelScreen() {
  return (
    <AppContainer>
      <View style={styles.centered}>
        <Text style={styles.title}>🔧 Admin Panel</Text>
        <Text style={styles.subtitle}>Verwalte Projekte, Nutzer und Auswertungen</Text>
      </View>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: theme.typography.fontSize.title,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm
  },
  subtitle: {
    fontSize: theme.typography.fontSize.normal,
    color: theme.colors.text
  }
});
