import React from 'react';
import { AppContext } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import Layout from './Layout';
import styles from '../themes/style';
import { View, Text, TouchableOpacity, Button, ScrollView, PixelRatio } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ElevatedView from 'react-native-elevated-view';
import { RFValue } from "react-native-responsive-fontsize";


const SettingsScreen = ({ navigation }) => {
    const { toggleTheme, theme } = useTheme();
    const { isDarkTheme, setIsDarkTheme } = React.useContext(AppContext);
    const fontSizeScaler = (size) => size * PixelRatio.getFontScale();

    return (
        <Layout
            navigation={navigation}
            showTopBar={true}
            header={<Text>Settings</Text>}
            //footer={<Text>Another Footer</Text>}
            fab={<Text style={styles.fabText}>+</Text>}
        >

            <ElevatedView elevation={4} style={theme.stayElevated}>
                <TouchableOpacity style={{
                    flexDirection: 'row',
                    paddingHorizontal: 8,
                    paddingVertical: 20,
                    borderRadius: 8,
                    alignItems: 'center'
                }}
                    onPress={() => {
                        setIsDarkTheme(!isDarkTheme);
                        toggleTheme();
                    }}>
                    <Ionicons name={isDarkTheme ? 'checkbox' : 'square-outline'} size={24} color={theme.colors.text} />
                    <Text style={{
                        color: theme.colors.text,
                        marginLeft: 8
                    }}>{isDarkTheme ? 'Tema chiaro' : 'Tema Scuro'}</Text>
                </TouchableOpacity>
            </ElevatedView>
            <ElevatedView elevation={4} style={theme.stayElevated}>
                <Button onPress={() => navigation.navigate('Categorie')} title="Categorie" />
            </ElevatedView>

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
