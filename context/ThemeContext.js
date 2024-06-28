import React, { createContext, useState, useEffect, useContext } from 'react';
import { Appearance, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DefaultTheme, DarkTheme } from '../themes/theme';

const ThemeContext = createContext();

const getSystemTheme = () => {
    const colorScheme = Appearance.getColorScheme();
    return colorScheme === 'dark' ? DarkTheme : DefaultTheme;
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(DefaultTheme);
    const [themeMode, setThemeMode] = useState('auto');

    useEffect(() => {
        const fetchStoredTheme = async () => {
            try {
                const storedThemeMode = await AsyncStorage.getItem('themeMode');
                if (storedThemeMode !== null) {
                    setThemeMode(storedThemeMode);
                    if (storedThemeMode === 'light') {
                        setTheme(DefaultTheme);
                    } else if (storedThemeMode === 'dark') {
                        setTheme(DarkTheme);
                    } else if (storedThemeMode === 'auto') {
                        setTheme(getSystemTheme());
                    }
                }
            } catch (error) {
                console.error('Error fetching stored theme:', error);
            }
        };

        fetchStoredTheme();
    }, []);

    useEffect(() => {
        const handleSystemThemeChange = ({ colorScheme }) => {
            if (themeMode === 'auto') {
                setTheme(colorScheme === 'dark' ? DarkTheme : DefaultTheme);
            }
        };

        const subscription = Appearance.addChangeListener(handleSystemThemeChange);

        return () => {
            subscription.remove();
        };
    }, [themeMode]);

    useEffect(() => {
        StatusBar.setBarStyle(theme.dark ? 'light-content' : 'dark-content');
        StatusBar.setBackgroundColor(theme.colors.background);

        // Aggiorna il colore della StatusBar all'avvio dell'applicazione
        updateStatusBar(theme);

        // Salva il tema selezionato in AsyncStorage
        AsyncStorage.setItem('themeMode', themeMode);
    }, [theme, themeMode]);

    const updateStatusBar = (currentTheme) => {
        StatusBar.setBarStyle(currentTheme.dark ? 'light-content' : 'dark-content');
        StatusBar.setBackgroundColor(theme.colors.background);
    };

    const toggleTheme = (mode, callback) => {
        setThemeMode(mode);
        if (mode === 'light') {
            setTheme(DefaultTheme);
        } else if (mode === 'dark') {
            setTheme(DarkTheme);
        } else if (mode === 'auto') {
            setTheme(getSystemTheme());
        }
        if (callback) {
            callback();
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, themeMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
