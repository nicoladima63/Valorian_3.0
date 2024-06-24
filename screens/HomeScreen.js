import React, { useRef, useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { View, Text, Pressable, Modal, themeheet, Button, TouchableOpacity } from 'react-native';
import Layout from './Layout';
import SectionListComponent from '../components/SectionListComponent';
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
            showTopBar={false}
            header={<View></View>}
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
            <View style={theme.body}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 8 }}>
                    <Text style={[theme.contentTitle]}>I tuoi bisogni</Text>
                    <Pressable onPress={() => navigation.navigate('HelpHome')}>
                        <Text style={theme.contentTitle}>Aiuto</Text>
                    </Pressable>
                </View>
                <View style={theme.articleTop}>
                    <View style={theme.checkTextContainer}>
                        <Icon name="info-circle" size={22} color="#2ECC71" style={theme.checkIcon} />
                        <Text style={theme.articleText}>Clicca su un bisogno per soddisfarlo</Text>
                    </View>
                </View>

                <SectionListComponent session={session} setFabAction={setFabAction} />
            </View>
        </Layout>
    ); };


export default HomeScreen;
