import React, { useState, useEffect, useRef } from 'react';
import * as CatController from '../controllers/categorieController';
import * as BisController from '../controllers/bisogniController';
import BisInCat from './BisInCat';
import {
    View, Text, Alert, Pressable, TouchableOpacity, StyleSheet, Modal,
    FlatList, ScrollView, TouchableWithoutFeedback, TextInput,
    KeyboardAvoidingView, Platform
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Slider from '@react-native-community/slider';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import Color from 'color';

const CategoryItemOld = ({ categoria, isSelected, onSelect, colore }) => {
    const backgroundColorWithOpacity = Color(colore).alpha(0.5).rgb().string();
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
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
            <Text>{categoria.descrizione}</Text>
        </View>
    );
};
const CategoryItem2 = ({ categoria, isSelected, onSelect, colore }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const backgroundColorWithOpacity = Color(colore).alpha(0.5).rgb().string();

    return (
        <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity
                    style={[
                        styles.categoryItem,
                        { backgroundColor: backgroundColorWithOpacity },
                        isSelected ? styles.selected : null,
                        { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
                    ]}
                    onPress={() => onSelect(categoria)}
                >
                    <Text style={styles.categoryText}>{categoria.nome}</Text>
                    <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.infoIcon}>
                        <Icon name="info-circle" size={24} color="#2a2a2a" />
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>{categoria.descrizione}</Text>
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Chiudi</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

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


    const handleSubmit = async () => {
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
            console.log('risposta inserimento', data);
            if (error) {
                console.error('Error adding need:', error);
                alert('Errore nell\'aggiungere il bisogno.');
                setLoading(false);
                return;
            }


            const updateResult = await CatController.aggiornaAssociazioni(data.id, selectedCategories);
            if (updateResult.error) {
                console.error('Error updating associations:', updateResult.error);
                alert('Errore nell\'aggiornare le associazioni.');
            } else {
                onAdd();
                handleClose();
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Errore durante la chiamata API.', error);
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
        // Verifica se la categoria è già stata associata
        const isCategorySelected = selectedCategories.includes(category);

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

    };

    const CategoryItem = ({ categoria, isSelected, onSelect, colore }) => {
        const [modalVisible, setModalVisible] = useState(false);
        const backgroundColorWithOpacity = Color(colore).alpha(0.5).rgb().string();

        return (
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <TouchableOpacity
                        style={[
                            styles.categoryItem,
                            { backgroundColor: backgroundColorWithOpacity },
                            isSelected ? styles.selected : null,
                            { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
                        ]}
                        onPress={() => onSelect(categoria)}
                    >
                        {isSelected && (
                            <Icon name="check" size={24} color="green" style={styles.checkIcon} />
                        )}

                        <Text style={styles.categoryText}>{categoria.nome}</Text>
                        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.infoIcon}>
                            <Icon name="info-circle" size={24} color="#2a2a2a" />
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={theme.modalOverlay}>
                        <View style={theme.modalContent}>
                            <Text style={theme.modalText}>{categoria.descrizione}</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={theme.closeButton}>
                                <Text style={theme.closeButtonText}>Chiudi</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
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
                        animationType="slide"
                        transparent={false}
                        onRequestClose={handleClose}
                        background={theme.colors.background}
                    >
                        <View style={[theme.container, { backgroundColor: theme.colors.contentContainer }]}>
                            <Text style={theme.title}>Nuovo Bisogno</Text>
                            <Text style={[theme.contentTitle,theme.mt20]}>Nome del bisogno</Text>
                            <TextInput
                                style={[styles.modalInput, errors.nome && styles.inputError]}
                                placeholder="esempio pizza o corsa"
                                aria-label="Nome"
                                value={nome}
                                onChangeText={setNome}
                                returnKeyType="next"
                                onSubmitEditing={() => importanzaRef.current.focus()}
                                blurOnSubmit={false}
                            />
                            <Text style={{ textAlign: 'center', marginBottom: 8 }}>Definisci quanto sia importante per te (da 1 a 10)</Text>
                            <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>{importanza}</Text>
                            <View >
                                <Slider
                                    style={{ height: 80 }}
                                    minimumValue={0}
                                    maximumValue={10}
                                    lowerLimit={1}
                                    step={1}
                                    value={1}
                                    onValueChange={setImportanza}
                                    renderStepNumber={true}

                                />

                            </View>
                            <Text style={{ textAlign: 'center', marginTop: 10, marginBottom: 8 }}>Ogni quanto hai bisogno di soddifarlo (in giorni)</Text>
                            <TextInput
                                ref={tolleranzaRef}
                                style={[styles.modalInput, errors.tolleranza && styles.inputError]}
                                placeholder="numero dei giorni"
                                value={tolleranza}
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
                            //numColumns={2}
                            //columnWrapperStyle={styles.row}
                            //contentContainerStyle={styles.grid}
                            />


                        </View>
                        <View style={theme.buttonContainer2}>
                            <Pressable style={theme.buttonCancel} onPress={handleClose}>
                                <Text style={theme.buttonText}>Annulla</Text>
                            </Pressable>
                            <Pressable style={theme.buttonSubmit} onPress={handleSubmit}>
                                <Text style={theme.buttonText}>Aggiungi</Text>
                            </Pressable>
                        </View>

                        <Spinner
                            visible={loading}
                            textContent={'Loading...'}
                            textStyle={styles.spinnerTextStyle}
                        />
                    </Modal>
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>

    );
};

export default AddBisogno;

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
    modalInput: {
        backgroundColor: '#99999933',
        height: 45,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
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
    sliderValues: {
        position: 'absolute',
        top: -20, // regola questa posizione per posizionare il numero correttamente
        left: '50%',
        transform: [{ translateX: -10 }], // regola questa trasformazione per centrare il numero
        fontSize: 18,
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
        height: 50,
    },
    selectedx: {
        borderWidth: 2,
        borderColor: 'purple',
    },
    categoryText: {
        color: '#333',
    },
});
