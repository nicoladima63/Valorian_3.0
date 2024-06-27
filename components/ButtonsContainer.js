import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const EquidistantButtons = ({ buttons }) => {
    const renderButtons = () => {
        return buttons.map((button, index) => (
            <Pressable
                key={index}
                onPress={button.onPress}
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed ? '#ddd' : button.colore,
                    },
                    styles.button,
                ]}
            >
                <Text style={styles.buttonText}>{button.title}</Text>
            </Pressable>
        ));
    };

    return (
        <View style={styles.container}>
            {renderButtons()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        margin: 10,
    },
    button: {
        flex: 1,
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default EquidistantButtons;
