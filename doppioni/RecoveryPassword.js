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



    return null;
};

export default PasswordRecovery;
