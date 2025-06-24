import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import theme from '../theme';
import HomeScreen from '../screens/HomeScreen';
import KundendossierScreen from '../screens/KundendossierScreen';
import MaterialScreen from '../screens/MaterialScreen';
import MaterialFormScreen from '../screens/MaterialFormScreen';
import MaterialListScreen from '../screens/MaterialListScreen';
import MaterialScannerScreen from '../screens/MaterialScannerScreen';
import RapportScreen from '../screens/RapportScreen';
import RapportWizardScreen from '../screens/RapportWizardScreen';
import RechnungenScreen from '../screens/RechnungenScreen';

const Tab = createBottomTabNavigator();
const MaterialStack = createNativeStackNavigator();
const RapportStack = createNativeStackNavigator();

function MaterialStackNavigator() {
  return (
    <MaterialStack.Navigator screenOptions={{ headerShown: false }}>
      <MaterialStack.Screen name="MaterialHome" component={MaterialScreen} />
      <MaterialStack.Screen name="MaterialForm" component={MaterialFormScreen} />
      <MaterialStack.Screen name="MaterialList" component={MaterialListScreen} />
      <MaterialStack.Screen name="MaterialScanner" component={MaterialScannerScreen} />
    </MaterialStack.Navigator>
  );
}

function RapportStackNavigator() {
  return (
    <RapportStack.Navigator screenOptions={{ headerShown: false }}>
      <RapportStack.Screen name="RapportHome" component={RapportScreen} />
      <RapportStack.Screen name="RapportWizard" component={RapportWizardScreen} />
    </RapportStack.Navigator>
  );
}

export default function AppTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color }) => {
          let iconName;
          switch (route.name) {
            case 'Home': iconName = 'microphone'; break;
            case 'Kundendossiers': iconName = 'account-box'; break;
            case 'Material': iconName = 'qrcode-scan'; break;
            case 'Rapporte': iconName = 'file-document-edit'; break;
            case 'Rechnungen': iconName = 'file-certificate'; break;
            default: iconName = 'apps';
          }
          return <MaterialCommunityIcons name={iconName} size={22} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: '#888',
        tabBarLabelStyle: { fontSize: 11, paddingBottom: 2 },
        tabBarStyle: {
          height: 70,
          paddingBottom: Platform.OS === 'ios' ? 20 : 8,
          paddingTop: 4,
          backgroundColor: theme.colors.white,
          borderTopWidth: 0.5,
          borderColor: '#ccc',
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Kundendossiers" component={KundendossierScreen} />
      <Tab.Screen name="Material" component={MaterialStackNavigator} />
      <Tab.Screen name="Rapporte" component={RapportStackNavigator} />
      <Tab.Screen name="Rechnungen" component={RechnungenScreen} />
    </Tab.Navigator>
  );
}
