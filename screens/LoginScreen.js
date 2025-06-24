// Einstiegspunkt App.js wird angepasst, um Login/Logout/Rollen zu ermöglichen
// Hier ist nur die Login-bezogene Logik – Navigationsstruktur folgt in den Screens

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import AppContainer from '../components/AppContainer';
import PrimaryButton from '../components/PrimaryButton';
import theme from '../theme';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

const handleLogin = () => {
  if (username === 'GPSAdmin' && password === 'GPS2025') {
    navigation.replace('SuperAdmin');
  } else if (username === 'admin' && password === 'admin123') {
    navigation.replace('AdminPanel');
  } else if (username === 'test' && password === 'test') {
    navigation.replace('AppTabs');
  } else {
    alert('Zugangsdaten ungültig');
  }
};

  return (
    <AppContainer>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>SecondBrain</Text>
      </View>

      <TextInput
        placeholder="Benutzername"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Passwort"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <PrimaryButton title="Anmelden" onPress={handleLogin} fullWidth />

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.link}>🔐 Passwort vergessen?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>📄 Noch keinen Account? Jetzt registrieren</Text>
      </TouchableOpacity>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg
  },
  logo: {
    width: 800,
    height: 220,
    marginBottom: theme.spacing.sm
  },
  title: {
    fontSize: theme.typography.fontSize.title,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.md
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.md
  },
  link: {
    textAlign: 'center',
    color: theme.colors.primary,
    marginTop: theme.spacing.sm,
    fontWeight: '600'
  }
});
