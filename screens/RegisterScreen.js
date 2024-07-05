import React, { useState, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { useTheme } from '../context/ThemeContext';
import Layout from './Layout';
import {
    View, Text, Alert, Pressable, Image,
    Switch, ScrollView, TouchableWithoutFeedback, Keyboard,
    KeyboardAvoidingView, Platform
} from 'react-native';
import { Input, Icon } from '@rneui/themed';

import Spinner from 'react-native-loading-spinner-overlay';


export default function RegisterScreen({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { theme } = useTheme();

    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const passwordRef = useRef(null); // Riferimento al TextInput della password

    const logo = require("../assets/images/logo.png")
    //const facebook = require("../assets/images/react-logo.png")
    //const linkedin = require("../assets/images/react-logo.png")
    //const tiktok = require("../assets/images/react-logo.png")


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

    async function signUpWithEmail() {
        if (!validateEmail(email)) {
            setEmailError('Inserisci un indirizzo email valido.');
            return;
        }
        if (!validatePassword(password)) {
            setPasswordError('La password deve essere di almeno 6 caratteri.');
            return;
        }

        setLoading(true);
        const { data: { session }, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) {
            Alert.alert(error.message);
        } else {
            if (!session) {
                Alert.alert('Controlla la tua email per verificare il tuo account!');
                navigation.replace('Welcome');
            } else {
                navigation.replace('Tabs');
            }
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
                    <View style={theme.body}>
                        <View style={theme.articl}>
                            <View style={theme.column}>
                                <Image source={logo} style={[theme.logoImage60, theme.mb20]} resizeMode='contain' />
                                <Text style={[theme.text, theme.h5, theme.fwb, theme.mb20]}>Form di registrazione</Text>
                            </View>

                            <Input
                                style={theme.text}
                                label="Email"
                                placeholder='email@esempio.com'
                                placeholderTextColor={theme.colors.slate8}
                                value={email}
                                onChangeText={handleEmailChange}
                                autoCorrect={false}
                                keyboardType="email-address"
                                autoCapitalize='none'
                                returnKeyType="next" // Imposta il tipo di tasto di ritorno
                                onSubmitEditing={() => passwordRef.current.focus()} // Passa al prossimo TextInput quando viene premuto il tasto "Vai"
                            />
                            {emailError ?
                                <Text style={theme.textDanger}>{emailError}</Text>
                                : null}

                            <Input
                                style={theme.text}
                                ref={passwordRef}
                                label="Password"
                                placeholder='la tua password'
                                placeholderTextColor={theme.colors.slate8}
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
                                onSubmitEditing={signUpWithEmail} // Chiamata alla funzione di registrazione quando viene premuto "Vai"
                            />
                            {passwordError ?
                                <Text style={theme.textDanger}>{passwordError}</Text>
                                : null}

                            <View style={[theme.articl, theme.mt20]}>
                                <Pressable onPress={() => signUpWithEmail()} style={[theme.grid, theme.TouchablebuttonPrimary, theme.br6, { justifyContent: 'space-evenly' }]}>
                                    <Text style={theme.h5}>Registrati</Text>
                                </Pressable>
                            </View>


                            <View style={[theme.article, theme.mt40, theme.mb20,{alignContent:'center'}]}>
                                <Pressable onPress={() => navigation.navigate('Login')}>
                                    <Text style={[theme.text, theme.mt20]}>Hai un Account?<Text style={[theme.link, theme.alignRight]}>  Accedi</Text></Text>

                                    
                                </Pressable>
                            </View>
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

