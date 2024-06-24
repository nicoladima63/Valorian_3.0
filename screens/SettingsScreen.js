import React from 'react';
import { AppContext } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import Layout from './Layout';
import styles from '../themes/style';
import { View, Text, TouchableOpacity, Button, ScrollView, PixelRatio } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ElevatedView from 'react-native-elevated-view';
import { RFValue } from "react-native-responsive-fontsize";
import { RadioButton } from 'react-native-paper';

const SettingsScreen = ({ navigation }) => {
    const {theme, themeMode, toggleTheme } = useTheme();
    const { isDarkTheme, setIsDarkTheme } = React.useContext(AppContext);
    const fontSizeScaler = (size) => size * PixelRatio.getFontScale();

    return (
        <Layout
            navigation={navigation}
            showTopBar={false}
            header={<Text>Settings</Text>}
            //footer={<Text>Another Footer</Text>}
            fab={<Text style={styles.fabText}>+</Text>}
        >


            <View style={{ padding: 20 }}>
                <Text style={{ fontSize: 18, marginBottom: 10 }}>Tema</Text>
                <RadioButton.Group onValueChange={value => toggleTheme(value)} value={themeMode}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name="adjust" size={20} color={theme.colors.primary} style={{ marginRight: 20 }} />
                        <Text style={{ marginRight: 20 }}>Automatico</Text>
                    </View>
                    <RadioButton value="auto" />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name="sun-o" size={20} color={theme.colors.primary} style={{ marginRight: 20 }} />
                        <Text style={{ marginRight: 20 }}>Chiaro</Text>
                    </View>
                    <RadioButton value="light" />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name="moon-o" size={20} color={theme.colors.primary} style={{ marginRight: 20 }} />
                        <Text style={{ marginRight: 20 }}>Scuro</Text>
                    </View>
                    <RadioButton value="dark" />
                </View>
                <Text style={{ marginTop: 10, color: theme.colors.text }}>
                    Automatico &egrave; supportato solo sui sistemi operativi che consentono di controllare lo schema di colori a livello di sistema.
                    </Text>
                </RadioButton.Group>
            </View>



            <View>
                <Text>Main Content</Text>
                <Text style={{fontSize:RFValue(16)}}>
                    Testo RFValue(16)
                </Text>
                <Text style={{ fontSize: fontSizeScaler(16)}}>
                    Testo fontSizeScaler(16)
                </Text>
                
                <ScrollView style={styles.content} >

                </ScrollView>
            </View>

        </Layout >
    )
};

export default SettingsScreen;
