import React, { useRef, useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { View, Text, Pressable, Modal, StyleSheet, Button, TouchableOpacity } from 'react-native';
import Layout from './Layout';
import SectionListComponent from '../components/SectionListComponent';

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
            fab={<Text>+</Text>}
            fabAction={handleFabPressHome}
            showBodyFooter={false}
            bodyFooter={
                <View style={styles.bodyFooter}>
                    <TouchableOpacity style={styles.buttonCancel}>
                        <Text style={styles.buttonText}>Annulla</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonDelete}>
                        <Text style={styles.buttonText}>Elimina</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonOK}>
                        <Text style={styles.buttonText}>OK</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonSave}>
                        <Text style={styles.buttonText}>Salva</Text>
                    </TouchableOpacity>
                </View>
            }
        >
            <View style={styles.body}>

                
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 8 }}>
                    <Text style={[styles.contentTitle]}>I tuoi bisogni</Text>
                    <Pressable onPress={() => setModalVisible(true)}>
                        <Text style={styles.contentTitle}>Aiuto</Text>
                    </Pressable>
                </View>

                <SectionListComponent session={session} setFabAction={setFabAction} />
            </View>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    {/* Contenuto del modal */}
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={theme.title}>Spiegazione</Text>
                        <Text style={styles.modalText}>
                            Quando clicchi su un bisogno si apre un popup per la modifica dei dati del bisogno stesso: {'\n'}
                            associazione con la categoria, {'\n'}modifica del nome e dei sui parametro {'\n'}nonché della sua cancellazione.
                            {'\n'}I box di colore più chiaro sono quelli inattivi
                        </Text>

                        <Button
                            title="Ho capito"
                            onPress={() => setModalVisible(!modalVisible)}
                        />
                    </View>
                </View>
            </Modal>
        </Layout>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // sfondo semitrasparente nero
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%',
        maxHeight: '80%',
        overflow: 'hidden',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },


    body: {
        flex: 1,
        backgroundColor: '#0d1017',
        position: 'relative',
    },
    contentTitle: {
        fontSize: 16,
        marginLeft: 12,
        color: '#dedede',
        marginBottom: 8,
        marginTop: 20,
    },

    mt10: { marginTop: 10 },
    mb10: { marginBottom: 10 },
    ml10: { marginLeft: 10 },
    mr10: { marginRight: 10 },
    mt20: { marginTop: 20 },
    mb20: { marginBottom: 20 },
    ml20: { marginLeft: 20 },
    mr20: { marginRight: 20 },
    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: 'stretch',
    },
    fwb: { fontWeight: 'bold' },
    fs20: { fontSize: 20 },
    link: { color: '#D8BFD8' },
    primary: { backgroundColor: '#2124bb' },
    undo: { backgroundColor: '#aaaaaa50' },
    danger: { backgroundColor: '#bb211450' },
    warning: { backgroundColor: '#e2f04e' },
    success: { backgroundColor: '#24bb2150' },
    info: { backgroundColor: '#D8BFD8' },
    //buttonText: {
    //    //paddingTop: 10,
    //    paddingHorizontal: 35,
    //    paddingVertical: 6,
    //    fontSize: 14,
    //    color:'#fff',
    //    fontWeight: 'bold',
    //    letterSpacing: 0.8,
    //},

    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#3F424A',
        padding: 10,
    },

    buttonOK: {
        backgroundColor: '#2ECC71',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginVertical: 10,
        width: 100,
    },
    buttonCancel: {
        backgroundColor: '#AAAAAA',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginVertical: 10,
        width: 100,
    },
    buttonSave: {
        backgroundColor: '#3498DB',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginVertical: 10,
        width: 100,
    },
    buttonDelete: {
        backgroundColor: '#E74C3C',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginVertical: 10,
        width: 100,
    },
    buttonText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 14,
    },
});

export default HomeScreen;
