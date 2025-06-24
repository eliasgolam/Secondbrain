import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppContainer from '../components/AppContainer';
import PrimaryButton from '../components/PrimaryButton';
import LottieView from 'lottie-react-native';
import theme from '../theme';

const MaterialScreen = () => {
  const navigation = useNavigation();

  // Beispielhafte Material-Zustände (später dynamisch laden)
  const [materialien] = useState([]); // Liste von Materialien
  const [knapp] = useState([]); // Liste von knappen Materialien

  let statusText = '';
  let statusType = '';

  if (materialien.length === 0) {
    statusText = '❕ Noch keine Materialien im System\nLege dein erstes Material über die Schaltflächen unten an.';
    statusType = 'leer';
  } else if (knapp.length === 0) {
    statusText = '✅ Alle Lagerbestände sind vollständig\nDu hast alle Materialien ausreichend erfasst und verfügbar.';
    statusType = 'ok';
  } else {
    statusText = '⚠️ Einige Materialien sind knapp\nÜberprüfe die Materialliste und plane rechtzeitig Nachschub.';
    statusType = 'warnung';
  }

  return (
    <AppContainer>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>🧰 Materialverwaltung</Text>
          <Text style={styles.subtitle}>Verwalte Verbrauch & Verfügbarkeit</Text>
        </View>

        <View style={styles.statusBox}>
          <Text style={[styles.statusText, styles[`status_${statusType}`]]}>{statusText}</Text>
        </View>

        <View style={styles.buttonGroup}>
          <PrimaryButton
            title="📦 Material erfassen"
            onPress={() => navigation.navigate('MaterialForm')}
          />
          <PrimaryButton
            title="📋 Materialliste"
            onPress={() => navigation.navigate('MaterialList')}
          />
          <PrimaryButton
            title="📷 Material scannen"
            onPress={() => navigation.navigate('MaterialScanner')}
          />
        </View>

        <View style={styles.lottieWrapper}>
          <LottieView
            source={require('../assets/Material.json')}
            autoPlay
            loop
            style={styles.lottie}
          />
        </View>

        <View style={styles.hinweisBox}>
          <Text style={styles.hinweisTitle}>📌 Hinweis:</Text>
          <Text style={styles.hinweisText}>
            Kennzeichne deine Materialien mit QR-Codes, um
            den Bestand jederzeit im Blick zu behalten.
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
  statusBox: {
    backgroundColor: '#f0f0f5',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.md
  },
  statusText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20
  },
  status_warnung: {
    color: '#c00'
  },
  status_ok: {
    color: 'green'
  },
  status_leer: {
    color: '#555'
  },
  buttonGroup: {
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.lg
  },
  lottieWrapper: {
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

export default MaterialScreen;
