import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useTheme } from '../context/ThemeContext';
import Layout from './Layout';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RadioButton } from 'react-native-paper';
import { OnePress } from '../components/Pressables';
//biometria expo
import * as LocalAuthentication from 'expo-local-authentication'
//biometria reactnative
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'



const SettingsScreen = ({ navigation }) => {
    const { themeMode, toggleTheme } = useTheme();
    const { theme } = useTheme();
    //biometria expo
    const [isBiometricSupported, setIsBiometricSupported] = React.useState(false);
    useEffect(() => {
        (async () => {
            const compatible = await LocalAuthentication.hasHardwareAsync();
            setIsBiometricSupported(compatible);
            //console.log('Biometria supportata:', compatible);
        })();
    });
    //fine biometria expo

    //biometria reactnative
    //const rnBiometrics = new ReactNativeBiometrics()
   // console.log('biometria reactnative:', rnBiometrics)
    //const { biometryType } = await rnBiometrics.isSensorAvailable()
    //console.log('biometria reactnative:', biometryType)

    const [hasSeenWelcome, setHasSeenWelcome] = useState(null);
    useEffect(() => {
        const fetchWelcomeStatus = async () => {
            try {
                const value = await AsyncStorage.getItem('seeWelcome');
                if (value !== null) {
                    setHasSeenWelcome(value === 'true'); // Converte la stringa in booleano
                } else {
                    setHasSeenWelcome(false); // Default value if not set
                }
            } catch (error) {
                console.error('Errore nel leggere hasSeenWelcome:', error);
            }
        };

        fetchWelcomeStatus();
    }, []);
    const handlePress = async (value) => {
        try {
            await AsyncStorage.setItem('seeWelcome', value.toString());
            setHasSeenWelcome(value);
        } catch (error) {
            console.error('Errore nel salvare seeWelcome:', error);
        }
    };
    const getTextStyle = (isHighlighted) => ({
        ...theme.text,
        color: isHighlighted ? theme.colors.green10: theme.colors.textTertiary, // Imposta il colore
        fontWeight: isHighlighted ? 'extraBold' : 'normal', // Imposta il grassetto
    });


    return (
        <Layout
            navigation={navigation}
            showTopBar={false}
            header={
                <Text style={[theme.h4, theme.fwb, theme.mb20, theme.mt10, theme.ml20]}>Impostazioni</Text>
            }
        >
            <View style={[theme.body, { borderTopColor: theme.colors.slate7, borderTopWidth: 1, paddingTop: 10 }]}>
                <Text style={[theme.text, theme.text12, theme.textSecondary, theme.mb15]}>Tema</Text>
                <RadioButton.Group onValueChange={toggleTheme} value={themeMode}>
                    <TouchableOpacity onPress={() => toggleTheme('auto')}>
                        <View style={[theme.article, theme.articleTop]}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon name="adjust" size={20} color={theme.colors.slate12} style={{ marginRight: 20 }} />
                                    <Text style={[theme.text]}>Automatico</Text>
                                </View>
                                <RadioButton value="auto" />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleTheme('light')}>
                        <View style={[theme.article, theme.articleMiddle]}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon name="sun-o" size={20} color={theme.colors.slate12} style={{ marginRight: 20 }} />
                                    <Text style={[theme.text]}>Chiaro</Text>
                                </View>
                                <RadioButton value="light" color={theme.colors.slate12} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleTheme('dark')}>
                        <View style={[theme.article,theme.articleBottom]}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon name="moon-o" size={20} color={theme.colors.slate12} style={{ marginRight: 20 }} />
                                    <Text style={[theme.text]}>Scuro</Text>
                                </View>
                                <RadioButton value="dark" />
                            </View>
                        </View>
                    </TouchableOpacity>
                </RadioButton.Group>
                <Text style={[theme.mt10,theme.mb30,theme.ml15]}>
                    <Text style={[theme.text, theme.fwb, { color: theme.colors.slate12 }]}>Automatico </Text>
                    <Text style={[theme.text, theme.textSecondary]}>
                        &egrave; supportato solo sui sistemi operativi che consentono di controllare i colori a livello di sistema.
                    </Text>
                </Text>

                <Text style={[theme.text, theme.text12, theme.textSecondary, theme.mb15]}>Welcome Page</Text>
                <View style={[theme.article]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => handlePress(false)}>
                            <Text style={getTextStyle(hasSeenWelcome === false)}>Nascondi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handlePress(true)}>
                            <Text style={getTextStyle(hasSeenWelcome === true)}>Mostra</Text>
                        </TouchableOpacity>
                    </View>
                </View>









                <Text style={[theme.text, theme.text12, theme.textSecondary, theme.mb15]}>Biometria</Text>

                {isBiometricSupported ?
                    <View style={[theme.article, theme.articleInfo]}>
                        <Text style={[theme.text, theme.text12, { color: theme.colors.blue10 }]}>Il tuo dispositovo &egrave; compatibile con la biometria.</Text>
                        <Text style={[theme.text, theme.text12, { color: theme.colors.slate10 }]}>Clicca per abilitare la biometria.</Text>
                        <OnePress title="Abilita" backgroundColor={theme.colors.blue11}
                            onPress={() => {
                                LocalAuthentication.authenticateAsync({ promptMessage: 'Autenticazione biometrica' })
                                    .then((result) => {
                                        if (result.success) {
                                            console.log('Autenticazione riuscita');
                                        } else {
                                            console.log('Autenticazione fallita');
                                        }
                                    })
                                    .catch((error) => {
                                        console.log('Autenticazione fallita', error);
                                    });
                            }}
                        />

                    </View>
                    :
                    <View style={[theme.article, theme.articleDanger,]}>
                        <Text style={[theme.text, theme.text12, { color: theme.colors.red10 }]}>Il tuo dispositovo non &egrave; compatibile con la biometria.</Text>
                    </View>
                }

            </View>

        </Layout>
    );
};

export default SettingsScreen;
