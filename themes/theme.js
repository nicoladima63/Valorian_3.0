import { BaseTheme } from './BaseTheme';

const LightColors = {
    background: '#fff',
    logoBackground: '#FFFFFF',
    safeAreaBackground: '#FFFFFF',
    statusBarBackground: '#FFFFFF',
    headerBackground: '#FFFFFF',
    headerTitle: '#000000',
    headerText: '#000000',
    contentContainer: '#FFFFFF',
    contentBody: '#fafafa',
    contentTitle: '#000000',
    contentText: '#000000',
    contentBox: '#e3e3e3',
    contentBoxBorder: '#d6d6d6',
    contentArticle: '#dedede',
    footer: '#FFFFFF',
    footerText: '#000000',
    primary: '#6200EE',
    primaryVariant: '#3700B3',
    secondary: '#03DAC6',
    secondaryVariant: '#018786',
    cancel: '#B00020',
    inactive: '#000000',
    buttontext: '#FFFFFF',
    link: '#6200EE',
    errorBackground: '#FFCDD2',
    errorText: '#B00020',
    card: '#FFFFFF',
    border: '#e3e3e3',
    notification: '#FF80AB',
    grey: '#f8f8f8',
    onPrimary: '#FFFFFF',
    onSecondary: '#000000',
    onBackground: '#000000',
    onSurface: '#000000',
    onError: '#FFFFFF',
    undo: '#aaaaaa',
    danger: '#bb211450',
    warning: '#e2f04e',
    success: '#24bb2150',
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

const DarkColors = {
    background: '#000',
    primary: '#BB86FC',
    primaryVariant: '#3700B3',
    secondary: '#03DAC6',
    secondaryVariant: '#03DAC6',
    cancel: '#CF6679',
    inactive: '#C9D2D9',
    buttontext: '#FFFFFF',
    link: '#A497EF',
    errorBackground: '#3D1515',
    errorText: '#CF6679',
    card: '#3B0458',
    border: '#3F424A',
    notification: '#85A290',
    grey: '#F8F8F8',
    onPrimary: '#000000',
    onSecondary: '#000000',
    onBackground: '#FFFFFF',
    onSurface: '#FFFFFF',
    onError: '#000000',
    //undo: '#aaaaaa50',
    undo: '#3b3b3b',
    danger: '#bb211450',
    warning: '#e2f04e',
    success: '#24bb2150',
    green1: '#0d1912',
    green2: '#0c1f17',
    green3: '#0f291e',
    green4: '#113123',
    green5: '#133929',
    green6: '#164430',
    green7: '#1b543a',
    green8: '#236e4a',
    green9: '#30a46c',
    green10: '#3cb179',
    green11: '#4cc38a',
    green12: '#e5fbeb',
    yellow1: '#1c1500',
    yellow2: '#221a00',
    yellow3: '#2c2100',
    yellow4: '#352800',
    yellow5: '#3e3000',
    yellow6: '#493c00',
    yellow7: '#594a05',
    yellow8: '#705e00',
    yellow9: '#f5d90a',
    yellow10: '#ffef5c',
    yellow11: '#f0c000',
    yellow12: '#fffad1',
    red1: '#1f1315',
    red2: '#291415',
    red3: '#3c181a',
    red4: '#481a1d',
    red5: '#541b1f',
    red6: '#671e22',
    red7: '#822025',
    red8: '#aa2429',
    red9: '#e5484d',
    red10: '#f2555a',
    red11: '#ff6369',
    red12: '#feecee',
    blue1: '#0f1720',
    blue2: '#0f1b2d',
    blue3: '#10243e',
    blue4: '#102a4c',
    blue5: '#0f3058',
    blue6: '#0d3868',
    blue7: '#0a4481',
    blue8: '#0954a5',
    blue9: '#0091ff',
    blue10: '#369eff',
    blue11: '#52a9ff',
    blue12: '#eaf6ff',
    orange1: '#1f1206',
    orange2: '#2b1400',
    orange3: '#391a03',
    orange4: '#441f04',
    orange5: '#4f2305',
    orange6: '#5f2a06',
    orange7: '#763205',
    orange8: '#943e00',
    orange9: '#f76808',
    orange10: '#ff802b',
    orange11: '#ff8b3e',
    orange12: '#feeadd',
    purple1: '#1b141d',
    purple2: '#221527',
    purple3: '#301a3a',
    purple4: '#3a1e48',
    purple5: '#432155',
    purple6: '#4e2667',
    purple7: '#5f2d84',
    purple8: '#7938b2',
    purple9: '#8e4ec6',
    purple10: '#9d5bd2',
    purple11: '#bf7af0',
    purple12: '#f7ecfc',
    pink1: '#1f121b',
    pink2: '#271421',
    pink3: '#3a182f',
    pink4: '#451a37',
    pink5: '#501b3f',
    pink6: '#601d48',
    pink7: '#7a1d5a',
    pink8: '#a71873',
    pink9: '#d6409f',
    pink10: '#e34ba9',
    pink11: '#f65cb6',
    pink12: '#feebf7',
    slate1: '#151718',
    //slate2: '#1a1d1e',
    slate2:'#101010',
    //slate3: '#202425',
    slate3:'#252525',
    slate4: '#26292b',
    slate5: '#2b2f31',
    slate6: '#313538',
    //slate7: '#3a3f42',
    slate7: '#313131',
    slate8: '#4c5155',
    slate9: '#697177',
    slate10: '#787f85',
    slate11: '#9ba1a6',
    slate12: '#ecedee',


};


const DefaultTheme = {
    dark: false,
    colors: LightColors,
    ...BaseTheme(LightColors),

};

const DarkTheme = {
    dark: true,
    colors: DarkColors,
    ...BaseTheme(DarkColors),
};

export {
    DefaultTheme,
    DarkTheme,
};