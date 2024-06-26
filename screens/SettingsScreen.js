import React from 'react';
import { AppContext } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import Layout from './Layout';
import { View, Text, Pressable, Button, ScrollView, PixelRatio } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ElevatedView from 'react-native-elevated-view';
import { RFValue } from "react-native-responsive-fontsize";
import { RadioButton } from 'react-native-paper';
import ColorsBarComponent from '../components/ColorBarsComponent'

const SettingsScreen = ({ navigation }) => {
    const { themeMode, toggleTheme } = useTheme();
    const { theme } = useTheme();
    const { isDarkTheme, setIsDarkTheme } = React.useContext(AppContext);
    const fontSizeScaler = (size) => size * PixelRatio.getFontScale();

    return (
        <Layout
            navigation={navigation}
            showTopBar={false}
            header={
                <Text style={[theme.h4, theme.mb20, theme.mt10, theme.ml20, { backgroundColor: theme.colors.slate2 }]}>Impostazioni</Text>

            }
            //footer={<Text>Another Footer</Text>}
            fab={<Text style={theme.fabText}>+</Text>}
        >


            <View style={theme.body, { borderTopColor: theme.colors.slate7, borderTopWidth: 1,paddingTop:10 }}>
                <View style={theme.p16}>
                    <Text style={[theme.text, theme.mb10, theme.ml10, { color: theme.colors.slate11 }]}>Tema</Text>
                    <RadioButton.Group onValueChange={value => toggleTheme(value)} value={themeMode}>
                        <View style={[theme.article, theme.articleTop]}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon name="adjust" size={20} color={theme.colors.slate12} style={{ marginRight: 20 }} />
                                    <Text style={theme.text}>Automatico</Text>
                                </View>
                                <RadioButton value="auto" />
                            </View>

                        </View>

                        <View style={[theme.article, theme.articleMiddle]}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon name="sun-o" size={20} color={theme.colors.slate12} style={{ marginRight: 20 }} />
                                    <Text style={theme.text}>Chiaro</Text>
                                </View>
                                <RadioButton value="light" color={theme.colors.slate12} />
                            </View>
                        </View>
                        <View style={[theme.article, theme.articleBottom]}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon name="moon-o" size={20} color={theme.colors.slate12} style={{ marginRight: 20 }} />
                                    <Text style={theme.text}>Scuro</Text>
                                </View>
                                <RadioButton value="dark" />
                            </View>
                        </View>


                    </RadioButton.Group>
                    <Text style={{ marginTop: 10, marginLeft: 15, color: theme.colors.slate10 }}>
                        <Text style={{ color: theme.colors.slate12 }}>Automatico </Text>
                        &egrave; supportato solo sui sistemi operativi che consentono di controllare i colori a livello di sistema.
                    </Text>
                </View>

















                <View>
                    <Text>Main Content</Text>
                    <Text style={{ fontSize: RFValue(16) }}>
                        Testo RFValue(16)
                    </Text>
                    <Text style={{ fontSize: fontSizeScaler(16) }}>
                        Testo fontSizeScaler(16)
                    </Text>

                </View>
                <ScrollView style={theme.conten} >
                    <ColorsBarComponent></ColorsBarComponent>
                </ScrollView>

            </View>
        </Layout >
    )
};

export default SettingsScreen;
