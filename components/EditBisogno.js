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
import { TwoPressStyled } from '../components/Pressables';
import FlexibleView from '../components/FlexibleComponent';


const CategoryItem = ({ categoria, isSelected, onSelect }) => {
    const { theme } = useTheme();
    return (
        <View style={[theme.article, { width: 115 }]}>
            <TouchableOpacity
                onPress={() => onSelect(categoria)}
            >
                <FlexibleView
                    format="iconaTesto"
                    leftIcon={
                        <Icon
                            name={isSelected ? 'check-circle' : 'circle-thin'}
                            size={24}
                            color={categoria.colore}
                        />
                    }
                    text={
                        <Text style={[theme.text, theme.text12, { color: theme.colors.slate12 }]}>{categoria.nome}</Text>
                    }
                />
            </TouchableOpacity>
        </View>

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
                    >
                        <View style={theme.container}>
                            <View style={theme.header}>
                                <Text style={[theme.h4, theme.fwb]}>Modifica Bisogno</Text>
                            </View>

                            <View style={theme.content}>
                                <View style={theme.body}>
                                    <View style={[theme.article, theme.articleTop]}>
                                        <Text style={[theme.text, theme.text14, theme.mb10]}>Nome del bisogno</Text>
                                        <TextInput
                                            style={[theme.article, errors.nome && theme.articleDanger, { color: theme.colors.onBackground }]}
                                            placeholder="esempio pizza o corsa"
                                            placeholderTextColor={theme.colors.slate12}
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
                                            <Text style={[theme.text, theme.text12, theme.mb10, { color: theme.colors.red10 }]}>
                                                {errors.nome}
                                            </Text>
                                        ) : null}
                                        <Text style={[theme.text, theme.text14, theme.mt20, theme.mb10]}>Quanto è importante per te in una scala da 1 a 10?</Text>
                                        <Text style={[theme.text, theme.text14, theme.fwb, theme.mb20, { textAlign: 'center', color: theme.colors.blue10 }]}>{importanza}</Text>
                                        <View style={[theme.article, theme.mb20, { backgroundColor: theme.colors.slate9 }]}>
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
                                        </View>
                                        <Text style={[theme.text, theme.text14, theme.mb20]}>Quanti giorni riesci a stare senza soddisfarlo?</Text>
                                        <TextInput
                                            style={[theme.article, errors.tolleranza && theme.articleDanger, { color: theme.colors.onBackground }]}
                                            placeholder="numero dei giorni"
                                            placeholderTextColor={theme.colors.slate12}
                                            aria-label="numero di giorni"
                                            value={tolleranza}
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
                                            <Text style={[theme.text, theme.text12, theme.mb10, { color: theme.colors.red10 }]}>
                                                {errors.tolleranza}
                                            </Text>
                                        ) : null}
                                        <Text style={[theme.text, theme.text12, theme.mb10]}>Associalo ad una catagoria di bisogni</Text>
                                        <FlatList
                                            data={categorie}
                                            keyExtractor={(item) => item.id.toString()}
                                            numColumns={3}
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
                                    <View style={[theme.article, theme.articleBottom]}>
                                        <TwoPressStyled
                                            titles={['Annulla', 'Aggiungi']}
                                            onPresses={[() => handleClose(), () => handleSubmit()]}
                                            backgroundColors={[theme.colors.slate10, theme.colors.primary]}
                                        />
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
