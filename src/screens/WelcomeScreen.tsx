import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
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
      <Text style={styles.title}>myapp Test Screen</Text>
      
      <Pressable
        style={[styles.link, !token && styles.linkDisabled]}
        onPress={goToTest}
      >
        <FontAwesome5
          name="bug"
          size={18}
          color={token ? '#6C63FF' : '#9CA3AF'}
          style={{ marginRight: 10 }}
        />
        <Text style={[styles.linkText, !token && styles.linkTextDisabled]}>
          Test du token JWT
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6C63FF',
    marginBottom: 32,
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    width: '100%',
    elevation: 2,
  },
  linkDisabled: {
    opacity: 0.5,
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
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});