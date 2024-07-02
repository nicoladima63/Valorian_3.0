import React, { useEffect, useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AppContext } from './context/AppContext';
import { AuthProvider, useAuth } from './context/AuthContext';

import { Linking } from 'react-native';
import * as Notifications from 'expo-notifications';

import { StatusBar, AppState } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AsyncStorage from '@react-native-async-storage/async-storage';

import NotificationScheduler from './components/NotificationScheduler';
import WelcomePage from './screens/WelcomePage';
import StatusPage from './screens/StatusPage';
import HomeScreen from './screens/HomeScreen';
import HelpHomeScreen from './screens/HelpHomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import AccountScreen from './screens/AccountScreen';
import CategorieScreen from './screens/CategorieScreen';
import { Tabs } from './navigation/Tabs';

const Stack = createNativeStackNavigator();
function AuthLoadingScreen({ navigation }) {
    const { session } = useAuth();

    useEffect(() => {
        const checkWelcomePage = async () => {
            const hasSeenWelcome = await AsyncStorage.getItem('hasSeenWelcome');
            if (!hasSeenWelcome) {
                navigation.replace('WelcomePage');
            } else if (session) {
                navigation.replace('Tabs');
            } else {
                navigation.replace('Login');
            }
        };

        checkWelcomePage();
    }, [session, navigation]);


    return null;
}

export default function App() {
    return (
        <ThemeProvider>
            <NotificationScheduler />
            <AppWithTheme />
        </ThemeProvider>
    );
}

function AppWithTheme() {
    const { theme, themeMode } = useTheme();
    const [appState, setAppState] = useState(AppState.currentState);
    const [statusBarStyle, setStatusBarStyle] = useState('default');
    useEffect(() => {
        const handleAppStateChange = (nextAppState) => {
            if (appState.match(/inactive|background/) && nextAppState === 'active') {
                console.log('App has come to the foreground!');
                // Riprendi le attività, aggiorna i dati, ecc.
            } else if (nextAppState.match(/inactive|background/)) {
                console.log('App has gone to the background!');
                // Sospendi le attività, salva lo stato, ecc.
            }
            setAppState(nextAppState);
        };

        const appStateSubscription = AppState.addEventListener('change', handleAppStateChange);

        return () => {
            appStateSubscription.remove();
        };
    }, [appState]);

    return (
        <AppContext.Provider value={{ themeMode }}>
            <SafeAreaProvider>
                <StatusBar />
                <AuthProvider>
                    <NavigationContainer
                        theme={theme}
                        linking={{
                            config: {
                                // Configuration for linking
                            },
                            async getInitialURL() {
                                // First, you may want to do the default deep link handling
                                // Check if app was opened from a deep link
                                const url = await Linking.getInitialURL();

                                if (url != null) {
                                    return url;
                                }

                                // Handle URL from expo push notifications
                                const response = await Notifications.getLastNotificationResponseAsync();
                                //return response?.notification.request.content.data.url;

                                //mia modifica
                                const url2 = response?.notification.request.content.data.url;

                                if (url2) {
                                    // Always navigate to HomeScreen regardless of the URL content
                                    return 'HomeScreen'; // Replace with 'HomeScreen' if screen names differ
                                }

                                return null; // No URL found, default behavior

                                //fine mia modifica
                            },
                            subscribe(listener) {
                                const onReceiveURL = ({ url }) => listener(url);

                                // Listen to incoming links from deep linking
                                const eventListenerSubscription = Linking.addEventListener('url', onReceiveURL);

                                // Listen to expo push notifications
                                const subscription = Notifications.addNotificationResponseReceivedListener(response => {
                                    const url = response.notification.request.content.data.url;

                                    // Any custom logic to see whether the URL needs to be handled
                                    //...

                                    // Let React Navigation handle the URL
                                    listener(url);
                                });

                                return () => {
                                    // Clean up the event listeners
                                    eventListenerSubscription.remove();
                                    subscription.remove();
                                };
                            },
                        }}>
                        <Stack.Navigator initialRouteName='AuthLoading' screenOptions={{ headerShown: false }}>
                            <Stack.Screen
                                name='AuthLoading'
                                component={AuthLoadingScreen}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name='WelcomePage'
                                component={WelcomePage}
                                options={{ headerShown: false, title: 'Welcome' }}
                            />
                            <Stack.Screen
                                name='StatusPage'
                                component={StatusPage}
                                options={{ headerShown: false, title: 'Il tuo stato' }}
                            />
                            <Stack.Screen
                                name='Home'
                                component={HomeScreen}
                                options={{ headerShown: false, title: 'Home' }}
                            />
                            <Stack.Screen
                                name='Settings'
                                component={SettingsScreen}
                                options={{ headerShown: true, title: 'Impostazioni' }}
                            />
                            <Stack.Screen
                                name='Login'
                                component={LoginScreen}
                                options={{ headerShown: false, title: 'Login' }}
                            />
                            <Stack.Screen
                                name='Register'
                                component={RegisterScreen}
                                options={{ headerShown: false, title: 'Registrati' }}
                            />
                            <Stack.Screen
                                name='Account'
                                component={AccountScreen}
                                options={{ headerShown: true, title: 'Account' }}
                            />
                            <Stack.Screen
                                name='Categorie'
                                component={CategorieScreen}
                                options={{ headerShown: true, title: 'Categorie' }}
                            />
                            <Stack.Screen
                                name='HelpHome'
                                component={HelpHomeScreen}
                                options={{ headerShown: true, title: 'Aiuto' }}
                            />
                            <Stack.Screen
                                name="Tabs"
                                component={Tabs}
                                options={{ headerShown: false }}
                            />
                        </Stack.Navigator>
                    </NavigationContainer>
                </AuthProvider>
            </SafeAreaProvider>
        </AppContext.Provider>
    );
}
