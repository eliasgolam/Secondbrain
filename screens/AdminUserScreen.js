import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Alert } from 'react-native';
import AppContainer from '../components/AppContainer';
import PrimaryButton from '../components/PrimaryButton';
import theme from '../theme';

const initialUsers = [
  { id: '1', name: 'Max M.', role: 'Admin', lastLogin: '25.06 12:30' },
  { id: '2', name: 'Lisa B.', role: 'User', lastLogin: '25.06 11:10' }
];

export default function AdminUserScreen() {
  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleRole = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, role: u.role === 'Admin' ? 'User' : 'Admin' }
          : u
      )
    );
  };

  const removeUser = (id) => {
    Alert.alert('Nutzer entfernen', 'Möchtest du diesen Nutzer wirklich löschen?', [
      { text: 'Abbrechen' },
      {
        text: 'Entfernen',
        style: 'destructive',
        onPress: () => setUsers((prev) => prev.filter((u) => u.id !== id))
      }
    ]);
  };

  return (
    <AppContainer>
      <Text style={styles.title}>👥 Mitarbeiter</Text>

      <PrimaryButton title="➕ Neuer Mitarbeiter einladen" onPress={() => {}} />

      <TextInput
        style={styles.input}
        placeholder="🔍 Suche: Name oder Rolle"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id}
        style={styles.list}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={styles.userInfo}>
              <Text style={styles.cell}>{item.name}</Text>
              <Text style={styles.small}>Letzter Login: {item.lastLogin}</Text>
            </View>
            <Text style={styles.cell}>{item.role}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => toggleRole(item.id)}>
                <Text style={styles.action}>🔁 Rolle ändern</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => removeUser(item.id)}>
                <Text style={styles.remove}>❌ Entfernen</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: theme.typography.fontSize.title,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: theme.spacing.md,
    color: theme.colors.primary
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
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    paddingVertical: theme.spacing.sm
  },
  userInfo: {
    marginBottom: theme.spacing.xs
  },
  cell: {
    fontSize: theme.typography.fontSize.normal
  },
  small: {
    fontSize: theme.typography.fontSize.small,
    color: theme.colors.textLight
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.xs
  },
  action: {
    color: theme.colors.primary,
    fontWeight: 'bold'
  },
  remove: {
    color: theme.colors.error,
    fontWeight: 'bold'
  }
});
