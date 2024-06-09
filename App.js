import React, { useEffect, useState, useContext } from 'react';
import { AppState, StatusBar, SafeAreaView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen'; 
import AccountScreen from './screens/AccountScreen';
import CategorieScreen from './screens/CategorieScreen';
import { Tabs } from './navigation/Tabs';

import { ThemeProvider } from './context/ThemeContext';
import DarkTheme from './themes/DarkTheme';
import DefaultTheme from './themes/DefaultTheme';

import { AppContext } from './context/AppContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { supabase } from './lib/supabase';

const Stack = createNativeStackNavigator();

function AuthLoadingScreen({ navigation }) {
    const { session } = useAuth();

    useEffect(() => {
        if (session) {
            navigation.replace('Home');
        } else {
            navigation.replace('Login');
        }
    }, [session, navigation]);

    return null;
}

export default function App() {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [appState, setAppState] = useState(AppState.currentState);
    const [isForeground, setIsForeground] = useState(true);

    useEffect(() => {
        const handleAppStateChange = (nextAppState) => {
            if (appState.match(/inactive|background/) && nextAppState === 'active') {
                console.log('App has come to the foreground!');
                setIsForeground(true);
                // Riavvia i processi che sono stati sospesi
                supabase.auth.startAutoRefresh();
                // Riavvia altre attivit� necessarie
            } else if (nextAppState.match(/inactive|background/)) {
                console.log('App is going to the background!');
                setIsForeground(false);
                // Sospendi i processi non essenziali
                supabase.auth.stopAutoRefresh();
                // Sospendi altre attivit� non necessarie
                cleanUpMemory();
            }
            setAppState(nextAppState);
        };

        const subscription = AppState.addEventListener('change', handleAppStateChange);

        return () => {
            subscription.remove();
        };
    }, [appState]);

    const appContext = {
        isDarkTheme,
        setIsDarkTheme,
        isForeground, // aggiungi isForeground al contesto dell'app
    };

    const cleanUpMemory = () => {
        // Esempio di funzione per pulire risorse di memoria non necessarie
        console.log('Cleaning up memory...');
    };

    return (
        <AppContext.Provider value={appContext}>
            <ThemeProvider>
                <SafeAreaView style={{ flex: 1 }}>
                    <StatusBar
                        barStyle={isDarkTheme ? 'light-content' : 'dark-content'}
                        backgroundColor={isDarkTheme ? DarkTheme.colors.background : DefaultTheme.colors.background}
                    />
                    <AuthProvider>
                        <NavigationContainer theme={isDarkTheme ? DarkTheme : DefaultTheme}>
                            <Stack.Navigator initialRouteName='AuthLoading' screenOptions={{ headerShown: false }}>
                                <Stack.Screen
                                    name='AuthLoading'
                                    component={AuthLoadingScreen}
                                    options={{ headerShown: false }}
                                />
                                <Stack.Screen
                                    name='Home'
                                    component={HomeScreen}
                                    options={{ headerShown: false, title: 'Home' }}
                                />
                                <Stack.Screen
                                    name='Settings'
                                    component={SettingsScreen}
                                    options={{ headerShown: true, title: 'Settings' }}
                                />
                                <Stack.Screen
                                    name='Login'
                                    component={LoginScreen}
                                    options={{ headerShown: false, title: 'Login' }}
                                />
                                <Stack.Screen
                                    name='Register'
                                    component={RegisterScreen}
                                    options={{ headerShown: false, title: 'Registarti' }}
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
                                    name="Main"
                                    component={Tabs}
                                    options={{ headerShown: false }}
                                />
                            </Stack.Navigator>
                        </NavigationContainer>
                    </AuthProvider>
                </SafeAreaView>
            </ThemeProvider>
        </AppContext.Provider>
    );
}
