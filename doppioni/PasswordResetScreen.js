import React, { useState } from 'react';
import {
    View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, Image,
    TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform
} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { supabase } from '../lib/supabase';
import { useTheme } from '../context/ThemeContext';
import Layout from './Layout';
import Spinner from 'react-native-loading-spinner-overlay';
export default function PasswordResetRequestScreen() {
    const { theme } = useTheme();
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const [loading, setLoading] = useState(false);
    const logo = require("../assets/images/logo.png")
    const handleResetRequest = async () => {
        if (!email) {
            Alert.alert('Errore', 'Per favore, inserisci la tua email.');
            return;
        }

        setLoading(true);
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: 'https://your-app.com/reset-password',
        });
        setLoading(false);

        if (error) {
            Alert.alert('Errore', error.message);
        } else {
            Alert.alert('Successo', 'Email di reset inviata. Controlla la tua casella di posta e segui il link per reimpostare la password.');
        }
    };

    const handleResetPassword = async () => {
        try {
            const isBiometricSupported = await LocalAuthentication.hasHardwareAsync();
            if (!isBiometricSupported) {
                Alert.alert('Error', 'Biometric authentication is not supported on this device');
                return;
            }

            const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
            if (!savedBiometrics) {
                Alert.alert('Error', 'No biometrics found. Please set up biometrics and try again.');
                return;
            }

            const biometricAuth = await LocalAuthentication.authenticateAsync({
                promptMessage: 'Usa l\'impronta per autenticarti',
                fallbackLabel: 'Enter password',
                cancelLabel: 'Cancel',
            });

            if (!biometricAuth.success) {
                if (biometricAuth.error !== 'user_cancel' && biometricAuth.error !== 'system_cancel') {
                    Alert.alert('Error', 'Biometric authentication failed');
                }
                return;
            }

            if (!email) {
                Alert.alert('Errore', 'Per favore, inserisci la tua email.');
                return;
            }

            setLoading(true);
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: 'https://your-app.com/reset-password',
            });
            setLoading(false);

            if (error) {
                Alert.alert('Errore', error.message);
            } else {
                Alert.alert('Successo', 'Email di reset inviata. Controlla la casella di posta e segui il link per reimpostare la password.');
                navigation.navigate('Home');
            }

        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };


    const handlePressEmptySpace = () => {
        Keyboard.dismiss(); // Nascondi la tastiera quando si tocca uno spazio vuoto
    };

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    const handleEmailChange = (text) => {
        setEmail(text);
        if (validateEmail(text)) {
            setEmailError('');
        } else {
            setEmailError('Email non valida');
        }
    };


    return (
        <Layout
            navigation={navigation}
            showTopBar={false}
            header
            //fab
            fabAction
            showBodyFooter={false}
            bodyFooter
        >
            <TouchableWithoutFeedback onPress={handlePressEmptySpace}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <View style={theme.body}>
                        <View style={theme.articl}>
                            <View style={theme.column}>
                                <Image source={logo} style={[theme.logoImage60, theme.mb20]} resizeMode='contain' />
                                <Text style={[theme.text, theme.h5, theme.fwb, theme.mb20]}>Form di registrazione</Text>
                            </View>
                            <Text style={styles.title}>Form Reset Password</Text>

                            <TextInput
                                style={theme.text}
                                placeholder="la tua email"
                                placeholderTextColor={theme.colors.slate8}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                onChangeText={handleEmailChange}
                                autoCorrect={false}
                                autoCapitalize='none'
                            />
                            {emailError ?
                                <Text style={theme.textDanger}>{emailError}</Text>
                                : null}

                            <TouchableOpacity
                                style={styles.button}
                                onPress={handleResetPassword}
                                disabled={loading}
                            >
                                <Text style={styles.buttonText}>
                                    {loading ? 'Invio richiesta in corso...' : 'Invia Richiesta Reset'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <Spinner
                            visible={loading} // Visualizza lo spinner quando loading è true
                            textContent={'Loading...'}
                            textStyle={theme.spinnerTextStyle}
                        />

                    </View >
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </Layout>
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