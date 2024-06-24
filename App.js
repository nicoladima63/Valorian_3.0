import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
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
import RegisterScreen from './screens/RegisterScreen';
import AccountScreen from './screens/AccountScreen';
import CategorieScreen from './screens/CategorieScreen';
import { Tabs } from './navigation/Tabs';

import { ThemeProvider, useTheme } from './context/ThemeContext';
import { DefaultTheme, DarkTheme } from './themes/theme';
import { AppContext } from './context/AppContext';
import { AuthProvider, useAuth } from './context/AuthContext';

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
            <AppWithTheme />
        </ThemeProvider>
    );
}

function AppWithTheme() {
    const { theme, isDarkTheme } = useTheme();

    return (
        <AppContext.Provider value={{ isDarkTheme }}>
            <SafeAreaProvider>
                <StatusBar
                    barStyle={isDarkTheme ? 'light-content' : 'dark-content'}
                    backgroundColor={theme.colors.statusBarBackground}
                />
                <AuthProvider>
                    <NavigationContainer theme={theme}>
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
