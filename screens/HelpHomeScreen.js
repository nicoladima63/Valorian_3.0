import React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const HelpHomeScreen = ({ navigation }) => {
    const { theme } = useTheme();

    return (
        <View style={theme.content}>
            <View style={[theme.ml20, theme.mt20,theme.mr20]}>

                <View style={[theme.article]}>
                    <View style={theme.modalVie}>
                        <Text style={[theme.h3, theme.ml20, theme.mb20,theme.fwb]}>Spiegazione</Text>
                        <Text style={[theme.text,theme.text16,theme.contentParagraph]}>
                            Quando clicchi sulla freccia adestra el box del bisogno, si apre un popup per la modifica dei dati del bisogno stesso: {'\n'}
                            {'\n'}
                            1- Nome{'\n'}
                            2- Importanza{'\n'}
                            3- Frequenza{'\n'}
                            4- Associazione con le categorie{'\n'}
                            5-Cancellazione{'\n'}
                            {'\n'}I box di colore pi&#249; chiaro sono quelli inattivi
                        </Text>
                        <View style={theme.contentPadding} />

                        <View style={theme.bodyFooter}>
                            <Button style={theme.buttonOK} title='Ho capito' onPress={() => navigation.goBack()}>
                                <Text style={theme.buttonText}>INIZIA</Text>
                            </Button>
                        </View>

                    </View>
                </View>
            </View>
        </View>
    );
};

export default HelpHomeScreen;
