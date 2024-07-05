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
                        <Text style={[theme.h4, theme.ml10, theme.mb20]}>Spiegazione</Text>
                        <Text style={[theme.text,theme.text14]}>
                            Se clicchi sulla freccia adestra el box del bisogno, si apre un popup per la modifica dei dati del bisogno stesso: {'\n'}
                            {'\n'}
                            1- Nome{'\n'}
                            2- Importanza{'\n'}
                            3- Frequenza{'\n'}
                            4- Associazione con le categorie{'\n'}
                            5- Cancellazione{'\n'}
                            {'\n'}
                            {'\n'}
                            Se tocchi il nome comunicherai che lo hai soddisfatto
                        </Text>
                        <View style={theme.contentPadding} />

                            <View style={[theme.mt40, theme.center]}>
                                <TouchableOpacity onPress={() => navigation.goBack()} style={[theme.grid, theme.TouchablebuttonPrimary, theme.br6, { alignContent: 'center', paddingHorizontal: 60, paddingVertical: 12 }]}>
                                    <Text style={theme.text14}>Ho capito</Text>
                                </TouchableOpacity>
                            </View>



                    </View>
                </View>
            </View>
        </View>
    );
};

export default HelpHomeScreen;
