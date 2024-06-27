import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ColorBar = ({ colorObj }) => {

    const { nomecolore, valore } = colorObj;
    return (
        <View style={[styles.colorBar, { backgroundColor: valore, flex: 1 }]}>
            <Text style={styles.colorName}>{nomecolore}</Text>
        </View>
    );
};

const ColorBars = () => {
    const colorsArray = {
        white: '#fff',
        black: '#000',
        cyan: '#07c0cb',
        lightblue: '#1e92c4',
        darkblue: '#0b67af',
        indigo: '#4b50b2',
        purple: '#8945a3',
        pink: '#c04891',
        orange: '#e96d3c',
        gold: '#f38f2f',
        yellow: '#eebc01',
        lime: '#aabd04',
        lightgreen: '#6aa72a',
        darkgreen: '#3a8e39',
        green1: '#fbfefc',
        green2: '#f2fcf5',
        green3: '#e9f9ee',
        green4: '#ddf3e4',
        green5: '#ccebd7',
        green6: '#b4dfc4',
        green7: '#92ceac',
        green8: '#5bb98c',
        green9: '#30a46c',
        green10: '#299764',
        green11: '#18794e',
        green12: '#153226',
        yellow1: '#fdfdf9',
        yellow2: '#fffce8',
        yellow3: '#fffbd1',
        yellow4: '#fff8bb',
        yellow5: '#fef2a4',
        yellow6: '#f9e68c',
        yellow7: '#efd36c',
        yellow8: '#ebbc00',
        yellow9: '#f5d90a',
        yellow10: '#f7ce00',
        yellow11: '#946800',
        yellow12: '#35290f',
        red1: '#fffcfc',
        red2: '#fff8f8',
        red3: '#ffefef',
        red4: '#ffe5e5',
        red5: '#fdd8d8',
        red6: '#f9c6c6',
        red7: '#f3aeaf',
        red8: '#eb9091',
        red9: '#e5484d',
        red10: '#dc3d43',
        red11: '#cd2b31',
        red12: '#381316',
        blue1: '#fbfdff',
        blue2: '#f5faff',
        blue3: '#edf6ff',
        blue4: '#e1f0ff',
        blue5: '#cee7fe',
        blue6: '#b7d9f8',
        blue7: '#96c7f2',
        blue8: '#5eb0ef',
        blue9: '#0091ff',
        blue10: '#0081f1',
        blue11: '#006adc',
        blue12: '#00254d',
        orange1: '#fefcfb',
        orange2: '#fef8f4',
        orange3: '#fff1e7',
        orange4: '#ffe8d7',
        orange5: '#ffdcc3',
        orange6: '#ffcca7',
        orange7: '#ffb381',
        orange8: '#fa934e',
        orange9: '#f76808',
        orange10: '#ed5f00',
        orange11: '#bd4b00',
        orange12: '#451e11',
        purple1: '#fefcfe',
        purple2: '#fdfaff',
        purple3: '#f9f1fe',
        purple4: '#f3e7fc',
        purple5: '#eddbf9',
        purple6: '#e3ccf4',
        purple7: '#d3b4ed',
        purple8: '#be93e4',
        purple9: '#8e4ec6',
        purple10: '#8445bc',
        purple11: '#793aaf',
        purple12: '#2b0e44',
        pink1: '#fffcfe',
        pink2: '#fff7fc',
        pink3: '#feeef8',
        pink4: '#fce5f3',
        pink5: '#f9d8ec',
        pink6: '#f3c6e2',
        pink7: '#ecadd4',
        pink8: '#e38ec3',
        pink9: '#d6409f',
        pink10: '#d23197',
        pink11: '#cd1d8d',
        pink12: '#3b0a2a',
        slate1: '#fbfcfd',
        slate2: '#f8f9fa',
        slate3: '#f1f3f5',
        slate4: '#eceef0',
        slate5: '#e6e8eb',
        slate6: '#dfe3e6',
        slate7: '#d7dbdf',
        slate8: '#c1c8cd',
        slate9: '#889096',
        slate10: '#7e868c',
        slate11: '#687076',
        slate12: '#11181c',
    };
    // Convert object to array of objects with nomecolore and valoreesadecimale
    const colorObjects = Object.entries(colorsArray).map(([nomecolore, valore]) => ({
        nomecolore,
        valore,
    }));
    return (
        <View style={styles.container}>
            {colorObjects.map((colorObj) => (
                <ColorBar key={colorObj.nomecolore} colorObj={colorObj} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 40,
    },
    colorBar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
        padding: 8,
        borderRadius: 2,
        flex: 1
    },
    colorName: {
        marginLeft: 10,
        fontWeight: 'bold',
    },
});

export default ColorBars;
