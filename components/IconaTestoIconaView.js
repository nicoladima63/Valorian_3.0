import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Puoi cambiare la libreria di icone se preferisci
import { useTheme } from '../context/ThemeContext';


const MyView = ({ leftIcon, rightIcon, text, onPressLeftIcon, onPressRightIcon }) => {
    const { theme } = useTheme();

    return (
        <View style={styles.container}>
            {leftIcon && (
                <Pressable onPress={onPressLeftIcon} >
                    {leftIcon}
                </Pressable>
            )}
            <Pressable onPress={onPressLeftIcon} style={styles.text} >
                <Text style={styles.text}>{text}</Text>
            </Pressable>

            {rightIcon && (
                <Pressable onPress={onPressRightIcon} >
                    {rightIcon}
                </Pressable>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    iconLeft: {
        flex: 1,
        textAlign: 'left',
    },
    text: {
        flex: 3,
        textAlign: 'center',
    },
    iconRight: {
        flex: 1,
        textAlign: 'right',
    },
});

export default MyView;
