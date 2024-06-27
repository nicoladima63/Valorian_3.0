import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { supabase } from './supabase'; // Assumi che 'supabase' sia il tuo file di configurazione di Supabase

const PasswordRecovery = () => {
    const [email, setEmail] = useState('');

    const handlePasswordReset = async () => {
        try {
            const { error } = await supabase.auth.api.resetPasswordForEmail(email);
            if (error) {
                throw error;
            }
            Alert.alert('Success', 'Password reset email sent successfully.');
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    useEffect(() => {
        const handleAuthStateChange = async (event, session) => {
            if (event === "PASSWORD_RECOVERY") {
                const newPassword = prompt("What would you like your new password to be?");
                try {
                    const { data, error } = await supabase.auth.updateUser({ password: newPassword });
                    if (data) {
                        Alert.alert('Success', 'Password updated successfully!');
                    }
                    if (error) {
                        throw error;
                    }
                } catch (error) {
                    Alert.alert('Error', error.message);
                }
            }
        };

        const authListener = supabase.auth.onAuthStateChange(handleAuthStateChange);

        return () => {
            authListener.unsubscribe();
        };
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, marginBottom: 20 }}>Password Recovery</Text>
            <TextInput
                style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingHorizontal: 10 }}
                placeholder="Enter your email"
                onChangeText={text => setEmail(text)}
                value={email}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <Button title="Reset Password" onPress={handlePasswordReset} />
        </View>
    );
};

export default PasswordRecovery;
