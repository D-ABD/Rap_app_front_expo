/**
 * Configuration client API Axios
 * 
 * @module api
 * @description Ce module configure et exporte une instance Axios préconfigurée
 * pour les communications avec l'API backend. Il utilise l'URL de base définie
 * dans les variables d'environnement et configure les en-têtes par défaut.
 * 
 * @example
 * // Utilisation dans un service
 * import api from '@/services/api';
 * 
 * const fetchData = async () => {
 *   try {
 *     const response = await api.get('/endpoint');
 *     return response.data;
 *   } catch (error) {
 *     console.error('Erreur lors de la récupération des données:', error);
 *     throw error;
 *   }
 * };
 * 
 * @example
 * // Ajout d'un token d'authentification
 * api.interceptors.request.use(config => {
 *   const token = getAuthToken();
 *   if (token) {
 *     config.headers.Authorization = `Bearer ${token}`;
 *   }
 *   return config;
 * });
 */
import axios from 'axios';
import { API_URL } from '@env';

/**
 * Instance Axios préconfigurée
 * 
 * @constant {AxiosInstance}
 * @default
 */
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;