import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Modal,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import LottieView from 'lottie-react-native';
import AppContainer from '../components/AppContainer';
import PrimaryButton from '../components/PrimaryButton';
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
  datum: '',
  ansprechpartner: ''
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
  const [weekCount, setWeekCount] = useState(0);
  const [showAddIcon, setShowAddIcon] = useState(false);

  useEffect(() => {
    setShowAddIcon(kunden.length > 0);
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    const count = kunden.filter(k => new Date(k.datum) >= startOfWeek).length;
    setWeekCount(count);
  }, [kunden]);

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

  const renderKundeCard = ({ item }) => (
    <View style={styles.kundeCard}>
      <Text style={styles.kundeName}>👤 {item.vorname} {item.nachname}</Text>
      <Text>📍 {item.ort || '—'}   |   📞 {item.telefon || '—'}</Text>
      <Text>👥 Ansprechpartner: {item.ansprechpartner || '—'}</Text>
      <TouchableOpacity
        onPress={() => {
          setSelectedKunde(item);
          setViewDossier(true);
          setActiveTab(tabs[0]);
        }}
      >
        <Text style={styles.dossierLink}>[ Dossier anzeigen ➥ ]</Text>
      </TouchableOpacity>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyStateCard}>
      <Text style={styles.emptyIcon}>🗂️</Text>
      <Text style={styles.emptyHeadline}>Kein Kunde vorhanden</Text>
      <Text style={styles.emptyText}>
        Klicke auf den Button, um deinen ersten Kunden zu erfassen.
      </Text>
      <PrimaryButton title="✍️ Kunden hinzufügen" onPress={() => setModalVisible(true)} />
      <LottieView
        source={require('../assets/Kunden.json')}
        autoPlay
        loop
        style={styles.lottie}
      />
    </View>
  );

  const renderTabContent = () => {
    if (!selectedKunde) return null;

    const renderInput = (label, value) => (
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>{label}</Text>
        <TextInput value={value} style={styles.input} editable />
      </View>
    );

    const renderEmpty = (msg, label, handler) => (
      <View style={styles.emptyState}>
        <Text>{msg}</Text>
        <PrimaryButton title={label} onPress={handler} />
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
        return renderEmpty('Keine Rechnungen vorhanden.', 'Rechnung erstellen', () => {});
      case 'Material':
        return renderEmpty('Kein Material erfasst.', 'Material hinzufügen', () => {});
      case 'Termine':
        return renderEmpty('Keine Termine vorhanden.', 'Termin eintragen', () => {});
      case 'Rapporte':
        return renderEmpty('Keine Rapporte gefunden.', 'Rapport hinzufügen', () => {});
      case 'Dokumente':
        return (
          <View>
            <PrimaryButton title="📎 Dokument hinzufügen" onPress={handleDocumentUpload} />
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
        <View>
          <Text style={styles.title}>👤 Kundenübersicht</Text>
          <Text style={styles.subtitle}>Verwalte Kunden & Ansprechpartner</Text>
        </View>
        {showAddIcon && (
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <AntDesign name="pluscircleo" size={26} color={theme.colors.primary} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.searchBox}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInputInner}
          placeholder="Suche Kunden …"
          value={search}
          onChangeText={setSearch}
        />
      </View>

    <View style={styles.statsContainer}>
  <Text style={styles.statsTitle}>📊 Kundenstatistik</Text>
  <View style={styles.statsRow}>
    <View style={styles.statBox}>
      <Text style={styles.statLabel}>Gesamt</Text>
      <Text style={styles.statValue}> {kunden.length}</Text>
    </View>
    <View style={styles.statBox}>
      <Text style={styles.statLabel}>Diese Woche</Text>
      <Text style={styles.statValue}> {weekCount}</Text>
    </View>
  </View>
</View>


      {kunden.length === 0 ? renderEmptyState() : (
        <FlatList
          data={filteredKunden}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderKundeCard}
        />
      )}

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
            <PrimaryButton title="Speichern" onPress={handleSave} />
          </ScrollView>
        </AppContainer>
      </Modal>

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
  subtitle: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.6)'
  },
  infoCard: {
    backgroundColor: '#f3f3f3',
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    marginVertical: theme.spacing.md
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.sm,
    marginBottom: theme.spacing.sm
  },
  searchIcon: {
    marginRight: 6
  },
  searchInputInner: {
    flex: 1,
    paddingVertical: 6
  },
  kundeCard: {
    backgroundColor: '#fff',
    padding: theme.spacing.sm,
    marginBottom: 8,
    borderRadius: theme.borderRadius.md,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2
  },
  kundeName: {
    fontWeight: 'bold',
    fontSize: 16
  },
  dossierLink: {
    color: theme.colors.primary,
    marginTop: 6
  },
  emptyStateCard: {
    marginTop: theme.spacing.md,
    padding: theme.spacing.lg,
    backgroundColor: '#f5f5f5',
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    gap: theme.spacing.md
  },
  emptyIcon: {
    fontSize: 36
  },
  emptyHeadline: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  emptyText: {
    textAlign: 'center',
    color: '#666'
  },
  lottie: {
    width: 200,
    height: 200,
    marginTop: theme.spacing.md
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
  close: { color: 'red', textAlign: 'center', marginTop: theme.spacing.md },
  tabBar: { flexDirection: 'row', marginVertical: theme.spacing.sm },
  tab: { padding: 10, marginRight: 10, color: '#555' },
  activeTab: {
    fontWeight: 'bold',
    color: theme.colors.primary,
    borderBottomWidth: 2,
    borderColor: theme.colors.primary
  },
  fieldContainer: { marginBottom: theme.spacing.sm },
  label: { fontWeight: '600', marginBottom: 4, color: theme.colors.text },
  emptyState: { alignItems: 'center', marginTop: theme.spacing.md }
    ,
  statsContainer: {
    backgroundColor: '#f0f0f5',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginVertical: theme.spacing.md
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333'
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  statBox: {
    flex: 1,
    backgroundColor: '#fff',
    padding: theme.spacing.sm,
    marginHorizontal: 4,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2
  },
  statLabel: {
    fontSize: 13,
    color: '#777',
    marginBottom: 4
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primary
  }

});

export default KundendossierScreen;
