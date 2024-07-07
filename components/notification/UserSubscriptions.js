import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

function UserSubscriptions({ userId }) {
    const [notifications, setNotifications] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);

    const fetchNotifications = async () => {
        const { data } = await supabase.from('notifications').select('*');
        setNotifications(data);
    };

    const fetchSubscriptions = async () => {
        const { data } = await supabase
            .from('user_subscriptions')
            .select('notification_id')
            .eq('user_id', userId);
        setSubscriptions(data.map((sub) => sub.notification_id));
    };

    const handleSubscribe = async (notificationId) => {
        await supabase.from('user_subscriptions').insert({ user_id: userId, notification_id: notificationId });
        fetchSubscriptions();
    };

    const handleUnsubscribe = async (notificationId) => {
        await supabase.from('user_subscriptions').delete().match({ user_id: userId, notification_id: notificationId });
        fetchSubscriptions();
    };

    useEffect(() => {
        fetchNotifications();
        fetchSubscriptions();
    }, []);

    return (
        <View>
            <Text>Notifiche Disponibili</Text>
            <FlatList
                data={notifications}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.message} ({item.schedule_type})</Text>
                        {subscriptions.includes(item.id) ? (
                            <Button title="Annulla Sottoscrizione" onPress={() => handleUnsubscribe(item.id)} />
                        ) : (
                            <Button title="Sottoscrivi" onPress={() => handleSubscribe(item.id)} />
                        )}
                    </View>
                )}
            />
        </View>
    );
}

export default UserSubscriptions;
