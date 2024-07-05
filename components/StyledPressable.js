import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const StyledPressable = ({ title, onPress, backgroundColor }) => {
    const { theme } = useTheme();

    return (
        <Pressable style={[styles.pressable, { backgroundColor: backgroundColor }]} onPress={onPress}>
            <Text style={[theme.text, theme.text14, {color: theme.colors.onPrimary}]}>{title}</Text>
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
