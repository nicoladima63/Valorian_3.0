import React from 'react';
import { View, StyleSheet } from 'react-native';
import StyledPressable from './StyledPressable';
const OnePress = ({ title, onPress,backgroundColor }) => {
    return (
        <View style={styles.container}>
            <StyledPressable title={title} onPress={onPress} backgroundColor={backgroundColor}  />
        </View>
    );
};

const TwoPress = ({ titles, onPresses, backgroundColors }) => {
    return (
        <View style={[styles.container]}>
            <StyledPressable title={titles[0]} onPress={onPresses[0]} backgroundColor={backgroundColors[0]} />
            <StyledPressable title={titles[1]} onPress={onPresses[1]} backgroundColor={backgroundColors[1]} />
        </View>
    );
};

const TwoPressStyled = ({ titles, onPresses, backgroundColors }) => {
    return (
        <View style={[styles.container, { width: '100%' }]}>
            <StyledPressable title={titles[0]} onPress={onPresses[0]} backgroundColor={backgroundColors[0]} />
            <StyledPressable title={titles[1]} onPress={onPresses[1]} backgroundColor={backgroundColors[1]} />
        </View>
    );
};

const ThreePress = ({ titles, onPresses, backgroundColors }) => {
    return (
        <View style={[styles.container, {width: '100%'}]}>
            <StyledPressable title={titles[0]} onPress={onPresses[0]} backgroundColor={backgroundColors[0]} />
            <StyledPressable title={titles[1]} onPress={onPresses[1]} backgroundColor={backgroundColors[1]} />
            <StyledPressable title={titles[2]} onPress={onPresses[2]} backgroundColor={backgroundColors[2]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 5,
    },
});

export { OnePress, TwoPress, TwoPressStyled,ThreePress };
