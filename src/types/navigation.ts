/**
 * Types de navigation de l'application
 * 
 * @module navigation-types
 * @description Ce module définit les types TypeScript pour toutes les routes
 * et paramètres de navigation utilisés dans l'application. Ces types permettent
 * d'assurer une navigation typée sécurisée à travers les différents écrans.
 */

/**
 * Type définissant les routes de la pile de navigation principale
 * 
 * @interface RootStackParamList
 * @description Définit les écrans accessibles dans le navigateur principal de l'application
 * et les paramètres que chaque route peut recevoir.
 * 
 * @property {undefined} Welcome - Écran d'accueil, ne prend pas de paramètres
 * @property {undefined} Login - Écran de connexion, ne prend pas de paramètres
 * @property {undefined} Main - Application principale après authentification, ne prend pas de paramètres
 * 
 * @example
 * // Dans AppNavigator.tsx
 * import { createNativeStackNavigator } from '@react-navigation/native-stack';
 * import { RootStackParamList } from '@/types/navigation';
 * 
 * const Stack = createNativeStackNavigator<RootStackParamList>();
 */
export type RootStackParamList = {
    Welcome: undefined;
    Login: undefined;
    Main: undefined;
  };
  
  /**
   * Type définissant les routes disponibles dans la navigation par onglets
   * 
   * @interface TabRoutes
   * @description Définit tous les onglets accessibles dans l'application principale
   * après authentification. Ces routes sont généralement utilisées dans un 
   * TabNavigator ou un DrawerNavigator.
   * 
   * @property {undefined} WelcomeScreen - Écran d'accueil de l'app authentifiée
   * @property {undefined} Dashboard - Tableau de bord principal
   * @property {undefined} Journal - Journal d'activités et de progression
   * @property {undefined} Stats - Statistiques et analyses
   * @property {undefined} Objectifs - Gestion des objectifs personnels
   * @property {undefined} Gamification - Fonctionnalités ludiques et récompenses
   * @property {undefined} Paramètres - Configuration de l'application
   * @property {undefined} Test - Écran de test (probablement pour le développement)
   * 
   * @example
   * // Dans un composant de navigation par onglets
   * import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
   * import { TabRoutes } from '@/types/navigation';
   * 
   * const Tab = createBottomTabNavigator<TabRoutes>();
   */
  export type TabRoutes = {
    WelcomeScreen: undefined;
    Dashboard: undefined;
    Journal: undefined;
    Stats: undefined;
    Objectifs: undefined;
    Gamification: undefined;
    Paramètres: undefined;
    Test: undefined;
  };