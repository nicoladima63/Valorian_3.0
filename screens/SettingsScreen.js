import React from 'react';
import { useTheme } from '../context/ThemeContext';
import Layout from './Layout';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RadioButton } from 'react-native-paper';

const SettingsScreen = ({ navigation }) => {
    const { themeMode, toggleTheme } = useTheme();
    const { theme } = useTheme();

    return (
        <Layout
            navigation={navigation}
            showTopBar={false}
            header={
                <Text style={[theme.h4, theme.mb20, theme.mt10, theme.ml20]}>Impostazioni</Text>
            }
        >
            <View style={[theme.body, { borderTopColor: theme.colors.slate7, borderTopWidth: 1, paddingTop: 10 }]}>
                <Text style={[theme.text,theme.text16, theme.mb10, theme.ml10, { color: theme.colors.slate11 }]}>Tema</Text>
                <RadioButton.Group onValueChange={toggleTheme} value={themeMode}>
                    <TouchableOpacity onPress={() => toggleTheme('auto')}>
                        <View style={[theme.article, theme.articleTop]}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon name="adjust" size={20} color={theme.colors.slate12} style={{ marginRight: 20 }} />
                                    <Text style={[theme.text, theme.text14]}>Automatico</Text>
                                </View>
                                <RadioButton value="auto" />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleTheme('light')}>
                        <View style={[theme.article, theme.articleMiddle]}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon name="sun-o" size={20} color={theme.colors.slate12} style={{ marginRight: 20 }} />
                                    <Text style={[theme.text,theme.text14]}>Chiaro</Text>
                                </View>
                                <RadioButton value="light" color={theme.colors.slate12} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleTheme('dark')}>
                        <View style={[theme.article, theme.articleBottom]}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon name="moon-o" size={20} color={theme.colors.slate12} style={{ marginRight: 20 }} />
                                    <Text style={[theme.text, theme.text14]}>Scuro</Text>
                                </View>
                                <RadioButton value="dark" />
                            </View>
                        </View>
                    </TouchableOpacity>
                </RadioButton.Group>
                <Text style={{ marginTop: 10, marginLeft: 15, color: theme.colors.slate10 }}>
                    <Text style={[theme.text, theme.text12,theme.fwb, { color: theme.colors.slate12 }]}>Automatico </Text>
                    <Text style={[theme.text, theme.text12]}>
                        &egrave; supportato solo sui sistemi operativi che consentono di controllare i colori a livello di sistema.
                    </Text>
                </Text>
            </View>
        </Layout>
    );
};

export default SettingsScreen;
