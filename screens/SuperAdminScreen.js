import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import AppContainer from '../components/AppContainer';
import theme from '../theme';

export default function SuperAdminScreen({ navigation }) {
  const [userName] = useState('Elias');
  const [role] = useState('SuperAdmin');
  const [lastLogin] = useState('24.06.2025 – 18:07 Uhr');

  // Beispielhafte Systemdaten (später dynamisch laden)
  const [userCount, setUserCount] = useState(12);
  const [errorCount, setErrorCount] = useState(0);
  const [lastAction, setLastAction] = useState('PDF-Export durch User 203');

  // Wenn keine Nutzer etc. vorhanden, Fallbacks anzeigen
  const displayUsers = userCount ?? 0;
  const displayErrors = errorCount ?? 0;
  const displayAction = lastAction || 'Noch keine Aktionen';

  return (
    <AppContainer>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>👋 Willkommen, {userName}!</Text>
          <Text style={styles.subTitle}>🔐 Rolle: {role}      🕒 Letzter Login: {lastLogin}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Systemstatus:</Text>
          <Text style={styles.statusLine}>• Nutzer aktiv: {displayUsers}      • Fehler gemeldet: {displayErrors}</Text>
          <Text style={styles.statusLine}>• Letzte Aktion: {displayAction}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🧭 Funktionen:</Text>

          <View style={styles.cardGrid}>
            <DashboardCard label="🧑‍💼 Nutzerverwaltung" onPress={() => navigation.navigate('UserManagement')} />
            <DashboardCard label="📋 Rapporte überwachen" onPress={() => navigation.navigate('Reports')} />
            <DashboardCard label="⚙️ Systemeinstellungen" onPress={() => navigation.navigate('SystemSettings')} />
            <DashboardCard label="📈 Statistiken & Auswertung" onPress={() => navigation.navigate('Statistics')} />
            <DashboardCard label="🧪 DevTools / Experimente" onPress={() => navigation.navigate('DevTools')} />
            <DashboardCard label="🔐 Notfallzugang / Reset" onPress={() => navigation.navigate('Emergency')} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📌 Hinweis:</Text>
          <Text style={styles.note}>Verwende die „Systeme“-Sektion, um globale Parameter zu ändern.</Text>
        </View>
      </ScrollView>
    </AppContainer>
  );
}

const DashboardCard = ({ label, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Text style={styles.cardLabel}>{label}</Text>
    <Text style={styles.cardButton}>🡆 Öffnen</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.md,
    gap: theme.spacing.lg
  },
  header: {
    alignItems: 'center',
    gap: 4
  },
  title: {
    fontSize: theme.typography.fontSize.title,
    fontWeight: 'bold',
    color: theme.colors.text,
    textAlign: 'center'
  },
  subTitle: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center'
  },
  section: {
    marginTop: theme.spacing.md,
    gap: 6
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.large,
    fontWeight: 'bold',
    color: theme.colors.text
  },
  statusLine: {
    fontSize: 14,
    color: '#333'
  },
  cardGrid: {
    marginTop: theme.spacing.sm,
    gap: theme.spacing.sm
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2
  },
  cardLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: theme.colors.text
  },
  cardButton: {
    fontSize: 16,
    color: theme.colors.primary,
    fontWeight: 'bold'
  },
  note: {
    fontSize: 13,
    color: '#444'
  }
});
