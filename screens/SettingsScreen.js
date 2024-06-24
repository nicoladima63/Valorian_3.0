import React from 'react';
import { AppContext } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import Layout from './Layout';
import styles from '../themes/style';
import { View, Text, Pressable, Button, ScrollView, PixelRatio } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ElevatedView from 'react-native-elevated-view';
import { RFValue } from "react-native-responsive-fontsize";
import { RadioButton } from 'react-native-paper';

const SettingsScreen = ({ navigation }) => {
    const { theme, themeMode, toggleTheme } = useTheme();
    const { isDarkTheme, setIsDarkTheme } = React.useContext(AppContext);
    const fontSizeScaler = (size) => size * PixelRatio.getFontScale();

    return (
        <Layout
            navigation={navigation}
            showTopBar={false}
            header={<Text>Settings</Text>}
            //footer={<Text>Another Footer</Text>}
            fab={<Text style={theme.fabText}>+</Text>}
        >


                <View style={theme.body}>
                        <Text style={[theme.headerTitle,theme.mb20,theme.mt20,theme.ml20]}>Impostazioni</Text>
                    <View style={theme.articleTop}>
                        <Text style={styles.articleTitle}>Tema</Text>
                    </View>
                    <RadioButton.Group onValueChange={value => toggleTheme(value)} value={themeMode}>
                        <View style={theme.articleMiddle}>
                            <View style={styles.contentArticle}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Icon name="adjust" size={20} color={theme.colors.primary} style={{ marginRight: 20 }} />
                                        <Text style={theme.articleTex}>Automatico</Text>
                                    </View>
                                    <RadioButton value="auto" />
                                </View>
                            </View>

                        </View>

                        <View style={theme.articleMiddle}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon name="sun-o" size={20} color={theme.colors.primary} style={{ marginRight: 20 }} />
                                    <Text style={theme.articleTex}>Chiaro</Text>
                                </View>
                                <RadioButton value="light" />
                            </View>
                        </View>
                        <View style={theme.articleMiddle}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon name="moon-o" size={20} color={theme.colors.primary} style={{ marginRight: 20 }} />
                                    <Text style={theme.articleTex}>Scuro</Text>
                                </View>
                                <RadioButton value="dark" />
                            </View>
                        </View>
                    </RadioButton.Group>
                    <View style={theme.articleBottom}>
                        <Text style={{ marginTop: 10, color: theme.colors.text }}>
                            Automatico &egrave; supportato solo sui sistemi operativi che consentono di controllare lo schema di colori a livello di sistema.
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

                        <ScrollView style={styles.content} >

                        </ScrollView>
                    </View>
                </View>

        </Layout >
    )
};

export default SettingsScreen;
