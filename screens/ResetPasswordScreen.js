import React, { useEffect, useState, useRef } from 'react';
import {
    View, TextInput, Button, Alert, TouchableWithoutFeedback,
    KeyboardAvoidingView, Platform, Image, Text, Keyboard, TouchableOpacity
} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { supabase } from '../lib/supabase';

import { useTheme } from '../context/ThemeContext';
import Layout from './Layout';
import Spinner from 'react-native-loading-spinner-overlay';
import { MaterialIcons } from '@expo/vector-icons'; // Puoi cambiare la libreria di icone se preferisci
import { OnePress } from '../components/Pressables';

const ResetPasswordScreen = ({route,  navigation }) => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const passwordRef = useRef(null);
    const logo = require("../assets/images/logo.png")
    const { theme } = useTheme();
    const [loading, setLoading] = useState(false);
    const token = route.params?.token;

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

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    function validatePassword(password) {
        return password.length >= 6;
    }

    const handleEmailChange = (text) => {
        setEmail(text);
        if (validateEmail(text)) {
            setEmailError('');
        } else {
            setEmailError('Email non valida');
        }
    };

    const handlePressEmptySpace = () => {
        Keyboard.dismiss(); // Nascondi la tastiera quando si tocca uno spazio vuoto
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
                <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <View style={theme.body}>
                        <View style={theme.column}>
                            <Image source={logo} style={[theme.logoImage60, theme.mb20]} resizeMode='contain' />
                            <Text style={[theme.text, theme.h4, theme.fwb, theme.mb20]}>Form reset Password</Text>
                        </View>
                        <Text style={[theme.text, theme.mb15]}>La tua email</Text>

                        <TextInput
                            style={[theme.article, theme.text, theme.text16]}
                            placeholder="Email"
                            placeholderTextColor={theme.colors.slate9}
                            value={email}
                            onChangeText={handleEmailChange}
                            autoCorrect={false}
                            autoCapitalize='none'
                            returnKeyType="next"
                            keyboardType="email-address"
                            onSubmitEditing={() => passwordRef.current.focus()}
                        />
                        {emailError ?
                            <Text style={theme.textDanger}>{emailError}</Text>
                            : null}
                        <View style={[theme.mt40]}>
                            <TouchableOpacity
                                style={[theme.grid, theme.TouchablebuttonPrimary, theme.br6, { justifyContent: 'center', alignContent: 'center' }]}
                                onPress={handleResetPassword}
                            >
                                <Text style={theme.h5}>Reset Password</Text>
                            </TouchableOpacity>
                        </View>

                        <Spinner
                            visible={loading} // Visualizza lo spinner quando loading � true
                            textContent={'Loading...'}
                            textStyle={theme.spinnerTextStyle}
                        />

                    </View >
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </Layout>
    );
};

export default ResetPasswordScreen;
