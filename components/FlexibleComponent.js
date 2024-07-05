import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Puoi cambiare la libreria di icone se preferisci
import { useTheme } from '../context/ThemeContext';

const FlexibleView = ({ format, leftIcon, rightIcon, text, textR, onPressLeftIcon, onPressRightIcon }) => {
    const { theme } = useTheme();

    return (
        <View style={styles.container}>
            {format === 'testoTesto' && (
                <>
                    {text && (
                        <Text style={{ marginLeft: 10 }}>{text}</Text>
                    )}
                    <View style={styles.spacer} />
                    {textR && (
                        <Pressable onPress={onPressRightIcon} >
                            <View style={ { marginRight: 10 }}>{textR}</View>
                        </Pressable>

                    )}
                </>
            )}

            {format === 'iconaTesto' && (
                <>
                    {leftIcon && (
                        <Pressable onPress={onPressLeftIcon} style={styles.icon}>
                            {leftIcon}
                        </Pressable>
                    )}
                    <Text style={{ marginLeft: 10 }}>{text}</Text>
                </>
            )}

            {format === 'testoIcona' && (
                <>
                    <Text style={[theme.text, { marginRight: rightIcon ? 20 : 0 }]}>{text}</Text>
                    <View style={styles.spacer} />
                    {rightIcon && (
                        <Pressable onPress={onPressRightIcon} >
                            {rightIcon}
                        </Pressable>
                    )}
                </>
            )}

            {format === 'iconaIcona' && (
                <>
                    {leftIcon && (
                        <Pressable onPress={onPressLeftIcon} style={styles.icon}>
                            {leftIcon}
                        </Pressable>
                    )}
                    <View style={styles.spacer} />
                    {rightIcon && (
                        <Pressable onPress={onPressRightIcon} >
                            {rightIcon}
                        </Pressable>
                    )}
                </>
            )}

            {format === 'iconaTestoIcona' && (
                <>
                    {leftIcon && (
                        <Pressable onPress={onPressLeftIcon}>
                            {leftIcon}
                        </Pressable>
                    )}
                    <Text style={{ marginLeft: 10 }}>{text}</Text>
                    <View style={styles.spacer} />
                    {rightIcon && (
                        <Pressable onPress={onPressRightIcon} >
                            {rightIcon}
                        </Pressable>
                    )}
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    textx: {
        fontSize: 14, color: '#ccc'
    },
    spacer: {
        flex: 1,
    },
});

export default FlexibleView;
