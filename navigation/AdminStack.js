import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AdminPanelScreen from '../screens/AdminPanelScreen';
import AdminMaterialScreen from '../screens/AdminMaterialScreen';
import AdminRechnungenScreen from '../screens/AdminRechnungenScreen';
import AdminRapportScreen from '../screens/AdminRapportScreen';
import AdminUserScreen from '../screens/AdminUserScreen';
import AdminStatistikScreen from '../screens/AdminStatistikScreen';
import AdminSettingsScreen from '../screens/AdminSettingsScreen';

const Stack = createNativeStackNavigator();

export default function AdminStack() {
  return (
    <Stack.Navigator initialRouteName="AdminPanel" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminPanel" component={AdminPanelScreen} />
      <Stack.Screen name="AdminMaterialScreen" component={AdminMaterialScreen} />
      <Stack.Screen name="AdminRechnungenScreen" component={AdminRechnungenScreen} />
      <Stack.Screen name="AdminRapportScreen" component={AdminRapportScreen} />
      <Stack.Screen name="AdminUserScreen" component={AdminUserScreen} />
      <Stack.Screen name="AdminStatistikScreen" component={AdminStatistikScreen} />
      <Stack.Screen name="AdminSettingsScreen" component={AdminSettingsScreen} />
    </Stack.Navigator>
  );
}
