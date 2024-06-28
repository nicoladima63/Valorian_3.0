import React from 'react';
import { View, StyleSheet } from 'react-native';
import StyledPressable from './StyledPressable';

const OnePress = ({ title, onPress }) => {
    return (
        <View style={styles.container}>
            <StyledPressable title={title} onPress={onPress} />
        </View>
    );
};

const TwoPress = ({ titles, onPresses }) => {
    return (
        <View style={styles.container}>
            <StyledPressable title={titles[0]} onPress={onPresses[0]} />
            <StyledPressable title={titles[1]} onPress={onPresses[1]} />
        </View>
    );
};

const ThreePress = ({ titles, onPresses }) => {
    return (
        <View style={styles.container}>
            <StyledPressable title={titles[0]} onPress={onPresses[0]} />
            <StyledPressable title={titles[1]} onPress={onPresses[1]} />
            <StyledPressable title={titles[2]} onPress={onPresses[2]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 5,
    },
});

export { OnePress, TwoPress, ThreePress };
