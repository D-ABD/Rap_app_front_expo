import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';
import client from '@/api/client';
import { useAuth } from '@/contexts/AuthContext';

const TestScreen = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const testToken = async () => {
    try {
      setLoading(true);
      const res = await client.get('/test-token/');
      setData(res.data);
    } catch {
      setData({ error: 'Token invalide ou erreur serveur' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      testToken();
    } else {
      setData({ error: 'Utilisateur non connecté (pas de token)' });
    }
  }, [isAuthenticated]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test du token JWT</Text>
      {loading && <ActivityIndicator size="large" color="#6C63FF" />}
      {data && <Text style={styles.result}>{JSON.stringify(data, null, 2)}</Text>}
      <View style={styles.button}>
        <Button title="Re-tester le token" onPress={testToken} color="#6C63FF" />
      </View>
    </View>
  );
};

export default TestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#6C63FF',
  },
  result: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#374151',
  },
  button: {
    width: '100%',
    marginTop: 12,
  },
});
