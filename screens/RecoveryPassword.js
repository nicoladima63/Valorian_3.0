import React, { useState, useEffect } from 'react';
import {
    View, Text, TextInput, Button, Alert, TouchableWithoutFeedback,
    KeyboardAvoidingView, Platform, Image

} from 'react-native';
import { supabase } from '../lib/supabase';
import { useTheme } from '../context/ThemeContext';
import Layout from './Layout';
import { Input, Icon } from '@rneui/themed';

const PasswordRecovery = ({ navigation }) => {
    const { theme } = useTheme();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState('');

    const logo = require("../assets/images/logo.png")

    useEffect(() => {
        const handleAuthStateChange = async (event, session) => {
            switch (event) {
                case 'PASSWORD_RECOVERY':
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
                    break;
                case 'INITIAL_SESSION':
                    // handle initial session
                    break;
                case 'SIGNED_IN':
                    // handle sign in event
                    break;
                case 'SIGNED_OUT':
                    // handle sign out event
                    break;
                case 'TOKEN_REFRESHED':
                    // handle token refreshed event
                    break;
                case 'USER_UPDATED':
                    // handle user updated event
                    break;
                default:
                    break;
            }
        };

        const authListener = supabase.auth.onAuthStateChange(handleAuthStateChange);

        return () => {
            authListener.unsubscribe();
        };
    }, []);

    const handlePasswordReset = async () => {
        try {
            //await supabase.auth.resetPasswordForEmail('hello@example.com', {
            //    redirectTo: 'http://example.com/account/update-password',
            //})
            const { error } = await supabase.auth.resetPasswordForEmail(email);
            if (error) {
                throw error;
            }
            Alert.alert('Success', 'Password reset email sent successfully.');
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
                        <View style={theme.column}>
                            <Image source={logo} style={[theme.logoImage60, theme.mb20]} resizeMode='contain' />
                            <Text style={[theme.text, theme.h4, theme.fwb, theme.mb20]}>Form recupero password</Text>
                        </View>
                        <Text style={[theme.text, theme.h5, theme.mb20]}>Password Recovery</Text>
                        <Input
                            style={[theme.text, theme.text16]}
                            label="Email"
                            placeholder="Enter your email"
                            placeholderTextColor={theme.colors.slate9}
                            onChangeText={handleEmailChange}
                            value={email}
                            autoCorrect={false}
                            autoCapitalize='none'
                            keyboardType="email-address"
                        />
                        {emailError ?
                            <Text style={theme.textDanger}>{emailError}</Text>
                            : null}
                        <View style={[theme.articleDefaul, theme.mt20]}>
                            <Button title="Reset Password" onPress={handlePasswordReset} />
                        </View>


                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </Layout >
    );
};

export default PasswordRecovery;
