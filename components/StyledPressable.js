import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const StyledPressable = ({ title, onPress }) => {
    const { theme } = useTheme();

    return (
        <Pressable style={[styles.pressable, { backgroundColor: theme.colors.primary }]} onPress={onPress}>
            <Text style={[theme.text, theme.text16, {color: theme.colors.onPrimary}]}>{title}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    pressable: {
        flex:1,
        margin: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
});
export default StyledPressable;
