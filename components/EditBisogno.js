import React, { useState, useEffect, useRef } from 'react';
import * as CatController from '../controllers/categorieController';
import * as BisController from '../controllers/bisogniController';
import BisInCat from './BisInCat';
import {
    View, Text, Alert, Pressable, TouchableOpacity, StyleSheet, Modal,
    FlatList, ScrollView, TouchableWithoutFeedback, TextInput,
    KeyboardAvoidingView, Platform, Keyboard
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Slider from '@react-native-community/slider';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import Color from 'color';

const CategoryItem = ({ categoria, isSelected, onSelect }) => {
    const { theme } = useTheme();
    return (
        <TouchableOpacity
            onPress={() => onSelect(categoria)}
            style={[
                styles.categoryItem,
                {
                    backgroundColor: Color(categoria.colore).alpha(0.5).toString(),
                },
            ]}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center', width: '50%' }}>
                <Icon
                    name={isSelected ? 'check-circle' : 'circle-thin'}
                    size={24}
                    color={categoria.colore}
                    style={{ marginRight: 10 }}
                />
                <Text style={[theme.textItem, { color: categoria.colore }]}>{categoria.nome}</Text>
            </View>
        </TouchableOpacity>
    );
};


const EditBisogno = ({ visible, onClose, bisogno, onSave, userId }) => {
    const [nome, setNome] = useState('');
    const [importanza, setImportanza] = useState('');
    const [tolleranza, setTolleranza] = useState('');
    const [colore, setColore] = useState('');

    const [loading, setLoading] = useState(false);
    const { theme } = useTheme();
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [categorie, setCategorie] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);


    useEffect(() => {
        if (visible && bisogno.id) {
            getCategorieForBisogno(bisogno.id);
            setInitialValues(bisogno);
        }
    }, [visible, bisogno]);

    const setInitialValues = (bisogno) => {
        setNome(bisogno.nome || '');
        setImportanza(bisogno.importanza || '');
        setTolleranza(bisogno.tolleranza || '');
        setColore(bisogno.colore || '');
        setSelectedCategories(bisogno.categorie || []);
    };

    const getCategorieForBisogno = async (bisognoid) => {
        try {
            const associazioni = await CatController.getAssociazioni(bisognoid);
            console.log('Associazioni:', associazioni);
            const selectedIds = associazioni.map((associazione) => associazione.categoriaid);
            console.log('Selected IDs:', selectedIds);
            setSelectedCategories(selectedIds);
        } catch (error) {
            console.error('Errore nel caricamento delle categorie associate:', error);
        }
    };
    useEffect(() => {
        if (!visible) {
            resetForm();
        }
    }, [visible]);

    useEffect(() => {
        loadCategorie();
    }, []);
    const loadCategorie = async () => {
        try {
            const data = await CatController.getCategorie();
            setCategorie(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handlePressEmptySpace = () => {
        Keyboard.dismiss(); // Nascondi la tastiera quando si tocca uno spazio vuoto
    };

    const handleSubmit = async () => {
        setLoading(true); // Inizia il caricamento
        validateForm();

        // Wait for the validation state to update
        if (!isFormValid) {
            setLoading(false);
            return;
        }

        const update = {
            nome,
            importanza,
            tolleranza,
            colore,
            soddisfattoil,
            creatoil,
            enabled: true,
            uuid: userId
        };

        try {
            const data = await BisController.updateBisogno(bisogno.id, update);

            try {
                const updateResult = await CatController.aggiornaAssociazioni(bisogno.id, selectedCategories);

                if (updateResult) {
                    onSave();
                    handleClose();
                }
            } catch (error) {
                console.error('152Errore durante l\'aggiornamento:', error);
                // Gestisci l'errore qui, ad esempio mostrando un messaggio all'utente
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Errore durante la chiamata API.');
        } finally {
            setLoading(false);
            handleClose();
            resetForm();
        }
    };

    const validateForm = () => {
        let errors = {};
        // Validate name field 
        if (!nome) { errors.nome = 'Nome richiesto.'; }
        // Validate importanza field 
        if (!importanza) { errors.importanza = 'Importanza richiesta.'; }
        // Validate tolleranza field 
        if (!tolleranza) { errors.tolleranza = 'Tolleranza richiesta.'; }
        // Validate colore field 
        //if (!colore) {errors.colore = 'Colore richiesto.';}
        // Set the errors and update form validity 
        setErrors(errors);
        setIsFormValid(Object.keys(errors).length === 0);
    };

    const resetForm = () => {
        setNome('');
        setImportanza('');
        setTolleranza('');
        setColore('');
        setErrors({});
        setIsFormValid(false);
        setSelectedCategories([]);
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const handleSelectCategory = async (category) => {
        const isCategorySelected = selectedCategories.includes(category);

        setSelectedCategories((prevSelected) =>
            isCategorySelected
                ? prevSelected.filter((cat) => cat !== category)
                : [...prevSelected, category]
        );
    };
    const handleSelectCategory2 = (categoria) => {
        const isSelected = selectedCategories.includes(categoria.id);
        if (isSelected) {
            setSelectedCategories((prevSelected) => prevSelected.filter((catId) => catId !== categoria.id));
        } else {
            setSelectedCategories((prevSelected) => [...prevSelected, categoria.id]);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={handlePressEmptySpace}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <Modal
                        visible={visible}
                        animationType="fade"
                        transparent={false}
                        onRequestClose={handleClose}
                        background={theme.colors.background}
                    >
                        <View style={theme.container}>
                            <View style={theme.header}>
                                <Text style={theme.headerTitle}>Modifica Bisogno</Text>
                            </View>

                            <View style={theme.content}>
                                <View style={theme.body}>
                                    <View style={theme.article}>
                                        <Text style={theme.articleText}>Nome del bisogno</Text>
                                        <TextInput
                                            style={[styles.modalInput, errors.nome && styles.inputError, { color: theme.colors.onBackground, backgroundColor: '#f8f8f8' }]}
                                            placeholder="esempio pizza o corsa"
                                            value={nome}
                                            onChangeText={(text) => {
                                                setNome(text);
                                                if (errors.nome) {
                                                    setErrors((prevErrors) => ({ ...prevErrors, nome: null }));
                                                }
                                            }}
                                            blurOnSubmit={false}
                                        />
                                        {errors.nome ? (
                                            <Text style={{ color: theme.colors.errorText, backgroundColor: theme.colors.errorBackground }}>
                                                {errors.nome}
                                            </Text>
                                        ) : null}
                                        <Text style={[theme.onBackground, { textAlign: 'center', marginBottom: 14 }]}>Quanto è importante per te in una scala da 1 a 10?</Text>
                                        <Text style={[theme.onBackground, { textAlign: 'center', fontWeight: 'bold' }]}>{importanza}</Text>
                                        <Slider
                                            style={{ height: 48 }}
                                            minimumValue={0}
                                            maximumValue={10}
                                            lowerLimit={1}
                                            step={1}
                                            tapToSeek
                                            value={importanza}
                                            onValueChange={setImportanza}
                                            renderStepNumber={true}
                                            minimumTrackTintColor={theme.colors.onBackground}
                                            maximumTrackTintColor={theme.colors.onPrimary}
                                        />
                                        <Text style={{ textAlign: 'center', marginTop: 20, marginBottom: 8 }}>Ogni quanto riesci a stare senza soddisfarlo? (in giorni)</Text>
                                        <TextInput
                                            style={[styles.modalInput, errors.tolleranza && styles.inputError]}
                                            placeholder="numero dei giorni"
                                            value={tolleranza.toString()}
                                            onChangeText={(text) => {
                                                setTolleranza(text);
                                                if (errors.tolleranza) {
                                                    setErrors((prevErrors) => ({ ...prevErrors, tolleranza: null }));
                                                }
                                            }}
                                            blurOnSubmit={false}
                                            keyboardType="numeric"
                                            maxLength={2}
                                        />
                                        {errors.tolleranza ? (
                                            <Text style={{ color: theme.colors.errorText, backgroundColor: theme.colors.errorBackground }}>
                                                {errors.tolleranza}
                                            </Text>
                                        ) : null}
                                        <Text style={{ textAlign: 'center', marginBottom: 10, marginTop: 30 }}>Seleziona una o più categorie da associare al bisogno</Text>
                                        <FlatList
                                            data={categorie}
                                            keyExtractor={(item) => item.id.toString()}
                                            numColumns={2}
                                            renderItem={({ item }) => (
                                                <CategoryItem
                                                    categoria={item}
                                                    isSelected={selectedCategories.includes(item)}
                                                    onSelect={()=>handleSelectCategory(item)}
                                                    colore={item.colore}
                                                />
                                            )}
                                        />
                                    </View>
                                    <View style={theme.contentArticleSquareContainer}>
                                        <Pressable style={theme.buttonSave} onPress={handleClose}>
                                            <Text style={theme.buttonText}>Annulla</Text>
                                        </Pressable>
                                        <Pressable style={theme.buttonOK} onPress={handleSubmit}>
                                            <Text style={theme.buttonText}>Aggiungi</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <Spinner
                        visible={loading}
                        textContent={'Loading...'}
                        textStyle={styles.spinnerTextStyle}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF'
    },
    modalInput: {
        width: '100%',
        height: 40,
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ababab',
        borderRadius: 5,
    },
    inputError: {
        borderColor: '#FF0000',
    },
    categoryItem: {
        flexDirection: 'row',
        padding: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#DDD',
        backgroundColor: '#FFF',
    },
    outer: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    outerTrue: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#0F0FFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#aaa',
    },
    innerTrue: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#0F0FFF',
    },
    outerSmall: {
        width: 4,
        height: 4,
        top: 6,
        borderRadius: 2,
        backgroundColor: '#003366',
        justifyContent: 'center',
        alignItems: 'center',
    },
    outerTrueSmall: {
        width: 8,
        height: 8,
        borderRadius: 2,
        backgroundColor: '#ABCDEF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerSmall: {
        width: 7,
        height: 7,
        borderRadius: 1,
        backgroundColor: '#223366',
    },
    innerTrueSmall: {
        width: 7,
        height: 7,
        borderRadius: 1,
        backgroundColor: '#334488',
    },
});


export default EditBisogno;
