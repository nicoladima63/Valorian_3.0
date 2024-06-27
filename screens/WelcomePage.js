import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Switch, Pressable, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Layout from './Layout';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import CustomText from '../components/CustomTextComponent';
import Icon from 'react-native-vector-icons/FontAwesome';

const WelcomePage = ({ navigation }) => {
    const [showNextTime, setShowNextTime] = useState(true);
    const { theme } = useTheme();
    const logo = require("../assets/images/logo.png")

    const handleStart = async () => {
        try {
            if (!showNextTime) {
                await AsyncStorage.setItem('hasSeenWelcome', 'true');
            }
        } catch (e) {
            console.error(e);
        }
        navigation.replace('Tabs');
    };
    //  &egrave;  &agrave; pi&#249; 
    return (
        <Layout
            navigation={navigation}
            showTopBar={false}
            header
            //fab={<Text>+</Text>}
            //fabAction={handleFabPressHome}
            showBodyFooter={true}
            bodyFooter
        >


            <View style={theme.body}>
                <View style={theme.logoImageContainer}>
                    <Image source={logo} style={theme.logoImage100} resizeMode='contain' />
                </View>
                <View style={theme.center}>
                    <Text style={[theme.h1, theme.fwb, theme.mb20, theme.mt20]}>Benvenuto in Valorian!</Text>
                </View>
                <View style={[theme.article, theme.articleTop]}>
                    <Text style={[theme.h4, theme.mb20, theme.fwb]}>
                        Sono entusiasta di averti con me.
                    </Text>
                    <Text style={[theme.paragraph, theme.text16, { lineHeight: 21 }]}>
                        Ciao mi chiamo Nicola e dopo un master di due anni in health coaching presso la Health Coaching Academy ho deciso di creare un progetto ambizioso.
                        <Text style={theme.fwb}> Valorian</Text>.
                        {'\n'}Credo molto che lo stato di benessere psicofisico di una persona sia importante per la sua salute.
                    </Text>
                    <Text style={[theme.paragraph, theme.text16, { lineHeight: 21 }]}>
                        Tenere sotto controllo il tuo stato psicofisico &egrave; una operazione facile con la mia applicazione.{'\n'}
                        Dopo aver inserito quali sono i tuoi bisogni dovrai solo cliccare sul nome del bisogno per comunicare alla app che lo hai soddisfatto.{'\n'}
                        In questo modo puoi tenere traccia di tutte le soddisfazioni.
                    </Text>
                    <Text style={[theme.paragraph, theme.text16, { lineHeight: 21 }]}>
                        Tutti questi dati saranno utilizzati per definire il tuo stato di benessere generale e saranno visualizzati attraverso un grafico.
                    </Text>
                    <Text style={[theme.paragraph, theme.text16, { lineHeight: 21 }]}>

                        Inizia subito a esplorare la tua vita in modo più consapevole e a lavorare verso un benessere più completo!
                    </Text>
                    <View style={theme.contentPadding} />
                </View>
                <View style={[theme.article, theme.articleMiddle]}>

                    <View style={theme.grid}>
                        <Text style={[theme.text, theme.ml20]}>Mostra la prossima volta</Text>
                        <Switch style={theme.gap10}
                            value={showNextTime}
                            onValueChange={setShowNextTime}
                            thumbColor={showNextTime ? theme.colors.primary : '#f4f3f4'}
                            trackColor={{ false: '#767577', true: theme.colors.secondary }}
                        />
                    </View>

                </View>

                <View style={[theme.article, theme.articleBottom]}>
                    <Pressable onPress={handleStart} style={[theme.grid, theme.TouchablebuttonPrimary, theme.br6, { justifyContent: 'space-evenly', height: 50 }]}>
                        <Text style={theme.buttonText}>INIZIA</Text>
                    </Pressable>
                </View>

            </View>

        </Layout >
    );
};


export default WelcomePage;
