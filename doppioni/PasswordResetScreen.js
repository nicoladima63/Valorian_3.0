import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { supabase } from '../lib/supabase';
import { useTheme } from '../context/ThemeContext';
export default function PasswordResetRequestScreen() {
    const { theme } = useTheme();

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleResetRequest = async () => {
        if (!email) {
            Alert.alert('Errore', 'Per favore, inserisci la tua email.');
            return;
        }

        setLoading(true);
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: 'myapp://reset-password',
        });
        setLoading(false);

        if (error) {
            Alert.alert('Errore', error.message);
        } else {
            Alert.alert('Successo', 'Email di reset inviata. Controlla la tua casella di posta e segui il link per reimpostare la password.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Richiedi Reset Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Inserisci la tua email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handleResetRequest}
                disabled={loading}
            >
                <Text style={styles.buttonText}>
                    {loading ? 'Invio richiesta in corso...' : 'Invia Richiesta Reset'}
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