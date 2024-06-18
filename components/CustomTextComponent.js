// src/components/CustomText.js
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { normalize } from '../utils/normalize';

const CustomText = ({ style, children, ...props }) => {
    const { theme } = useTheme();

    // Normalizza la dimensione del font se definita negli stili
    const fontSize = style && style.fontSize ? normalize(style.fontSize) : normalize(14);

    return (
        <Text
            style={[
                styles.text,
                { color: theme.colors.text, fontSize },
                style // Applica gli altri stili passati come prop
            ]}
            {...props}
        >
            {children}
        </Text>
    );
};
const styles = StyleSheet.create({
    text: {
        fontSize: normalize(14),
    },
});

export default CustomText;
