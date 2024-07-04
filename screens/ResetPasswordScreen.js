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

const ResetPasswordScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [resetToken, setResetToken] = useState(''); 
    const passwordRef = useRef(null);
    const logo = require("../assets/images/logo.png")
    const { theme } = useTheme();
    const [loading, setLoading] = useState(false);

    const requestPasswordReset = async (email) => {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) {
            throw new Error('Error requesting password reset: ' + error.message);
        }
        // Inform the user to check their email
        Alert.alert('Check your email', 'A password reset link has been sent to your email address.');
    };


    const handleResetPassword = async () => {
        try {
            // Step 1: Request password reset link
            await requestPasswordReset(email);

            // Step 2: Biometric Authentication
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

            // Step 3: Use the reset token to update the password
            const { error } = await supabase.auth.updateUser({
                email,
                password: newPassword,
            }, resetToken);

            if (error) {
                throw new Error('Errore nel reset della password: ' + error.message);
            }

            Alert.alert('Success', 'Password resettata con successo');
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
                        <Text style={[theme.text, theme.mb15, theme.mt30]}>La nuova password</Text>
                        <TextInput
                            style={[theme.article, theme.text, theme.text16]}
                            ref={passwordRef}
                            placeholder="Password"
                            placeholderTextColor={theme.colors.slate9}
                            secureTextEntry={!showPassword}
                            value={newPassword}
                            onChangeText={(text) => {
                                setNewPassword(text);
                                setPasswordError('');
                            }}
                            secureTextEntry={!showPassword}
                            rightIcon={
                                <MaterialIcons
                                    name={showPassword ? 'eye' : 'eye-slash'}
                                    size={22}
                                    color={theme.colors.slate10}
                                    onPress={() => setShowPassword(!showPassword)}
                                />
                            }
                            autoCapitalize="none"
                            returnKeyType="go"
                            onSubmitEditing={handleResetPassword}
                        />
                        {passwordError ?
                            <Text style={theme.textDanger}>{passwordError}</Text>
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
                            visible={loading} // Visualizza lo spinner quando loading è true
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
