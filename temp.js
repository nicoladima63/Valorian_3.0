import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import EChartsComponent from '../components/EChartsComponent';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import Layout from './Layout';
import * as echarts from 'echarts';

const LandingPage = ({ navigation }) => {
    const { theme } = useTheme();
    const { session } = useAuth(); // Accedi ai dati della sessione
    const [themeLoaded, setThemeLoaded] = useState(false);

    useEffect(() => {
        // Carica e registra i temi
        const loadThemes = async () => {
            const darkTheme = await fetch('path/to/dark.json').then(response => response.json());
            const lightTheme = await fetch('path/to/light.json').then(response => response.json());
            echarts.registerTheme('dark', darkTheme);
            echarts.registerTheme('light', lightTheme);
            setThemeLoaded(true); // Imposta il flag a true una volta che i temi sono caricati
        };

        loadThemes();
    }, []);

    // Definisci il colore di background
    const currentTheme = theme.darkMode ? 'dark' : 'light';
    console.log('currentTheme', currentTheme);

    const option1 = {
        series: [
            {
                type: 'gauge',
                startAngle: 180,
                endAngle: 0,
                center: ['50%', '75%'],
                radius: '95%',
                min: 0,
                max: 1,
                splitNumber: 8,
                axisLine: {
                    lineStyle: {
                        width: 6,
                        color: [
                            [0.25, '#FF6E76'],
                            [0.5, '#FDDD60'],
                            [0.75, '#58D9F9'],
                            [1, '#7CFFB2']
                        ]
                    }
                },
                pointer: {
                    icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
                    length: '12%',
                    width: 20,
                    offsetCenter: [0, '-60%'],
                    itemStyle: {
                        color: 'auto'
                    }
                },
                axisTick: {
                    length: 12,
                    lineStyle: {
                        color: 'auto',
                        width: 2
                    }
                },
                splitLine: {
                    length: 20,
                    lineStyle: {
                        color: 'auto',
                        width: 5
                    }
                },
                axisLabel: {
                    color: '#464646',
                    fontSize: 20,
                    distance: -60,
                    rotate: 'tangential',
                    formatter: function (value) {
                        if (value === 0.875) {
                            return 'Grade A';
                        } else if (value === 0.625) {
                            return 'Grade B';
                        } else if (value === 0.375) {
                            return 'Grade C';
                        } else if (value === 0.125) {
                            return 'Grade D';
                        }
                        return '';
                    }
                },
                title: {
                    offsetCenter: [0, '-10%'],
                    fontSize: 20,
                },
                detail: {
                    fontSize: 30,
                    offsetCenter: [0, '-35%'],
                    valueAnimation: true,
                    formatter: function (value) {
                        return Math.round(value * 100) + '';
                    },
                    color: 'inherit'
                },
                data: [
                    {
                        value: 0.8,
                        name: 'Livello di benessere'
                    }
                ]
            }
        ]
    };

    const labelRight = {
        position: 'right'
    };

    const option2 = {
        title: {
            text: 'Soddisfazione dei bisogni'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            top: 80,
            bottom: 30
        },
        xAxis: {
            type: 'value',
            position: 'top',
            splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
            }
        },
        yAxis: {
            type: 'category',
            axisLine: { show: false },
            axisLabel: { show: false },
            axisTick: { show: false },
            splitLine: { show: false },
            data: [
                'pizza',
                'corsa',
                'leggere',
                'amici',
                'dipingere',
                'film',
                'aperitivo',
                'cena con partner',
                'pescare',
                'tempo per me'
            ]
        },
        series: [
            {
                name: 'Cost',
                type: 'bar',
                stack: 'Total',
                label: {
                    show: true,
                    formatter: '{b}'
                },
                data: [
                    { value: -0.07, label: labelRight },
                    { value: -0.09, label: labelRight },
                    0.2,
                    0.44,
                    { value: -0.23, label: labelRight },
                    0.08,
                    { value: -0.17, label: labelRight },
                    0.47,
                    { value: -0.36, label: labelRight },
                    0.18
                ]
            }
        ]
    };

    const handleFabPressHome = () => {
        if (fabAction) {
            fabAction();
        }
    };

    // Render solo se i temi sono stati caricati
    if (!themeLoaded) {
        return <Text>Loading...</Text>;
    }

    return (
        <Layout
            navigation={navigation}
            showTopBar={false}
            header={<Text style={theme.headerTitle}>Valorian</Text>}
            //fab={<Text>+</Text>}
            fabAction={handleFabPressHome}
        >
            <Text style={theme.contentTitle}>Bisogni</Text>
            <View style={{ flex: 1, marginTop: 0 }}>
                <EChartsComponent option={option1} theme={currentTheme} height={300} />
                <EChartsComponent option={option2} theme={currentTheme} height={300} />
            </View>
        </Layout>
    );
};

export default LandingPage;
import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

import {
    View, Text, Alert, Pressable, Image,
    Switch, ScrollView, TouchableWithoutFeedback, Keyboard,
    KeyboardAvoidingView, Platform
} from 'react-native';
import { Input, Icon } from '@rneui/themed';
import * as SecureStore from 'expo-secure-store';
import Spinner from 'react-native-loading-spinner-overlay';

export default function LoginScreen({ navigation }) {
    const [click, setClick] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { theme } = useTheme();

    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const passwordRef = useRef(null); // Riferimento al TextInput della password

    const logo = require("../assets/images/logo.png");
    //const facebook = require("../assets/images/react-logo.png");
    //const linkedin = require("../assets/images/react-logo.png");
    //const tiktok = require("../assets/images/react-logo.png");

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

    const CustomButton = ({ title, onPress }) => (
        <Pressable onPress={onPress} style={theme.Loginbutton}>
            <Text style={theme.LoginbuttonText}>{title}</Text>
        </Pressable>
    );

    return (
        <TouchableWithoutFeedback onPress={handlePressEmptySpace}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={theme.Logincontainer}>
                        <Image source={logo} style={theme.Loginimage} resizeMode='contain' />
                        <Text style={theme.Logintitle}>Login</Text>
                        {/*<Text style={theme.LoginSubtitle}>login</Text>*/}
                        <View style={theme.LogininputView}>
                            <Input
                                //style={theme.Logininput}
                                label="Email"
                                placeholder='email@esempio.com'
                                value={email}
                                onChangeText={(text) => {
                                    setEmail(text);
                                    setEmailError('');
                                }}
                                autoCorrect={false}
                                autoCapitalize='none'
                                returnKeyType="next" // Imposta il tipo di tasto di ritorno
                                onSubmitEditing={() => passwordRef.current.focus()} // Passa al prossimo TextInput quando viene premuto il tasto "Vai"
                            />
                            {emailError ? <Text style={theme.errorText}>{emailError}</Text> : null}
                            <Input
                                ref={passwordRef}
                                label="Password"
                                placeholder='password'
                                secureTextEntry={!showPassword}
                                value={password}
                                onChangeText={(text) => {
                                    setPassword(text);
                                    setPasswordError('');
                                }}
                                autoCorrect={false}
                                rightIcon={
                                    <Icon
                                        type='font-awesome'
                                        name={showPassword ? 'eye' : 'eye-slash'}
                                        onPress={() => setShowPassword(!showPassword)}
                                    />
                                }
                                autoCapitalize="none"
                                returnKeyType="go" // Imposta il tipo di tasto di ritorno
                                onSubmitEditing={signInWithEmail} // Chiamata alla funzione di registrazione quando viene premuto "Vai"
                            />
                            {passwordError ? <Text style={theme.errorText}>{passwordError}</Text> : null}
                        </View>
                        <View style={theme.LoginrememberView}>
                            <View style={theme.Loginswitch}>
                                <Switch value={click} onValueChange={setClick} trackColor={{ true: "green", false: "gray" }} />
                                <Text style={theme.LoginfooterText}>Ricordami</Text>
                            </View>
                        </View>
                        <View>
                            <Pressable onPress={() => Alert.alert("Forget Password!")}>
                                <Text style={[theme.linkText, theme.mb20]}>Password dimenticata?</Text>
                            </Pressable>
                        </View>
                        <View style={theme.LoginbuttonView}>
                            <CustomButton title="Accedi" onPress={() => signInWithEmail()} />
                            <Pressable onPress={() => navigation.navigate('Register')}>
                                <Text style={[theme.text, theme.mt20]}>Non hai un Account?
                                    <Text style={theme.linkText}>  Registrati</Text>
                                </Text>
                            </Pressable>
                        </View>
                        {/*<Text style={theme.LoginoptionsText}>Oppure entra con</Text>*/}
                        {/*<View style={theme.LoginmediaIcons}>*/}
                        {/*    <Image source={facebook} style={theme.Loginicons} />*/}
                        {/*    <Image source={tiktok} style={theme.Loginicons} />*/}
                        {/*    <Image source={linkedin} style={theme.Loginicons} />*/}
                        {/*</View>*/}
                        <Spinner
                            visible={loading} // Visualizza lo spinner quando loading è true
                            textContent={'Loading...'}
                            textStyle={theme.spinnerTextStyle}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}
