import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';
import client from '../api/client';
import { useAuth } from '../contexts/AuthContext';

export default function UserScreen() {
  const { logout } = useAuth();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const response = await client.get('/users/me/');
      setUser(response.data.data); // ✅ adapté à ta structure personnalisée
    } catch (error) {
      console.error('Erreur lors du chargement du profil :', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.center}>
        <Text>Impossible de charger l'utilisateur</Text>
        <Button title="Se déconnecter" onPress={logout} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil Utilisateur</Text>
      <Text style={styles.label}>Nom complet : {user.first_name} {user.last_name}</Text>
      <Text style={styles.label}>Email : {user.email}</Text>
      <Text style={styles.label}>Rôle : {user.role}</Text>

      <Button title="Se déconnecter" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
});
