import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from '../theme';

export default function DashboardOverview() {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>🔔 Benachrichtigungen</Text>
      <Text style={styles.sectionTitle}>📊 Schnellübersicht</Text>
      <Text>- Offene Rechnungen: 12</Text>
      <Text>- Knappes Material: 3</Text>
      <Text>- Rapporte heute: 5</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.md
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.subtitle,
    fontWeight: 'bold',
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.xs
  }
});
