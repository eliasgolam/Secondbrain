// components/PrimaryButton.js

import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import theme from '../theme';

export default function PrimaryButton({ title, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: pressed ? theme.colors.primaryLight : theme.colors.surface,
          borderColor: pressed ? theme.colors.primary : theme.colors.border
        }
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2, // Android shadow
  },
  text: {
    color: theme.colors.primary,
    fontWeight: '600',
    fontSize: theme.typography.fontSize.normal,
  },
});
