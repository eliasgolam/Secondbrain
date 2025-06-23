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
  ScrollView,
  Platform,
  StatusBar
} from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';


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
    const renderInput = (label, value) => (
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>{label}</Text>
        <TextInput value={value} style={styles.input} editable />
      </View>
    );

    const renderEmptyState = (message, actionLabel, onAction) => (
      <View style={styles.emptyState}>
        <Text>{message}</Text>
        <TouchableOpacity onPress={onAction} style={styles.actionButton}>
          <Text style={styles.actionText}>{actionLabel}</Text>
        </TouchableOpacity>
      </View>
    );

    switch (activeTab) {
      case 'Stammdaten':
        return (
          <View>
            {renderInput('Vorname', selectedKunde.vorname)}
            {renderInput('Nachname', selectedKunde.nachname)}
            {renderInput('Ort', selectedKunde.ort)}
            {renderInput('Telefon', selectedKunde.telefon)}
            {renderInput('Email', selectedKunde.email)}
          </View>
        );
      case 'Projekt':
        return (
          <View>
            {renderInput('Titel', selectedKunde.titel)}
            {renderInput('Beschreibung', selectedKunde.beschreibung)}
            {renderInput('Nachfolgetermin', selectedKunde.nachfolgetermin)}
            {renderInput('Datum', selectedKunde.datum)}
          </View>
        );
      case 'Rechnungen':
        return renderEmptyState('Keine Rechnungen vorhanden.', 'Rechnung erstellen', () => {});
      case 'Material':
        return renderEmptyState('Kein Material erfasst.', 'Material hinzufügen', () => {});
      case 'Termine':
        return renderEmptyState('Keine Termine vorhanden.', 'Termin eintragen', () => {});
      case 'Rapporte':
        return renderEmptyState('Keine Rapporte gefunden.', 'Rapport hinzufügen', () => {});
      case 'Dokumente':
        return (
          <View>
            <TouchableOpacity onPress={handleDocumentUpload} style={styles.uploadButton}>
              <Text>📎 Dokument hinzufügen</Text>
            </TouchableOpacity>
            {dokumente.length === 0 ? (
              <Text style={{ marginTop: 10 }}>Keine Dokumente vorhanden.</Text>
            ) : (
              dokumente.map((doc, index) => <Text key={index}>{doc.name}</Text>)
            )}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Kunden</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <AntDesign name="pluscircleo" size={24} color="#007AFF" />
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

        <Modal visible={modalVisible} animationType="slide">
          <SafeAreaView style={styles.modalContainer}>
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
          </SafeAreaView>
        </Modal>

        <Modal visible={viewDossier} animationType="slide">
          <SafeAreaView style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Kundendossier</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabBar}>
              {tabs.map(tab => (
                <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
                  <Text style={[styles.tab, activeTab === tab && styles.activeTab]}>{tab}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <ScrollView>{renderTabContent()}</ScrollView>
            <TouchableOpacity onPress={() => setViewDossier(false)}>
              <Text style={styles.close}>Zurück</Text>
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  container: { flex: 1, padding: 16 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  title: { fontSize: 24, fontWeight: 'bold' },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10
  },
  kundeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#f9f9f9'
  },
  modalContainer: { flex: 1 },
  modalContent: { padding: 20 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 12,
    borderRadius: 8
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    marginTop: 10
  },
  saveText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
  close: { color: 'red', textAlign: 'center', marginTop: 20 },
  tabBar: { flexDirection: 'row', marginVertical: 10 },
  tab: { padding: 10, marginRight: 10, color: '#555' },
  activeTab: {
    fontWeight: 'bold',
    color: '#007AFF',
    borderBottomWidth: 2,
    borderColor: '#007AFF'
  },
  uploadButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
    alignItems: 'center'
  },
  fieldContainer: { marginBottom: 12 },
  label: { fontWeight: '600', marginBottom: 4 },
  emptyState: {
    alignItems: 'center',
    marginTop: 20
  },
  actionButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 6
  },
  actionText: { color: 'white', fontWeight: 'bold' }
});

export default KundendossierScreen;