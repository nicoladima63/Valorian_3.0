import React, { useState } from 'react';
import { View, Text, Button, Modal, TextInput } from 'react-native';

const EditBisogno = ({ visible, onClose, bisogno, onSave,userId }) => {
    const [nome, setNome] = useState(bisogno.nome.toString());
    const [importanza, setImportanza] = useState(bisogno.importanza.toString());
    const [tolleranza, setTolleranza] = useState(bisogno.tolleranza.toString());

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

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={false}
            onRequestClose={onClose}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                    <Text>Modifica Bisogno</Text>
                    <TextInput
                        value={nome}
                        onChangeText={setNome}
                        placeholder="Nome del bisogno"
                    />
                    <TextInput
                        value={importanza}
                        onChangeText={setImportanza}
                        placeholder="Importanza"
                        keyboardType="numeric"
                    />
                    <TextInput
                        value={tolleranza}
                        onChangeText={setTolleranza}
                        placeholder="Tolleranza"
                        keyboardType="numeric"
                    />
                    <Button title="Salva" onPress={handleSave} />
                </View>
            </View>
        </Modal>
    );
};

export default EditBisogno;
