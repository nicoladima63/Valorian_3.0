import React from 'react';
import { View, StyleSheet, Text, ScrollView, StatusBar, TouchableOpacity, Image, TextInput, Pressable, Switch, PixelRatio } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RadioButton } from 'react-native-paper';
import { useTheme } from '../context/ThemeContext';
import ColorsBarComponent from '../components/ColorBarsComponent'
import { RFValue } from "react-native-responsive-fontsize";
import { OnePress, TwoPress, ThreePress } from '../components/Pressables';
import FlexibleView from '../components/FlexibleComponent';
import { MaterialIcons } from '@expo/vector-icons'; // Puoi cambiare la libreria di icone se preferisci

const WelcomeTest = () => {
    const logo = require("../assets/images/logo.png")
    const { theme } = useTheme();
    const fontSizeScaler = (size) => size * PixelRatio.getFontScale();


    return (
        <View style={theme.container}>
            <StatusBar
                barStyle="light-content" // Stile delle icone (può essere 'default', 'light-content', 'dark-content')
                backgroundColor={colors.slate0} // Colore di sfondo della Status Bar (solo Android)
            />
            <View style={[theme.header, theme.bbs6]}>
                <Image source={logo} style={theme.logo} resizeMode='contain' />
                <Text style={theme.h5}>header</Text>
            </View>
            <View style={theme.content}>
                <Text style={theme.text}>content</Text>

                <View style={theme.body}>


                    <ScrollView>
                        <Text style={[theme.text, theme.h1, theme.fwb]}> Title h1</Text>
                        <Text style={[theme.text, theme.h2, theme.fwb]}> Title h2</Text>
                        <Text style={[theme.text, theme.h3, theme.fwb]}> Title h3</Text>
                        <Text style={[theme.text, theme.h4, theme.fwb]}> Title h4</Text>
                        <Text style={[theme.text, theme.h5, theme.fwb]}> Title h5</Text>
                        <Text style={[theme.text, theme.h6, theme.fwb]}> Title h6</Text>




                        <View style={[theme.article]}>
                            <Text style={theme.text}>esempio 1 2 3 pressable</Text>
                            <View style={theme.article}>
                                <OnePress title="Single" onPress={() => alert('Single Pressed')} />
                                <TwoPress
                                    titles={['First', 'Second']}
                                    onPresses={[() => alert('First Pressed'), () => alert('Second Pressed')]}
                                />
                                <ThreePress
                                    titles={['First', 'Second', 'Third']}
                                    onPresses={[
                                        () => alert('First Pressed'),
                                        () => alert('Second Pressed'),
                                        () => alert('Third Pressed'),
                                    ]}
                                />

                            </View>
                            <View style={theme.article}>
                                <FlexibleView
                                    format="testoTesto"
                                    text={<Text style={[theme.h4, theme.fwb]}>I tuoi bisogni</Text>}
                                    textR={<Text style={[theme.h5, { color: theme.colors.green10 }]}>Aiuto</Text>}
                                    onPressRightIcon={() => navigation.navigate('HelpHome')}
                                />
                            </View>
                            <View style={theme.article}>
                                <FlexibleView
                                    format="iconaTesto"
                                    leftIcon={<MaterialIcons name="info-outline" size={22} color={theme.colors.green11} />}
                                    text={<Text style={[theme.text, theme.ml20]}>Clicca su un bisogno per soddisfarlo</Text>}
                                />
                            </View>
                            <View style={theme.article}>
                                <FlexibleView
                                    format="testoIcona"
                                    rightIcon={<MaterialIcons name="arrow-right" size={24} color={theme.colors.green11} />}
                                    text="vai alle impostazioni"
                                    onPressRightIcon={() => alert('Home Pressed')}
                                />
                            </View>
                            <View style={theme.article}>
                                <FlexibleView
                                    format="iconaTestoIcona"
                                    leftIcon={<MaterialIcons name="info-outline" size={22} color={theme.colors.green11} />}
                                    text={<Text style={[theme.text, theme.ml20]}>Clicca su un bisogno per soddisfarlo</Text>}
                                    rightIcon={<MaterialIcons name="arrow-right" size={24} color={theme.colors.green11} />}
                                    onPressLeftIcon={() => alert('Menu Pressed')}
                                    onPressRightIcon={() => alert('Settings Pressed')}
                                />

                            </View>
                            <View style={theme.article}>
                                <FlexibleView
                                    format="iconaTestoIcona"
                                    leftIcon={<MaterialIcons name="account-circle" size={22} color={theme.colors.slate11} />}
                                    text={<Text style={[theme.text, theme.ml20]}>Account</Text>}
                                    rightIcon={<MaterialIcons name="arrow-right" size={24} color={theme.colors.slate11} />}
                                    onPressLeftIcon={() => alert('Menu Pressed')}
                                    onPressRightIcon={() => alert('Settings Pressed')}
                                />
                                <View style={[theme.article, theme.articleSuccess, theme.br20, theme.mt10]}>
                                    <Text style={[theme.text, theme.h5, theme.fwb, theme.textSuccess]}> email verificata</Text>
                                </View>
                            </View>
                        </View>





                        <View style={[theme.article, theme.articleDefault]}>
                            <Text style={theme.text}>text article default</Text>
                        </View>
                        <View style={[theme.article, theme.articleSuccess]}>
                            <Text style={[theme.text, theme.h5, theme.fwb, theme.textSuccess]}> Title h5</Text>
                            <Text style={theme.textSuccess}>text article success</Text>
                        </View>
                        <View style={[theme.article, theme.articleInfo]}>
                            <Text style={[theme.text, theme.h3, theme.fwb, theme.textInfo]}> Title h3</Text>
                            <Text style={[theme.textInfo]}>text article Info</Text>
                        </View>
                        <View style={[theme.article, theme.articleDanger]}>
                            <Text style={[theme.text, theme.h4, theme.fwb, theme.textDanger]}> Title h4</Text>
                            <Text style={theme.textDanger}>text article danger</Text>
                        </View>
                        <View style={[theme.article, theme.articleWarning]}>
                            <Text style={[theme.text, theme.h6, theme.fwb, theme.textWarning]}> Title h6</Text>
                            <Text style={theme.textWarning}>text article warning</Text>
                        </View>

                        <View style={[theme.article, theme.articleTop]}>
                            <Text style={theme.text}>articleTop</Text>
                        </View>
                        <View style={[theme.article, theme.articleMiddle]}>
                            <View style={[theme.grid, theme.overflowHidden]}>
                                <View style={[theme.grid, theme.overflowHidden]}>
                                    <View style={theme.gap2}>
                                        <Icon name="folder" size={24} color="#D8BFD8" />
                                    </View>
                                    <View style={theme.gap2}>
                                        <Text style={theme.h5}>articleTitle con icona</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={theme.gap2}>
                                <Text style={theme.text}>primo rigo di testo</Text>
                            </View>
                            <View style={theme.gap2}>
                                <Text style={theme.text}>secondo rigo di testo</Text>
                            </View>
                            <View style={theme.gap2}>
                                <Text style={theme.text}>terzo rigo di testo</Text>
                            </View>
                        </View>
                        <View style={[theme.article, theme.articleMiddle]}>
                            <View style={[theme.grid, theme.overflowHidden]}>
                                <View style={theme.gap1}>
                                    <Text style={theme.articleTitle}>articleTitle</Text>
                                </View>
                            </View>

                            <View style={theme.gap2}>
                                <Text style={theme.text}>primo rigo di testo</Text>
                            </View>
                            <View style={theme.gap2}>
                                <Text style={theme.text}>secondo rigo di testo</Text>
                            </View>
                            <View style={theme.gap2}>
                                <Text style={theme.text}>terzo rigo di testo</Text>
                            </View>
                        </View>
                        <View style={[theme.article, theme.articleBottom]}>
                            <Text style={theme.text}>articleBottom</Text>
                        </View>


                        <Text style={[theme.contentTitle]}>emai verificata</Text>
                        <View style={theme.article}>
                            <Text style={theme.h5}>articleTitle</Text>
                            <Text style={[theme.articleText, theme.link]}>nicoladimartino@gmail.com</Text>
                        </View>



                        <View style={theme.article}>
                            <View style={[theme.grid, theme.overflowHidden]}>
                                <View style={[theme.grid, theme.overflowHidden]}>
                                    <View style={[theme.gap2, theme.mb20]}>
                                        <Icon name="cog" size={24} color="#D8BFD8" />
                                    </View>
                                    <View style={theme.gap2}>
                                        <Text style={[theme.text, theme.h3, theme.fwb]}> Impostazioni h3</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={[theme.article]}>
                                <Text style={[theme.text, theme.h5, theme.fwb]}>Account</Text>
                                <View style={theme.article}>
                                    <View style={theme.grid}>
                                        <Icon name="user" size={24} color="#D8BFD8" />
                                        <TouchableOpacity style={[theme.grid, theme.TouchablebuttonPrimary, theme.br6, { justifyContent: 'space-evenly' }]}>
                                            <View>
                                                <Text style={theme.h5}>vai</Text>
                                            </View>
                                            <View style={[theme.gap2]}>
                                                <Icon name="arrow-right" size={16} color="#D8BFD8" />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={[theme.article, theme.articleSuccess, theme.br20, theme.mt10]}>
                                        <Text style={[theme.text, theme.h5, theme.fwb, theme.textSuccess]}> email verificata</Text>
                                    </View>

                                </View>

                            </View>
                            <View style={[theme.article]}>
                                <Text style={[theme.text, theme.h5, theme.fwb]}>Scelta del Tema</Text>
                                <RadioButton.Group >
                                    <View style={[theme.article, theme.articleTop]}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Icon name="adjust" size={20} color={colors.slate12} style={{ marginRight: 20 }} />
                                                <Text style={theme.text}>Automatico</Text>
                                            </View>
                                            <RadioButton value="auto" />
                                        </View>

                                    </View>

                                    <View style={[theme.article, theme.articleMiddle]}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Icon name="sun-o" size={20} color={colors.slate12} style={{ marginRight: 20 }} />
                                                <Text style={theme.text}>Chiaro</Text>
                                            </View>
                                            <RadioButton value="light" color={colors.slate12} />
                                        </View>
                                    </View>
                                    <View style={[theme.article, theme.articleBottom]}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Icon name="moon-o" size={20} color={colors.slate12} style={{ marginRight: 20 }} />
                                                <Text style={theme.text}>Scuro</Text>
                                            </View>
                                            <RadioButton value="dark" />
                                        </View>
                                    </View>
                                </RadioButton.Group>
                            </View>

                            {/*{ //loginform*/}
                            <View style={theme.article}>
                                <View style={theme.column}>
                                    <Image source={logo} style={[theme.logoImage60, theme.mb20]} resizeMode='contain' />
                                    <Text style={[theme.text, theme.h5, theme.fwb, theme.mb20]}>Form di accesso</Text>
                                </View>

                                <View style={[theme.article, theme.articleTop]}>
                                    <Text style={[theme.text, theme.mb10]}>Email</Text>
                                    <View style={[theme.article, theme.articleDefault]}>
                                        <TextInput
                                            style={theme.text}
                                            placeholder="la tue email"
                                            placeholderTextColor={colors.slate9}
                                        //onChangeText={onChangeText}
                                        //value={123}
                                        />
                                    </View>
                                    <Text style={theme.textDanger}>indirizzo obbligatorio</Text>


                                </View>

                                <View style={[theme.article, theme.articleMiddle]}>
                                    <Text style={[theme.text, theme.mb10]}>Password</Text>
                                    <View style={[theme.article, theme.articleDefault]}>

                                        <TextInput
                                            style={theme.text}
                                            placeholder="la tua password"
                                            placeholderTextColor={colors.slate9}
                                        //onChangeText={onChangeText}
                                        //value={123}
                                        />
                                    </View>
                                    <Text style={theme.textDanger}>password obbligatoria</Text>
                                </View>

                                <View style={[theme.article, theme.articleMiddle, theme.grid]}>
                                    <View style={theme.Loginswitch}>
                                        <Switch value={''} onValueChange={''} trackColor={{ true: "green", false: "gray" }} />
                                        <Text style={theme.text}>Ricordami</Text>
                                    </View>

                                    <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
                                        <Text style={[theme.link, theme.alignRight]}>Password dimenticata?</Text>
                                    </Pressable>
                                </View>

                                <View style={[theme.article, theme.articleMiddle,]}>
                                    <TouchableOpacity style={[theme.grid, theme.TouchablebuttonPrimary, theme.br6, { justifyContent: 'space-evenly' }]}>
                                        <View>
                                            <Text style={theme.h5}>Accedi</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                <View style={[theme.article, theme.articleMiddle, theme.grid]}>
                                    <Text style={[theme.text, theme.mt20]}>Non hai un Account?</Text>
                                    <Pressable onPress={() => navigation.navigate('Register')}>
                                        <Text style={[theme.link, theme.alignRight]}>  Registrati</Text>
                                    </Pressable>
                                </View>

                                <View style={[theme.article, theme.articleBottom]}>


                                </View>
                            </View>


                        </View>

                        <View style={theme.article}>
                            <View style={[theme.article, theme.articleTop]}>

                            </View>
                            <View style={[theme.article, theme.articleMiddle]}>

                            </View>
                            <View style={[theme.article, theme.articleBottom]}>

                            </View>
                        </View>

                        <ColorsBarComponent></ColorsBarComponent>


                    </ScrollView>

                    <View>
                        <Text>Main Content</Text>
                        <Text style={{ fontSize: RFValue(16) }}>
                            Testo RFValue(16)
                        </Text>
                        <Text style={{ fontSize: fontSizeScaler(16) }}>
                            Testo fontSizeScaler(16)
                        </Text>
                    </View>
                </View>
            </View >



            <View style={theme.bodyFooter}>
                <TouchableOpacity style={theme.buttonCancel}>
                    <Text style={theme.buttonText}>Annulla</Text>
                </TouchableOpacity>
                <TouchableOpacity style={theme.buttonDelete}>
                    <Text style={theme.buttonText}>Elimina</Text>
                </TouchableOpacity>
                <TouchableOpacity style={theme.buttonOK}>
                    <Text style={theme.buttonText}>OK</Text>
                </TouchableOpacity>
                <TouchableOpacity style={theme.buttonSave}>
                    <Text style={theme.buttonText}>Salva</Text>
                </TouchableOpacity>
            </View>






            <View style={theme.footer} >
                <View style={theme.iconContainer}>
                    <Icon name="home" size={24} color="#D8BFD8" />
                    <Icon name="cog" size={24} color="#D8BFD8" />
                </View>
            </View>
        </View >

    );
};

const colors = {
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
    slate0: '#0c0d0e',
    slate1: '#151718',
    slate2: '#1a1d1e',
    slate3: '#202425',
    slate4: '#26292b',
    slate5: '#2b2f31',
    slate6: '#313538',
    slate7: '#3a3f42',
    slate8: '#4c5155',
    slate9: '#697177',
    slate10: '#787f85',
    slate11: '#9ba1a6',
    slate12: '#ecedee',

}
const borderRadius = { br2: 2, br4: 4, br6: 6, br8: 8, br12: 12, br16: 16, br20: 20, };
const br2 = borderRadius.br2;
const br4 = borderRadius.br4;
const br6 = borderRadius.br6;
const br8 = borderRadius.br8;
const br10 = borderRadius.br10;
const br12 = borderRadius.br12;
const br16 = borderRadius.br16;
const br20 = borderRadius.br20;

const fontSize = { xxsmall: 10, xsmall: 12, small: 14, medium: 16, large: 18, xlarge: 20, xxlarge: 24, };
const fxxSmall = fontSize.xxsmall;
const fxSmall = fontSize.xsmall;
const fSmall = fontSize.small;
const fMedium = fontSize.medium;
const fLarge = fontSize.large;
const fxLarge = fontSize.xlarge;
const fxxLarge = fontSize.xxlarge;

const fontWeight = { light: 300, regular: 400, medium: 500, semiBold: 600, bold: 700, extraBold: 800, black: 900, };
const fwLight = fontWeight.light;
const fwRegular = fontWeight.regular;
const fwMedium = fontWeight.medium;
const fwSemiBold = fontWeight.semiBold;
const fwBold = fontWeight.bold;
const fwExtraBold = fontWeight.extraBold;
const fwBlack = fontWeight.black;

const margin = { m2: 2, m4: 4, m8: 8, m16: 16, m24: 24, m32: 32, m40: 40, };
const m2 = margin.m2;
const m4 = margin.m4;
const m8 = margin.m8;
const m16 = margin.m16;
const m24 = margin.m24;
const m32 = margin.m32;
const m40 = margin.m40;

const padding = { p2: 2, p4: 4, p8: 8, p16: 16, p20: 20, p24: 24, p32: 32, p40: 40, };
const p2 = padding.p2;
const p4 = padding.p4;
const p8 = padding.p8;
const p16 = padding.p16;
const p20 = padding.p20;
const p24 = padding.p24;
const p32 = padding.p32;
const p40 = padding.p40;

const gap = { gap2: 2, gap4: 4, gap8: 8, gap16: 16, gap24: 24, gap32: 32, gap40: 40, };
const g2 = gap.gap2;
const g4 = gap.gap4;
const g8 = gap.gap8;
const g16 = gap.gap16;
const g24 = gap.gap24;
const g32 = gap.gap32;
const g40 = gap.gap40;

const lineHeight = { lh1: 1.2, lh2: 1.4, lh3: 1.6, lh4: 1.8, lh5: 2.0, };
const lh1 = lineHeight.lh1;
const lh2 = lineHeight.lh2;
const lh3 = lineHeight.lh3;
const lh4 = lineHeight.lh4;
const lh5 = lineHeight.lh5;


const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: colors.slate0,
    },

    //page component
    container: {
        flex: 1,
        backgroundColor: colors.slate0,
        padding: 0,

    },
    header: {
        height: 50,
        backgroundColor: colors.slate2,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.slate1,
        //    paddingHorizontal: 10,
    },
    body: {
        flex: 1,
        backgroundColor: colors.slate0,
        position: 'relative',
        paddingHorizontal: 20,
    },
    article: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: br8,
        borderWidth: 1,
        marginBottom: 0,
        backgroundColor: colors.slate1,
        borderColor: colors.slate7,
    },
    articleDefault: {
        backgroundColor: colors.slate3,
        borderColor: colors.slate10,
        paddingVertical: 8,
        paddingHorizontal: 14,

    },
    articleSuccess: {
        backgroundColor: colors.green3,
        borderColor: colors.green8,
    },
    articleDanger: {
        backgroundColor: colors.red3,
        borderColor: colors.red8,
    },
    articleInfo: {
        backgroundColor: colors.blue3,
        borderColor: colors.blue8,
    },
    articleWarning: {
        backgroundColor: colors.yellow3,
        borderColor: colors.yellow7,
    },
    articleTop: {
        borderTopLeftRadius: br8,
        borderTopRightRadius: br8,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderColor: colors.slate7,
    },
    articleMiddle: {
        borderRadius: 0,
        borderTopWidth: 0,
        borderColor: colors.slate7,
    },
    articleBottom: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: br8,
        borderBottomRightRadius: br8,
        borderTopWidth: 0,
        borderColor: colors.slate7,
    },

    // tag H
    h1: { fontSize: 24, color: colors.slate12 },
    h2: { fontSize: 22, color: colors.slate12 },
    h3: { fontSize: 20, color: colors.slate12 },
    h4: { fontSize: 18, color: colors.slate12 },
    h5: { fontSize: 16, color: colors.slate12 },
    h6: { fontSize: 14, color: colors.slate12 },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.slate12,
    },

    //font
    fwb: { fontWeight: 'bold', },

    //text
    text: { color: colors.slate12, },
    text10: { fontSize: 10, },
    text12: { fontSize: 12, },
    text14: { fontSize: 14, },
    text16: { fontSize: 16, },
    text18: { fontSize: 18, },
    text20: { fontSize: 20, },
    textArticle: { color: colors.slate12, },
    textSuccess: { color: colors.green11, },
    textDanger: { color: colors.red11, },
    textWarning: { color: colors.yellow10, },
    textInfo: { color: colors.blue11, },
    textSecondary: { color: colors.slate11, },
    textTertiary: { color: colors.slate10, },
    textQuaternary: { color: colors.slate9, },
    textLink: { color: colors.blue11, },


    contentParagraph: {
        marginTop: 8,
        color: colors.onBackground,
        flexDirection: 'column',
        fonstSize: 14,
    },
    //svarioni
    mt10: { marginTop: 10 },
    mb10: { marginBottom: 10 },
    ml10: { marginLeft: 10 },
    mr10: { marginRight: 10 },
    ml40: { marginLeft: 40 },
    mr40: { marginRight: 40 },
    mt20: { marginTop: 20 },
    mb20: { marginBottom: 20 },
    ml20: { marginLeft: 20 },
    mr20: { marginRight: 20 },
    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: 'stretch',
    },
    overflowHidden: { overflow: 'hidden', },
    grid: {
        flexDirection: 'row', // Puoi cambiare in 'column' per una griglia verticale
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    column: {
        flexDirection: 'column', // Puoi cambiare in 'column' per una griglia verticale
        alignItems: 'center',
        justifyContent: 'center',

    },
    contentPadding: {
        height: 100, // Aggiungi uno spazio extra in fondo al contenuto
    },
    center: { alignItems: 'center', justifyContent: 'center', },
    alignRight: { alignSelf: 'flex-end', },
    alignLeft: { alignSelf: 'flex-start', },
    //border
    br0: { borderRadius: 0 },
    br2: { borderRadius: br2 },
    br4: { borderRadius: br4 },
    br6: { borderRadius: br6 },
    br8: { borderRadius: br8 },
    br10: { borderRadius: br10 },
    br16: { borderRadius: br16 },
    br20: { borderRadius: br20 },
    //padding
    p2: { padding: p2 },
    p4: { padding: p4 },
    p8: { padding: p8 },
    p16: { padding: p16 },
    p20: { padding: p20 },
    p24: { padding: p24 },
    p32: { padding: p32 },
    p40: { padding: p40 },
    pv2: { paddingVertical: p2 },
    ph2: { paddingHorizontal: p2 },
    //logo
    logo: { width: 28, height: 28, },
    logoImage100: { width: 100, height: 100, },
    logoImage80: { width: 80, height: 80, },
    logoImage60: { width: 100, height: 60, },
    logoImage40: { width: 100, height: 40, },
    logoImageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20,
    },

    //content
    contentTitle: {
        fontSize: 16,
        marginLeft: 12,
        color: colors.onBackground,
        marginBottom: 8,
        marginTop: 20,
    },
    contentArticle: {
        backgroundColor: colors.contentArticle,
        //margin: 0,
        //padding: 8,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: colors.border,
        minHeight: 40,
        //marginTop: 4,
        flexDirection: 'row', // Dispone gli elementi in fila
        alignItems: 'center', // Centra gli elementi verticalmente
        justifyContent: 'space-between', // Spazio tra gli elementi
    },


    contentArticle2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        //padding: 8,
        backgroundColor: colors.contentArticle,
        marginVertical: 2,
        borderRadius: 8,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: colors.border,

    },
    leftContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    centerContainer: {
        flex: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rightContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderLeftWidth: 1,
        borderColor: colors.border,

    },
    iconContainer: {
        width: 40, // Imposta la dimensione del quadrato
        height: 40, // Imposta la dimensione del quadrato
        alignItems: 'center',
        justifyContent: 'center',
    },

    //border



    contentArticleSquareContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    contentArticleSquare: {
        backgroundColor: colors.contentBox,
        marginVertical: 4,
        padding: 12,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: colors.border,
        height: 80,
        width: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 4
    },
    checkTextContainer: {
        flexDirection: 'row',
    },
    checkIcon: {
        marginRight: 20, // Spazio tra l'icona check e il testo
    },
    articleText: {
        color: colors.onBackground,
        marginRight: 20, // Spazio tra il testo e l'icona angle-right
    },
    angleRightIcon: {
        width: 44,
    },


    //body
    bodyFooter: {
        backgroundColor: colors.background,
        margin: 0,
        padding: 10,
        borderRadius: 4,
        //borderWidth: 1,
        borderColor: colors.border,
        position: 'absolute', // Mantieni posizione assoluta
        bottom: 10, // Mantieni in fondo al contenitore
        left: 0,  // Allinea a sinistra
        right: 0, // Allinea a destra
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    footer: {
        flex: 0.1,
        backgroundColor: colors.background,
        justifyContent: 'center',

    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 12,
    },
    image: {
        height: 160,
        width: 170,
    },

    //text vari e tipografici
    link: {
        color: colors.blue11,
    },


    // FAB
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: colors.primary,
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    fabText: {
        color: colors.onPrimary,
        fontSize: 24,
    },

    // BUTTON

    TouchablebuttonPrimary: {
        alignItems: 'center',
        backgroundColor: colors.blue8,
        borderWidth: 1,
        borderColor: colors.blue8,
        paddingHorizontal: 20,
        paddingVertical: 6,
        borderRadius: borderRadius.small
    },
    buttonContainer1: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer2: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 40,
        position: 'absolute',
        bottom: 10,
        //width: '50%',
    },
    button2: {
        flex: 1,
        height: 45,
        backgroundColor: colors.primary,
        padding: 4,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonCancel: {
        flex: 1,
        height: 45,
        backgroundColor: colors.undo,
        padding: 10,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonSubmit: {
        flex: 1,
        height: 45,
        backgroundColor: colors.primary,
        padding: 10,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonOK: {
        backgroundColor: colors.primary,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginVertical: 10,
        width: 100,
    },
    buttonSave: {
        backgroundColor: colors.secondary,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginVertical: 10,
        width: 100,
    },
    buttonDelete: {
        backgroundColor: colors.error,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginVertical: 10,
        width: 100,
    },
    buttonUndo: {
        backgroundColor: colors.undo,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginVertical: 10,
        width: 100,
    },
    buttonText: {
        color: colors.onPrimary,
        textAlign: 'center',
        fontSize: 14,
        paddingVertical: 10,
    },

    // MODAL
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: colors.background,
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
        color: colors.onBackground,
    },
    closeButton: {
        padding: 10,
        backgroundColor: colors.primary,
        borderRadius: 5,
    },
    closeButtonText: {
        color: colors.onPrimary,
        fontWeight: 'bold',
    },
    infoIcon: {
        marginRight: 10,
    },
    checkIcon: {
        marginLeft: 10,
    },
    // TOPBAR
    topBarContainer: {},
    topBarTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.onBackground,
    },
    topBarIcon: {
        marginLeft: 20,
    },
    topBarAvatarContainer: {
        marginRight: 20,
    },
    topButtonContainer: {
        marginTop: 50,
        flexDirection: 'row',
        alignItems: 'center',
    },

    //input
    input1: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 5,
        padding: 10,
        flex: 1,
        marginRight: 10,
        color: colors.onBackground,
    },
    input2: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.border,
        padding: 10,
        color: colors.onBackground,

    },

    // LOGIN
    Logincontainer: {
        flex: 1,
        alignItems: "center",
        paddingTop: 20,
        backgroundColor: colors.background,
    },
    Loginimage: {
        height: 100,
        width: 100,
    },
    Logintitle: {
        fontSize: 22,
        fontWeight: "bold",
        textTransform: "uppercase",
        textAlign: "center",
        paddingVertical: 20,
        color: colors.primary,
    },
    LoginSubtitle: {
        fontSize: 20,
        fontWeight: "bold",
        textTransform: "uppercase",
        textAlign: "center",
        paddingVertical: 20,
        color: colors.secondary,
    },
    LogininputView: {
        width: "100%",
        paddingHorizontal: 40,
        marginBottom: 5,
        marginTop: 10,
        flex: 1,
    },
    Logininput: {
        height: 50,
        paddingHorizontal: 20,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: 7,
        color: colors.onBackground,
    },
    LoginrememberView: {
        width: "100%",
        paddingHorizontal: 50,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
        marginBottom: 8,
    },
    Loginswitch: {
        flexDirection: "row",
        gap: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    LoginrememberText: {
        fontSize: 13,
        color: colors.onBackground,
    },
    LoginforgetText: {
        fontSize: 11,
        color: colors.secondary,
    },
    Loginbutton: {
        backgroundColor: colors.primary,
        height: 45,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    LoginbuttonText: {
        color: colors.onPrimary,
        fontSize: 18,
        fontWeight: "bold",
    },
    LoginbuttonView: {
        flex: 1,
        width: "100%",
        paddingHorizontal: 50,
    },
    LoginoptionsText: {
        textAlign: "center",
        paddingVertical: 10,
        color: "gray",
        fontSize: 13,
        marginBottom: 6,
    },
    LoginmediaIcons: {
        flexDirection: "row",
        gap: 15,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 23,
    },
    Loginicons: {
        width: 40,
        height: 40,
    },
    LoginfooterText: {
        textAlign: "center",
        color: colors.primary,
    },
    Loginsignup: {
        color: colors.secondary,
        fontSize: 13,
    },


});

export default WelcomeTest;
