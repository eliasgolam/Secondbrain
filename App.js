import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Haupt-Tabs
import HomeScreen from './screens/HomeScreen';
import KundendossierScreen from './screens/KundendossierScreen';
import RapportScreen from './screens/RapportScreen';
import MaterialScreen from './screens/MaterialScreen';
import RechnungenScreen from './screens/RechnungenScreen';

// Material Sub-Screens
import MaterialFormScreen from './screens/MaterialFormScreen';
import MaterialListScreen from './screens/MaterialListScreen';
import MaterialScannerScreen from './screens/MaterialScannerScreen';

const Tab = createBottomTabNavigator();
const MaterialStack = createNativeStackNavigator();

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

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color }) => {
              let iconName;
              switch (route.name) {
                case 'Home':
                  iconName = 'microphone';
                  break;
                case 'Kundendossiers':
                  iconName = 'account-box';
                  break;
                case 'Material':
                  iconName = 'qrcode-scan';
                  break;
                case 'Rapporte':
                  iconName = 'file-document-edit';
                  break;
                case 'Rechnungen':
                  iconName = 'file-certificate';
                  break;
                default:
                  iconName = 'apps';
              }
              return <MaterialCommunityIcons name={iconName} size={22} color={color} />;
            },
            tabBarActiveTintColor: '#007AFF',
            tabBarInactiveTintColor: '#888',
            tabBarLabelStyle: {
              fontSize: 11,
              paddingBottom: 2,
            },
            tabBarStyle: {
              height: 70,
              paddingBottom: Platform.OS === 'ios' ? 20 : 8,
              paddingTop: 4,
              backgroundColor: '#fff',
              borderTopWidth: 0.5,
              borderColor: '#ccc',
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Kundendossiers" component={KundendossierScreen} />
          <Tab.Screen name="Material" component={MaterialStackNavigator} />
          <Tab.Screen name="Rapporte" component={RapportScreen} />
          <Tab.Screen name="Rechnungen" component={RechnungenScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
