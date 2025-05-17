/**
 * Module de gestion d'authentification
 * 
 * @module AuthContext
 * @description Ce module fournit un contexte React pour gérer l'authentification
 * dans l'application. Il gère la connexion, la déconnexion et la persistance du token
 * JWT via AsyncStorage.
 */
import React, {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useContext,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import client from '@/api/client';
// import jwtDecode from 'jwt-decode'; // (optionnel) si tu veux extraire l'utilisateur

/**
 * Interface définissant les propriétés et méthodes du contexte d'authentification
 * 
 * @interface AuthContextType
 * @property {string|null} token - Le token JWT d'authentification ou null si non connecté
 * @property {Function} login - Fonction asynchrone pour s'authentifier avec email/mot de passe
 * @property {Function} logout - Fonction asynchrone pour se déconnecter
 */
interface AuthContextType {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

/**
 * Contexte React pour l'authentification avec valeurs par défaut
 * 
 * @constant {React.Context<AuthContextType>}
 */
const AuthContext = createContext<AuthContextType>({
  token: null,
  login: async () => {},
  logout: async () => {},
});

/**
 * Props du composant AuthProvider
 * 
 * @interface AuthProviderProps
 * @property {ReactNode} children - Composants enfants qui auront accès au contexte
 */
type AuthProviderProps = {
  children: ReactNode;
};

/**
 * Fournisseur du contexte d'authentification
 * 
 * @component
 * @description Ce composant encapsule la logique d'authentification et fournit
 * le contexte à tous ses enfants. Il gère la persistance du token, la connexion
 * et la déconnexion.
 * 
 * @example
 * // Dans votre composant racine (App.tsx)
 * import { AuthProvider } from '@/contexts/AuthContext';
 * 
 * const App = () => (
 *   <AuthProvider>
 *     <Navigation />
 *   </AuthProvider>
 * );
 * 
 * @param {AuthProviderProps} props - Les propriétés du composant
 * @returns {JSX.Element} Provider du contexte d'authentification
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);

  /**
   * Fonction d'authentification
   * 
   * @async
   * @function login
   * @description Envoie une requête d'authentification à l'API, stocke le token
   * et affiche une notification de succès ou d'erreur
   * 
   * @param {string} email - Email de l'utilisateur
   * @param {string} password - Mot de passe de l'utilisateur
   * @throws {Error} Si les identifiants sont invalides
   */
  const login = async (email: string, password: string) => {
    try {
      const res = await client.post('/token/', { email, password });
      const access = res.data.access;
      await AsyncStorage.setItem('token', access);
      setToken(access);

      // (Optionnel) extraire l'utilisateur depuis le token
      // const user = jwtDecode<{ username: string }>(access);

      Toast.show({
        type: 'success',
        text1: 'Bienvenue !',
        text2: 'Vous êtes maintenant connecté.', // ou `Bienvenue ${user.username}`
      });
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Erreur de connexion',
        text2: 'Identifiants invalides',
      });
      throw new Error('Invalid credentials');
    }
  };

  /**
   * Fonction de déconnexion
   * 
   * @async
   * @function logout
   * @description Supprime le token d'AsyncStorage et réinitialise l'état token
   */
  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setToken(null);
  };

  /**
   * Charge le token depuis AsyncStorage au démarrage
   * 
   * @async
   * @function loadToken
   * @description Vérifie si un token est stocké dans AsyncStorage et le charge dans l'état
   */
  const loadToken = async () => {
    const storedToken = await AsyncStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  };

  /**
   * Effet qui charge le token au montage du composant
   */
  useEffect(() => {
    loadToken();
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook personnalisé pour accéder au contexte d'authentification
 * 
 * @function useAuth
 * @description Fournit un accès simplifié au contexte d'authentification
 * 
 * @example
 * // Dans un composant
 * import { useAuth } from '@/contexts/AuthContext';
 * 
 * const MyComponent = () => {
 *   const { token, login, logout } = useAuth();
 *   
 *   return (
 *     <Button onPress={() => logout()}>
 *       Se déconnecter
 *     </Button>
 *   );
 * };
 * 
 * @returns {AuthContextType} Le contexte d'authentification
 */
export const useAuth = () => useContext(AuthContext);