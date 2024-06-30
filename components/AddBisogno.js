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
                    backgroundColor:  Color(categoria.colore).alpha(0.5).toString() ,
                },
            ]}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center',width:'50%' }}>
                <Icon
                    name={isSelected ? 'check-circle' : 'circle-thin'}
                    size={24}
                    color={categoria.colore }
                    style={{ marginRight: 10 }}
                />
                <Text style={[theme.textItem, { color: categoria.colore }]}>{categoria.nome}</Text>
            </View>
        </TouchableOpacity>
    );
};

const AddBisogno = ({ visible, onClose, onAdd, userId }) => {
    const [nome, setNome] = useState('');
    const [importanza, setImportanza] = useState(1);
    const [tolleranza, setTolleranza] = useState(1);
    const [loading, setLoading] = useState(false);
    const { theme } = useTheme();
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [categorie, setCategorie] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        if (!visible) {
            resetForm();
        } else {
            loadCategorie();
        }
    }, [visible]);

    const loadCategorie = async () => {
        try {
            const data = await CatController.getCategorie();
            setCategorie(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            alert('Errore nel caricamento delle categorie. Riprova più tardi.');
        }
    };

    const handlePressEmptySpace = () => {
        Keyboard.dismiss();
    };

    const validateForm = () => {
        let newErrors = {};
        if (!nome.trim()) newErrors.nome = 'Nome richiesto.';
        if (importanza < 1 || importanza > 10) newErrors.importanza = 'Importanza deve essere tra 1 e 10.';
        if (tolleranza < 1) newErrors.tolleranza = 'Tolleranza deve essere almeno 1 giorno.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmitOld = async () => {
        setLoading(true);
        try {
            if (!validateForm()) {
                return;
            }

            const insert = {
                nome,
                importanza,
                tolleranza,
                soddisfattoil: new Date(),
                creatoil: new Date(),
                enabled: true,
                uuid: userId
            };

            const data = await BisController.createBisogno(insert);
            console.log('Data from createBisogno:', data);
            if (!data || !Array.isArray(data) || data.length === 0) {
                throw new Error('Errore nei dati ricevuti dalla chiamata createBisogno.');
            }

            const insertedId = data[0].id;

            await CatController.aggiornaAssociazioni(insertedId, selectedCategories);

            onAdd();
            alert('Bisogno aggiunto con successo!');
            handleClose();
        } catch (error) {
            console.error('Errore durante l\'inserimento:', error);
            alert(`Errore durante l'inserimento: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            if (!validateForm()) {
                return;
            }

            // Determina il colore basato sulla prima categoria selezionata e applica l'opacità
            let colore = null;
            if (selectedCategories.length > 0) {
                const categoriaColore = selectedCategories[0].colore;
                colore = Color(categoriaColore).alpha(0.5).string();
            }

            const insert = {
                nome,
                importanza,
                tolleranza,
                colore, // Colore con opacità al 50%
                soddisfattoil: new Date(),
                creatoil: new Date(),
                enabled: true,
                uuid: userId
            };

            const data = await BisController.createBisogno(insert);

            if (!data || !Array.isArray(data) || data.length === 0) {
                throw new Error('Errore nei dati ricevuti dalla chiamata createBisogno.');
            }

            const insertedId = data[0].id;

            await CatController.aggiornaAssociazioni(insertedId, selectedCategories);

            onAdd();
            alert('Bisogno aggiunto con successo!');
            handleClose();
        } catch (error) {
            console.error('Errore durante l\'inserimento:', error);
            alert(`Errore durante l'inserimento: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setNome('');
        setImportanza(1);
        setTolleranza(1);
        setErrors({});
        setIsFormValid(false);
        setSelectedCategories([]);
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const handleSelectCategory = (category) => {
        setSelectedCategories((prevSelected) =>
            prevSelected.includes(category)
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
                                            placeholderTextColor={ theme.colors.slate12}
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
                                        <Text style={[theme.onBackground, { textAlign: 'center', marginBottom: 8 }]}>Quanto è importante per te in una scala da 1 a 10?</Text>
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
                                        <Text style={{ textAlign: 'center', marginTop: 10, marginBottom: 8 }}>Ogni quanto riesci a stare senza soddisfarlo? (in giorni)</Text>
                                        <TextInput
                                            style={[styles.modalInput, errors.tolleranza && styles.inputError]}
                                            placeholder="numero dei giorni"
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
                                                    onSelect={handleSelectCategory}
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
});

export default AddBisogno;
