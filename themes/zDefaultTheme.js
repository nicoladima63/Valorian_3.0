import { BaseTheme } from './BaseTheme';

const DefaultColors = {
    //background: '#f8f8fa',
    //logoBackground: '#21262c',

    //safeAreaBackground: '#ffffff',
    //statusBarBackground: '#ffffff',

    //headerBackground: '#ffffff',
    //headerTitle: '#595b5f',
    //headerText: '#8e929b',

    //contentContainer: '#ffffff',
    //contentTitle: '#58595b',
    //contentText: '#8e929b',
    //contentBox: '#f8f8fa',
    //contentBoxBorder: '#e9e9eb',

    //footer: '#ffffff',
    //footerText: '#8e929b',

    //primary: '#D8BFD8',
    //secondary: '#f2f2f2',
    //cancel: '#c9d2d9',
    //inactive: '#c9d2d9',
    //buttontext: '#ffffff',
    //link: '#a497ef',

    //errorBackground: '#3d1515',
    //errorText: '#f47265',

    //card: '#3b0458',
    //border: '#e5dac6',
    //notification: '#85a290',
    //grey: '#f8f8f8',



    colors: {
        primary: {
            500: '#6200EE',
        },
        primaryVariant: {
            700: '#3700B3',
        },
        secondary: {
            200: '#03DAC6',
        },
        secondaryVariant: {
            900: '#018786',
        },    background: '#FFFFFF',
    surface: '#FFFFFF',
    error: '#B00020',
    onPrimary: '#FFFFFF',
    onSecondary: '#000000',
    onBackground: '#000000',
    onSurface: '#000000',
    onError: '#FFFFFF'




};

const DefaultTheme = {
    dark: false,
    colors: DefaultColors,
    ...BaseTheme(DefaultColors),
};

export default DefaultTheme;