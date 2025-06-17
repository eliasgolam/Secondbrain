import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const navItems = [
  { icon: 'microphone', label: 'Spracheingabe', screen: 'Home' },
  { icon: 'account-box', label: 'Kundendossiers', screen: 'Kundendossiers' },
  { icon: 'file-document-edit', label: 'Rapporte', screen: 'Rapporte' },
  { icon: 'cube-outline', label: 'Material', screen: 'Material' },
  { icon: 'file-certificate', label: 'Rechnungen', screen: 'Rechnungen' },
];

const BottomNav = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {navItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.navItem}
          onPress={() => {
            if (item.screen) navigation.navigate(item.screen);
          }}
        >
          <MaterialCommunityIcons name={item.icon} size={24} color="#333" />
          <Text style={styles.label}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  navItem: {
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    color: '#333',
  },
});

export default BottomNav;
