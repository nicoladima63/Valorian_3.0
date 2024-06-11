import { BaseTheme } from './BaseTheme';

const DarkColors = {
    background: '#0d1017',
    logoBackground: '#21262c',

    safeAreaBackground:'#161b21',
    statusBarBackground: '#161b21',

    headerBackground: '#161b21',
    headerTitle: '#c5ccd4',
    headerText: '',

    contentContainer: '#0d1017',
    contentTitle: '#7e858f',
    contentText: '#8e929b', 
    contentBox: '#21262c',
    contentBoxBorder: '#454952',

    footer: '#161b21',
    footerText: '#8e929b',

    primary: '#a497ef',
    secondary: '#f2f2f2',
    inactive: '#c9d2d9',

    errorBackground: '#3d1515',
    errorText: '#f47265',

    card: '#3b0458',
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