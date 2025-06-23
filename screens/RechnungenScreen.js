import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
  StatusBar
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const initialRechnungen = [
  {
    id: '1',
    name: 'Max Muster',
    betrag: 'CHF 240',
    datum: '12.06.2025'
  },
  {
    id: '2',
    name: 'Peter Peter',
    betrag: 'CHF 320',
    datum: '05.06.2025'
  }
];

const RechnungenScreen = () => {
  const [rechnungen, setRechnungen] = useState(initialRechnungen);

  const handlePdfOpen = (rechnung) => {
    // Platzhalter: Hier später PDF-Vorschau oder Download öffnen
    alert(`PDF für ${rechnung.name} öffnen`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Rechnungen</Text>

        <TouchableOpacity style={styles.button}>
          <MaterialCommunityIcons name="file-plus" size={20} color="#fff" />
          <Text style={styles.buttonText}>Neue Rechnung erstellen</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Vergangene Rechnungen:</Text>

        {rechnungen.map((item) => (
          <View key={item.id} style={styles.rechnungItem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>• {item.name} – {item.betrag}</Text>
              <Text style={styles.date}>{item.datum}</Text>
            </View>
            <TouchableOpacity onPress={() => handlePdfOpen(item)}>
              <MaterialCommunityIcons name="file-pdf-box" size={26} color="#007AFF" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  container: {
    padding: 20
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 10,
    marginBottom: 24
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 10
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10
  },
  rechnungItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#eee',
    paddingVertical: 12
  },
  name: {
    fontSize: 15,
    fontWeight: '500'
  },
  date: {
    fontSize: 13,
    color: '#666'
  }
});

export default RechnungenScreen;
