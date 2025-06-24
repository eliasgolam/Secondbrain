// screens/UserManagementScreen.js
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Modal, TextInput } from 'react-native';
import AppContainer from '../components/AppContainer';
import PrimaryButton from '../components/PrimaryButton';
import theme from '../theme';

const mockUsers = [
  { id: '1', name: 'Max Mustermann', role: 'admin', email: 'max@example.com', lastLogin: '2025-06-21' },
  { id: '2', name: 'Erika Musterfrau', role: 'mitarbeiter', email: 'erika@example.com', lastLogin: '2025-06-22' },
];

export default function UserManagementScreen() {
  const [users, setUsers] = useState(mockUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [roleInput, setRoleInput] = useState('');

  const openEditModal = (user) => {
    setSelectedUser(user);
    setRoleInput(user.role);
  };

  const saveRoleChange = () => {
    const updated = users.map(u => u.id === selectedUser.id ? { ...u, role: roleInput } : u);
    setUsers(updated);
    setSelectedUser(null);
  };

  return (
    <AppContainer>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.userCard}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.email}</Text>
            <Text>Rolle: {item.role}</Text>
            <Text>Letzter Login: {item.lastLogin}</Text>
            <PrimaryButton title="Bearbeiten" onPress={() => openEditModal(item)} />
          </View>
        )}
      />

      <Modal visible={!!selectedUser} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Rolle ändern für {selectedUser?.name}</Text>
            <TextInput
              value={roleInput}
              onChangeText={setRoleInput}
              placeholder="Neue Rolle eingeben"
              style={styles.input}
            />
            <PrimaryButton title="Speichern" onPress={saveRoleChange} />
            <PrimaryButton title="Abbrechen" onPress={() => setSelectedUser(null)} />
          </View>
        </View>
      </Modal>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: theme.spacing.md,
  },
  userCard: {
    backgroundColor: theme.colors.cardBackground || '#fff',
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    borderRadius: theme.radius.md || 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  name: {
    fontSize: theme.typography.fontSize.title,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContent: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: theme.typography.fontSize.title,
    fontWeight: 'bold',
    marginBottom: theme.spacing.sm
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: theme.spacing.sm,
  },
});