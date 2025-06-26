import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import AppContainer from '../components/AppContainer';
import DashboardOverview from '../components/DashboardOverview';
import AdminNavigation from '../components/AdminNavigation';
import theme from '../theme';

export default function AdminPanelScreen() {
  return (
    <AppContainer>
      <ScrollView>
        <Text style={styles.header}>Admin Dashboard</Text>
        <DashboardOverview />
        <AdminNavigation />
      </ScrollView>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: theme.typography.fontSize.title,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: theme.spacing.md,
    color: theme.colors.primary
  }
});
