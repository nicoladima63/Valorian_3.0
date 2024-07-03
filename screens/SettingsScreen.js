import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';

//import registerForPushNotificationsAsync from '../notifications/getNotificationToken';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

import Spinner from 'react-native-loading-spinner-overlay';
import Layout from './Layout';
import { View, Text, TouchableOpacity, Button, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RadioButton } from 'react-native-paper';

const SettingsScreen = ({ navigation }) => {
    const { themeMode, toggleTheme } = useTheme();
    const { theme } = useTheme();
    const { session } = useAuth();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    //notifiche
    const [title, setTitle] = useState('titolo notifica');
    const [body, setBody] = useState('corpo notifica');
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
        }),
    });

    async function registerForPushNotificationsAsync() {
        let token;
        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log("Expo push token:", token);
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        return token;
    }

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);
    //fine notifiche

    useEffect(() => {
        if (session)
            setUser(session?.user);
    }, [session])

    async function sendPushNotification(expoPushToken) {
        const message = {
            to: expoPushToken,
            sound: 'default',
            title: title,
            body: body,
            data: data
            //data: { testData: 'test data' },
        };

        await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });

        //const schedulingOptions = {
        //    content: {
        //        title: 'Ciao!',
        //        body: 'Hai soddisfatto qualche bisogno oggi?',
        //    },
        //    trigger: null

        //await Notifications.scheduleNotificationAsync(schedulingOptions);


    }


    return (
        <Layout
            navigation={navigation}
            showTopBar={false}
            header={
                <Text style={[theme.h4, theme.fwb, theme.mb20, theme.mt10, theme.ml20]}>Impostazioni</Text>
            }
        >
            <View style={[theme.body, { borderTopColor: theme.colors.slate7, borderTopWidth: 1, paddingTop: 10 }]}>
                <Text style={[theme.text, theme.text16, theme.mb10, theme.ml10, { color: theme.colors.slate11 }]}>Tema</Text>
                <RadioButton.Group onValueChange={toggleTheme} value={themeMode}>
                    <TouchableOpacity onPress={() => toggleTheme('auto')}>
                        <View style={[theme.article, theme.articleTop]}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon name="adjust" size={20} color={theme.colors.slate12} style={{ marginRight: 20 }} />
                                    <Text style={[theme.text, theme.text14]}>Automatico</Text>
                                </View>
                                <RadioButton value="auto" />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleTheme('light')}>
                        <View style={[theme.article, theme.articleMiddle]}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon name="sun-o" size={20} color={theme.colors.slate12} style={{ marginRight: 20 }} />
                                    <Text style={[theme.text, theme.text14]}>Chiaro</Text>
                                </View>
                                <RadioButton value="light" color={theme.colors.slate12} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleTheme('dark')}>
                        <View style={[theme.article, theme.articleBottom]}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon name="moon-o" size={20} color={theme.colors.slate12} style={{ marginRight: 20 }} />
                                    <Text style={[theme.text, theme.text14]}>Scuro</Text>
                                </View>
                                <RadioButton value="dark" />
                            </View>
                        </View>
                    </TouchableOpacity>
                </RadioButton.Group>
                <Text style={{ marginTop: 10, marginLeft: 15, color: theme.colors.slate10 }}>
                    <Text style={[theme.text, theme.text12, theme.fwb, { color: theme.colors.slate12 }]}>Automatico </Text>
                    <Text style={[theme.text, theme.text12]}>
                        &egrave; supportato solo sui sistemi operativi che consentono di controllare i colori a livello di sistema.
                    </Text>
                </Text>

                {user && user.email === 'nicoladimartino@gmail.com' &&
                    <View style={theme.mt20}>
                        <Text style={[theme.text, theme.text16, theme.mb10, theme.ml10, { color: theme.colors.slate11 }]}>Notifiche</Text>

                        <View style={[theme.article, theme.articleTop]}>
                            <Text style={[theme.text, theme.text12, theme.mb10]}>Titolo Notifica</Text>
                            <TextInput
                                style={[theme.article, errors.title && theme.articleDanger, { color: theme.colors.onBackground }]}
                                value={title}
                                placeholder="testo del titolo"
                                placeholderTextColor={theme.colors.slate9}
                                onChangeText={(text) => setTitle(text)}
                            />
                        </View>
                        <View style={[theme.article, theme.articleMiddle]}>
                            <Text style={[theme.text, theme.text12, theme.mb10]}>Corpo Notifica</Text>
                            <TextInput
                                style={[theme.article, errors.body && theme.articleDanger, { color: theme.colors.onBackground }]}
                                value={body}
                                placeholder="testo del titolo"
                                placeholderTextColor={theme.colors.slate9}
                                onChangeText={(text) => setBody(text)}
                            />
                        </View>
                        <View style={[theme.article, theme.articleMiddle]}>
                            <Text>Your expo push token: {expoPushToken}</Text>
                        </View>
                        <View style={[theme.article, theme.articleMiddle]}>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Text>Notification Title: {notification && notification.request.content.title} </Text>
                                <Text>Notification Body: {notification && notification.request.content.body}</Text>
                                <Text>Notification Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
                            </View>
                        </View>
                        <View style={[theme.article, theme.articleBottom]}>
                            <Button
                                title="Invia Notifica"
                                onPress={async () => {
                                    setLoading(true);
                                    await sendPushNotification(expoPushToken)
                                        .then(() => setLoading(false));
                                }}
                            />
                        </View>
                    </View>
                }


            </View>
            <Spinner
                visible={loading}
                textContent={'Loading...'}
                textStyle={theme.colors.white}
            />

        </Layout>
    );
};

export default SettingsScreen;
