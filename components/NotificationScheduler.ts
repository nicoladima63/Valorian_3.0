import { useState, useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';

const NotificationScheduler = () => {
    const [expoPushToken, setExpoPushToken] = useState('');


    useEffect(() => {
        registerForPushNotifications();
    }, []);

    useEffect(() => {
        const notificationResponseListener = Notifications.addNotificationResponseReceivedListener(response => {
            console.log('Notification tapped:', response);
        });

        return () => Notifications.removeNotificationSubscription(notificationResponseListener);
    }, []);



    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
        }),
    });


    const registerForPushNotifications = async () => {
        let token;
        // Request permission for notifications
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for notifications!');
            return;
        }
        // Get the expo push token
        token = (await Notifications.getExpoPushTokenAsync()).data;
        setExpoPushToken(token);


        // Schedule a daily notification at 6:00 PM
        const schedulingOptions = {
            content: {
                title: 'Ciao!',
                body: 'Hai soddisfatto qualche bisogno oggi?',
            },
            trigger: {
                hour: 14,
                minute: 39,
                repeats: true,
            },
        };

        await Notifications.scheduleNotificationAsync(schedulingOptions);
    };

    return null; // This component doesn't render any UI
};

export default NotificationScheduler;
