import { BaseTheme } from './BaseTheme';

const DarkColors = {
    background: '#110c2a', // Midnight Purple
    //background: '#0d1017', // Charcoal Black
    logoBackground: '#21262c', // Charcoal Grey

    safeAreaBackground: '#161b21', // Dark Slate Blue
    statusBarBackground: '#110c2a', //  Midnight Purple

    headerBackground: '#161b21', // Dark Slate Blue
    headerTitle: '#ffffff', // White (evidente)
    headerText: '#d1d1d1', // Light Gray (testo)

    contentContainer: '#110c2a', // Midnight Purple
    contentTitle: '#ffffff', // White (evidente)
    contentText: '#d1d1d1', // Light Gray (testo)
    contentBox: '#21262c', // Charcoal Grey
    contentBoxBorder: '#454952', // Outer Space

    footer: '#161b21', // Dark Slate Blue
    footerText: '#d1d1d1', // Light Gray (testo)

    primary: '#D8BFD8', // Light Purple
    secondary: '#f2f2f2', // White Smoke
    cancel: '#c9d2d9',
    inactive: '#c9d2d9', // Light Slate Gray
    buttontext: '#ffffff',
    link:'#a497ef',

    errorBackground: '#3d1515', // Dark Red
    errorText: '#ff6f61', // Light Coral (più visibile per errore)

    card: '#3b0458', // Dark Purple
    border: '#e5dac6', // Dutch White
    notification: '#85a290', // Sage
    grey: '#f8f8f8', // Cultured
};

const DarkTheme = {
    dark: true,
    colors: DarkColors,
    ...BaseTheme(DarkColors),
};

export default DarkTheme;
