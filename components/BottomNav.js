import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const navItems = [
  { icon: 'microphone', label: 'Spracheingabe', screen: 'Home' },
  { icon: 'account-box', label: 'Kundendossiers', screen: 'Kundendossiers' },
  { icon: 'qrcode-scan', label: 'Material', screen: 'Material' }, // Moved to middle
  { icon: 'file-document-edit', label: 'Rapporte', screen: 'Rapporte' },
  { icon: 'file-certificate', label: 'Rechnungen', screen: 'Rechnungen' },
];

const BottomNav = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const currentScreen = route.name;

  return (
    <View style={styles.container}>
      {navItems.map((item, index) => {
        const isActive = currentScreen === item.screen;
        return (
          <TouchableOpacity
            key={index}
            style={[styles.navItem, index === 2 && styles.middleItem]} // Center Material
            onPress={() => {
              if (item.screen) navigation.navigate(item.screen);
            }}
          >
            <MaterialCommunityIcons
              name={item.icon}
              size={24}
              color={isActive ? '#007AFF' : '#333'}
            />
            <Text style={[styles.label, isActive && styles.activeLabel]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  middleItem: {
    flex: 1.2,
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    color: '#333',
    textAlign: 'center'
  },
  activeLabel: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});

export default BottomNav;
