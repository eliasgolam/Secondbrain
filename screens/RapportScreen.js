import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
  Alert,
  ScrollView
} from 'react-native';
import * as Speech from 'expo-speech';
import { WebView } from 'react-native-webview';
import AnimatedListeningCircle from '../components/AnimatedListeningCircle';
import AppContainer from '../components/AppContainer';
import theme from '../theme';

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
    let html = `<html><head><style>
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
    <AppContainer>
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
        <AppContainer>
          <Text style={styles.modalTitle}>Rapport per Spracheingabe</Text>
          <TouchableOpacity onPress={sprecheFragen}>
            <AnimatedListeningCircle />
          </TouchableOpacity>
          <TouchableOpacity style={styles.primaryButton} onPress={handleOpenPreview}>
            <Text style={styles.primaryButtonText}>Rapport erfassen</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCloseModal}>
            <Text style={styles.close}>Abbrechen</Text>
          </TouchableOpacity>
        </AppContainer>
      </Modal>

      <Modal visible={previewVisible} animationType="fade">
        <AppContainer>
          <WebView
            originWhitelist={["*"]}
            source={{ html: generateHtmlForm() }}
            style={{ flex: 1 }}
          />
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => {
              setRapporte(prev => [...prev, `Rapport vom ${new Date().toLocaleDateString('de-DE')}`]);
              setPreviewVisible(false);
              Alert.alert("Rapport gespeichert", "Der Rapport wurde gespeichert.");
            }}
          >
            <Text style={styles.primaryButtonText}>Rapport einreichen</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.primaryButton} onPress={() => setPreviewVisible(false)}>
            <Text style={styles.primaryButtonText}>Löschen</Text>
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
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: theme.spacing.md
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md
  },
  buttonText: {
    color: theme.colors.white,
    fontWeight: '600'
  },
  listView: { flex: 1 },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    marginBottom: theme.spacing.sm
  },
  rapportItem: {
    padding: theme.spacing.sm,
    borderBottomWidth: 1,
    borderColor: '#eee'
  },
  modalTitle: {
    fontSize: theme.typography.fontSize.large,
    fontWeight: 'bold',
    marginBottom: theme.spacing.md
  },
  close: {
    marginTop: theme.spacing.sm,
    color: 'red',
    fontSize: theme.typography.fontSize.normal
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginVertical: theme.spacing.sm
  },
  primaryButtonText: {
    color: theme.colors.white,
    fontWeight: 'bold',
    fontSize: theme.typography.fontSize.normal
  }
});

export default RapportScreen;
