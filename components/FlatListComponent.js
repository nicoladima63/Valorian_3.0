import React, { useEffect, useState, useCallback, useImperativeHandle, forwardRef } from 'react';
import { RefreshControl, StyleSheet, View, StatusBar, FlatList, Text, Switch, Alert, Pressable, Dimensions, ActivityIndicator, TouchableOpacity } from "react-native";
import { ButtonGroup } from '@rneui/themed';
import { supabase } from '../lib/supabase';
import AddBisogno from '../components/AddBisogno';
import Snackbar from '../components/Snackbar';
import ElevatedView from 'react-native-elevated-view';


const FlatListComponent = forwardRef(({ navigation, session }, ref) => {
    const [enabledStates, setEnabledStates] = useState({});
    const [selectedIndex, setSelectedIndex] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible1, setModalVisible1] = useState(false);
    const [user, setUser] = useState({});
    const [bisogni, setBisogni] = useState([]);
    const [bisogno, setBisogno] = useState({});
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useImperativeHandle(ref, () => ({
        handleAddNeed
    }));

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        // Inserisci la tua logica di ricaricamento dei dati qui.
        // Dopo aver completato il ricaricamento, imposta refreshing a false.
        fetchBisogni().then(() => {
            setRefreshing(false);
        });
    }, []);

    useEffect(() => {
        fetchUserData();
        fetchBisogni();
    }, []);

    useEffect(() => {
        if (bisogni.length > 0) {
            setEnabledStates(bisogni.reduce((acc, item) => ({ ...acc, [item.id]: item.enabled }), {}));
        }
        setLoading(false);

    }, [bisogni]);

    const fetchUserData = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        } catch (error) {
            console.error('Failed to fetch user data', error);
        }
    };

    const fetchBisogni = async () => {
        try {
            const { data, error } = await supabase
                .from('bisogni')
                .select('*')
                .eq('uuid', session.user.id);
            if (error) {
                console.error('Error object:', error);
                throw error;
            }
            setBisogni(data);
        } catch (error) {
            console.error('Errore nel recupero dei bisogni:', error);
            Alert.alert('Errore', 'Errore nel recupero dei bisogni.');
        } finally {
            setLoading(false);
        }
    };

    const toggleSwitch = async (id) => {
        const newState = !enabledStates[id];
        setEnabledStates(prevStates => ({
            ...prevStates,
            [id]: newState
        }));

        try {
            const { data, error } = await supabase
                .from('bisogni')
                .update({ enabled: newState })
                .eq('id', id);

            if (error) {
                console.error('Errore durante l\'aggiornamento:', error);
                Alert.alert('Errore durante l\'aggiornamento');
            } else {
                console.log('Record aggiornato:', data);
            }
        } catch (error) {
            console.error('Errore durante l\'aggiornamento:', error);
            Alert.alert('Errore durante l\'aggiornamento');
        }
    };

    const filterData = () => {
        switch (selectedIndex) {
            case 1:
                return bisogni.filter(item => enabledStates[item.id]);
            case 2:
                return bisogni.filter(item => !enabledStates[item.id]);
            default:
                return bisogni;
        }
    };

    const handleAddNeed = () => {
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setModalVisible(false);
        fetchBisogni();
    };
    const handleModalClose1 = () => {
        setModalVisible1(false);
        fetchBisogni();
    };

    const onPress = async (id, nome) => {
        if (!user.id) {
            Alert.alert('Errore', 'Utente non trovato');
            return;
        }
        try {
            const { data, error } = await supabase
                .from('dettagli')
                .insert([{
                    bisognoid: id,
                    soddisfattoil: new Date(),
                    uuid: user.id
                }]);

            if (error) {
                console.error('Errore durante l\'aggiornamento:', error);
                Alert.alert('Errore durante l\'aggiornamento');
            } else {
                setSnackbarMessage(`Bisogno "${nome}" aggiornato`);
                setSnackbarVisible(true);
            }
        } catch (error) {
            console.error('Errore durante l\'aggiornamento:', error);
            Alert.alert('Errore durante l\'aggiornamento');
        }
    };

    const Item = ({ nome, isEnabled, toggleSwitch, onPress, empty }) => {
        return (
            <ElevatedView elevation={4} style={styles.stayElevated}>
                <Pressable onPress={onPress} style={styles.pressable}>
                    <Text style={styles.text}>{nome}</Text>
                </Pressable>
                <Switch
                    onValueChange={toggleSwitch}
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    value={isEnabled}
                    style={styles.switch}
                />
            </ElevatedView>
        );
    };

    const formatData = (bisogni, numColumns) => {
        const numberOfFullRows = Math.floor(bisogni.length / numColumns);
        let numberOfElementsLastRow = bisogni.length - (numberOfFullRows * numColumns);
        while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
            bisogni.push({ id: `blank-${numberOfElementsLastRow}`, nome: 'blank', empty: true });
            numberOfElementsLastRow++;
        }
        return bisogni;
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#800080" />
            </View>
        );
    }

    const selectBisogno = (bisogno) => {
        setModalVisible1(true);
        setBisogno(bisogno);
    };


    return (
        <>
            <FlatList
                data={bisogni}
                renderItem={({ item, index }) => (
                    <Item
                        key={item.id}
                        nome={item.nome}
                        id={item.id}
                        onPress={() => selectBisogno(item)}
                        isEnabled={enabledStates[item.id]}
                        toggleSwitch={() => toggleSwitch(item.id)}
                        index={index}
                        empty={item.empty}
                    />
                )}
                keyExtractor={item => item.id.toString()}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />

            <AddBisogno
                visible={modalVisible}
                onClose={handleModalClose}
                onAdd={fetchBisogni}
                userId={session.user.id}
            />

            {Object.keys(bisogno).length > 0 && (
                <EditBisogno
                    visible={modalVisible1}
                    onClose={handleModalClose1}
                    onSave={fetchBisogni}
                    bisogno={bisogno}
                />
            )}

            <Snackbar
                isVisible={snackbarVisible}
                message={snackbarMessage}
                //actionText="aggiornato"
                duration={2500}
                position="top"
                backgroundColor="#00c65c"
                textColor="black"
                actionTextColor="white"
                containerStyle={{ marginHorizontal: 12 }}
                messageStyle={{ alignSelf: "center", textAlign: "center" }}
                actionTextStyle={{}}
                onDismiss={() => setSnackbarVisible(false)}
            />
        </>
    );
});

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        zIndex: 1
    },
    stayElevated: {
        height: 80,
        margin: 4,
        backgroundColor: 'white',
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', // Allinea verticalmente gli elementi
        padding: 10,
    },
    text: {
        fontSize: 16,
        color: 'black',
    },
    pressable: {
        flex: 1,
        justifyContent: 'center', // Centra verticalmente il testo
    },
    switch: {
        marginLeft: 10, // Aggiunge uno spazio tra il testo e lo switch
    },
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        margin: 0,
        flex: 1,
    },
    box: {
        height: 80,
        flex: 1,
        marginBottom: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    itemInvisible: {
        backgroundColor: 'transparent',
        borderWidth: 0,
    },
    itemDisabled: {
        backgroundColor: 'rgba(128, 0, 128, 0.4)', // More transparent background for disabled items
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 18,
    },
    progressCircle: {
        height: 40,
        width: 40,
        marginRight: 10,
    },
    text: {
        fontSize: 18,
        color: '#101010',
        fontWeight: '500',
    },
    button: {
        height: 50,
        width: '80%',
        backgroundColor: '#800080',
        //justifyContent: 'center',
        //alignItems: 'center',
        borderRadius: 4,
        //alignSelf: 'center',
        //marginTop: 20,
        //padding: 15,
        backgroundColor: '#3ca9d7',
        //borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    icon: {
        marginRight: 10,
    },
    topSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomSection: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: '#ddd',
        marginVertical: 5,
    },
    button: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#3ca9d7',
        borderRadius: 5,
        alignItems: 'center',
        position: 'bottom',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    floating: {
        position: 'fixed',
        width: 60,
        bottom: 0,
        right: 0,
        backgroundColor: '#800080',
        color: '#fff',
        borderRadius: 50,
        textAlign: 'center',
        fontSize: 30,
        boxSshadow: '2px 2px 3px #999',
        zIndex: 1,
    },
    box: {
        //width: 250,
        height: 80,
        flex: 1,
        marginBottom: 10,
    },

});

export default FlatListComponent;
