import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { supabase } from '../lib/supabase';

export default function AdminNotificationsManager() {
    const [notificationTypes, setNotificationTypes] = useState([]);

    const [notifications, setNotifications] = useState([]);
    const [newNotification, setNewNotification] = useState({
        testo: '', descrizione: '', ora: '12', minuto: '00', tipo: 'giornaliera'
    });

    useEffect(() => {
        fetchNotifications();
        fetchNotificationTypes();
    }, []);

    async function fetchNotifications() {
        const { data, error } = await supabase
            .from('notifications')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) console.error('Error fetching notifications:', error);
        else setNotifications(data);
    }
    async function fetchNotificationTypes() {
        const { data, error } = await supabase
            .from('notification_types')
            .select('*');
        if (error) console.error('Error fetching notification types:', error);
        else setNotificationTypes(data);
    }

    async function addNotification() {
        const { data, error } = await supabase
            .from('notifications')
            .insert([newNotification]);
        if (error) console.error('Error adding notification:', error);
        else {
            fetchNotifications();
            setNewNotification({ testo: '', descrizione: '', ora: '12', minuto: '00', tipo: 'giornaliera' });
        }
    }

    async function updateNotification(id, updatedNotification) {
        const { error } = await supabase
            .from('notifications')
            .update(updatedNotification)
            .eq('id', id);
        if (error) console.error('Error updating notification:', error);
        else fetchNotifications();
    }

    async function deleteNotification(id) {
        const { error } = await supabase
            .from('notifications')
            .delete()
            .eq('id', id);
        if (error) console.error('Error deleting notification:', error);
        else fetchNotifications();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Gestione Notifiche</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Testo"
                    value={newNotification.testo}
                    onChangeText={(text) => setNewNotification({ ...newNotification, testo: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Descrizione"
                    value={newNotification.descrizione}
                    onChangeText={(text) => setNewNotification({ ...newNotification, descrizione: text })}
                />
                <View style={styles.rowContainer}>
                    <TextInput
                        style={[styles.input, styles.smallInput]}
                        placeholder="Ora"
                        value={newNotification.ora}
                        onChangeText={(text) => setNewNotification({ ...newNotification, ora: text })}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={[styles.input, styles.smallInput]}
                        placeholder="Minuto"
                        value={newNotification.minuto}
                        onChangeText={(text) => setNewNotification({ ...newNotification, minuto: text })}
                        keyboardType="numeric"
                    />
                </View>
                <RNPickerSelect
                    selectedValue={newNotification.tipo_id}
                    onValueChange={(itemValue) => setNewNotification({ ...newNotification, tipo_id: itemValue })}
                >
                    {notificationTypes.map(type => (
                        <Picker.Item key={type.id} label={type.nome} value={type.id} />
                    ))}
                </RNPickerSelect>
                <Button title="Aggiungi Notifica" onPress={addNotification} />
            </View>

            <FlatList
                data={notifications}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.notificationItem}>
                        <Text>{item.testo}</Text>
                        <Text>{item.descrizione}</Text>
                        <Text>{`${item.ora}:${item.minuto} - ${item.tipo}`}</Text>
                        <View style={styles.buttonContainer}>
                            <Button title="Modifica" onPress={() => {
                                // Implementa la logica di modifica qui
                            }} />
                            <Button title="Elimina" onPress={() => deleteNotification(item.id)} color="red" />
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    inputContainer: { marginBottom: 20 },
    input: { marginBottom: 10, borderWidth: 1, padding: 10 },
    rowContainer: { flexDirection: 'row', justifyContent: 'space-between' },
    smallInput: { width: '48%' },
    notificationItem: { marginBottom: 15, borderWidth: 1, padding: 10 },
    buttonContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }
});