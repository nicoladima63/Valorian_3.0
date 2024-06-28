import React, { useRef, useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { View, Text, Pressable, Modal, themeheet, Button, TouchableOpacity } from 'react-native';
import Layout from './Layout';
import SectionListComponent from '../components/SectionListComponent';
import FlexibleView from '../components/FlexibleComponent';
import { MaterialIcons } from '@expo/vector-icons'; // Puoi cambiare la libreria di icone se preferisci
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = ({ route, navigation }) => {
    const { theme } = useTheme();
    const { session } = useAuth(); // Accedi ai dati della sessione
    const flatListRef = useRef(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fabAction, setFabAction] = useState(() => { });

    useEffect(() => {
        if (!session) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [session]);

    const handleFabPressHome = () => {
        if (fabAction) {
            fabAction();
        }
    };

    return (
        <Layout
            navigation={navigation}
            showTopBar={true}
            header={
                <View style={[theme.header]}>
                    <FlexibleView
                        format="testoTesto"
                        text={<Text style={[theme.h4,theme.fwb]}>I tuoi bisogni</Text>}
                        textR={<Text style={[theme.h5, { color:theme.colors.green10 }]}>Aiuto</Text>}
                        onPressRightIcon={() => navigation.navigate('HelpHome')}
                    />
                </View>
            }
            fab={<Text style={theme.fabText}>+</Text>}
            fabAction={handleFabPressHome}
            showBodyFooter={false}
            bodyFooter={
                <View style={theme.bodyFooter}>
                    <TouchableOpacity style={theme.buttonCancel}>
                        <Text style={theme.buttonText}>Annulla</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={theme.buttonDelete}>
                        <Text style={theme.buttonText}>Elimina</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={theme.buttonOK}>
                        <Text style={theme.buttonText}>OK</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={theme.buttonSave}>
                        <Text style={theme.buttonText}>Salva</Text>
                    </TouchableOpacity>
                </View>
            }
        >
            <View style={[theme.body, { borderTopColor: theme.colors.slate7, borderTopWidth: 1, paddingTop: 10 }]}>

                <View style={[theme.article, theme.articleTop]}>
                    <FlexibleView
                        format="iconaTesto"
                        leftIcon={<MaterialIcons name="info-outline" size={24} color={theme.colors.green11}  /> }
                        text={<Text style={[theme.text, theme.ml20]}>Clicca su un bisogno per soddisfarlo</Text> }
                    />
                </View>
                <View style={[theme.article, theme.articleMiddle]}>
                    <SectionListComponent session={session} setFabAction={setFabAction} />
                </View>

                <View style={theme.articleBottom}>
                
                </View>
            </View>
        </Layout>
    ); };


export default HomeScreen;
