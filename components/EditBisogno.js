﻿import React, { useState, useEffect, useRef } from 'react';
import * as CatController from '../controllers/categorieController';
import * as BisController from '../controllers/bisogniController';
import {
    View, Text, TextInput, StyleSheet, Modal, Pressable, TouchableOpacity, FlatList
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Slider from '@react-native-community/slider';
import Spinner from 'react-native-loading-spinner-overlay';
import Color from 'color';

const EditBisogno = ({ visible, onClose, bisogno, onSave, userId }) => {
    const [nome, setNome] = useState(bisogno.nome);
    const [importanza, setImportanza] = useState(bisogno.importanza);
    const [tolleranza, setTolleranza] = useState(bisogno.tolleranza);
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

    const handleSubmit = async () => {
        validateForm();

        // Wait for the validation state to update
        if (!Object.keys(errors).length === 0) {
            setLoading(false);
            return;
        }

        setLoading(true);
        const insert = {
            nome, importanza, tolleranza, colore: '', soddisfattoil: new Date(),
            creatoil: new Date(), enabled: true, uuid: userId
        };

        try {
            const { data, error } = await BisController.createBisogno(insert);

            if (error) {
                console.error('Error adding need:', error);
                alert('Errore nell\'aggiungere il bisogno.');
            } else {
                onAdd();
                handleClose();
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Errore durante la chiamata API.');
        } finally {
            setLoading(false);
        }
    };

    const validateForm = () => {
        let errors = {};

        // Validate name field 
        if (!nome) {
            errors.nome = 'Nome richiesto.';
        }

        // Validate importanza field 
        if (!importanza) {
            errors.importanza = 'Importanza richiesta.';
        }

        // Validate tolleranza field 
        if (!tolleranza) {
            errors.tolleranza = 'Tolleranza richiesta.';
        }

        // Validate colore field 
        if (!colore) {
            errors.colore = 'Colore richiesto.';
        }

        // Set the errors and update form validity 
        setErrors(errors);
        //setIsFormValid(Object.keys(errors).length === 0);
    };

    const resetForm = () => {
        setNome('');
        setImportanza('');
        setTolleranza('');
        setColore('');
        setErrors({});
        setIsFormValid(false);
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const handleSelectCategory = async (category) => {
        // Verifica se la categoria � gi� stata associata
        setSelectedCategories((prevSelected) =>
            isCategorySelected
                ? prevSelected.filter((cat) => cat !== category)
                : [...prevSelected, category]
        );
    };

    const associaBisInCat = async () => {
        const isCategorySelected = selectedCategories.includes(category);
        try {
            // Rimuovi l'associazione precedente per questa categoria
            const { data, error } = await supabase
                .from('bisincat')
                .delete()
                .eq('bisognoid', bisogno.id)
                .eq('categoriaid', category.id);

            // Se la categoria non era gi� associata, aggiungi la nuova associazione
            if (!isCategorySelected) {
                await supabase
                    .from('bisincat')
                    .insert([{ bisognoid: selectedNeed.id, categoriaid: category.id }]);
            }

            // Aggiorna lo stato delle categorie selezionate
        } catch (error) {
            console.error('Errore nell\'aggiornamento delle associazioni', error);
            Alert.alert('Errore nell\'aggiornamento delle associazioni');
        }

    }

    const CategoryItem = ({ categoria, isSelected, onSelect, colore }) => {
        const backgroundColorWithOpacity = Color(colore).alpha(0.5).rgb().string();
        return (
            <TouchableOpacity
                style={[
                    styles.categoryItem,
                    { backgroundColor: backgroundColorWithOpacity },
                    isSelected ? styles.selected : null,
                ]}
                onPress={() => onSelect(categoria)}
            >
                <Text style={styles.categoryText}>{categoria.nome}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={false}
            onRequestClose={onClose}
            background={theme.colors.background}
        >
            <View style={[theme.container, { backgroundColor: theme.colors.contentContainer }]}>
                <Text style={theme.title}>Modifica Bisogno</Text>
                <Text style={{ textAlign: 'center', marginBottom: 8, marginTop:20 }}>Nome del bisogno</Text>
                <TextInput
                    style={[styles.input, errors.nome && styles.inputError]}
                    placeholder="esempio pizza o corsa"
                    aria-label="Nome"
                    value={bisogno.nome}
                    onChangeText={setNome}
                    returnKeyType="next"
                    onSubmitEditing={() => importanzaRef.current.focus()}
                    blurOnSubmit={false}
                />
                <Text style={{ textAlign: 'center', marginBottom: 8 }}>Importanza del bisogno da 1 a 10</Text>
                <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>{bisogno.importanza}</Text>
                <View >
                    <Slider
                        //style={[styles.input, errors.importanza && styles.inputError]}
                        style={{ height: 60 }}
                        minimumValue={1}
                        maximumValue={10}
                        step={1}
                        value={bisogno.importanza}
                        onValueChange={setImportanza}

                    />

                </View>
                <Text style={{ textAlign: 'center', marginBottom: 8 }}>Ogni quanto devi soddifarlo (giorni)</Text>
                <TextInput
                    ref={tolleranzaRef}
                    style={[styles.input, errors.tolleranza && styles.inputError]}
                    placeholder="quanti giorni riesci a stare senza"
                    value={bisogno.tolleranza}
                    onChangeText={(text) => {
                        const numericValue = parseInt(text);
                        if (!isNaN(numericValue) && numericValue > 0) {
                            setTolleranza(text);
                        }
                    }}
                    returnKeyType="next"
                    blurOnSubmit={false}
                    keyboardType="numeric"
                    maxLength={3}
                />
                <Text style={{ textAlign: 'center', marginBottom: 10, marginTop: 30 }}>Seleziona la o le categorie da associare al bisogno</Text>

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
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={styles.grid}
                />


                <View style={styles.buttonContainer}>
                    <Pressable style={styles.button} onPress={handleClose}>
                        <Text style={styles.text}>Annulla</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.text}>Aggiorna</Text>
                    </Pressable>
                </View>

            </View>
            <Spinner
                visible={loading}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
        </Modal>
    );
};

export default EditBisogno;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        //backgroundColor: theme.colors.background,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#800080',
    },
    input: {
        backgroundColor: '#99999933',
        height: 45,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
    },
    colorInput: {
        height: 45,
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderRadius: 10,
    },
    colorInputText: {
        color: '#000',
    },
    inputError: {
        borderColor: 'red',
    },
    colorPickerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#101010',
        height: 200,
    },
    colorPicker: {
        height: 50,
        width: 300,
        alignSelf: 'center',
        //borderWidth: 1,
        //borderColor: '#ccc',
        marginTop: 60,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        height: 51,
        width: 148,
        backgroundColor: '#007BFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        alignSelf: 'center',
        position: 'bottom',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
    },
    sliderValues: {
        position: 'absolute',
        top: -30, // regola questa posizione per posizionare il numero correttamente
        left: '50%',
        transform: [{ translateX: -10 }], // regola questa trasformazione per centrare il numero
        fontSize: 16,
        color: '#000', // colore del testo
    },
    //per le categirie
    grid: {
        justifyContent: 'space-between',
    },
    row: {
        justifyContent: 'space-between',
    },
    categoryItem: {
        flex: 1,
        margin: 5,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    selected: {
        borderWidth: 2,
        borderColor: 'purple',
    },
    categoryText: {
        color: '#333',
    },


});
