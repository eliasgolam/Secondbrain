import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import RegisterScreen from '../screens/RegisterScreen';

import SuperAdminScreen from '../screens/SuperAdminScreen';
import UserManagementScreen from '../screens/UserManagementScreen';
import SystemSettingsScreen from '../screens/SystemSettingsScreen';

import AdminStack from './AdminStack'; // Enthält AdminPanel und Unterseiten
import AppTabs from './AppTabs';       // Für normale User

const Stack = createNativeStackNavigator();

// 🔄 Simulierter Loginstatus – später via AuthContext oder API ersetzen
export default function AuthStack() {
  const [user, setUser] = useState(null);

  // 👇 hier wäre deine Login-Logik z. B. nach erfolgreichem Login
  // setUser({ id: '123', role: 'admin' })

  if (!user) {
    // 🔐 Noch nicht eingeloggt → zeige Loginflow
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" options={{ title: 'Login' }}>
          {(props) => <LoginScreen {...props} onLoginSuccess={setUser} />}
        </Stack.Screen>
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    );
  }

  // ✅ Weiterleitung nach erfolgreichem Login
  if (user.role === 'superadmin') {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SuperAdmin" component={SuperAdminScreen} />
        <Stack.Screen name="UserManagement" component={UserManagementScreen} />
        <Stack.Screen name="SystemSettings" component={SystemSettingsScreen} />
      </Stack.Navigator>
    );
  }

  if (user.role === 'admin') {
    return <AdminStack />;
  }

  return <AppTabs />;
}
