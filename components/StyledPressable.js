import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const StyledPressable = ({ title, onPress }) => {
    const { theme } = useTheme();

    return (
        <Pressable style={styles.pressable} onPress={onPress}>
            <Text style={[theme.text,theme.text16]}>{title}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    pressable: {
        flex:1,
        margin: 10,
        padding: 10,
        backgroundColor: '#007BFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    text: {
        color: 'white',
        fontSize: 16,
    },
});
export default StyledPressable;
