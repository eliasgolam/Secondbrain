import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  ScrollView
} from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import AppContainer from '../components/AppContainer';
import theme from '../theme';
import { StyleSheet } from 'react-native';

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
    <AppContainer>
      <View style={styles.header}>
        <Text style={styles.title}>Kunden</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <AntDesign name="pluscircleo" size={24} color={theme.colors.primary} />
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

      {/* MODAL: Neuer Kunde */}
      <Modal visible={modalVisible} animationType="slide">
        <AppContainer>
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
        </AppContainer>
      </Modal>

      {/* MODAL: Kundendossier */}
      <Modal visible={viewDossier} animationType="slide">
        <AppContainer>
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
        </AppContainer>
      </Modal>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm
  },
  title: {
    fontSize: theme.typography.fontSize.title,
    fontWeight: 'bold',
    color: theme.colors.text
  },
  searchInput: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm
  },
  kundeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: theme.spacing.sm,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.white
  },
  modalContent: { padding: theme.spacing.md },
  modalTitle: {
    fontSize: theme.typography.fontSize.large,
    fontWeight: 'bold',
    marginBottom: theme.spacing.sm
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
    borderRadius: theme.borderRadius.md
  },
  saveButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    marginTop: theme.spacing.sm
  },
  saveText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
  close: { color: 'red', textAlign: 'center', marginTop: theme.spacing.md },
  tabBar: { flexDirection: 'row', marginVertical: theme.spacing.sm },
  tab: { padding: 10, marginRight: 10, color: '#555' },
  activeTab: {
    fontWeight: 'bold',
    color: theme.colors.primary,
    borderBottomWidth: 2,
    borderColor: theme.colors.primary
  },
  uploadButton: {
    marginTop: theme.spacing.md,
    padding: theme.spacing.sm,
    backgroundColor: '#eee',
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center'
  },
  fieldContainer: { marginBottom: theme.spacing.sm },
  label: { fontWeight: '600', marginBottom: 4, color: theme.colors.text },
  emptyState: {
    alignItems: 'center',
    marginTop: theme.spacing.md
  },
  actionButton: {
    marginTop: theme.spacing.sm,
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.sm
  },
  actionText: { color: 'white', fontWeight: 'bold' }
});

export default KundendossierScreen;
