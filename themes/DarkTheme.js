import { BaseTheme } from './BaseTheme';

const DarkColors = {
    primary: '#dedede', // Giallo
    secondary: '#f2f2f2', // Giallo
    inactive: 'grey',
    background: '#3b0458', // Viola scuro per lo sfondo
    card: '#3b0458', // Viola scuro per le card
    text: '#e5dac6', // Crema per il testo
    border: '#e5dac6',
    notification: '#85a290',
    grey: '#f8f8f8',
};

const DarkTheme = {
    dark: true,
    colors: DarkColors,
    ...BaseTheme(DarkColors),
};

export default DarkTheme;