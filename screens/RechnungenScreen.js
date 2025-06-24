import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppContainer from '../components/AppContainer';
import theme from '../theme';

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
    alert(`PDF für ${rechnung.name} öffnen`);
  };

  return (
    <AppContainer>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Rechnungen</Text>

        <TouchableOpacity style={styles.button}>
          <MaterialCommunityIcons name="file-plus" size={20} color={theme.colors.white} />
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
              <MaterialCommunityIcons name="file-pdf-box" size={26} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.md
  },
  title: {
    fontSize: theme.typography.fontSize.title,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
    color: theme.colors.text
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.lg
  },
  buttonText: {
    color: theme.colors.white,
    fontWeight: '600',
    fontSize: theme.typography.fontSize.normal,
    marginLeft: theme.spacing.sm
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.large,
    fontWeight: 'bold',
    marginBottom: theme.spacing.sm,
    color: theme.colors.text
  },
  rechnungItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#eee',
    paddingVertical: theme.spacing.sm
  },
  name: {
    fontSize: theme.typography.fontSize.normal,
    fontWeight: '500',
    color: theme.colors.text
  },
  date: {
    fontSize: theme.typography.fontSize.small,
    color: '#666'
  }
});

export default RechnungenScreen;
