import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LineChart, Grid } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import AppContainer from '../components/AppContainer';
import theme from '../theme';

const dummyData = {
  Tag: [200, 300, 250, 500, 400],
  Monat: [4200, 3900, 4700, 5100, 5300],
  Jahr: [45000, 49000, 55000, 60000, 62000]
};

const dummyLabels = {
  Tag: ['Mo', 'Di', 'Mi', 'Do', 'Fr'],
  Monat: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai'],
  Jahr: ['2020', '2021', '2022', '2023', '2024']
};

export default function AdminStatistikScreen() {
  const [filter, setFilter] = useState('Monat');

  const chartData = dummyData[filter];
  const labels = dummyLabels[filter];

  return (
    <AppContainer>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>📈 Statistik</Text>

        <View style={styles.filterRow}>
          {['Tag', 'Monat', 'Jahr'].map((f) => (
            <TouchableOpacity
              key={f}
              onPress={() => setFilter(f)}
              style={[
                styles.filterButton,
                filter === f && styles.filterButtonActive
              ]}
            >
              <Text>{f}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.subtitle}>Umsatzübersicht</Text>
          <LineChart
            style={{ height: 200 }}
            data={chartData}
            svg={{ stroke: theme.colors.primary, strokeWidth: 2 }}
            contentInset={{ top: 20, bottom: 20 }}
            curve={shape.curveMonotoneX}
          >
            <Grid />
          </LineChart>
          <View style={styles.labels}>
            {labels.map((l, i) => (
              <Text key={i} style={styles.labelText}>{l}</Text>
            ))}
          </View>
        </View>

        <View style={styles.block}>
          <Text style={styles.subtitle}>📊 Offene Rechnungen</Text>
          <Text>13 Rechnungen offen</Text>
        </View>

        <View style={styles.block}>
          <Text style={styles.subtitle}>📦 Verbrauch pro Material</Text>
          <Text>- Gipsplatten: 240</Text>
          <Text>- Kabelbinder: 130</Text>
        </View>

        <View style={styles.block}>
          <Text style={styles.subtitle}>👤 Aktive Nutzer / Woche</Text>
          <Text>25 Nutzer aktiv letzte Woche</Text>
        </View>
      </ScrollView>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: theme.spacing.lg
  },
  title: {
    fontSize: theme.typography.fontSize.title,
    fontWeight: 'bold',
    textAlign: 'center',
    color: theme.colors.primary,
    marginVertical: theme.spacing.md
  },
  subtitle: {
    fontSize: theme.typography.fontSize.subtitle,
    fontWeight: 'bold',
    marginBottom: theme.spacing.xs
  },
  chartContainer: {
    paddingHorizontal: theme.spacing.sm,
    marginBottom: theme.spacing.md
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.xs
  },
  labelText: {
    fontSize: theme.typography.fontSize.small
  },
  block: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.sm
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md
  },
  filterButton: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  filterButtonActive: {
    backgroundColor: theme.colors.primaryLight
  }
});
