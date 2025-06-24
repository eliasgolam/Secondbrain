import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'rapporte';

export const saveRapport = async (rapport) => {
  try {
    const existing = await AsyncStorage.getItem(STORAGE_KEY);
    const parsed = existing ? JSON.parse(existing) : [];
    const updated = [...parsed, rapport];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Fehler beim Speichern:', e);
  }
};

export const getRapporte = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Fehler beim Laden:', e);
    return [];
  }
};

export const clearAllRapporte = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Fehler beim Löschen:', e);
  }
};
