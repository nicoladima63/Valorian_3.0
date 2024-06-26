import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { useTheme } from '../context/ThemeContext';
import Layout from './Layout';
import {
    View, Text, Alert, Pressable, Image,
    Switch, ScrollView, TouchableWithoutFeedback, Keyboard,
    KeyboardAvoidingView, Platform, 
} from 'react-native';
import { Input, Icon } from '@rneui/themed';
import * as SecureStore from 'expo-secure-store';
import Spinner from 'react-native-loading-spinner-overlay';


export default function LoginScreen({ navigation }) {
    const [click, setClick] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { theme } = useTheme();

    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const passwordRef = useRef(null); 

    const logo = require("../assets/images/logo.png")

    useEffect(() => {
        const loadSavedData = async () => {
            try {
                const savedEmail = await SecureStore.getItemAsync('email');
                const savedPassword = await SecureStore.getItemAsync('password');
                if (savedEmail) setEmail(savedEmail);
                if (savedPassword) setPassword(savedPassword);
            } catch (error) {
                console.error('Errore nel caricamento dei dati memorizzati', error);
            }
        };

        loadSavedData();
    }, []);

    useEffect(() => {
        const saveData = async () => {
            try {
                await SecureStore.setItemAsync('email', email);
                await SecureStore.setItemAsync('password', password);
            } catch (error) {
                console.error('Errore nel salvataggio dei dati', error);
            }
        };

        saveData();
    }, [email, password]);

    const handlePressEmptySpace = () => {
        Keyboard.dismiss(); // Nascondi la tastiera quando si tocca uno spazio vuoto
    };

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePassword(password) {
        return password.length >= 6;
    }

    async function signInWithEmail() {
        if (!validateEmail(email)) {
            setEmailError('Inserisci un indirizzo email valido.');
            return;
        }
        if (!validatePassword(password)) {
            setPasswordError('La password deve essere di almeno 6 caratteri.');
            return;
        }

        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            Alert.alert(error.message);
        } else {
            navigation.replace('Tabs');
        }
        setLoading(false);
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
                    <View style={theme.contentPadding} ></View>
                    <View style={theme.body}>
                        <View style={theme.article}>
                            <View style={theme.column}>
                                <Image source={logo} style={[theme.logoImage60, theme.mb20]} resizeMode='contain' />
                                <Text style={[theme.text, theme.h3, theme.fwb, theme.mb20]}>Form di accesso</Text>
                            </View>

                            <Input
                                style={[theme.text,theme.text16]}
                                label="Email"
                                placeholder='email@esempio.com'
                                placeholderTextColor={theme.colors.slate9}
                                value={email}
                                onChangeText={handleEmailChange}
                                autoCorrect={false}
                                autoCapitalize='none'
                                returnKeyType="next" // Imposta il tipo di tasto di ritorno
                                onSubmitEditing={() => passwordRef.current.focus()} // Passa al prossimo TextInput quando viene premuto il tasto "Vai"
                            />
                            {emailError ?
                                <Text style={theme.textDanger}>{emailError}</Text>
                                : null}


                            <Input
                                style={[theme.text, theme.text16]}
                                ref={passwordRef}
                                label="Password"
                                placeholder='password'
                                placeholderTextColor={theme.colors.slate9}
                                secureTextEntry={!showPassword}
                                value={password}
                                onChangeText={(text) => {
                                    setPassword(text);
                                    setPasswordError('');
                                }}
                                autoCorrect={false}
                                rightIcon={
                                    <Icon
                                        color={theme.colors.slate10}
                                        type='font-awesome'
                                        name={showPassword ? 'eye' : 'eye-slash'}
                                        onPress={() => setShowPassword(!showPassword)}
                                    />
                                }
                                autoCapitalize="none"
                                returnKeyType="go" // Imposta il tipo di tasto di ritorno
                                onSubmitEditing={signInWithEmail} // Chiamata alla funzione di registrazione quando viene premuto "Vai"
                            />
                            {passwordError ?
                                <Text style={theme.textDanger}>{passwordError}</Text>
                                : null}
                            <View style={[theme.center,theme.mb20]}>
                                <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
                                    <Text style={[theme.text14,theme.link, theme.alignRight]}>Password dimenticata?</Text>
                                </Pressable>
                            </View>
                            <View style={[theme.article, theme.grid]}>
                                <View>
                                    <Text style={theme.text}>Ricordami</Text>
                                </View>
                                <View style={theme.Loginswitch}>
                                    <Switch value={click} onValueChange={setClick} trackColor={{ true: "green", false: "gray" }} />
                                </View>
                            </View>

                            <View style={[theme.article, theme.mt20]}>
                                <Pressable onPress={() => signInWithEmail()} style={[theme.grid, theme.TouchablebuttonPrimary, theme.br6, { justifyContent: 'space-evenly' }]}>
                                    <Text style={theme.h5}>Accedi</Text>
                                </Pressable>
                            </View>

                            <View style={[theme.article, theme.mt20,theme.mb20, theme.grid]}>
                                <Text style={[theme.text, theme.mt20]}>Non hai un Account?</Text>
                                <Pressable onPress={() => navigation.navigate('Register')}>
                                    <Text style={[theme.link, theme.alignRight]}>  Registrati</Text>
                                </Pressable>
                            </View>

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
}

