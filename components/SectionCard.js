// SectionCard.js
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import theme from '../theme';
import PrimaryButton from './PrimaryButton';

export default function SectionCard({ icon, title, onPress }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
      <PrimaryButton title="Öffnen" onPress={onPress} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 160,
    height: 160,
    backgroundColor: theme.colors.cardBackground || '#fff',
    borderRadius: theme.radius.lg || 16,
    padding: theme.spacing.md,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
    margin: theme.spacing.sm,
  },
  icon: {
    fontSize: 32,
  },
  title: {
    fontSize: theme.typography.fontSize.title,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
