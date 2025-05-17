/**
 * Application principale myapp
 * 
 * @module Nom_APP
 * @description Ce composant est le conteneur principal de l'application après authentification.
 * Il met en œuvre un système de navigation par onglets personnalisé avec persistance de l'onglet
 * actif et gère l'affichage des différents écrans de l'application.
 */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { FontAwesome5 } from '@expo/vector-icons';

import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/Header';
import WelcomeScreen from '../WelcomeScreen';
import TestScreen from '../TestScreen';

/**
 * Configuration des onglets disponibles dans l'application
 * Chaque onglet définit un nom d'affichage, une clé unique et une icône
 * 
 * @constant {Array<{name: string, key: string, icon: string}>}
 */
const TABS = [
  { name: 'Accueil', key: 'WelcomeScreen', icon: 'user' },

  { name: 'Test', key: 'Test', icon: 'bug' },
];

/**
 * Clé utilisée pour stocker l'onglet actif dans AsyncStorage
 * 
 * @constant {string}
 */
const ACTIVE_TAB_KEY = 'myapp_active_tab';

/**
 * Composant principal de l'application après authentification
 * 
 * @component
 * @description Ce composant gère :
 * - La barre de navigation personnalisée avec tous les onglets disponibles
 * - La persistance de l'onglet actif entre les sessions (via AsyncStorage)
 * - Le rendu conditionnel du contenu en fonction de l'onglet sélectionné
 * - L'affichage des notifications via une modale
 * - L'en-tête avec informations utilisateur et contrôles
 * 
 * Le composant est conçu pour être flexible et facilement extensible avec
 * de nouveaux onglets en modifiant simplement le tableau TABS.
 * 
 * @example
 * // Dans AppNavigator.tsx
 * {token && (
 *   <Stack.Screen name="Main" component={MyApp} />
 * )}
 * 
 * @returns {JSX.Element} L'interface principale de l'application avec navigation par onglets
 */
export default function MainApp() {
  /**
   * État pour suivre l'onglet actuellement actif
   */
  const [activeTab, setActiveTab] = useState<string | null>(null);
  
  /**
   * État pour contrôler la visibilité de la modale des notifications
   */
  const [showNotifications, setShowNotifications] = useState(false);
  
  /**
   * Hook de navigation pour accéder aux fonctions de navigation React Navigation
   */
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  /**
   * Effet pour charger l'onglet précédemment actif depuis AsyncStorage au démarrage
   */
  useEffect(() => {
    const loadTab = async () => {
      const savedTab = await AsyncStorage.getItem(ACTIVE_TAB_KEY);
      setActiveTab(savedTab || 'WelcomeScreen');
    };
    loadTab();
  }, []);

  /**
   * Gère le changement d'onglet et persiste la sélection
   * 
   * @param {string} key - Clé de l'onglet à activer
   */
  const handleTabChange = async (key: string) => {
    setActiveTab(key);
    await AsyncStorage.setItem(ACTIVE_TAB_KEY, key);
  };

  /**
   * Rendu conditionnel du contenu en fonction de l'onglet actif
   * 
   * @returns {JSX.Element} Le composant d'écran correspondant à l'onglet actif
   */
  const renderContent = () => {
    switch (activeTab) {
      case 'WelcomeScreen': return <WelcomeScreen />;
      case 'Test': return <TestScreen />;
      default: return <Text>Onglet inconnu</Text>;
    }
  };

  /**
   * Affiche un indicateur de chargement pendant le chargement de l'onglet actif
   */
  if (!activeTab) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        onShowNotifications={() => setShowNotifications(true)}
      />

      <View style={styles.content}>{renderContent()}</View>

      <View style={styles.navbar}>
        {TABS.map(({ name, key, icon }) => (
          <Pressable
            key={key}
            onPress={() => handleTabChange(key)}
            style={styles.tabButton}
          >
            <FontAwesome5
              name={icon}
              size={20}
              solid
              color={activeTab === key ? '#6C63FF' : '#6B7280'}
            />
            <Text
              style={[
                styles.tabLabel,
                activeTab === key && styles.tabLabelActive,
              ]}
            >
              {name}
            </Text>
          </Pressable>
        ))}
      </View>

      <Modal visible={showNotifications} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Notifications</Text>
            <Text style={styles.modalItem}>🎯 Vous avez un nouvel objectif !</Text>
            <Text style={styles.modalItem}>🔥 Continuez votre série de 3 jours !</Text>
            <Pressable
              onPress={() => setShowNotifications(false)}
              style={styles.modalButton}
            >
              <Text style={styles.modalButtonText}>Fermer</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Toast />
    </SafeAreaView>
  );
}

/**
 * Styles pour le composant myappApp
 */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  content: { flex: 1, padding: 16 },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#fff',
    paddingVertical: 12,
  },
  tabButton: { alignItems: 'center' },
  tabLabel: { fontSize: 12, color: '#9CA3AF' },
  tabLabelActive: { color: '#6C63FF' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  modalItem: { fontSize: 14, marginBottom: 8 },
  modalButton: {
    marginTop: 16,
    backgroundColor: '#6C63FF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  modalButtonText: { color: '#fff', fontWeight: 'bold' },
});