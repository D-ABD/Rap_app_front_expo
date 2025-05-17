/**
 * Client API avec intercepteur d'authentification
 * 
 * @module apiClient
 * @description Ce module configure et exporte une instance Axios avec un
 * intercepteur qui ajoute automatiquement le token d'authentification
 * JWT à chaque requête. Le token est récupéré à partir d'AsyncStorage.
 * 
 * @example
 * // Utilisation de base
 * import client from '@/services/apiClient';
 * 
 * const fetchUserData = async () => {
 *   try {
 *     const response = await client.get('/users/me');
 *     return response.data;
 *   } catch (error) {
 *     console.error('Erreur de récupération du profil:', error);
 *     throw error;
 *   }
 * };
 * 
 * @example
 * // Gestion d'erreurs avancée
 * client.interceptors.response.use(
 *   response => response,
 *   error => {
 *     if (error.response && error.response.status === 401) {
 *       // Rediriger vers la page de connexion
 *     }
 *     return Promise.reject(error);
 *   }
 * );
 */
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';

/**
 * Instance Axios configurée avec l'URL de base de l'API
 * 
 * @constant {AxiosInstance}
 */
const client = axios.create({
  baseURL: API_URL,
});

/**
 * Intercepteur de requête qui ajoute le token JWT aux en-têtes
 * Ce token est automatiquement récupéré depuis AsyncStorage
 * pour chaque requête sortante.
 */
client.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default client;