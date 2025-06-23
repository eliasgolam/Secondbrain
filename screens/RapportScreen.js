import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
  SafeAreaView,
  Alert,
  ScrollView
} from 'react-native';
import * as Speech from 'expo-speech';
import { WebView } from 'react-native-webview';
import AnimatedListeningCircle from '../components/AnimatedListeningCircle';

const RapportScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [viewList, setViewList] = useState(false);
  const [rapporte, setRapporte] = useState([]);
  const [search, setSearch] = useState('');
  const currentIndex = useRef(0);
  const isSpeakingRef = useRef(false);

  const fragen = [
    'Nenne bitte das heutige Datum und deinen Namen.',
    'Wo hast du gearbeitet, und wie war das Wetter?',
    'Wann hast du angefangen und aufgehört, inklusive Pausen?',
    'Was genau hast du heute gemacht und wo?',
    'Gab es Fortschritte oder Wiederholungen von Arbeiten?',
    'Wer war heute im Team oder auf der Baustelle anwesend?',
    'Wurden Fremdfirmen eingesetzt oder besondere Zeiten erfasst?',
    'Welches Material und welche Maschinen kamen zum Einsatz?',
    'Gab es Lieferungen, Defekte oder Engpässe?',
    'Gab es Probleme, Sicherheitsvorfälle oder Abweichungen?',
    'Was sollte morgen vorbereitet werden oder mitgenommen?',
    'Gibt es sonstige Notizen oder Hinweise für das Team?',
    'Möchtest du Fotos oder Dokumente zu diesem Rapport erfassen?'
  ];

  const sprecheFragen = () => {
    if (!isSpeakingRef.current) return;
    if (currentIndex.current < fragen.length) {
      Speech.speak(fragen[currentIndex.current], {
        language: 'de-DE',
        voice: 'com.apple.ttsbundle.Markus-compact',
        rate: 0.95,
        pitch: 1.0,
        onDone: () => {
          setTimeout(() => {
            currentIndex.current++;
            sprecheFragen();
          }, 1500);
        }
      });
    } else {
      currentIndex.current = 0;
    }
  };

  const handleOpenModal = () => {
    currentIndex.current = 0;
    isSpeakingRef.current = true;
    setModalVisible(true);
    sprecheFragen();
  };

  const handleCloseModal = () => {
    isSpeakingRef.current = false;
    Speech.stop();
    currentIndex.current = 0;
    setModalVisible(false);
  };

  const handleOpenPreview = () => {
    isSpeakingRef.current = false;
    Speech.stop();
    currentIndex.current = 0;
    setModalVisible(false);
    setPreviewVisible(true);
  };

  const generateHtmlForm = () => {
    const today = new Date().toLocaleDateString('de-DE');
    let html = `
      <html><head><style>
      body { font-family: Arial; padding: 20px; }
      h1 { text-align: center; }
      .block { margin-bottom: 20px; }
      label { font-weight: bold; display: block; margin-bottom: 5px; }
      textarea {
        width: 100%; height: 60px;
        font-family: inherit; font-size: 14px;
        border: 1px solid #ccc; border-radius: 4px;
        padding: 8px;
      }
      </style></head><body>`;
    html += `<h1>Rapport vom ${today}</h1>`;
    fragen.forEach((frage, index) => {
      html += `<div class="block"><label>${index + 1}. ${frage}</label><textarea placeholder="Antwort hier eingeben..."></textarea></div>`;
    });
    html += `</body></html>`;
    return html;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Rapporte</Text>

      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.button} onPress={() => setViewList(true)}>
          <Text style={styles.buttonText}>Rapporte ansehen</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleOpenModal}>
          <Text style={styles.buttonText}>Rapport erstellen</Text>
        </TouchableOpacity>
      </View>

      {viewList && (
        <ScrollView style={styles.listView}>
          <TextInput
            style={styles.searchInput}
            placeholder="Suche nach Rapport"
            value={search}
            onChangeText={setSearch}
          />
          {rapporte
            .filter(r => r.toLowerCase().includes(search.toLowerCase()))
            .map((item, index) => (
              <TouchableOpacity key={index} onPress={handleOpenPreview}>
                <Text style={styles.rapportItem}>{item}</Text>
              </TouchableOpacity>
            ))}
        </ScrollView>
      )}

      <Modal visible={modalVisible} animationType="slide">
        <SafeAreaView style={styles.modalContent}>
          <Text style={styles.modalTitle}>Rapport per Spracheingabe</Text>
          <TouchableOpacity onPress={sprecheFragen}>
            <AnimatedListeningCircle />
          </TouchableOpacity>
          <TouchableOpacity style={styles.createButton} onPress={handleOpenPreview}>
            <Text style={styles.createButtonText}>Rapport erfassen</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCloseModal}>
            <Text style={styles.close}>Abbrechen</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>

      <Modal visible={previewVisible} animationType="fade">
        <SafeAreaView style={{ flex: 1 }}>
          <WebView
            originWhitelist={["*"]}
            source={{ html: generateHtmlForm() }}
            style={{ flex: 1 }}
          />
          <TouchableOpacity style={styles.createButton} onPress={() => {
            setRapporte(prev => [...prev, `Rapport vom ${new Date().toLocaleDateString('de-DE')}`]);
            setPreviewVisible(false);
            Alert.alert("Rapport gespeichert", "Der Rapport wurde gespeichert.");
          }}>
            <Text style={styles.createButtonText}>Rapport einreichen</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.createButton} onPress={() => setPreviewVisible(false)}>
            <Text style={styles.createButtonText}>Löschen</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  buttonGroup: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  button: { backgroundColor: '#007AFF', padding: 12, borderRadius: 8 },
  buttonText: { color: '#fff', fontWeight: '600' },
  listView: { flex: 1 },
  searchInput: {
    borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginBottom: 10
  },
  rapportItem: {
    padding: 10, borderBottomWidth: 1, borderColor: '#eee'
  },
  modalContent: { flex: 1, alignItems: 'center', padding: 20, justifyContent: 'space-between' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  close: { marginTop: 10, color: 'red', fontSize: 16 },
  createButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    marginBottom: 20
  },
  createButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});

export default RapportScreen;
