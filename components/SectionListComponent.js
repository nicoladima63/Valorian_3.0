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

            // Log dei dati che vengono inviati al controller
            console.log('Dati inviati per l\'aggiornamento:', JSON.stringify(dataToUpdate));

            await BisogniController.updateBisogno(id, dataToUpdate); // Aggiorna il bisogno usando l'id e l'oggetto filtrato
            const dettaglio = {
                bisognoid: bisogno.id,
                soddisfattoil: new Date(),
            }
            await DettagliController.createDettaglio(dettaglio); // crea il dettagli usando l'id e l'oggetto filtrato
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
            <View style={styles.articleTop}>
                <Text style={styles.articleTitle}>Nessun bisogno inserito:</Text>
            </View>
            <View style={styles.articleBottom}>
                <View style={styles.checkTextContainer}>
                    <Icon name="info-circle" size={22} color="#2ECC71" style={styles.checkIcon} />
                    <Text style={styles.articleText}>Clicca sul pulsante</Text>
                    <Icon name="plus-circle" size={24} color="#D8BFD8" style={[styles.ml20, styles.checkIcon]} />
                    <Text style={styles.articleText}>in basso a destra</Text>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.body}>
            <View style={styles.articleTop}>
                <SectionList
                    sections={DATA}
                    keyExtractor={(item, index) => item.uniqueKey}
                    renderItem={({ item }) => (
                        <View style={styles.contentArticle}>
                            <Pressable onPress={() => updateBisogno(item)}>
                                <View style={styles.checkTextContainer}>
                                    <Icon name="check" size={18} color="#aaaaaa" style={styles.checkIcon} />
                                    <Text style={styles.articleText}>{item.nome}</Text>
                                </View>
                            </Pressable>
                            <Pressable onPress={() => selectBisogno(item)}>
                                <Icon name="angle-right" size={24} color="#E3E3E3" style={styles.angleRightIcon} />
                            </Pressable>
                        </View>
                    )}
                    renderSectionHeader={({ section: { title, color } }) => (
                        <Text style={[styles.articleTitle, { color: color }]}>{title}</Text>
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



            <View style={styles.articleBottom}>
                <View style={styles.checkTextContainer}>
                    <Icon name="info-circle" size={18} color="#2ECC71" style={styles.checkIcon} />
                    <Text style={styles.articleText}>Tocca il nome per soddisfare. Tocca la freccia per modificare</Text>
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
                textStyle={styles.spinnerTextStyle}
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
const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: '#0d1017',
    },
    container: {
        flex: 1,
        backgroundColor: '#1C1C1C  ',
    },
    header: {
        flex: 0.1,
        backgroundColor: '#161b21',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    logo: {
        width: 28,
        height: 28,
        marginRight: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#dedede',
    },
    content: {
        flex: 1.5,
        flexDirection: 'column',
    },
    contentTitle: {
        fontSize: 16,
        marginLeft: 12,
        color: '#dedede',
        marginBottom: 8,
        marginTop: 20,
    },



    contentArticle: {
        backgroundColor: '#21262c',
        margin: 0,
        padding: 12,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#3F424A',
        minHeight: 60,
        marginTop: 4,
        flexDirection: 'row', // Dispone gli elementi in fila
        alignItems: 'center', // Centra gli elementi verticalmente
        justifyContent: 'space-between', // Spazio tra gli elementi
    },
    contentArticleSquareContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    contentArticleSquare: {
        backgroundColor: '#21262c',
        marginVertical: 4,
        padding: 12,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#3F424A',
        height: 80,
        width: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 4
    },
    checkTextContainer: {
        flexDirection: 'row',
    },
    checkIcon: {
        marginRight: 20, // Spazio tra l'icona check e il testo
    },
    articleText: {
        color: '#fff',
        marginRight: 20, // Spazio tra il testo e l'icona angle-right
    },
    angleRightIcon: {
        width: 44,
    },





    contentPadding: {
        height: 100, // Aggiungi uno spazio extra in fondo al contenuto
    },
    body: {
        flex: 1,
        backgroundColor: '#0d1017',
        position: 'relative',
    },
    article: {
        backgroundColor: '#161b21',
        marginHorizontal: 12,
        padding: 14,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#3F424A',
    },
    articleTitle: {
        fontSize: 16,
        color: '#dedede',
        marginBottom: 0,
        marginTop: 14,
    },
    articleText: {
        color: '#E3E3E3',
    },
    articleTop: {
        backgroundColor: '#161b21',
        marginHorizontal: 12,
        padding: 14,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderWidth: 1,
        borderColor: '#3F424A',
    },
    articleMiddle: {
        backgroundColor: '#161b21',
        marginHorizontal: 12,
        padding: 14,
        borderRadius: 0,
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: '#3F424A',
    },
    articleBottom: {
        backgroundColor: '#161b21',
        marginHorizontal: 12,
        padding: 14,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: '#3F424A',
    },
    bodyFooter: {
        backgroundColor: '#21262c',
        margin: 0,
        padding: 10,
        borderRadius: 4,
        //borderWidth: 1,
        borderColor: 'grey',
        position: 'absolute', // Mantieni posizione assoluta
        bottom: 0, // Mantieni in fondo al contenitore
        left: 0,  // Allinea a sinistra
        right: 0, // Allinea a destra
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    footer: {
        flex: 0.1,
        backgroundColor: '#161b21',
        justifyContent: 'center',

    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 12,
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


export default BisogniList;
