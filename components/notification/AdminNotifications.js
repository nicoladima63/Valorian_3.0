import React, { useState ,useEffect} from 'react';
import { supabase } from '../../lib/supabase';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Platform, TouchableOpacity, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '../../context/ThemeContext';
import Layout from '../../screens/Layout';
import { OnePress } from '../../components/Pressables';
import { MaterialIcons } from '@expo/vector-icons';
function NotificationForm({ notification, onSave ,navigation}) {
    const { theme } = useTheme();
    const [notifications, setNotifications] = useState([]);

    const [message, setMessage] = useState(notification ? notification.message : '');
    const [scheduleType, setScheduleType] = useState(notification ? notification.schedule_type : 'mattiniera');
    const [notificationTypes, setNotificationTypes] = useState([]);
    const [newNotification, setNewNotification] = useState({
        testo: '', descrizione: '', ora: new Date(), tipo_id: null
    });

    const [showTimePicker, setShowTimePicker] = useState(false);

    const fetchNotifications = async () => {
        const { data } = await supabase.from('notifications').select('*');
        setNotifications(data);
        console.log(' notofications', data);
    };

    useEffect(() => {
        console.log('ricarico la pagina admin');
        fetchNotifications();
    }, []);




    const handleSubmit = async () => {
        if (notification) {
            // Modifica notifica
            await supabase
                .from('notifications')
                .update({ message, schedule_type: scheduleType })
                .eq('id', notification.id);
        } else {
            // Crea nuova notifica
            await supabase
                .from('notifications')
                .insert({ message, schedule_type: scheduleType });
        }
        onSave();
    };

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

    async function updateNotification(id, updatedNotification) {
        const { error } = await supabase
            .from('notifications')
            .update(updatedNotification)
            .eq('id', id);
        if (error) console.error('Error updating notification:', error);
        else fetchNotifications();
    }

    async function deleteNotification(id, nome) {
        alert('Confermare la cancellazione di :' + nome + '?');
        return;
        const { error } = await supabase
            .from('notifications')
            .delete()
            .eq('id', id);
        if (error) console.error('Error deleting notification:', error);
        else fetchNotifications();
    }

    const onChangeTime = (event, selectedDate) => {
        const currentDate = selectedDate || newNotification.ora;
        setShowTimePicker(Platform.OS === 'ios');
        setNewNotification({ ...newNotification, ora: currentDate });
    };


    return (
        <Layout
            navigation={navigation}
            showTopBar={false}
            header={
                <Text style={[theme.h4, theme.fwb, theme.mb20, theme.mt10, theme.ml20]}>Gestione notifiche</Text>
            }
        >

            <View style={[theme.body]}>

                <Text style={theme.text12}>Messaggio della notifica</Text>
                <View style={[theme.article, theme.mb10]}>
                    <TextInput
                        placeholder="Testo"
                        value={newNotification.testo}
                        onChangeText={(text) => setNewNotification({ ...newNotification, testo: text })}
                    />

                </View>

                <Picker 
                    selectedValue={scheduleType}
                    onValueChange={(itemValue) => setScheduleType(itemValue)}
                >
                    <Picker.Item label="Seleziona un tipo" value={null} />

                    <Picker.Item label="Mattina" value="mattina" />
                    <Picker.Item label="Sera" value="sera" />
                    <Picker.Item label="Settimanale" value="settimanale" />
                    <Picker.Item label="Mensile" value="mensile" />
                </Picker>
                <View style={{ borderBottomColor: theme.colors.slate9, borderBottomWidth: 1, marginBottom: 14 }} />

                <OnePress title="Aggiungi"
                    backgroundColor={theme.colors.primary}
                    onPress={handleSubmit}
                />
                <View style={{ borderBottomColor: theme.colors.slate9, marginBottom: 14 }} />
                <FlatList
                    data={notifications}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.notificationItem}>
                            <TouchableOpacity onPress={() => updateNotification(item.id, item)}>
                                <View style={[theme.grid2, { justifyContent: 'flex-start', alignItems: 'center' }]}>
                                    <Text style={[theme.text12, theme.fwb]}>Titolo: </Text>
                                    <Text style={theme.text}>{item.testo}</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.spacer} />
                            <View style={[theme.grid2, { justifyContent: 'space-between', alignItems: 'center' }]}>
                                <Text style={[theme.text12, theme.fwb]}>Orario: </Text>
                                <Text>{`${item.ora.toString().padStart(2, '0')}:${item.minuto.toString().padStart(2, '0')} - ${item.tipo}`}</Text>
                                <View style={styles.spacer} />

                                <TouchableOpacity onPress={() => deleteNotification(item.id, item.testo)}>
                                    <MaterialIcons name="delete" size={28} color={theme.colors.red10} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />

            </View>
        </Layout >
    );
}
const styles = StyleSheet.create({
    spacer: {
        flex: 1,
    },

    container: { flex: 1, padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    inputContainer: { marginBottom: 20 },
    input: { marginBottom: 10, borderWidth: 1, padding: 10 },
    timePickerText: { padding: 10, borderWidth: 1, marginBottom: 10 },
    notificationItem: { marginBottom: 15, borderWidth: 1, padding: 10 },
    buttonContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }
});


export default NotificationForm;
