import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';
import AppContainer from '../components/AppContainer';
import PrimaryButton from '../components/PrimaryButton';
import LottieView from 'lottie-react-native';
import theme from '../theme';

const initialRechnungen = [
  {
    id: '1',
    name: 'Max Muster',
    betrag: 'CHF 240.00',
    datum: '12.06.2025'
  },
  {
    id: '2',
    name: 'Peter Peter',
    betrag: 'CHF 320.00',
    datum: '05.06.2025'
  }
];

const RechnungenScreen = () => {
  const [rechnungen, setRechnungen] = useState(initialRechnungen);

  const handlePdfOpen = (rechnung) => {
    alert(`PDF für ${rechnung.name} öffnen`);
  };

  const handleNewInvoice = () => {
    alert('Neue Rechnung erstellen');
  };

  return (
    <AppContainer>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>💼 Rechnungen</Text>
          <Text style={styles.subtitle}>Erstelle und exportiere deine Rechnungen</Text>
        </View>

        <PrimaryButton
          title="➕ Neue Rechnung erstellen"
          onPress={handleNewInvoice}
        />

        <Text style={styles.sectionTitle}>📄 Deine letzten Rechnungen:</Text>

        <View style={styles.listWrapper}>
          {rechnungen.map((item) => (
            <View key={item.id} style={styles.rechnungItem}>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>👤 {item.name} – {item.betrag}</Text>
                <Text style={styles.date}>📅 {item.datum}</Text>
              </View>
              <PrimaryButton
                title="📄 PDF öffnen"
                onPress={() => handlePdfOpen(item)}
              />
            </View>
          ))}
        </View>

        <View style={styles.lottieBox}>
          <LottieView
            source={require('../assets/Rechnungen.json')}
            autoPlay
            loop
            style={styles.lottie}
          />
        </View>

        <View style={styles.hinweisBox}>
          <Text style={styles.hinweisTitle}>📌 Hinweis:</Text>
          <Text style={styles.hinweisText}>
            Deine erstellten Rechnungen werden automatisch gespeichert.\nDu kannst sie jederzeit als PDF öffnen oder versenden.
          </Text>
        </View>
      </ScrollView>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.xl
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.md
  },
  title: {
    fontSize: theme.typography.fontSize.title,
    fontWeight: 'bold',
    color: theme.colors.text
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.6)',
    marginTop: 4,
    textAlign: 'center'
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.large,
    fontWeight: 'bold',
    marginVertical: theme.spacing.md,
    color: theme.colors.text
  },
  listWrapper: {
    gap: theme.spacing.sm
  },
  rechnungItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#eee',
    paddingVertical: theme.spacing.sm,
    gap: theme.spacing.sm
  },
  name: {
    fontSize: theme.typography.fontSize.normal,
    fontWeight: '500',
    color: theme.colors.text
  },
  date: {
    fontSize: theme.typography.fontSize.small,
    color: '#666'
  },
  lottieBox: {
    alignItems: 'center',
    marginVertical: theme.spacing.lg
  },
  lottie: {
    width: 220,
    height: 220
  },
  hinweisBox: {
    backgroundColor: '#fdfdfd',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  hinweisTitle: {
    fontWeight: 'bold',
    marginBottom: 4
  },
  hinweisText: {
    fontSize: 13,
    color: '#555'
  }
});

export default RechnungenScreen;
