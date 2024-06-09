import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, Button, Modal, TextInput, StyleSheet,Pressable } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Slider from '@react-native-community/slider';
import Spinner from 'react-native-loading-spinner-overlay';



const EditBisogno = ({ visible, onClose, bisogno, onSave, userId }) => {
    const [nome, setNome] = useState(bisogno.nome.toString());
    const [importanza, setImportanza] = useState(bisogno.importanza);
    const [tolleranza, setTolleranza] = useState(bisogno.tolleranza);
    const [errors, setErrors] = useState({});

    const { theme } = useTheme();


    const importanzaRef = useRef(null);
    const tolleranzaRef = useRef(null);

    const handleSave = () => {
        const updatedBisogno = {
            ...bisogno,
            nome,
            importanza: parseInt(importanza),
            tolleranza: parseInt(tolleranza),
        };
        onSave(updatedBisogno);
        onClose();
    };
    const handleClose = () => {
        //resetForm();
        onClose();
    };
    const handleSubmit = async () => {
        return;
    };
    const validateForm = () => {
        let errors = {};
        if (!nome) {
            errors.nome = 'Nome richiesto.';
        }
        if (!importanza) {
            errors.importanza = 'Importanza richiesta.';
        }
        if (!tolleranza) {
            errors.tolleranza = 'Tolleranza richiesta.';
        }
        setErrors(errors);
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={false}
            onRequestClose={onClose}
            background={theme.colors.background}
        >
            <View style={theme.container}>
                <Text style={theme.title}>Modifica Bisogno</Text>
                <Text style={{ textAlign: 'center', marginBottom: 8 }}>Nome del bisogno</Text>
                <TextInput
                    style={[styles.input, errors.nome && styles.inputError]}
                    placeholder="esempio pizza o corsa"
                    aria-label="Nome"
                    value={nome}
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
                <Button title="Salva" onPress={handleSave} />
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.button} onPress={handleClose}>
                        <Text style={styles.text}>Annulla</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.text}>Aggiungi</Text>
                    </Pressable>
                </View>

            </View>
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
