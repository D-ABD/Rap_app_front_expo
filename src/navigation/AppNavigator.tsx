/**
 * Navigateur principal de l'application
 * 
 * @module AppNavigator
 * @description Ce module définit la structure de navigation de l'application,
 * gérant les transitions entre les différents écrans et les états d'authentification.
 * Il utilise React Navigation pour créer une hiérarchie de navigation basée sur
 * l'état d'authentification de l'utilisateur.
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import { useAuth } from '../contexts/AuthContext';
import { RootStackParamList } from '../types/navigation';
import MainApp from '@/screens/Main_screen/MyEvolApp';

/**
 * Pile de navigation principale typée avec les paramètres définis
 * dans RootStackParamList
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Composant de navigation principal
 * 
 * @component
 * @description Ce composant contrôle la navigation dans l'application en fonction
 * de l'état d'authentification. Il affiche différents écrans selon que l'utilisateur
 * est connecté ou non.
 * 
 * Fonctionnalités clés:
 * - Utilise le hook useAuth pour déterminer si l'utilisateur est authentifié
 * - Reconstruit le NavigationContainer quand l'état d'authentification change (via la prop key)
 * - Affiche l'écran de bienvenue pour tous les utilisateurs
 * - Affiche l'écran de connexion uniquement pour les utilisateurs non authentifiés
 * - Affiche l'application principale uniquement pour les utilisateurs authentifiés
 * 
 * @example
 * // Dans App.tsx
 * import AppNavigator from '@/navigation/AppNavigator';
 * import { AuthProvider } from '@/contexts/AuthContext';
 * 
 * export default function App() {
 *   return (
 *     <AuthProvider>
 *       <AppNavigator />
 *     </AuthProvider>
 *   );
 * }
 * 
 * @returns {JSX.Element} Structure de navigation complète de l'application
 */
export default function AppNavigator() {
  /**
   * Récupère l'état d'authentification depuis le contexte
   */
  const { token } = useAuth();

  return (
    <NavigationContainer key={token ? 'user' : 'guest'}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        {!token ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <Stack.Screen name="Main" component={MainApp} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}