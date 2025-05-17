/**
 * Point d'entrée principal de l'application
 * 
 * @module App
 * @description Ce composant est le point d'entrée racine de l'application.
 * Il initialise et encapsule tous les fournisseurs de contexte nécessaires,
 * la navigation et les composants UI globaux comme les notifications Toast.
 * 
 * Architecture de l'application:
 * - AuthProvider: Fournit l'état d'authentification à toute l'application
 * - AppNavigator: Gère la structure de navigation et les transitions entre écrans
 * - Toast: Composant de notification flottant accessible globalement
 * 
 * Cette structure en couches permet:
 * 1. Une gestion centralisée de l'authentification
 * 2. Une navigation conditionnelle basée sur l'état d'authentification
 * 3. Un système de notification unifié dans toute l'application
 * 
 * @example
 * // Intégration dans index.js
 * import { registerRootComponent } from 'expo';
 * import App from './App';
 * 
 * registerRootComponent(App);
 * 
 * @returns {JSX.Element} Le composant racine de l'application
 */
import React from 'react';
import Toast from 'react-native-toast-message';
import { AuthProvider } from '@/contexts/AuthContext';
import AppNavigator from '@/navigation/AppNavigator';

/**
 * Composant racine de l'application
 * 
 * @component
 */
export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
      <Toast />
    </AuthProvider>
  );
}