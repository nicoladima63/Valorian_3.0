import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Switch,Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Layout from './Layout';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import CustomText from '../components/CustomTextComponent';

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
            showTopBar={true}
        //header={<Text style={theme.headerTitle}></Text>}
        //fab={<Text>+</Text>}
        //fabAction={handleFabPressHome}
        >
            <View style={theme.Logincontainerx}>
                <Image source={logo} style={theme.Loginimage} resizeMode='contain' />

                <CustomText style={theme.headerTitle}>Benvenuto in Valorian!</CustomText>
                <CustomText style={theme.paragraph}>
                    Siamo entusiasti di averti con noi.
                </CustomText>
                <CustomText style={theme.paragraph}>
                    Questa app &egrave; progettata per aiutarti a monitorare e migliorare il tuo stato di benessere, valutando quanto ti senti soddisfatto nei vari aspetti della tua vita.
                </CustomText>
                <Text style={theme.paragraph}>
                    Questo &egrave; molto semplice da fare, dovrai solo cliccare sul nome del bisogno che soddisfi, in questo modo avrai la possibilit&agrave; di tracciare le volte che viene soddisfatto per avere un andamento temporale delle soddisfazioni.
                </Text>
                <Text style={theme.paragraph}>
                    Tutti questi dati saranno utilizzati per definire il tuo stato di benessere generale e saranno visualizzati attraverso un grafico.
                </Text>
                <Text style={theme.paragraph}>
                    Inizia subito a esplorare la tua vita in modo pi&#249; consapevole e a lavorare verso un benessere pi&#249; completo!
                </Text>
                <View style={styles.checkboxContainer}>
                    <Switch
                        value={showNextTime}
                        onValueChange={setShowNextTime}
                        thumbColor={showNextTime ? '#f5dd4b' : '#f4f3f4'}
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                    />
                    <Text style={styles.label}>Mostra la prossima volta</Text>
                </View>
                <View style={theme.buttonContainer1}>
                    <Pressable style={theme.buttonSubmit} onPress={handleStart}>
                        <Text style={theme.buttonText}>Inizia</Text>
                    </Pressable>
                </View>
            </View>
        </Layout>
    );

};

const styles = StyleSheet.create({
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    label: {
        margin: 8,
        fontSize: 14,
    },
});

export default WelcomePage;
