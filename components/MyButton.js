import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
//import { useTheme } from '@expo/react-native-theme';
import { useTheme } from '../context/ThemeContext';
const MyButton = ({ onPress, label }) => {
    const { theme } = useTheme();

    return (
        <TouchableOpacity onPress={onPress} style={theme.article}>
            <Text style={theme.text}>{label}</Text>
        </TouchableOpacity>
    );
};

export default MyButton;
