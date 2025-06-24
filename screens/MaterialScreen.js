import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppContainer from '../components/AppContainer';
import theme from '../theme';

const MaterialScreen = () => {
  const navigation = useNavigation();

  return (
    <AppContainer>
      <Text style={styles.title}>Materialverwaltung</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MaterialForm')}
      >
        <MaterialCommunityIcons name="plus-box" size={20} color={theme.colors.white} />
        <Text style={styles.buttonText}>Material erfassen</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MaterialList')}
      >
        <MaterialCommunityIcons name="clipboard-list" size={20} color={theme.colors.white} />
        <Text style={styles.buttonText}>Materialliste</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MaterialScanner')}
      >
        <MaterialCommunityIcons name="qrcode-scan" size={20} color={theme.colors.white} />
        <Text style={styles.buttonText}>Material scannen</Text>
      </TouchableOpacity>

      <View style={styles.hinweisContainer}>
        <Text style={styles.hinweisText}>⚠️ Erinnerung: Handschuhe fehlen</Text>
        <Text style={styles.hinweisText}>🟥 Warnung: Farbeimer leer</Text>
      </View>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: theme.typography.fontSize.title,
    fontWeight: 'bold',
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
    color: theme.colors.text
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md
  },
  buttonText: {
    color: theme.colors.white,
    fontWeight: '600',
    fontSize: theme.typography.fontSize.normal,
    marginLeft: theme.spacing.sm
  },
  hinweisContainer: {
    marginTop: 'auto',
    backgroundColor: '#f5f5f5',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md
  },
  hinweisText: {
    color: '#d00',
    fontSize: theme.typography.fontSize.small,
    marginBottom: 4
  }
});

export default MaterialScreen;
