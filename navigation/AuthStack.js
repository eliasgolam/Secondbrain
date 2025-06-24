import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SuperAdminScreen from '../screens/SuperAdminScreen';
import AdminPanelScreen from '../screens/AdminPanelScreen';
import UserManagementScreen from '../screens/UserManagementScreen';
import SystemSettingsScreen from '../screens/SystemSettingsScreen';
import AppTabs from './AppTabs'; // dein alter Tab-Navigator aus App.js

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="SuperAdmin" component={SuperAdminScreen} />
      <Stack.Screen name="UserManagement" component={UserManagementScreen} />
      <Stack.Screen name="SystemSettings" component={SystemSettingsScreen} />
      <Stack.Screen name="AdminPanel" component={AdminPanelScreen} />
      <Stack.Screen name="AppTabs" component={AppTabs} />
    </Stack.Navigator>
  );
}
