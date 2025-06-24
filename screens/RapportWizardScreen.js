import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import SignatureCanvas from 'react-native-signature-canvas';
import AppContainer from '../components/AppContainer';
import PrimaryButton from '../components/PrimaryButton';
import theme from '../theme';
import { saveRapport } from '../storage/RapportStorage';

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

const RapportWizardScreen = ({ navigation }) => {
  const [projekt, setProjekt] = useState('');
  const [mitarbeiter, setMitarbeiter] = useState('');
  const [datum] = useState(new Date());
  const [antworten, setAntworten] = useState(Array(fragen.length).fill(''));
  const [fotos, setFotos] = useState({});
  const [showSign, setShowSign] = useState(false);
  const [signature, setSignature] = useState(null);
  const [current, setCurrent] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  const handleInputChange = (text) => {
    const newAntworten = [...antworten];
    newAntworten[current] = text;
    setAntworten(newAntworten);
  };

  const handleFotoAufnehmen = async () => {
    const result = await ImagePicker.launchCameraAsync({ base64: false });
    if (!result.canceled) {
      const neueFotos = { ...fotos };
      neueFotos[current] = [...(neueFotos[current] || []), result.assets[0].uri];
      setFotos(neueFotos);
    }
  };

  const handleNext = () => {
    if (current < fragen.length - 1) {
      setCurrent(current + 1);
    } else {
      setShowSummary(true);
    }
  };

  const handleBack = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const handleSave = async () => {
    const rapport = {
      id: Date.now().toString(),
      datum: datum.toISOString(),
      projekt,
      mitarbeiter,
      antworten,
      fotos,
      signature
    };
    await saveRapport(rapport);
    navigation.goBack();
  };

  const renderFrageView = () => (
    <>
      <Text style={styles.progressText}>Frage {current + 1} / {fragen.length}</Text>
      <Text style={styles.question}>{fragen[current]}</Text>
      <TextInput
        multiline
        value={antworten[current]}
        onChangeText={handleInputChange}
        placeholder="Antwort hier eingeben..."
        style={styles.textInput}
      />
      <PrimaryButton title="📸 Foto hinzufügen" onPress={handleFotoAufnehmen} />
      <View style={styles.fotoContainer}>
        {(fotos[current] || []).map((uri, idx) => (
          <Image key={idx} source={{ uri }} style={styles.foto} />
        ))}
      </View>
      <View style={styles.buttonRow}>
      {current > 0 && (
  <PrimaryButton title="⬅️ Zurück" onPress={handleBack} />
)}
<PrimaryButton title="Weiter ➡️" onPress={handleNext} />

      </View>
      <View style={styles.progressBarWrapper}>
        <View style={[styles.progressBar, { width: `${((current + 1) / fragen.length) * 100}%` }]} />
      </View>
    </>
  );

  const renderSummaryView = () => (
    <ScrollView>
      <Text style={styles.summaryTitle}>Vorschau & Kontrolle</Text>
      <Text style={styles.metaText}>📅 {datum.toLocaleDateString('de-DE')}</Text>
      <Text style={styles.metaText}>🧱 Projekt: {projekt}</Text>
      <Text style={styles.metaText}>👷 Mitarbeiter: {mitarbeiter}</Text>

      {fragen.map((frage, i) => (
        <View key={i} style={styles.frageBlock}>
          <Text style={styles.frageLabel}>{i + 1}. {frage}</Text>
          <Text style={styles.frageAntwort}>{antworten[i]}</Text>
          {(fotos[i] || []).map((uri, idx) => (
            <Image key={idx} source={{ uri }} style={styles.foto} />
          ))}
        </View>
      ))}

      <Text style={styles.metaText}>✍️ Unterschrift:</Text>
      {!signature && !showSign && (
        <PrimaryButton title="Jetzt unterschreiben" onPress={() => setShowSign(true)} />
      )}
      {showSign && (
        <SignatureCanvas
          onOK={sig => {
            setSignature(sig);
            setShowSign(false);
          }}
          onEmpty={() => setShowSign(false)}
          autoClear={true}
          descriptionText="Bitte unterschreiben"
          webStyle="body {background-color: #fff;} .m-signature-pad--footer {display: none;}"
        />
      )}
      {signature && (
        <Image source={{ uri: signature }} style={styles.unterschrift} />
      )}

      <PrimaryButton title="✅ Rapport speichern & senden" onPress={handleSave} />
   <PrimaryButton title="✏️ Zurück zur Bearbeitung" onPress={() => setShowSummary(false)} />

    </ScrollView>
  );

  return (
    <AppContainer>
      <Text style={styles.title}>Rapport erstellen</Text>

      {!showSummary && (
        <>
          <TextInput
            placeholder="🧱 Projektname"
            value={projekt}
            onChangeText={setProjekt}
            style={styles.metaInput}
          />
          <TextInput
            placeholder="👷 Mitarbeitername"
            value={mitarbeiter}
            onChangeText={setMitarbeiter}
            style={styles.metaInput}
          />
        </>
      )}

      {showSummary ? renderSummaryView() : renderFrageView()}
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: theme.typography.fontSize.large,
    fontWeight: 'bold',
    marginBottom: theme.spacing.md
  },
  question: {
    fontSize: theme.typography.fontSize.normal,
    marginBottom: theme.spacing.sm
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    minHeight: 80,
    marginBottom: theme.spacing.sm
  },
  fotoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginVertical: theme.spacing.sm
  },
  foto: {
    width: 80,
    height: 80,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 8
  },
  link: {
    color: theme.colors.primary,
    marginTop: theme.spacing.sm,
    fontWeight: 'bold'
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.sm
  },
  progressBarWrapper: {
    height: 6,
    backgroundColor: '#eee',
    borderRadius: 3,
    marginTop: theme.spacing.md
  },
  progressBar: {
    height: 6,
    backgroundColor: theme.colors.primary,
    borderRadius: 3
  },
  progressText: {
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
    color: theme.colors.text
  },
  summaryTitle: {
    fontSize: theme.typography.fontSize.large,
    fontWeight: 'bold',
    marginVertical: theme.spacing.md
  },
  frageBlock: {
    marginBottom: theme.spacing.md
  },
  frageLabel: {
    fontWeight: 'bold',
    marginBottom: 4
  },
  frageAntwort: {
    marginBottom: theme.spacing.sm
  },
  unterschrift: {
    height: 100,
    resizeMode: 'contain',
    marginVertical: theme.spacing.sm
  },
  metaText: {
    marginBottom: 6,
    fontStyle: 'italic'
  },
  metaInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    marginBottom: theme.spacing.sm
  }
});

export default RapportWizardScreen;
