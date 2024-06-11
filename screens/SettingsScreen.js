import React from 'react';
import { AppContext } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import Layout from './Layout';
import styles from '../themes/style';
import { View, Text, TouchableOpacity, Button, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ElevatedView from 'react-native-elevated-view';

const SettingsScreen = ({ navigation }) => {
    const { toggleTheme, theme } = useTheme();
    const { isDarkTheme, setIsDarkTheme } = React.useContext(AppContext)

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
                <ScrollView style={styles.content} >
                    <View style={[styles.box, styles.box1]} />
                    <View style={[styles.box, styles.box2]} />
                    <View style={[styles.box, styles.box3]} />
                    <View style={[styles.box, styles.box2]} />
                    <View style={[styles.box, styles.box3]} />
                    <View style={[styles.box, styles.box4]} />
                    <View style={[styles.box, styles.box5]} />
                </ScrollView>
            </View>

        </Layout >
    )
};

export default SettingsScreen;
