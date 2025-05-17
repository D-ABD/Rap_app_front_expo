import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';

import client from '../api/client';
import { useAuth } from '../context/AuthContext';

const UserScreen = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
  const { token } = useAuth();

  useEffect(() => {
    // 🔒 Redirection si l'utilisateur n'est pas connecté
    if (!token) {
      Toast.show({
        type: 'info',
        text1: 'Connexion requise',
        text2: 'Veuillez vous connecter pour accéder à votre profil.',
      });
      navigation.navigate('Login' as never);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await client.get('api/me/');
        setUser(res.data);
      } catch (err) {
        console.error('Erreur lors du chargement du profil :', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!user) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Impossible de charger le profil utilisateur.</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 p-4">
      <Text className="mb-4 text-2xl font-bold">Profil utilisateur</Text>
      <Text>Nom d'utilisateur : {user.username}</Text>
      <Text>Email : {user.email}</Text>
      <Text>XP : {user.xp}</Text>
      <Text>Niveau : {user.level}</Text>
      <Text>Progression : {user.level_progress}%</Text>
      <Text>Streak actuel : {user.current_streak}</Text>
      <Text>Streak max : {user.longest_streak}</Text>
    </ScrollView>
  );
};

export default UserScreen;
