import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import AppContainer from '../components/AppContainer';
import PrimaryButton from '../components/PrimaryButton';
import theme from '../theme';

const initialRechnungen = [
  { id: '21', kunde: 'Meier AG', status: 'Offen' },
  { id: '20', kunde: 'Musterbau', status: 'Bezahlt' },
  { id: '19', kunde: 'Zimmer GmbH', status: 'Überfällig' }
];

const statusIcons = {
  Offen: '❌',
  Bezahlt: '✅',
  Überfällig: '⚠️'
};

const statusFilterOptions = ['Alle', 'Offen', 'Bezahlt', 'Überfällig'];

export default function AdminRechnungenScreen() {
  const [rechnungen, setRechnungen] = useState(initialRechnungen);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Alle');

  const handleStatusChange = (id) => {
    setRechnungen((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: 'Bezahlt' } : r
      )
    );
  };

  const filtered = rechnungen.filter((r) => {
    const matchFilter = selectedFilter === 'Alle' || r.status === selectedFilter;
    const matchSearch =
      r.kunde.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.id.includes(searchQuery);
    return matchFilter && matchSearch;
  });

  return (
    <AppContainer>
      <Text style={styles.title}>🧾 Rechnungen</Text>

      <View style={styles.filterRow}>
        {statusFilterOptions.map((status) => (
          <TouchableOpacity
            key={status}
            onPress={() => setSelectedFilter(status)}
            style={[
              styles.filterButton,
              selectedFilter === status && styles.filterButtonActive
            ]}
          >
            <Text style={styles.filterText}>{status}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder="🔍 Suche: Kundenname oder Rechnungsnummer"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        style={styles.list}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>#{item.id}</Text>
            <Text style={styles.cell}>{item.kunde}</Text>
            <Text style={styles.cell}>
              {statusIcons[item.status]} {item.status}
            </Text>
            {item.status !== 'Bezahlt' && (
              <TouchableOpacity onPress={() => handleStatusChange(item.id)}>
                <Text style={styles.action}>✅ Als bezahlt</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        ListHeaderComponent={
          <View style={[styles.row, styles.header]}>
            <Text style={styles.cell}>#</Text>
            <Text style={styles.cell}>Kunde</Text>
            <Text style={styles.cell}>Status</Text>
            <Text style={styles.cell}></Text>
          </View>
        }
      />

      <PrimaryButton title="📤 PDF Export" onPress={() => {}} />
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
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: theme.spacing.sm
  },
  filterButton: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  filterButtonActive: {
    backgroundColor: theme.colors.primaryLight
  },
  filterText: {
    fontSize: theme.typography.fontSize.small
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.sm
  },
  list: {
    marginBottom: theme.spacing.md
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
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
  action: {
    color: theme.colors.primary,
    fontWeight: 'bold',
    fontSize: theme.typography.fontSize.small
  }
});
