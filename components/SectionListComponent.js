import React, { useState, useEffect, useCallback } from 'react';
import { RefreshControl, View, Text, SectionList, StyleSheet } from 'react-native';
import * as BisogniController from '../controllers/bisogniController';
import * as CategorieController from '../controllers/categorieController';
import * as DettagliController from '../controllers/dettagliController';
import { useTheme } from '../context/ThemeContext';
import AddBisogno from '../components/AddBisogno';
import EditBisogno from '../components/EditBisogno';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import Snackbar from '../components/Snackbar';
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
    const [DATA, setDATA] = useState([]);

    useEffect(() => {
        if (setFabAction) {
            setFabAction(() => () => setModalVisibleAdd(true));
        }
    }, [setFabAction]);

    useEffect(() => {
        if (showModalAddBisogno) {
            setModalVisibleAdd(true);
        }
    }, [showModalAddBisogno]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const fetchedCategorie = await getCategorie();
            const fetchedBisogni = await getBisogni();
            const fetchedBisInCat = await CategorieController.getBisInCat();

            setCategorie(fetchedCategorie);
            setBisogni(fetchedBisogni);
            setBisInCat(fetchedBisInCat);

            const newData = transformData(fetchedCategorie, fetchedBisogni, fetchedBisInCat);
            setDATA(newData);
        } catch (error) {
            console.error('Error fetching data:', error);
            setSnackbarMessage('Errore nel caricamento dei dati');
            setSnackbarVisible(true);
        } finally {
            setLoading(false);
        }
    };

    const getCategorie = async () => {
        try {
            const data = await CategorieController.getCategorie();
            if (Array.isArray(data)) {
                return data;
            } else {
                console.error('getCategorie non ha restituito un array:', data);
                return [];
            }
        } catch (error) {
            console.error('Errore nel recupero delle categorie:', error);
            return [];
        }
    };

    const getBisogni = async () => {
        try {
            const data = await BisogniController.getBisogni();
            if (Array.isArray(data)) {
                return data;
            } else {
                console.error('getBisogni non ha restituito un array:', data);
                return [];
            }
        } catch (error) {
            console.error('Errore nel recupero dei bisogni:', error);
            return [];
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

    const selectBisogno = (bisogno) => {
        setBisogno(bisogno);
        setModalVisibleEdit(true);
    };

    const handleModalAddClose = () => {
        setModalVisibleAdd(false);
        fetchData(); // Aggiorna tutti i dati dopo la chiusura della modal di aggiunta
    };

    const handleModalEditClose = () => {
        setModalVisibleEdit(false);
        fetchData(); // Aggiorna tutti i dati dopo la chiusura della modal di modifica
    };

    const updateBisogno = async (bisogno) => {
        setLoading(true);
        try {
            const today = new Date();
            const todayStart = new Date(today.setHours(0, 0, 0, 0));
            const bisognoUpdatedDate = new Date(bisogno.soddisfattoil);
            const bisognoUpdatedStart = new Date(bisognoUpdatedDate.setHours(0, 0, 0, 0));

            if (bisognoUpdatedStart.getTime() === todayStart.getTime()) {
                setSnackbarMessage(`Bisogno "${bisogno.nome}" è già stato aggiornato oggi`);
                setSnackbarVisible(true);
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

            fetchData(); // Aggiorna tutti i dati dopo l'aggiornamento di un bisogno
        } catch (error) {
            console.error('Error updating bisogno:', error);
            setSnackbarMessage('Errore nell\'aggiornamento del bisogno: ' + (error.message || 'Errore sconosciuto'));
            setSnackbarVisible(true);
        } finally {
            setLoading(false);
        }
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchData().then(() => {
            setRefreshing(false);
        });
    }, []);

    const renderEmptyComponent = () => (
        <View style={[theme.mb20]}>
            <View style={[theme.article, theme.articleTop]}>
                <Text style={[theme.text]}>Nessun bisogno inserito:</Text>
            </View>
            <View style={[theme.article, theme.articleBottom]}>
                <View style={theme.grid}>
                    <Text style={[theme.text, theme.text12]}>Clicca sul pulsante</Text>
                    <Icon name="plus-circle" size={24} color={theme.colors.primary} />
                    <Text style={[theme.text, theme.text12]}>in basso a destra</Text>
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
        <View>
            <SectionList
                sections={DATA}
                keyExtractor={(item) => item.uniqueKey}
                renderItem={({ item }) => (
                    <View style={[theme.grid, theme.mb10]}>
                        <View style={{ width: 8, alignSelf: 'stretch', backgroundColor: item.colore, height: '100%', borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }} />
                        <View style={{ flex: 1, backgroundColor: theme.colors.slate5, height: 50, justifyContent: 'center', borderTopRightRadius: 8, borderBottomRightRadius: 8, borderWidth: 1, borderColor: theme.colors.slate9 }}>
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
                onAdd={fetchData}
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
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}
            >
                {snackbarMessage}
            </Snackbar>
        </View>
    );
};

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF'
    },
});

export default BisogniList;