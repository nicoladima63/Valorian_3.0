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

const AddBisogno = ({ visible, onClose, onAdd, userId }) => {
    const [nome, setNome] = useState('');
    const [importanza, setImportanza] = useState(1); // Cambiato da '' a 0
    const [tolleranza, setTolleranza] = useState(1);
    const [colore, setColore] = useState('');

    const [loading, setLoading] = useState(false);
    const { theme } = useTheme();
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [categorie, setCategorie] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const importanzaRef = useRef(null);
    const tolleranzaRef = useRef(null);

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

    const onColorChange = colore => {
        setColore(colore);
    };

    const handlePressEmptySpace = () => {
        Keyboard.dismiss(); // Nascondi la tastiera quando si tocca uno spazio vuoto
    };

    const handleSubmitOld = async () => {
        setLoading(true); // Inizia il caricamento
        validateForm();

        // Verifica se ci sono errori
        if (Object.keys(errors).length !== 0) {
            setLoading(false);
            return;
        }

        const insert = {
            nome,
            importanza,
            tolleranza,
            colore,
            soddisfattoil: new Date(),
            creatoil: new Date(),
            enabled: true,
            uuid: userId
        };

        try {
            const { data, error } = await BisController.createBisogno(insert);

            if (error) {
                console.error('Error adding need:', error);
                alert('Errore nell\'aggiungere il bisogno.');
                setLoading(false);
                return;
            }

            const insertedId = data[0]?.id; // Recupera l'ID del bisogno inserito
            console.log('91 Inserted ID:', insertedId, 'categorie', selectedCategories);
            const updateResult = await CatController.aggiornaAssociazioni(insertedId, selectedCategories);
            if (updateResult.error) {
                console.error('Error updating associations:', updateResult.error);
                alert('Errore nell\'aggiornare le associazioni.');
            } else {
                onAdd(); // Chiama la funzione onAdd passata come prop per aggiornare la lista dei bisogni
                handleClose();
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Errore durante la chiamata API.', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        setLoading(true); // Inizia il caricamento
        validateForm();
        if (!isFormValid) {
            setLoading(false);
            return;
        }

        const insert = {
            nome,
            importanza,
            tolleranza,
            colore,
            soddisfattoil: new Date(),
            creatoil: new Date(),
            enabled: true,
            uuid: userId
        };

        try {
            const data = await BisController.createBisogno(insert);


            // Aggiungi controllo per verificare che data esista e non sia undefined
            if (!data || !Array.isArray(data) || data.length === 0) {
                alert('Errore nei dati ricevuti dalla chiamata createBisogno.');
                setLoading(false);
                return;
            }

            const insertedId = data[0].id; // Recupera l'ID del bisogno inserito

            try {
                const updateResult = await CatController.aggiornaAssociazioni(insertedId, selectedCategories);

                if (updateResult) {
                    onAdd();
                    handleClose();
                }
            } catch (error) {
                console.error('152Errore durante l\'aggiornamento:', error);
                // Gestisci l'errore qui, ad esempio mostrando un messaggio all'utente
            }
        } catch (error) {
            console.error('156 Error:', error);
            alert('157 Errore durante la chiamata API.', error);
        } finally {
            setLoading(false);
            handleClose();
            resetForm();
        }
    };


    const validateForm = () => {
        let errors = {};
        // Validate name field 
        if (!nome) {errors.nome = 'Nome richiesto.';}
        // Validate importanza field 
        if (!importanza) {errors.importanza = 'Importanza richiesta.';}
        // Validate tolleranza field 
        if (!tolleranza) {errors.tolleranza = 'Tolleranza richiesta.';}
        // Validate colore field 
        //if (!colore) {errors.colore = 'Colore richiesto.';}
        // Set the errors and update form validity 
        setErrors(errors);
        setIsFormValid(Object.keys(errors).length === 0);
        console.log('errors:', errors);
        console.log('isFormValid:', isFormValid);
    };

    const resetForm = () => {
        setNome('');
        setImportanza(1);
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
        // Verifica se la categoria è già stata associata
        const isCategorySelected = selectedCategories.includes(category);

        setSelectedCategories((prevSelected) =>
            isCategorySelected
                ? prevSelected.filter((cat) => cat !== category)
                : [...prevSelected, category]
        );
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
                                <Text style={theme.headerTitle}>Nuovo Bisogno</Text>
                            </View>

                            <View style={theme.content}>
                                <View style={theme.body}>
                                    <View style={theme.article}>
                                        <Text style={theme.articleText}>Nome del bisogno</Text>
                                        <TextInput
                                            style={[styles.modalInput, errors.nome && styles.inputError, { color: theme.colors.onBackground, backgroundColor: '#f8f8f8' }]}
                                            placeholder="esempio pizza o corsa"
                                            aria-label="Nome"
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
                                        <View style={{ backgroundColor: '#f8f8f8' }}>
                                            <Text style={[theme.onBackground, { textAlign: 'center', marginBottom: 8 }]}>Quanto è importante per te in una scala da 1 a 10?</Text>
                                            <Text style={[theme.onBackground, { textAlign: 'center', fontWeight: 'bold' }]}>{importanza}</Text>
                                            <Slider
                                                style={{ height: 80 }}
                                                minimumValue={0}
                                                maximumValue={10}
                                                lowerLimit={1}
                                                step={1}
                                                value={importanza}
                                                onValueChange={setImportanza}
                                                renderStepNumber={true}
                                                color={theme.colors.onBackground}
                                                minimumTrackTintColor={theme.colors.onBackground}
                                                maximumTrackTintColor={theme.colors.onPrimary}

                                            />
                                        </View>
                                        <Text style={{ textAlign: 'center', marginTop: 10, marginBottom: 8 }}>Ogni quanto riesci a stare senza soddisfarlo? (in giorni)</Text>
                                        <TextInput
                                            ref={tolleranzaRef}
                                            style={[styles.modalInput, errors.tolleranza && styles.inputError]}
                                            placeholder="numero dei giorni"
                                            value={tolleranza.toString()}
                                            onChangeText={(text) => {
                                                const numericValue = parseInt(text);
                                                if (!isNaN(numericValue) && numericValue > 0) {
                                                    setTolleranza(numericValue);
                                                    if (errors.tolleranza) {
                                                        setErrors((prevErrors) => ({ ...prevErrors, tolleranza: null }));
                                                    }
                                                }
                                            }}
                                            returnKeyType="next"
                                            blurOnSubmit={true}
                                            keyboardType="numeric"
                                            maxLength={3}
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
                                            renderItem={({ item }) => (
                                                <CategoryItem
                                                    categoria={item}
                                                    isSelected={selectedCategories.includes(item)}
                                                    onSelect={handleSelectCategory}
                                                    colore={item.colore}
                                                />
                                            )}
                                        />


                                    </View>

                                </View>
                            </View>

                        </View>
                        <View style={theme.contentArticleSquareContainer}>
                            <Pressable style={theme.buttonSave} onPress={handleClose}>
                                <Text style={theme.buttonText}>Annulla</Text>
                            </Pressable>
                            <Pressable style={theme.buttonOK} onPress={handleSubmit}>
                                <Text style={theme.buttonText}>Aggiungi</Text>
                            </Pressable>
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

const CategoryItem = ({ categoria, isSelected, onSelect }) => {
    const { theme } = useTheme();
    return (
        <TouchableOpacity
            onPress={() => onSelect(categoria)}
            style={[
                styles.categoryItem,
                {
                    backgroundColor: isSelected ? Color(categoria.colore).alpha(0.5).toString() : '#FFF',
                },
            ]}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon
                    name={isSelected ? 'check-circle' : 'circle-thin'}
                    size={24}
                    color={isSelected ? categoria.colore : '#C0C0C0'}
                    style={{ marginRight: 10 }}
                />
                <Text style={[theme.textItem, { color: categoria.colore }]}>{categoria.nome}</Text>
            </View>
        </TouchableOpacity>
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
});

export default AddBisogno;
