import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet
} from 'react-native';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import AppContainer from '../components/AppContainer';
import theme from '../theme';

const initialMaterials = [
  { id: '1', name: 'Silikon', description: 'Dichtmasse', amount: '2' },
  { id: '2', name: 'Leiter', description: 'Aluleiter', amount: '1' }
];

const MaterialListScreen = () => {
  const [materials, setMaterials] = useState(initialMaterials);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleDelete = (id) => {
    Alert.alert('Löschen', 'Möchtest du dieses Material wirklich löschen?', [
      { text: 'Abbrechen', style: 'cancel' },
      {
        text: 'Löschen',
        onPress: () => {
          setMaterials(prev => prev.filter(item => item.id !== id));
          setModalVisible(false);
        },
        style: 'destructive'
      }
    ]);
  };

  const openEdit = (item) => {
    setSelectedMaterial(item);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text style={styles.itemDetail}>Menge: {item.amount}</Text>
      </View>
      <View style={styles.itemActions}>
        <TouchableOpacity onPress={() => setSelectedMaterial(item)}>
          <MaterialCommunityIcons name="qrcode" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openEdit(item)}>
          <AntDesign name="edit" size={22} color={theme.colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <AppContainer>
      <Text style={styles.title}>Materialliste</Text>

      <FlatList
        data={materials}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: theme.spacing.xl }}
      />

      {/* QR Modal */}
      <Modal visible={!!selectedMaterial} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>QR-Code Vorschau</Text>
            <QRCode value={JSON.stringify(selectedMaterial)} size={200} />
            <TouchableOpacity onPress={() => setSelectedMaterial(null)}>
              <Text style={styles.close}>Schließen</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Edit Modal */}
      <Modal visible={modalVisible} animationType="slide">
        <AppContainer>
          <Text style={styles.modalTitle}>Material bearbeiten</Text>
          <TextInput
            style={styles.input}
            value={selectedMaterial?.name}
            onChangeText={text =>
              setSelectedMaterial(prev => ({ ...prev, name: text }))
            }
          />
          <TextInput
            style={styles.input}
            value={selectedMaterial?.description}
            onChangeText={text =>
              setSelectedMaterial(prev => ({ ...prev, description: text }))
            }
          />
          <TextInput
            style={styles.input}
            value={selectedMaterial?.amount}
            keyboardType="numeric"
            onChangeText={text =>
              setSelectedMaterial(prev => ({ ...prev, amount: text }))
            }
          />
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDelete(selectedMaterial?.id)}
          >
            <Text style={styles.deleteText}>Material löschen</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={styles.close}>Abbrechen</Text>
          </TouchableOpacity>
        </AppContainer>
      </Modal>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: theme.typography.fontSize.title,
    fontWeight: 'bold',
    marginBottom: theme.spacing.md,
    textAlign: 'center',
    color: theme.colors.text
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: theme.spacing.sm,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm
  },
  itemTitle: {
    fontSize: theme.typography.fontSize.normal,
    fontWeight: 'bold',
    color: theme.colors.text
  },
  itemDetail: {
    fontSize: theme.typography.fontSize.small,
    color: '#555'
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalBox: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: theme.typography.fontSize.large,
    fontWeight: 'bold',
    marginBottom: theme.spacing.md
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm
  },
  deleteButton: {
    backgroundColor: '#d00',
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginTop: theme.spacing.sm
  },
  deleteText: {
    color: theme.colors.white,
    fontWeight: 'bold'
  },
  close: {
    color: 'red',
    textAlign: 'center',
    marginTop: theme.spacing.md,
    fontSize: theme.typography.fontSize.normal
  }
});

export default MaterialListScreen;
