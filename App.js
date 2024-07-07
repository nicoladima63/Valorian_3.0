import React, { useEffect, useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AppContext } from './context/AppContext';
import { AuthProvider, useAuth } from './context/AuthContext';

import { StatusBar, AppState, Linking, View, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AsyncStorage from '@react-native-async-storage/async-storage';

import WelcomePage from './screens/WelcomePage';
import StatusPage from './screens/StatusPage';
import HomeScreen from './screens/HomeScreen';
import HelpHomeScreen from './screens/HelpHomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import LoginScreen from './screens/LoginScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import AdminNotificationsManager from './screens/AdminNotificationsManager';
import UserNotificationsSubscription from './screens/UserNotificationsSubscription';
//import RecoveryPassword from './screens/RecoveryPassword';
//import SetNewPassword from './screens/SetNewPasswordScreen';
//import PasswordResetScreen from './screens/PasswordResetScreen';
import RegisterScreen from './screens/RegisterScreen';
import AccountScreen from './screens/AccountScreen';
import CategorieScreen from './screens/CategorieScreen';
import { Tabs } from './navigation/Tabs';

const Stack = createNativeStackNavigator();
const AuthLoadingScreen = ({ navigation }) => {
    const { session } = useAuth();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const checkWelcomePage = async () => {
            try {
                const seeWelcome = JSON.parse(await AsyncStorage.getItem('seeWelcome'));
                console.log('seeWelcome:', seeWelcome);
                console.log('session:', session);

                if (seeWelcome) {
                    navigation.replace('WelcomePage');
                } else if (session) {
                    navigation.replace('Tabs');
                } else {
                    navigation.replace('Login');
                }
            } catch (error) {
                console.error('Error reading value from AsyncStorage', error);
                navigation.replace('Login'); // Fallback in case of error
            } finally {
                setIsChecking(false); // Stop the loading indicator
            }
        };

        // Ensure that we only check the welcome page after the session is loaded
        if (session !== undefined) {
            checkWelcomePage();
        }
    }, [session, navigation]);

    if (isChecking) {
        // Render a loading indicator while we are checking the session and welcome state
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return null;
};

export default function App() {
    return (
        <ThemeProvider>
            <AppWithTheme />
        </ThemeProvider>
    );
}

function AppWithTheme() {
    const { theme, themeMode } = useTheme();
    const [appState, setAppState] = useState(AppState.currentState);
    const [statusBarStyle, setStatusBarStyle] = useState  ('default' );
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

    useEffect(() => {
        const handleDeepLink = (event) => {
            let data = Linking.parse(event.url);
            if (data.path === 'reset-password') {
                // Navigate to ResetPasswordScreen and pass the token
                navigation.navigate('ResetPasswordScreen');
            }
        };

        Linking.addEventListener('url', handleDeepLink);

        return () => {
            Linking.removeEventListener('url', handleDeepLink);
        };
    }, []);


    return (
        <AppContext.Provider value={{ themeMode }}>
            <SafeAreaProvider>
                <StatusBar/>
                <AuthProvider>
                    <NavigationContainer theme={theme}>
                        <Stack.Navigator initialRouteName='AuthLoading'
                            screenOptions={{
                                headerStyle: {
                                    backgroundColor: theme.colors.slate3, // Imposta il colore di sfondo dell'header
                                },
                                headerTintColor: theme.colors.onBackground, // Imposta il colore del testo nell'header
                                headerTitleStyle: {
                                    fontWeight: 'bold',
                                },
                            }}

                        >
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
                                options={{ headerShown: false, title: 'Register' }}
                            />
                            {/*<Stack.Screen*/}
                            {/*    name='Recovery'*/}
                            {/*    component={RecoveryPassword}*/}
                            {/*    options={{ headerShown: false, title: 'Recovery' }}*/}
                            {/*/>*/}
                            <Stack.Screen
                                name='ResetPasswordScreen'
                                component={ResetPasswordScreen}
                                options={{ headerShown: true, title: 'ResetPasswordScreen' }}
                            />
                            {/*<Stack.Screen*/}
                            {/*    name='PasswordResetScreen'*/}
                            {/*    component={PasswordResetScreen}*/}
                            {/*    options={{ headerShown: true, title: 'PasswordResetScreen' }}*/}
                            {/*/>*/}
                            {/*<Stack.Screen*/}
                            {/*    name='SetNewPassword'*/}
                            {/*    component={SetNewPassword}*/}
                            {/*    options={{ headerShown: false, title: 'SetNewPassword' }}*/}
                            {/*/>*/}
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
                                name='AdminNotifications'
                                component={AdminNotificationsManager}
                                options={{ headerShown: true, title: 'Admin Impostazioni manager' }}
                            />
                            <Stack.Screen
                                name='UserNotifications'
                                component={UserNotificationsSubscription}
                                options={{ headerShown: true, title: 'Impostazioni notifiche' }}
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
