/**
 * Environnement de configuration pour les tests
 * 
 * @module envMock
 * @description Ce module fournit des variables d'environnement simulées pour les tests
 * et le développement. Il permet de définir des points de terminaison d'API
 * et d'autres configurations sans dépendre de l'environnement réel.
 * 
 * @example
 * // Dans un test
 * jest.mock('../path/to/envConfig', () => require('../path/to/envMock'));
 * 
 * @property {string} API_URL - L'URL de base pour les appels API dans l'environnement de test
 */
module.exports = {
  API_URL: 'https://mock-api.test',
};