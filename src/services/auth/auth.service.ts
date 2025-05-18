import AsyncStorage from '@react-native-async-storage/async-storage';
import client from '../../api/client'; // ← ton fichier axios

const TOKEN_KEY = 'token';

export const login = async (email: string, password: string) => {
  const response = await client.post('/api/token/', { email, password });
  const { access } = response.data;
  await AsyncStorage.setItem(TOKEN_KEY, access);
  return access;
};

export const logout = async () => {
  await AsyncStorage.removeItem(TOKEN_KEY);
};

export const getToken = async () => {
  return await AsyncStorage.getItem(TOKEN_KEY);
};
