import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AppContainer from '../components/AppContainer';
import theme from '../theme';
import { getRapporte } from '../storage/RapportStorage';
import LottieView from 'lottie-react-native';

const RapportScreen = () => {
  const navigation = useNavigation();
  const [viewList, setViewList] = useState(false);
  const [rapporte, setRapporte] = useState([]);
  const [search, setSearch] = useState('');

  useFocusEffect(
    useCallback(() => {
      if (viewList) {
        const load = async () => {
          const result = await getRapporte();
          setRapporte(result);
        };
        load();
      }
    }, [viewList])
  );

  const filteredRapporte = rapporte.filter(r => {
    const text = `${r.projekt} ${r.mitarbeiter} ${r.datum}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

  const totalCount = rapporte.length;
  const currentWeekCount = rapporte.filter(r => {
    
    const datum = new Date(r.datum);
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay() + 1);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    return datum >= startOfWeek && datum <= endOfWeek;
  }).length;
  const lastRapport = rapporte[rapporte.length - 1];
const lastRapportDate = lastRapport
  ? new Date(lastRapport.datum).toLocaleDateString('de-DE')
  : 'Noch kein Rapport vorhanden';
const lastRapportOrt = lastRapport?.projekt || '—';
const lastRapportTeam = lastRapport?.teamgroesse || '—';


  return (
    <AppContainer style={styles.background}>
      <View style={styles.header}>
        <Text style={styles.title}>📄 Rapporte</Text>
        <Text style={styles.subtitle}>Tagesberichte & Dokumentation deiner Baustellen</Text>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>Gespeicherte Rapporte</Text>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Gesamt</Text>
            <Text style={styles.statValue}>{totalCount}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Diese Woche</Text>
            <Text style={styles.statValue}>{currentWeekCount}</Text>
          </View>
        </View>
      </View>

      {!viewList && (
        <View style={styles.actionsZone}>
          <TouchableOpacity style={styles.card} onPress={() => setViewList(true)}>
            <Text style={styles.cardTitle}>📁 Rapporte ansehen</Text>
            <Text style={styles.cardDesc}>➡ Liste aller bisherigen Rapporte</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('RapportWizard')}>
            <Text style={styles.cardTitle}>➕ Rapport erstellen</Text>
            <Text style={styles.cardDesc}>➡ Starte mit Sprache oder Formular</Text>
          </TouchableOpacity>

    <View style={styles.summaryCard}>
  <Text>🗓️ Letzter Rapport: {lastRapportDate}</Text>
  <Text>📍 Ort: {lastRapportOrt}  |  👷 {lastRapportTeam} Personen</Text>
</View>


          <View style={styles.lottieBox}>
            <LottieView
              source={require('../assets/Rapport.json')}
              autoPlay
              loop
              style={styles.lottie}
            />
          </View>
        </View>
      )}

      {viewList && (
        <ScrollView style={styles.listView}>
          <TextInput
            style={styles.searchInput}
            placeholder="🔍 Suche nach Rapport"
            value={search}
            onChangeText={setSearch}
          />
          {filteredRapporte.map((r, index) => (
            <View key={index} style={styles.rapportItem}>
              <Text>📅 {new Date(r.datum).toLocaleDateString('de-DE')}</Text>
              <Text>🧱 {r.projekt}</Text>
              <Text>👷 {r.mitarbeiter}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: theme.colors.backgroundLight || '#f9f9f9',
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    paddingTop: theme.spacing.lg,
  },
  title: {
    fontSize: theme.typography.fontSize.title,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.6)',
    marginTop: 8,
  },
  statsContainer: {
    backgroundColor: '#f0f0f5',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md
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
  },
  actionsZone: {
    paddingHorizontal: theme.spacing.md,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginVertical: theme.spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardDesc: {
    fontSize: 13,
    color: '#555',
    marginTop: 4,
  },
  summaryCard: {
    marginTop: theme.spacing.lg,
    padding: theme.spacing.md,
    backgroundColor: '#f1f1f1',
    borderRadius: theme.borderRadius.md,
  },
  listView: {
    marginTop: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    marginBottom: theme.spacing.sm,
  },
  rapportItem: {
    padding: theme.spacing.sm,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  lottieBox: {
    alignItems: 'center',
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.xl
  },
  lottie: {
    width: 220,
    height: 220
  }
});

export default RapportScreen;
