import React, { useState, useEffect } from 'react';
import { View, Text, Switch, FlatList, StyleSheet } from 'react-native';
import { supabase } from '../lib/supabase';

export default function UserNotificationsSubscription() {
    const [notifications, setNotifications] = useState([]);
    const [subscriptions, setSubscriptions] = useState({});

    useEffect(() => {
        fetchNotificationsAndSubscriptions();
    }, []);

    async function fetchNotificationsAndSubscriptions() {
        const { data: notificationsData, error: notificationsError } = await supabase
            .from('notifications')
            .select('*');

        if (notificationsError) {
            console.error('Error fetching notifications:', notificationsError);
            return;
        }

        const { data: subscriptionsData, error: subscriptionsError } = await supabase
            .from('user_subscriptions')
            .select('*')
            .eq('user_id', supabase.auth.user().id);

        if (subscriptionsError) {
            console.error('Error fetching subscriptions:', subscriptionsError);
            return;
        }

        const subscriptionsMap = {};
        subscriptionsData.forEach(sub => {
            subscriptionsMap[sub.notification_id] = sub.enabled;
        });

        setNotifications(notificationsData);
        setSubscriptions(subscriptionsMap);
    }

    async function toggleSubscription(notificationId, currentState) {
        const newState = !currentState;
        const { error } = await supabase
            .from('user_subscriptions')
            .upsert({
                user_id: supabase.auth.user().id,
                notification_id: notificationId,
                enabled: newState
            });

        if (error) {
            console.error('Error toggling subscription:', error);
        } else {
            setSubscriptions(prev => ({ ...prev, [notificationId]: newState }));
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Gestisci le tue Notifiche</Text>
            <FlatList
                data={notifications}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.notificationItem}>
                        <View style={styles.textContainer}>
                            <Text style={styles.notificationText}>{item.testo}</Text>
                            <Text style={styles.notificationDetails}>{`${item.ora}:${item.minuto} - ${item.tipo}`}</Text>
                        </View>
                        <Switch
                            value={subscriptions[item.id] || false}
                            onValueChange={() => toggleSubscription(item.id, subscriptions[item.id] || false)}
                        />
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    notificationItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, borderBottomWidth: 1, paddingBottom: 10 },
    textContainer: { flex: 1 },
    notificationText: { fontSize: 16, fontWeight: 'bold' },
    notificationDetails: { fontSize: 14, color: 'gray' }
});