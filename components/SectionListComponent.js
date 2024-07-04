import React, { useState, useEffect, useCallback } from 'react';
import { RefreshControl, View, Text, SectionList, Pressable, StyleSheet } from 'react-native';
import * as BisogniController from '../controllers/bisogniController';
import * as CategorieController from '../controllers/categorieController';
import * as DettagliController from '../controllers/dettagliController';
import { useTheme } from '../context/ThemeContext';
import AddBisogno from '../components/AddBisogno';
import EditBisogno from '../components/EditBisogno';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import Snackbar from '../components/Snackbar';
import { Color } from 'react-native';
import IconaTestoIconaView from '../components/IconaTestoIconaView';

const BisogniList = ({ session, setFabAction, showModalAddBisogno }) => {
    const { theme } = useTheme();
    const [modalVisibleAdd, setModalVisibleAdd] = useState(false);
    const [modalVisibleEdit, setModalVisibleEdit] = useState(false);
    const [bisogni, setBisogni] = useState([]);
    const [bisogno, setBisogno] = useState({});
    const [categorie, setCategorie] = useState([]);
    const [bisInCat, setBisInCat] = useState([]);
    const [loading, setLoading] = useState(false);
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (setFabAction) {
            setFabAction(() => () => setModalVisibleAdd(true));
        }
    }, [setFabAction]);

    // Apre il modal se showModalAddBisogno è vero
    useEffect(() => {
        if (showModalAddBisogno) {
            setModalVisibleAdd(true);
        }
    }, [showModalAddBisogno]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Ottieni le categorie
                const categorie = await getCategorie();

                // Ottieni i bisogni
                const fetchedBisogni = await getBisogni();

                // Se ci sono bisogni, ottieni le associazioni categorie-bisogni
                if (fetchedBisogni && fetchedBisogni.length > 0) {
                    const fetchedBisInCat = await CategorieController.getBisInCat();

                    // Mappa le associazioni di categorie per ogni bisogno
                    const bisogniConAssociazioni = fetchedBisogni.map(bisogno => {
                        const associazioni = fetchedBisInCat.filter(associazione => associazione.bisognoid === bisogno.id);
                        console.log(bisogno.nome, ', associato in:', associazioni);
                        return { ...bisogno, associazioni };
                    });

                    // Imposta lo stato di bisInCat con i bisogni contenenti le associazioni
                    setBisInCat(bisogniConAssociazioni);
                }
                onRefresh
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const getCategorie = async () => {
        setLoading(true);
        try {
            const data = await CategorieController.getCategorie();
            if (Array.isArray(data)) {
                setCategorie(data);
            } else {
                console.error('getCategorie non ha restituito un array:', data);
                setCategorie([]);
            }
        } catch (error) {
            console.error('Errore nel recupero delle categorie:', error);
            setCategorie([]);
        } finally {
            setLoading(false);
        }
    };

    const getBisInCat = async () => {
        setLoading(true);
        try {
            const data = await CategorieController.getBisInCat();
            if (Array.isArray(data)) {
                setBisInCat(data);
            } else {
                console.error('getBisInCat non ha restituito un array:', data);
                setBisInCat([]);
            }
        } catch (error) {
            console.error('Errore nel recupero delle associazioni:', error);
            setBisInCat([]);
        } finally {
            setLoading(false);
        }
    };

    const getBisogni = async () => {
        setLoading(true);
        try {
            const data = await BisogniController.getBisogni();
            //console.log('SectionListBisogni:', data    );
            if (Array.isArray(data)) {
                setBisogni(data);
            } else {
                console.error('getBisogni non ha restituito un array:', data);
                setBisogni([]);
            }
        } catch (error) {
            console.error('Errore nel recupero dei bisogni:', error);
            setBisogni([]);
        } finally {
            setLoading(false);
        }
    };

    const transformData = (categorie, bisogni, bisInCat) => {
        //console.log('categorie:', categorie.length, 'bisogni:', bisogni, 'bisInCat:', bisInCat);
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

    const selectBisogno = (bisogno) => {
        setBisogno(bisogno);
        setModalVisibleEdit(true);
    };

    const handleModalAddClose = () => {
        setModalVisibleAdd(false);
        getBisogni(); // Aggiorna i bisogni dopo la chiusura della modal di aggiunta
    };

    const handleModalEditClose = () => {
        setModalVisibleEdit(false);
        getBisogni(); // Aggiorna i bisogni dopo la chiusura della modal di modifica
    };

    const updateBisognoOld = async (bisogno) => {
        setLoading(true);
        try {
            const updatedBisogno = { ...bisogno, soddisfattoil: new Date() };
            const { id, nome, soddisfattoil, colore } = updatedBisogno;
            const dataToUpdate = { nome, soddisfattoil, colore };

            await BisogniController.updateBisogno(id, dataToUpdate);

            const dettaglio = {
                bisognoid: bisogno.id,
                soddisfattoil: new Date(),
            };
            await DettagliController.createDettaglio(dettaglio);

            setSnackbarMessage(`Bisogno "${nome}" aggiornato`);
            setSnackbarVisible(true);

            getBisogni();
        } catch (error) {
            console.error('Error updating bisogno:', error);
            setSnackbarMessage('Error updating bisogno:', error.message || 'Unknown error');
            setSnackbarVisible(true);
        } finally {
            setLoading(false);
        }
    };
    const updateBisogno = async (bisogno) => {
        setLoading(true);
        try {
            // Aggiungi una condizione per verificare se il bisogno è già stato aggiornato oggi
            const today = new Date();
            const todayStart = new Date(today.setHours(0, 0, 0, 0));
            const bisognoUpdatedDate = new Date(bisogno.soddisfattoil);
            const bisognoUpdatedStart = new Date(bisognoUpdatedDate.setHours(0, 0, 0, 0));

            // Verifica se il bisogno è già stato aggiornato oggi
            if (bisognoUpdatedStart.getTime() === todayStart.getTime()) {
                setSnackbarMessage(`Bisogno "${bisogno.nome}" è già stato aggiornato oggi`);
                setSnackbarVisible(true);
                setLoading(false);
                console.log(snackbarMessage)
                return;
            }

            const updatedBisogno = { ...bisogno, soddisfattoil: new Date() };
            const { id, nome, soddisfattoil, colore } = updatedBisogno;
            const dataToUpdate = { nome, soddisfattoil, colore };

            await BisogniController.updateBisogno(id, dataToUpdate);

            const dettaglio = {
                bisognoid: bisogno.id,
                soddisfattoil: new Date(),
            };
            await DettagliController.createDettaglio(dettaglio);

            setSnackbarMessage(`Bisogno "${nome}" aggiornato`);
            setSnackbarVisible(true);

            getBisogni();
        } catch (error) {
            console.error('Error updating bisogno:', error);
            setSnackbarMessage('Error updating bisogno:', error.message || 'Unknown error');
            setSnackbarVisible(true);
        } finally {
            setLoading(false);
        }
    };



    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getBisInCat().then(() => {
            setRefreshing(false);
        });
    }, []);

    const renderEmptyComponent = () => (
        <View style={[theme.article]}>
            <View style={[theme.mb20]}>
                <Text style={[ theme.text12, theme.mb20]}>Nessun bisogno inserito:</Text>
                <View style={theme.checkTextContainer}>
                    <Text style={[theme.text, theme.text12]}>Clicca sul pulsante</Text>
                    <Icon name="plus-circle" size={24} color={theme.colors.primary} style={[theme.ml20]} />
                    <Text style={[theme.text, theme.text12, theme.ml20]}>in basso a destra</Text>
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
        <View  >
            <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item.uniqueKey}
                renderItem={({ item, index, section }) => (
                    <View style={[theme.grid, theme.mb10]}>
                        <View style={{ width: 8, alignSelf: 'stretch', backgroundColor: item.colore, height: '100%',borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }}/>
                        <View style={{ flex: 1, backgroundColor: theme.colors.slate5, height: 60, justifyContent: 'center', borderTopRightRadius: 8, borderBottomRightRadius: 8 }}>
                            <IconaTestoIconaView
                                leftIcon={
                                    <Icon
                                        name="check"
                                        size={18}
                                        color={item.soddisfattoil && isToday(new Date(item.soddisfattoil)) ? theme.colors.green10 : theme.colors.slate5}
                                        style={theme.mrl0}
                                    />
                                }
                                text={
                                    <Text style={[theme.text]}>{item.nome}</Text>
                                }
                                rightIcon={
                                    <Icon name="angle-right" size={24} color={theme.colors.slate9} style={theme.mr20} />
                                }
                                onPressLeftIcon={() => updateBisogno(item)}
                                onPressRightIcon={() => selectBisogno(item)}
                            />
                        </View>
                    </View>
                )}
                ListEmptyComponent={renderEmptyComponent}
                ListFooterComponent={<View style={theme.contentPadding} />}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
            <AddBisogno
                visible={modalVisibleAdd}
                onClose={handleModalAddClose}
                onAdd={getBisogni} // Passiamo getBisogni come prop onAdd
                userId={session.user.id}
            />

            <EditBisogno
                visible={modalVisibleEdit}
                onClose={handleModalEditClose}
                bisogno={bisogno}
                userId={session.user.id}
            />

            <Spinner
                visible={loading}
                textContent={'Aggiornamento in corso...'}
                textStyle={styles.spinnerTextStyle}
            />

            <Snackbar
                //visible={snackbarVisible}
                visible={true}
                onDismiss={() => setSnackbarVisible(false)}
            >
            </Snackbar>
        </View>

    );
};

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF'
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white', // o qualsiasi colore di sfondo desideri
    },
    colorBar: {
        width: 5, alignSelf: 'stretch',
    },
    contentContainer: {
        flex: 1,
    },
});

export default BisogniList;
