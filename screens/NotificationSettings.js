import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import { supabase } from '../lib/supabase';

export default function NotificationSettings() {
    const [notificationTypes, setNotificationTypes] = useState([
        { id: 1, name: 'Promemoria giornaliero', enabled: false },
        { id: 2, name: 'Newsletter settimanale', enabled: false },
        { id: 3, name: 'Offerte speciali', enabled: false },
        { id: 4, name: 'Aggiornamenti del profilo', enabled: false },
        { id: 5, name: 'Nuovi messaggi', enabled: false },
    ]);

    useEffect(() => {
        registerForPushNotificationsAsync();
        loadNotificationPreferences();
    }, []);

    async function registerForPushNotificationsAsync() {
        const { status } = await Notifications.getPermissionsAsync();
        if (status !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== 'granted') {
                alert('È necessario concedere i permessi per le notifiche per utilizzare questa funzionalità!');
                return;
            }
        }

        const token = (await Notifications.getExpoPushTokenAsync()).data;
        await supabase
            .from('user_devices')
            .upsert({ user_id: 'current_user_id', push_token: token });
    }

    async function loadNotificationPreferences() {
        const { data, error } = await supabase
            .from('user_notifications')
            .select('preferences')
            .eq('user_id', 'current_user_id')
            .single();

        if (data && data.preferences) {
            setNotificationTypes(prevTypes =>
                prevTypes.map(type => ({
                    ...type,
                    enabled: data.preferences[type.id] || false
                }))
            );
        }
    }

    async function toggleNotification(id) {
        setNotificationTypes(prevTypes =>
            prevTypes.map(type =>
                type.id === id ? { ...type, enabled: !type.enabled } : type
            )
        );

        const updatedPreferences = notificationTypes.reduce((acc, type) => {
            acc[type.id] = type.enabled;
            return acc;
        }, {});

        await supabase
            .from('user_notifications')
            .upsert({ user_id: 'current_user_id', preferences: updatedPreferences });
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Impostazioni Notifiche</Text>
            {notificationTypes.map((type) => (
                <TouchableOpacity
                    key={type.id}
                    style={styles.notificationItem}
                    onPress={() => toggleNotification(type.id)}
                >
                    <Text style={styles.notificationText}>{type.name}</Text>
                    {type.enabled && <Ionicons name="checkmark-circle" size={24} color="green" />}
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    notificationItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    notificationText: {
        fontSize: 14,
    },
});