// BisogniList.js
import React, { useState, useEffect, useCallback } from 'react';
import { RefreshControl, View, Text, SectionList, Pressable } from 'react-native';
import * as BisogniController from '../controllers/bisogniController';
import * as CategorieController from '../controllers/categorieController';
import { useTheme } from '../context/ThemeContext';
import AddBisogno from '../components/AddBisogno';
import EditBisogno from '../components/EditBisogno';
import Spinner from 'react-native-loading-spinner-overlay';
import styles from '../themes/style';
import ElevatedView from 'react-native-elevated-view';
import { FontAwesome } from '@expo/vector-icons'; // Assicurati di avere @expo/vector-icons installato
import Snackbar from '../components/Snackbar';

const BisogniList = ({ session, setFabAction }) => {
    const { theme } = useTheme();
    const [modalVisibleAdd, setModalVisibleAdd] = useState(false);
    const [modalVisibleEdit, setModalVisibleEdit] = useState(false);
    const [user, setUser] = useState(session.user);

    const [bisogni, setBisogni] = useState([]);
    const [bisogno, setBisogno] = useState({});

    const [categorie, setCategorie] = useState([]);
    const [bisInCat, setBisInCat] = useState([]);

    const [loading, setLoading] = useState(false);
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            const fetchedBisogni = await BisogniController.getBisogni();
            const fetchedCategorie = await CategorieController.getCategorie();
            const fetchedBisInCat = await CategorieController.getBisInCat();

            setBisogni(fetchedBisogni);
            setCategorie(fetchedCategorie);
            setBisInCat(fetchedBisInCat);

            setLoading(false);
        };

        fetchData();
    }, []);

    const transformData = (categorie, bisogni, productsInCategories) => {
        return categorie.map(categoria => ({
            title: categoria.nome,
            color: categoria.colore,
            data: productsInCategories
                .filter(pic => pic.categoriaid === categoria.id)
                .map(pic => {
                    const bisogno = bisogni.find(bisogno => bisogno.id === pic.bisognoid);
                    return bisogno ? { ...bisogno, categoriaColore: categoria.colore } : null;
                })
                .filter(item => item !== null)
        }));
    };

    const DATA = transformData(categorie, bisogni, bisInCat);

    const getBisogni = async () => {
        const fetchedBisogni = await BisogniController.getBisogni();
        setBisogni(fetchedBisogni);
    };

    const selectBisogno = (bisogno) => {
        setModalVisibleEdit(true);
        setBisogno(bisogno);
    };

    const handleModalAddClose = () => {
        setModalVisibleAdd(false);
        getBisogni();
    };

    const handleModalEditClose = () => {
        setModalVisibleEdit(false);
        getBisogni();
    };

    const updateBisogno = async (bisogno) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSnackbarMessage(`Bisogno "${bisogno.nome}" aggiornato`);
            setSnackbarVisible(true);

        }, 2000);
        return;
        // Implementa qui la logica per aggiornare la data di soddisfazione del bisogno
        bisogno.dataSoddisfazione = new Date(); // Aggiorna la data di soddisfazione a oggi
        await BisogniController.updateBisogno(bisogno);
        getBisogni();
    };

    useEffect(() => {
        if (setFabAction) {
            setFabAction(() => () => setModalVisibleAdd(true));
        }
    }, [setFabAction]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getCategorie().then(() => {
            setRefreshing(false);
        });
    }, []);



    return (
        <>
            <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item.id + index}
                renderItem={({ item }) =>
                    <View style={{ marginLeft: 10, marginRight: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <ElevatedView elevation={4} style={[theme.stayElevated, { height: 60, flex: 1, flexDirection: 'row', alignItems: 'center' }]}>
                            <Pressable onPress={() => updateBisogno(item)} style={[styles.pressable, { flex: 1 }]}>
                                <Text style={styles.text}>{item.nome}, {item.importanza}</Text>
                            </Pressable>
                            <Pressable onPress={() => selectBisogno(item)} style={{ paddingVertical: 4,paddingHorizontal: 25, borderWidth: 0, borderColor: '#dedede', borderRadius: 4, }}>
                                <FontAwesome name="angle-right" size={24} color="grey" />
                            </Pressable>
                        </ElevatedView>
                    </View>
                }
                renderSectionHeader={({ section: { title, color } }) => (
                    <Text style={{ fontSize: 18, backgroundColor: color, padding: 8, borderRadius: 4 }}>{title}</Text>
                )}
                //refreshControl={
                //    <RefreshControl
                //        refreshing={refreshing}
                //        onRefresh={onRefresh}
                //    />
                //}

            />
            <AddBisogno
                visible={modalVisibleAdd}
                onClose={handleModalAddClose}
                onAdd={getBisogni}
                userId={session.user.id}
            />

            {Object.keys(bisogno).length > 0 && (
                <EditBisogno
                    visible={modalVisibleEdit}
                    onClose={handleModalEditClose}
                    onAdd={getBisogni}
                    bisogno={bisogno}
                    userId={session.user.id}
                />
            )}
            <Spinner
                visible={loading}
                textContent={'Caricamento dati in corso...'}
                textStyle={styles.spinnerTextStyle}
            />
            <Snackbar
                isVisible={snackbarVisible}
                message={snackbarMessage}
                //actionText="aggiornato"
                duration={1500}
                position="top"
                backgroundColor="#ffc107"
                textColor="black"
                actionTextColor="white"
                containerStyle={{ marginHorizontal: 12 }}
                messageStyle={{ alignSelf: "center", textAlign: "center" }}
                actionTextStyle={{}}
                onDismiss={() => setSnackbarVisible(false)}
            />

        </>
    );
};

export default BisogniList;
