import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { supabase } from '../lib/supabase';

export default function AdminNotificationsManager() {
    const [notifications, setNotifications] = useState([]);
    const [notificationTypes, setNotificationTypes] = useState([]);
    const [newNotification, setNewNotification] = useState({
        testo: '', descrizione: '', ora: new Date(), tipo_id: null
    });
    const [showTimePicker, setShowTimePicker] = useState(false);

    useEffect(() => {
        fetchNotifications();
        fetchNotificationTypes();
    }, []);

    async function fetchNotifications() {
        const { data, error } = await supabase
            .from('notifications')
            .select(`
        *,
        notification_types (nome)
      `)
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
            .insert([{
                ...newNotification,
                ora: newNotification.ora.getHours(),
                minuto: newNotification.ora.getMinutes()
            }]);
        if (error) console.error('Error adding notification:', error);
        else {
            fetchNotifications();
            setNewNotification({ testo: '', descrizione: '', ora: new Date(), tipo_id: null });
        }
    }

    const onChangeTime = (event, selectedDate) => {
        const currentDate = selectedDate || newNotification.ora;
        setShowTimePicker(Platform.OS === 'ios');
        setNewNotification({ ...newNotification, ora: currentDate });
    };

    // ... altre funzioni (updateNotification, deleteNotification) rimangono invariate

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
                <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                    <Text style={styles.timePickerText}>
                        Seleziona l'ora: {newNotification.ora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Text>
                </TouchableOpacity>
                {showTimePicker && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={newNotification.ora}
                        mode="time"
                        is24Hour={true}
                        display="default"
                        onChange={onChangeTime}
                    />
                )}
                <Picker
                    selectedValue={newNotification.tipo_id}
                    onValueChange={(itemValue) => setNewNotification({ ...newNotification, tipo_id: itemValue })}
                >
                    <Picker.Item label="Seleziona un tipo" value={null} />
                    {notificationTypes.map(type => (
                        <Picker.Item key={type.id} label={type.nome} value={type.id} />
                    ))}
                </Picker>
                <Button title="Aggiungi Notifica" onPress={addNotification} />
            </View>

            <FlatList
                data={notifications}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.notificationItem}>
                        <Text>{item.testo}</Text>
                        <Text>{item.descrizione}</Text>
                        <Text>{`${item.ora.toString().padStart(2, '0')}:${item.minuto.toString().padStart(2, '0')} - ${item.notification_types.nome}`}</Text>
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
    timePickerText: { padding: 10, borderWidth: 1, marginBottom: 10 },
    notificationItem: { marginBottom: 15, borderWidth: 1, padding: 10 },
    buttonContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }
});