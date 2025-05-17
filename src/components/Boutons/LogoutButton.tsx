import React, { useState } from 'react';
import { Pressable, Text, StyleSheet, Modal, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import Toast from 'react-native-toast-message';

const LogoutButton = ({ customStyle = {}, textStyle = {}, iconOnly = false }) => {
  const { logout } = useAuth();
  const [confirmVisible, setConfirmVisible] = useState(false);

  const handleLogout = async () => {
    await logout();
    setConfirmVisible(false);
    Toast.show({
      type: 'info',
      text1: 'Déconnecté',
      text2: 'À bientôt 👋',
    });
  };

  const showConfirmation = () => {
    setConfirmVisible(true);
  };

  const hideConfirmation = () => {
    setConfirmVisible(false);
  };

  return (
    <>
      <Pressable 
        style={[styles.logoutButton, customStyle]} 
        onPress={showConfirmation}
      >
        <FontAwesome5 name="sign-out-alt" size={18} color="#fff" />
        {!iconOnly && (
          <Text style={[styles.logoutButtonText, textStyle]}>
            Se déconnecter
          </Text>
        )}
      </Pressable>

      {/* Modal de confirmation */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={confirmVisible}
        onRequestClose={hideConfirmation}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirmation</Text>
            <Text style={styles.modalText}>
              Êtes-vous sûr de vouloir vous déconnecter ?
            </Text>
            <View style={styles.modalButtons}>
              <Pressable 
                style={[styles.modalButton, styles.cancelButton]} 
                onPress={hideConfirmation}
              >
                <Text style={styles.cancelButtonText}>Annuler</Text>
              </Pressable>
              <Pressable 
                style={[styles.modalButton, styles.confirmButton]} 
                onPress={handleLogout}
              >
                <Text style={styles.confirmButtonText}>Déconnecter</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    backgroundColor: '#EF4444',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '80%',
    maxWidth: 320,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#374151',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#e5e7eb',
  },
  cancelButtonText: {
    color: '#4B5563',
    fontWeight: '600',
  },
  confirmButton: {
    backgroundColor: '#EF4444',
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default LogoutButton;