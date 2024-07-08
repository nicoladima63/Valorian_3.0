import React from 'react';
import { View, Text, Image } from 'react-native';
//import { useTheme } from '@expo/react-native-theme';
import { useTheme } from '../context/ThemeContext';
const MyCard = ({ title, text, image }) => {
    const { theme } = useTheme();

    return (
        <View style={theme.article}>
            <Text style={theme.title}>{title}</Text>
            <Text style={theme.ext}>{text}</Text>
            <Image source={image} style={theme.Image} />
        </View>
    );
};

export default MyCard;
