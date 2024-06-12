import React, { useRef, useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { View, Text, Pressable, Modal, StyleSheet, Button } from 'react-native';
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
            showTopBar={true}
            header={<Text style={theme.headerTitle}></Text>}
            fab={<Text>+</Text>}
            fabAction={handleFabPressHome}
        >
            <View style={theme.contentx}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 8, marginBottom: 20 }}>
                    <Text style={theme.contentTitle}>Bisogni</Text>
                    <Pressable onPress={() => setModalVisible(true)}>
                        <Text style={theme.contentTitle}>Aiuto</Text>
                    </Pressable>
                </View>

                <SectionListComponent session={session} setFabAction={setFabAction} />
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
    },
    modalView: {
        margin: 20,
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
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default HomeScreen;
