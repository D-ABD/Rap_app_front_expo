/**
 * Déclarations de type pour les variables d'environnement
 * 
 * @module env
 * @description Ce fichier de déclaration permet d'utiliser les variables d'environnement
 * dans le code TypeScript avec un support complet du typage. Il étend le module '@env'
 * pour que TypeScript reconnaisse les variables importées de ce module.
 * 
 * Ce fichier est nécessaire car TypeScript ne reconnaît pas automatiquement
 * les variables importées depuis des modules d'environnement comme '@env'.
 * 
 * @example
 * // Utilisation dans un autre fichier
 * import { API_URL } from '@env';
 * 
 * console.log(`L'URL de l'API est: ${API_URL}`);
 * 
 * @property {string} API_URL - L'URL de base pour les appels API
 */
declare module '@env' {
  export const API_URL: string;
}