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

    return (
        <Layout
            navigation={navigation}
            showTopBar={false}
            //header={<Text style={theme.headerTitle}>Valorian</Text>}
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
                    <Text style={[theme.h4, theme.mb20, theme.fwb]}>Siamo entusiasti di averti con noi.</Text>
                    <Text style={[theme.paragraph, theme.text16, { lineHeight: 20 }]}>
                        Questa app &egrave; progettata per aiutarti a monitorare e migliorare il tuo stato di benessere, valutando quanto ti senti soddisfatto nei vari aspetti della tua vita.
                    </Text>
                    <Text style={[theme.paragraph, theme.text16, { lineHeight: 20 }]}>
                        Questo &egrave; molto semplice da fare, dovrai solo cliccare sul nome del bisogno che soddisfi, in questo modo avrai la possibilit&agrave; di tracciare le volte che viene soddisfatto per avere un andamento temporale delle soddisfazioni.
                    </Text>
                    <Text style={[theme.paragraph, theme.text16, { lineHeight: 20 }]}>
                        Tutti questi dati saranno utilizzati per definire il tuo stato di benessere generale e saranno visualizzati attraverso un grafico.
                    </Text>
                    <Text style={[theme.paragraph, theme.text16, { lineHeight: 20 }]}>
                        Inizia subito a esplorare la tua vita in modo pi&#249; consapevole e a lavorare verso un benessere pi&#249; completo!
                    </Text>
                    <View style={theme.contentPadding} />
                </View>
                <View style={[theme.article, theme.articleMiddle]}>

                    <View style={theme.grid}>
                        <Text style={[theme.text, theme.ml20]}>Mostra la prossima volta</Text>
                        <Switch style={theme.gap10}
                            value={showNextTime}
                            onValueChange={setShowNextTime}
                            thumbColor={showNextTime ? '#f5dd4b' : '#f4f3f4'}
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
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
