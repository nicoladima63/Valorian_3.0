import { BaseTheme } from './BaseTheme';

const DefaultColors = {
    background: '#f8f8fa',
    logoBackground: '#21262c',

    safeAreaBackground: '#ffffff',
    statusBarBackground: '#ffffff',

    headerBackground: '#ffffff',
    headerTitle: '#595b5f',
    headerText: '#8e929b',

    contentContainer: '#ffffff',
    contentTitle: '#58595b',
    contentText: '#8e929b',
    contentBox: '#f8f8fa',
    contentBoxBorder: '#e9e9eb',

    footer: '#ffffff',
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

const DefaultTheme = {
    dark: false,
    colors: DefaultColors,
    ...BaseTheme(DefaultColors),
};

export default DefaultTheme;