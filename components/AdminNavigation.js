import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PrimaryButton from './PrimaryButton';
import theme from '../theme';

export default function AdminNavigation() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <PrimaryButton onPress={() => navigation.navigate('MaterialScreen')} title="📦 Materialien" />
      <PrimaryButton onPress={() => navigation.navigate('RechnungenScreen')} title="🧾 Rechnungen" />
      <PrimaryButton onPress={() => navigation.navigate('RapportScreen')} title="📋 Rapporte" />
      <PrimaryButton onPress={() => navigation.navigate('UserManagementScreen')} title="👥 Mitarbeiter" />
      <PrimaryButton onPress={() => navigation.navigate('StatistikScreen')} title="📊 Statistiken" />
      <PrimaryButton onPress={() => navigation.navigate('SystemSettingsScreen')} title="⚙️ Einstellungen" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: theme.spacing.md,
    gap: theme.spacing.sm
  }
});
