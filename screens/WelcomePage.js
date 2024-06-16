import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button,Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const WelcomePage = () => {
    const [showNextTime, setShowNextTime] = useState(true);
    const navigation = useNavigation();

    const handleStart = async () => {
        try {
            if (!showNextTime) {
                await AsyncStorage.setItem('hasSeenWelcome', 'true');
            }
        } catch (e) {
            console.error(e);
        }
        navigation.replace('Landing'); 
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Benvenuto in Valorian!</Text>
            <Text style={styles.paragraph}>
                Siamo entusiasti di averti con noi.
            </Text>
            <Text style={styles.paragraph}>
                Questa app &egrave; progettata per aiutarti a monitorare e migliorare il tuo stato di benessere, valutando quanto ti senti soddisfatto nei vari aspetti della tua vita.
            </Text>
            <Text style={styles.paragraph}>
                Questo &egrave; molto semplice da fare, dovrai solo cliccare sul nome del bisogno che soddisfi, in questo modo avrai la possibilit&agrave; di tracciare le volte che viene soddisfatto per avere un andamento temporale delle soddisfazioni.
            </Text>
            <Text style={styles.paragraph}>
                Tutti questi dati saranno utilizzati per definire il tuo stato di benessere generale e saranno visualizzati attraverso un grafico.
            </Text>
            <Text style={styles.paragraph}>
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
            <Button title="Inizia" onPress={handleStart} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    paragraph: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    label: {
        margin: 8,
        fontSize: 16,
    },
});

export default WelcomePage;
