import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import AppContainer from '../components/AppContainer';
import PrimaryButton from '../components/PrimaryButton';
import theme from '../theme';

const initialRapporte = [
  { id: '1', name: 'Baustelle A', date: '25.06', status: 'Abgegeben' },
  { id: '2', name: 'Projekt B', date: '25.06', status: 'Entwurf' }
];

export default function AdminRapportScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [rapporte, setRapporte] = useState(initialRapporte);

  const filtered = rapporte.filter(
    (r) =>
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.date.includes(searchQuery) ||
      r.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusIcon = (status) => {
    if (status === 'Abgegeben') return '✅';
    if (status === 'Entwurf') return '🔄';
    return '';
  };

  return (
    <AppContainer>
      <Text style={styles.title}>📋 Rapporte</Text>

      <TextInput
        style={styles.input}
        placeholder="🔍 Suche: Projekt / Benutzer / Datum"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        style={styles.list}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.date}</Text>
            <Text style={styles.cell}>{getStatusIcon(item.status)} {item.status}</Text>
          </View>
        )}
        ListHeaderComponent={
          <View style={[styles.row, styles.header]}>
            <Text style={styles.cell}>Name</Text>
            <Text style={styles.cell}>Datum</Text>
            <Text style={styles.cell}>Status</Text>
          </View>
        }
      />

      <View style={styles.buttonRow}>
        <PrimaryButton title="📄 Rapport einsehen" onPress={() => {}} />
        <PrimaryButton title="✔️ Freigeben" onPress={() => {}} />
        <PrimaryButton title="🖨️ Exportieren" onPress={() => {}} />
      </View>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: theme.typography.fontSize.title,
    fontWeight: 'bold',
    marginVertical: theme.spacing.md,
    color: theme.colors.primary,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.sm
  },
  list: {
    marginBottom: theme.spacing.sm
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border
  },
  header: {
    backgroundColor: theme.colors.backgroundLight
  },
  cell: {
    flex: 1,
    fontSize: theme.typography.fontSize.normal
  },
  buttonRow: {
    gap: theme.spacing.sm
  }
});
