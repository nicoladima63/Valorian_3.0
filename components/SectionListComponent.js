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

                const fetchedBisogni = await getBisogni();
                setBisogni(fetchedBisogni);

                if (fetchedBisogni && fetchedBisogni.length > 0) {
                    const fetchedBisInCat = await getBisInCat();
                    setBisInCat(fetchedBisInCat);
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
            setBisogni(data); // Aggiungi questo per aggiornare lo stato
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

    const updateBisogno = async (bisogno) => {
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
        <View >
            <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item.uniqueKey}
                renderItem={({ item, index, section }) => (
                    <View style={[theme.article, theme.articleMiddle, theme.grid, index === section.data.length - 1 && theme.articleBottom]}>
                        <View style={theme.left}>
                            <Icon name="check" size={18} color={item.soddisfattoil && isToday(new Date(item.soddisfattoil)) ? "#24bb2180" : theme.colors.contetArticle} />
                        </View>

                        <Pressable onPress={() => updateBisogno(item)} style={theme.center}>
                            <Text style={theme.articleText}>{item.nome}</Text>
                        </Pressable>

                        <Pressable onPress={() => selectBisogno(item)} style={theme.right}>
                            <View>
                                <Icon name="angle-right" size={24} color="#c3c3c3" />
                            </View>
                        </Pressable>
                    </View>

                )}
                //ItemSeparatorComponent={<View style={theme.mb10} />}
                renderSectionHeader={({ section: { title, color } }) => (
                    <View style={[theme.article, theme.articleTop]}>
                        <Text style={[theme.h5, { color: color }]}>{title}</Text>
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
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />

            <Snackbar
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}
                duration={3000}
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
