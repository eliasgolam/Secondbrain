import React from 'react';
import { Text, StyleSheet, View, Pressable, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../theme';

export default function PrimaryButton({
  title,
  onPress,
  icon,
  variant = 'primary',
  fullWidth = false,
  disabled = false,
}) {
  const getGradient = () => {
    const gradients = {
      primary: ['#4B6EF5', '#6C8BFA'],
      success: ['#28A745', '#5CD68A'],
      danger: ['#D32F2F', '#F87171'],
      neutral: ['#6B7280', '#9CA3AF']
    };
    return gradients[variant] || gradients.primary;
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.wrapper,
        fullWidth && { width: '100%' },
        disabled && styles.disabled,
        pressed && styles.pressed
      ]}
    >
      <LinearGradient
        colors={getGradient()}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.button]}
      >
        <View style={styles.content}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={18}
              color={theme.colors.white}
              style={{ marginRight: 8 }}
            />
          )}
          <Text style={styles.text}>{title}</Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: theme.radius.md,
    marginVertical: theme.spacing.xs,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  button: {
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: theme.colors.white,
    fontWeight: '600',
    fontSize: theme.typography.fontSize.normal,
  },
  disabled: {
    opacity: 0.6,
  },
  pressed: {
    transform: [{ scale: 0.98 }]
  }
});
