import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import LandingScreen from '../screens/LandingScreen';
import LandingPage from '../screens/LandingPage';
import SettingsScreen from '../screens/SettingsScreen';
import SettingsPage from '../screens/SettingsPage';
import Bisogni from '../screens/BisogniList';
import Calendar from '../screens/Calendario';
import Associazione from '../screens/Associazione';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTheme } from '../context/ThemeContext';

const Tab = createBottomTabNavigator();

export const Tabs = () => {
    const navigation = useNavigation();
    const { theme } = useTheme();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'ios-home' : 'ios-home-outline';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'ios-settings' : 'ios-settings-outline';
                    } else if (route.name === 'Account') {
                        iconName = focused ? 'ios-person' : 'ios-person-outline';
                    } else if (route.name === 'Bisogni List') {
                        iconName = focused ? 'ios-list' : 'ios-list-outline';
                    } else if (route.name === 'Calendario') {
                        iconName = focused ? 'ios-calendar' : 'ios-calendar-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.inactive,
                tabBarLabelStyle: { fontSize: 12 },
                tabBarStyle: { backgroundColor: theme.colors.background, height: 55, borderTopColor: theme.colors.border },
            })}
        >
            <Tab.Screen
                name="Landing"
                component={LandingPage}
                options={{
                    tabBarLabel: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => <FontAwesome name="home" size={size} color={color} />,
                    tabBarLabelStyle: { marginBottom: 8 }
                }}
            />
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Bisogni',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => <FontAwesome name="list" size={size} color={color} />,
                    tabBarLabelStyle: { marginBottom: 8 }
                }}
            />
            <Tab.Screen
                name="Calendario"
                component={Calendar}
                options={{
                    tabBarLabel: 'Calendario',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => <FontAwesome name="calendar" size={size} color={color} />,
                    tabBarLabelStyle: { marginBottom: 8 }
                }}
            />
            <Tab.Screen
                name="Impostazioni"
                component={SettingsPage}
                options={{
                    tabBarLabel: 'Impostazioni',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => <FontAwesome name="cog" size={size} color={color} />,
                    tabBarLabelStyle: { marginBottom: 8 }
                }}
            />
        </Tab.Navigator>
    );
};
