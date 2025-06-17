import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  ScrollView
} from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import BottomNav from '../components/BottomNav';

const initialForm = {
  vorname: '',
  nachname: '',
  ort: '',
  telefon: '',
  email: '',
  titel: '',
  beschreibung: '',
  nachfolgetermin: '',
  datum: ''
};

const tabs = [
  'Stammdaten',
  'Projekt',
  'Rapporte',
  'Rechnungen',
  'Material',
  'Termine',
  'Dokumente'
];

const KundendossierScreen = () => {
  const [kunden, setKunden] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [selectedKunde, setSelectedKunde] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [viewDossier, setViewDossier] = useState(false);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [dokumente, setDokumente] = useState([]);

  const handleSave = () => {
    setKunden([...kunden, formData]);
    setFormData(initialForm);
    setModalVisible(false);
  };

  const filteredKunden = search
    ? kunden.filter(k =>
        `${k.vorname} ${k.nachname}`.toLowerCase().includes(search.toLowerCase())
      )
    : kunden;

  const handleDocumentUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
      if (!result.canceled) {
        setDokumente([...dokumente, result.assets[0]]);
      }
    } catch (err) {
      console.error('Dokument konnte nicht hochgeladen werden:', err);
    }
  };

  const renderTabContent = () => {
    if (!selectedKunde) return null;
    switch (activeTab) {
      case 'Stammdaten':
        return (
          <>
            <TextInput value={selectedKunde.vorname} style={styles.input} editable />
            <TextInput value={selectedKunde.nachname} style={styles.input} editable />
            <TextInput value={selectedKunde.ort} style={styles.input} editable />
            <TextInput value={selectedKunde.telefon} style={styles.input} editable />
            <TextInput value={selectedKunde.email} style={styles.input} editable />
          </>
        );
      case 'Projekt':
        return (
          <>
            <TextInput value={selectedKunde.titel} style={styles.input} editable />
            <TextInput value={selectedKunde.beschreibung} style={styles.input} editable />
            <TextInput value={selectedKunde.nachfolgetermin} style={styles.input} editable />
            <TextInput value={selectedKunde.datum} style={styles.input} editable />
          </>
        );
      case 'Dokumente':
        return (
          <>
            <TouchableOpacity onPress={handleDocumentUpload} style={styles.uploadButton}>
              <Text>📎 Dokument hinzufügen</Text>
            </TouchableOpacity>
            {dokumente.map((doc, index) => (
              <Text key={index}>{doc.name}</Text>
            ))}
          </>
        );
      default:
        return <Text>Bereich "{activeTab}" folgt später.</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Kunden</Text>
        <TouchableOpacity
          onPress={() => {
            console.log('Modal öffnen');
            setModalVisible(true);
          }}
        >
          <AntDesign name="plus" size={28} color="black" />
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Suche Kunden"
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredKunden}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.kundeItem}
            onPress={() => {
              setSelectedKunde(item);
              setViewDossier(true);
              setActiveTab(tabs[0]);
            }}
          >
            <Text>{item.vorname} {item.nachname}</Text>
            <MaterialIcons name="edit" size={20} color="gray" />
          </TouchableOpacity>
        )}
      />

      <Modal visible={viewDossier} animationType="slide">
        <SafeAreaView style={styles.modalContent}>
          <Text style={styles.modalTitle}>Kundendossier</Text>

          <ScrollView horizontal style={styles.tabBar}>
            {tabs.map(tab => (
              <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
                <Text style={[styles.tab, activeTab === tab && styles.activeTab]}>{tab}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <ScrollView style={{ flex: 1 }}>{renderTabContent()}</ScrollView>

          <TouchableOpacity onPress={() => setViewDossier(false)}>
            <Text style={styles.close}>Schließen</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>

      <Modal visible={modalVisible} animationType="slide">
        <ScrollView contentContainerStyle={styles.modalContent}>
          <Text style={styles.modalTitle}>Neuer Kunde</Text>
          {Object.keys(initialForm).map((key, index) => (
            <TextInput
              key={index}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              value={formData[key]}
              onChangeText={value => setFormData({ ...formData, [key]: value })}
              style={styles.input}
            />
          ))}
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveText}>Speichern</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={styles.close}>Abbrechen</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>

      <BottomNav />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 5
  },
  title: { fontSize: 24, fontWeight: 'bold' },
  searchInput: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 10, borderRadius: 5 },
  kundeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  modalContent: { padding: 20, flex: 1 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
  saveButton: { backgroundColor: '#007AFF', padding: 12, borderRadius: 5, marginTop: 10 },
  saveText: { color: 'white', textAlign: 'center' },
  close: { color: 'red', textAlign: 'center', marginTop: 20 },
  tabBar: { flexDirection: 'row', marginBottom: 10 },
  tab: { padding: 10, marginRight: 10, color: '#555' },
  activeTab: { fontWeight: 'bold', color: '#007AFF', borderBottomWidth: 2, borderColor: '#007AFF' },
  uploadButton: { marginTop: 20, padding: 10, backgroundColor: '#eee', borderRadius: 5, alignItems: 'center' },
});

export default KundendossierScreen;