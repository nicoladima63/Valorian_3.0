import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useTheme } from '../context/ThemeContext';
import Layout from './Layout';
import {
    View, Text, Alert, Pressable, Image,
    Switch, ScrollView, TouchableWithoutFeedback, Keyboard,
    KeyboardAvoidingView, Platform,
} from 'react-native';
import AdminNotifications from './AdminNotifications';
import Spinner from 'react-native-loading-spinner-overlay';


function NotificationsList() {
    const [notifications, setNotifications] = useState([]);
    const [selectedNotification, setSelectedNotification] = useState(null);

    const fetchNotifications = async () => {
        const { data } = await supabase.from('notifications').select('*');
        setNotifications(data);
        console.log(' notofications',data);
    };

    const handleEdit = (notification) => {
        setSelectedNotification(notification);
    };

    const handleDelete = async (id) => {
        await supabase.from('notifications').delete().eq('id', id);
        fetchNotifications();
    };

    const handleActivate = async (id, scheduleType) => {
        await supabase.rpc('activate_notification', { notification_id: id, schedule_type: scheduleType });
        fetchNotifications();
    };

    useEffect(() => {
        console.log('ricarico la pagina');
        fetchNotifications();
    }, []);

    return (
        <View>
            <Text>Gestione Notifiche</Text>
            <AdminNotifications
                notification={selectedNotification}
                onSave={() => {
                    fetchNotifications();
                    setSelectedNotification(null);
                }}
            />
            <FlatList
                data={notifications}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.message} ({item.schedule_type})</Text>
                        <Button title="Modifica" onPress={() => handleEdit(item)} />
                        <Button title="Cancella" onPress={() => handleDelete(item.id)} />
                        <Button title="Attiva" onPress={() => handleActivate(item.id, item.schedule_type)} />
                    </View>
                )}
            />
        </View>
    );
}
export default NotificationsList;
