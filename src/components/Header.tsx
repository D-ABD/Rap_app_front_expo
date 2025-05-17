import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import LogoutButton from './Boutons/LogoutButton'; // ✅ ton bouton personnalisé
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';

type HeaderProps = {
  onShowNotifications: () => void;
};

export default function Header({ onShowNotifications }: HeaderProps) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>myapp</Text>
      <View style={styles.headerRight}>
        {/* 🔥 Streak badge */}
        <View style={styles.badge}>
          <FontAwesome5 name="fire" size={16} color="#EF4444" />
          <Text style={styles.badgeText}>3</Text>
        </View>

        {/* 🔔 Notifications */}
        <Pressable onPress={onShowNotifications} style={styles.notification}>
          <FontAwesome5 name="bell" size={20} color="#6C63FF" />
          <View style={styles.dot} />
        </Pressable>

        {/* 👤 Avatar */}
        <FontAwesome5 name="user" size={20} color="#6C63FF" />

        {/* 🚪 Déconnexion */}
            </View>
            <LogoutButton/>

            </View>
        );
        }

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6C63FF',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fee2e2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    marginRight: 8,
  },
  badgeText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#b91c1c',
    fontWeight: 'bold',
  },
  notification: {
    marginRight: 8,
    position: 'relative',
    padding: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    position: 'absolute',
    top: 2,
    right: 2,
  },
});
