import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import AppContainer from '../components/AppContainer';
import PrimaryButton from '../components/PrimaryButton';
import theme from '../theme';

const initialMaterials = [
  { id: '1', name: 'Silikon', stock: 12, status: 'OK' },
  { id: '2', name: 'Kabelbinder', stock: 2, status: 'Knapp' },
  { id: '3', name: 'Gipsplatten', stock: 0, status: 'Leer' }
];

export default function AdminMaterialScreen() {
  const [materials, setMaterials] = useState(initialMaterials);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = materials.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusIcon = (status) => {
    if (status === 'OK') return '✅';
    if (status === 'Knapp') return '⚠️';
    return '❌';
  };

  return (
    <AppContainer>
      <Text style={styles.title}>📋 Materialliste</Text>

      <TextInput
        style={styles.input}
        placeholder="🔍 Suche nach Material oder Status"
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
            <Text style={styles.cell}>{item.stock}</Text>
            <Text style={styles.cell}>{getStatusIcon(item.status)} {item.status}</Text>
          </View>
        )}
        ListHeaderComponent={
          <View style={[styles.row, styles.header]}>
            <Text style={styles.cell}>Name</Text>
            <Text style={styles.cell}>Bestand</Text>
            <Text style={styles.cell}>Status</Text>
          </View>
        }
      />

      <PrimaryButton title="📦 Neues Material erfassen" onPress={() => { /* z.B. Navigieren zu MaterialFormScreen */ }} />
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
    marginBottom: theme.spacing.md
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
  }
});
