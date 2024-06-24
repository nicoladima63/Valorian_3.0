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
            bodyFooter={
                <Pressable style={[theme.button,theme.ml40,theme.mr40,theme.mb20]} onPress={handleStart}>
                    <Text style={theme.buttonText}>INIZIA</Text>
                </Pressable>
            }
        >
            <View style={theme.body}>
                <View style={theme.logoImageContainer}>
                    <Image source={logo} style={theme.logoImage} resizeMode='contain' />
                </View>
                <Text style={[theme.headerTitle, theme.ml20, theme.mb20]}>Benvenuto in Valorian!</Text>

                <View style={theme.article}>
                    <Text style={theme.contentTitle}>Siamo entusiasti di averti con noi.</Text>
                    <Text style={theme.contentParagraph}>
                        Questa app &egrave; progettata per aiutarti a monitorare e migliorare il tuo stato di benessere, valutando quanto ti senti soddisfatto nei vari aspetti della tua vita.
                    </Text>
                    <Text style={theme.contentParagraph}>
                        Questo &egrave; molto semplice da fare, dovrai solo cliccare sul nome del bisogno che soddisfi, in questo modo avrai la possibilit&agrave; di tracciare le volte che viene soddisfatto per avere un andamento temporale delle soddisfazioni.
                    </Text>
                    <Text style={theme.contentParagraph}>
                        Tutti questi dati saranno utilizzati per definire il tuo stato di benessere generale e saranno visualizzati attraverso un grafico.
                    </Text>
                    <Text style={theme.contentParagraph}>
                        Inizia subito a esplorare la tua vita in modo pi&#249; consapevole e a lavorare verso un benessere pi&#249; completo!
                    </Text>
                    <View style={theme.contentPadding} />

                    <View style={theme.contentArticle}>
                        <View style={theme.checkTextContainer}>
                            <Text style={[theme.articleText,theme.ml20]}>Mostra la prossima volta</Text>
                        </View>
                        <Switch style={theme.mr20}
                            value={showNextTime}
                            onValueChange={setShowNextTime}
                            thumbColor={showNextTime ? theme.colors.primary : '#f4f3f4'}
                            trackColor={{ false: '#767577', true: theme.colors.secondary }}
                        />

                    </View>
                </View>

            </View>

        </Layout >
    );
};


export default WelcomePage;
