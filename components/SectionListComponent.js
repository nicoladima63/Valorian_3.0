import React, { useState, useEffect, useCallback } from 'react';
import { RefreshControl, View, Text, SectionList, Pressable, StyleSheet } from 'react-native';
import * as BisogniController from '../controllers/bisogniController';
import * as CategorieController from '../controllers/categorieController';
import * as DettagliController from '../controllers/dettagliController';
import { useTheme } from '../context/ThemeContext';
import AddBisogno from '../components/AddBisogno';
import EditBisogno from '../components/EditBisogno';
import Spinner from 'react-native-loading-spinner-overlay';
import ElevatedView from 'react-native-elevated-view';
import { FontAwesome } from '@expo/vector-icons';
import Snackbar from '../components/Snackbar';
import Icon from 'react-native-vector-icons/FontAwesome';

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
            try {
                const fetchedCategorie = await getCategorie();
                setCategorie(fetchedCategorie);
                console.log('categories', fetchedCategorie);

                const fetchedBisogni = await getBisogni();
                setBisogni(fetchedBisogni);
                console.log('bisogni', fetchedBisogni);

                if (fetchedBisogni && fetchedBisogni.length > 0) {
                    const fetchedBisInCat = await getBisInCat();
                    setBisInCat(fetchedBisInCat);
                    console.log('bisInCat', fetchedBisInCat);
                } else {
                    console.log('No bisogni found, skipping bisInCat fetch');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const getCategorie = async () => {
        try {
            const data = await CategorieController.getCategorie();
            return data;
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    };

    const getBisInCat = async () => {
        try {
            const data = await CategorieController.getBisInCat();
            return data;
        } catch (error) {
            console.error('Error fetching bisInCat:', error);
            throw error;
        }
    };

    const getBisogni = async () => {
        try {
            const data = await BisogniController.getBisogni();
            return data;
        } catch (error) {
            console.error('Error fetching bisogni:', error);
            throw error;
        }
    };

    const transformData = (categorie, bisogni, bisInCat) => {
        if (!bisogni || bisogni.length === 0) {
            return [];
        }

        const transformedData = categorie.map(categoria => {
            const categoryBisogni = bisInCat
                .filter(pic => pic.categoriaid === categoria.id)
                .map(pic => {
                    const bisogno = bisogni.find(bisogno => bisogno.id === pic.bisognoid);
                    return bisogno ? { ...bisogno, colore: categoria.colore } : null;
                })
                .filter(item => item !== null)
                .map((item, index) => ({ ...item, uniqueKey: `${item.id}-${categoria.id}-${index}` }));

            if (categoryBisogni.length === 0) {
                return null;
            }

            return {
                title: categoria.nome,
                color: categoria.colore,
                data: categoryBisogni
            };
        }).filter(section => section !== null);

        return transformedData;
    };

    const DATA = transformData(categorie, bisogni, bisInCat);
    console.log('DATA:', DATA);

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
        try {
            // Aggiorna la data di soddisfazione
            const updatedBisogno = { ...bisogno, soddisfattoil: new Date() };

            // Filtra i campi non necessari
            const { id, nome, soddisfattoil, colore } = updatedBisogno;
            const dataToUpdate = { nome, soddisfattoil, colore };

            await BisogniController.updateBisogno(id, dataToUpdate); // Aggiorna il bisogno usando l'id e l'oggetto filtrato

            // Crea il dettaglio
            const dettaglio = {
                bisognoid: bisogno.id,
                soddisfattoil: new Date(),
            };
            await DettagliController.createDettaglio(dettaglio); // crea il dettaglio

            setSnackbarMessage(`Bisogno "${nome}" aggiornato`);
            setSnackbarVisible(true);

            // Aggiorna la lista dei bisogni dopo l'aggiornamento
            getBisogni();
        } catch (error) {
            console.error('Error updating bisogno:', error); // Cambiato alert con console.error per gestire errori
            setSnackbarMessage('Error updating bisogno:', error.message || 'Unknown error');
            setSnackbarVisible(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (setFabAction) {
            setFabAction(() => () => setModalVisibleAdd(true));
        }
    }, [setFabAction]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getBisInCat().then(() => {
            setRefreshing(false);
        });
    }, []);

    const renderEmptyComponent = () => (
        <View>
            <View style={theme.articleTop}>
                <Text style={theme.articleTitle}>Nessun bisogno inserito:</Text>
            </View>
            <View style={theme.articleBottom}>
                <View style={theme.checkTextContainer}>
                    <Icon name="info-circle" size={22} color="#2ECC71" style={theme.checkIcon} />
                    <Text style={theme.articleText}>Clicca sul pulsante</Text>
                    <Icon name="plus-circle" size={24} color="#D8BFD8" style={[theme.ml20, theme.checkIcon]} />
                    <Text style={theme.articleText}>in basso a destra</Text>
                </View>
            </View>
        </View>
    );

    const isToday = (someDate) => {
        const today = new Date();
        return someDate.getDate() === today.getDate() &&
            someDate.getMonth() === today.getMonth() &&
            someDate.getFullYear() === today.getFullYear();
    };

    return (
        <View style={theme.body}>
            <View style={theme.articleTop}>
                <SectionList
                    sections={DATA}
                    keyExtractor={(item, index) => item.uniqueKey}
                    renderItem={({ item }) => (
                        <View style={theme.contentArticle2}>
                            <View style={theme.leftContainer}>
                                <Icon name="check" size={18} color={item.soddisfattoil && isToday(new Date(item.soddisfattoil)) ? "#24bb21" : "#aaaaaa"} />
                            </View>

                            <Pressable onPress={() => updateBisogno(item)} style={theme.centerContainer}>
                                <Text style={theme.articleText}>{item.nome}</Text>
                            </Pressable>

                            <Pressable onPress={() => selectBisogno(item)} style={theme.rightContainer}>
                                <View style={theme.iconContainer}>
                                    <Icon name="angle-right" size={24} color="#c3c3c3" />
                                </View>
                            </Pressable>
                        </View>)}
                    renderSectionHeader={({ section: { title, color } }) => (
                        <Text style={[theme.articleTitle, { color: color }]}>{title}</Text>
                    )}
                    ListEmptyComponent={renderEmptyComponent}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                />

            </View>

            <View style={theme.articleBottom}>
                <View style={theme.checkTextContainer}>
                    <Icon name="info-circle" size={20} color="#24bb21" style={theme.leftContainer} />
                    <Text style={theme.articleText}>Tocca il nome per soddisfare. Tocca la freccia per modificare</Text>
                </View>

            </View>

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
                textStyle={theme.spinnerTextStyle}
            />
            <Snackbar
                isVisible={snackbarVisible}
                message={snackbarMessage}
                duration={1000}
                position="bottom"
                backgroundColor="#ffc107"
                textColor="black"
                onDismiss={() => setSnackbarVisible(false)}
            />
        </View>
    );
}

export default BisogniList;
