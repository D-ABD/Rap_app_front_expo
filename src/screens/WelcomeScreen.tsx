import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function WelcomeScreen() {
  const { token } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const goToTest = async () => {
    if (!token) {
      Toast.show({
        type: 'error',
        text1: 'Connexion requise',
        text2: 'Veuillez vous connecter pour accéder au test.',
      });
      return;
    }

    await AsyncStorage.setItem('myapp_active_tab', 'Test');
    navigation.navigate('Main');
  };

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  useEffect(() => {
    if (token) {
      navigation.navigate('Main');
    }
  }, [token]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue sur <Text style={styles.brand}>MyApp</Text></Text>
      <Text style={styles.subtitle}>Testez l'accès sécurisé via votre jeton JWT</Text>

      <Pressable
        style={({ pressed }) => [
          styles.link,
          !token && styles.linkDisabled,
          pressed && styles.linkPressed
        ]}
        android_ripple={{ color: '#E5E7EB' }}
        onPress={goToTest}
      >
        <FontAwesome5
          name="bug"
          size={18}
          color={token ? '#6C63FF' : '#9CA3AF'}
          style={{ marginRight: 10 }}
        />
        <Text style={[styles.linkText, !token && styles.linkTextDisabled]}>
          Lancer un test JWT
        </Text>
      </Pressable>

      {!token && (
        <Pressable style={styles.loginButton} onPress={goToLogin}>
          <Text style={styles.loginButtonText}>🔐 Se connecter</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  brand: {
    color: '#6C63FF',
  },
  subtitle: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 32,
    textAlign: 'center',
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    width: '100%',
    elevation: 2,
    shadowColor: Platform.OS === 'android' ? 'black' : '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  linkDisabled: {
    opacity: 0.5,
  },
  linkPressed: {
    backgroundColor: '#f9fafb',
  },
  linkText: {
    fontSize: 16,
    color: '#374151',
  },
  linkTextDisabled: {
    color: '#9CA3AF',
  },
  loginButton: {
    marginTop: 24,
    backgroundColor: '#6C63FF',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 1,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
