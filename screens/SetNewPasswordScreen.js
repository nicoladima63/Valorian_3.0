import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { supabase } from '../lib/supabase';
import { useTheme } from '../context/ThemeContext';
export default function SetNewPasswordScreen({ route }) {
    const { theme } = useTheme();

  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSetNewPassword = async () => {
    if (!newPassword) {
      Alert.alert('Errore', 'Per favore, inserisci una nuova password.');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setLoading(false);

    if (error) {
      Alert.alert('Errore', error.message);
    } else {
      Alert.alert('Successo', 'La tua password è stata aggiornata con successo.');
        // Naviga alla schermata di login o home

    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Imposta Nuova Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Inserisci nuova password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleSetNewPassword}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Aggiornamento...' : 'Imposta Nuova Password'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
});