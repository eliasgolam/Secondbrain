import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Modal,
  TextInput,
  Alert,
  Platform,
  StatusBar
} from 'react-native';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';

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
          <MaterialCommunityIcons name="qrcode" size={24} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openEdit(item)}>
          <AntDesign name="edit" size={22} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Materialliste</Text>

        <FlatList
          data={materials}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />

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

        <Modal visible={modalVisible} animationType="slide">
          <SafeAreaView style={styles.modalContainer}>
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
          </SafeAreaView>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    padding: 16
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center'
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 12
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  itemDetail: {
    fontSize: 14,
    color: '#555'
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalBox: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12
  },
  deleteButton: {
    backgroundColor: '#d00',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  close: {
    color: 'red',
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16
  }
});

export default MaterialListScreen;