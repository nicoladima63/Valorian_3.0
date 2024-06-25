import React from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView, StatusBar, TouchableOpacity, Image, TextInput, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const StyleComponent = () => {
    const logo = require("../assets/images/logo.png")


    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="light-content" // Stile delle icone (può essere 'default', 'light-content', 'dark-content')
                backgroundColor={colors.slate0} // Colore di sfondo della Status Bar (solo Android)
            />
            <View style={[styles.header, styles.bbs6]}>
                <Image source={logo} style={styles.logo} resizeMode='contain' />
                <Text style={styles.headerTitle}>header</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.textArticle}>content</Text>

                    <View style={styles.body}>
                    <Text style={styles.textArticle}>body</Text>


                        <View style={styles.article}>
                            <Text style={styles.textArticle}>article default</Text>
                        </View>
                        <View style={styles.articleSuccess}>
                            <Text style={styles.textSuccess}>article success</Text>
                        </View>
                        <View style={styles.articleInfo}>
                            <Text style={styles.textInfo}>article info</Text>
                        </View>
                        <View style={styles.articleDanger}>
                            <Text style={styles.textDanger}>article danger</Text>
                        </View>
                        <View style={styles.articleWarning}>
                            <Text style={styles.textWarning}>article warning</Text>
                        </View>

                        <View style={styles.articleTop}>
                            <Text>articleTop</Text>
                        </View>
                        <View style={styles.articleMiddle}>
                            <Text style={styles.articleText}>articleMiddle</Text>
                        </View>
                        <View style={styles.articleBottom}>
                            <Text style={styles.articleText}>articleBottom</Text>
                        </View>

                        <Text style={styles.contentTitle}>contentTitle</Text>

                        <View style={styles.articleTop}>
                            <Text style={styles.articleTitle}>articleTitle:</Text>
                            <View style={styles.contentArticle}>
                                <View style={styles.checkTextContainer}>
                                    <Icon name="check" size={18} color="#aaaaaa" style={styles.checkIcon} />
                                    <Text style={styles.articleText}>contentArticle articleText</Text>
                                </View>
                                <Icon name="angle-right" size={24} color="#E3E3E3" style={styles.angleRightIcon} />
                            </View>
                            <View style={styles.contentArticle}>
                                <View style={styles.checkTextContainer}>
                                    <Icon name="check" size={18} color="#2ECC71" style={styles.checkIcon} />
                                    <Text style={styles.articleText}>contentArticle articleText</Text>
                                </View>
                                <Icon name="angle-right" size={24} color="#E3E3E3" style={styles.angleRightIcon} />
                            </View>
                        </View>

                        <View style={styles.articleMiddle}>
                            <Text style={styles.articleText}>questo può servire dove serve...</Text>
                        </View>

                        <View style={styles.articleBottom}>
                            <View style={styles.checkTextContainer}>
                                <Icon name="info-circle" size={18} color="#2ECC71" style={styles.checkIcon} />
                                <Text style={styles.articleText}>tocca per soddisfare. la freccia per modificare</Text>
                            </View>

                        </View>


                        <Text style={[styles.contentTitle]}>contentTitle</Text>
                        <View style={styles.article}>
                            <View style={styles.contentArticleSquareContainer}>
                                <View style={styles.contentArticleSquare}>
                                </View>
                                <View style={styles.contentArticleSquare}>
                                </View>
                                <View style={styles.contentArticleSquare}>
                                </View>
                                <View style={styles.contentArticleSquare}>
                                </View>
                                <View style={styles.contentArticleSquare}>
                                </View>
                                <View style={styles.contentArticleSquare}>
                                </View>
                                <View style={styles.contentArticleSquare}>
                                </View>
                                <View style={styles.contentArticleSquare}>
                                </View>
                            </View>
                        </View>
                        <Text style={[styles.contentTitle]}>contentTitle</Text>

                        <View style={styles.article}>
                            <Text style={styles.articleTitle}>articleTitle</Text>
                            <Text style={[styles.articleText, styles.link]}>articleText color.link</Text>
                        </View>
                        <Text style={[styles.contentTitle]}>contentTitle</Text>

                        <View style={styles.article}>
                            <Text style={styles.articleTitle}>articleTitle</Text>
                            <Text style={styles.articleText}>nicoladimartino@gmail.com</Text>
                        </View>

                        <Text style={[styles.contentTitle]}>contentTitle</Text>
                        <View style={styles.article}>
                            <Text style={styles.articleTitle}>articleTitle</Text>
                            <Text style={[styles.articleText, styles.link]}>nicoladimartino@gmail.com</Text>
                        </View>

                        <Text style={[styles.contentTitle]}>Login Form</Text>
                        <View style={styles.article}>
                            <Text style={styles.articleText}>Email</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="password"

                            //onChangeText={onChangeText}
                            //value={123}
                            />
                            <Text style={styles.articleText}>Password</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="password"

                            //onChangeText={onChangeText}
                            //value={123}
                            />
                        </View>
                        <Text style={[styles.contentTitle]}>contentTitle ultimo</Text>

                        <View style={styles.article}>
                            <TextInput
                                style={styles.input}
                                //onChangeText={onChangeNumber}
                                value={8}
                                placeholder="useless placeholder"
                                keyboardType="numeric"
                            />
                        </View>

                        <Text style={[styles.contentTitle]}>contentTitle</Text>
                        <View style={styles.article}>
                            <Text style={styles.articleTitle}>articleTitle</Text>
                            <Text style={[styles.articleText, styles.link]}>nicoladimartino@gmail.com</Text>
                        </View>

                        <Text style={[styles.contentTitle]}>contentTitle</Text>
                        <View style={styles.article}>
                            <Text style={styles.articleTitle}>articleTitle</Text>
                            <Text style={[styles.articleText, styles.link]}>nicoladimartino@gmail.com</Text>
                        </View>

                        <View style={styles.contentPadding}></View>

                    </View>
                <View style={styles.bodyFooter}>
                    <TouchableOpacity style={styles.buttonCancel}>
                        <Text style={styles.buttonText}>Annulla</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonDelete}>
                        <Text style={styles.buttonText}>Elimina</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonOK}>
                        <Text style={styles.buttonText}>OK</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonSave}>
                        <Text style={styles.buttonText}>Salva</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.footer} >
                <View style={styles.iconContainer}>
                    <Icon name="home" size={24} color="#D8BFD8" />
                    <Icon name="cog" size={24} color="#D8BFD8" />
                </View>
            </View>
        </View>
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
        height:50,
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
        backgroundColor: colors.slate9,
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.slate6,
        marginBottom: 10,
    },
    articleSuccess: {
        backgroundColor: colors.green3,
        padding: 14,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.green7,
        marginBottom: 10,
    },
    articleDanger: {
        backgroundColor: colors.red3,
        padding: 14,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.red7,
        marginBottom: 10,
    },
    articleInfo: {
        backgroundColor: colors.blue3,
        padding: 14,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.blue7,
        marginBottom: 10,
    },
    articleWarning: {
        backgroundColor: colors.yellow3,
        padding: 14,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.yellow7,
        marginBottom: 10,
    },
    articleTop: {
        backgroundColor: colors.slate4,
        padding: 14,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderWidth: 1,
        borderColor: colors.slate7,
    },
    articleMiddle: {
        backgroundColor: colors.slate4,
        padding: 14,
        borderRadius: 0,
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: colors.slate7,
    },
    articleBottom: {
        backgroundColor: colors.slate4,
        padding: 14,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: colors.slate7,
    },
    //text
    textArticle: {
        color: colors.slate12,
    },
    textSuccess: {
        color: colors.green10,
    },
    textDanger: {
        color: colors.red10,
    },
    textWarning: {
        color: colors.yellow10,
    },
    textInfo: {
        color: colors.blue10,
    },


    //border
    bbs6: {
        borderBottomWidth: 1,
        borderBottomColor: colors.slate6
    },
    //logo
    logoImage: {
        width: 100,
        height: 100,
    },
    logoImageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    logo: {
        width: 28,
        height: 28,
        marginRight: 20,
    },

    //header
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.slate12,
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
    contentPadding: {
        height: 100, // Aggiungi uno spazio extra in fondo al contenuto
    },
    contentParagraph: {
        marginTop: 8,
        color: colors.onBackground,
        flexDirection: 'column',
        fonstSize: 14,
    },

    //body
    articleTitle: {
        fontSize: 16,
        color: colors.background,
        marginBottom: 10
    },
    articleText: {
        color: colors.onBackground,
    },
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
    errorText: {
        color: colors.onError,
        fontSize: 12,
        marginTop: 5,
        marginLeft: 10,
    },
    link: {
        color: colors.link,
    },
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
    fwb: { fontWeight: 'bold' },
    fs20: { fontSize: 20 },

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
    button: {
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
    //expo
    backgroundDefault: colors.slate1,
    backgroundScreen: '#0c0d0e',
    backgroundSubtle: colors.slate2,
    backgroundElement: colors.slate3,
    backgroundHover: colors.slate4,
    backgroundSelected: colors.slate5,
    backgroundOverlay: colors.slate2,
    backgroundSuccess: colors.green3,
    backgroundWarning: colors.yellow3,
    backgroundDanger: colors.red3,
    backgroundInfo: colors.blue3,
    iconDefault: colors.slate11,
    iconSecondary: colors.slate10,
    iconTertiary: colors.slate9,
    iconQuaternary: colors.slate8,
    iconSuccess: colors.green10,
    iconWarning: colors.yellow11,
    iconDanger: colors.red10,
    iconInfo: colors.blue10,
    textDefault: colors.slate12,
    textSecondary: colors.slate11,
    textTertiary: colors.slate10,
    textQuaternary: colors.slate9,
    textLink: colors.blue11,
    textSuccess: colors.green11,
    textWarning: colors.yellow11,
    textDanger: colors.red11,
    textInfo: colors.blue11,
    borderDefault: colors.slate7,
    borderSecondary: colors.slate6,
    borderSuccess: colors.green7,
    borderWarning: colors.yellow7,
    borderDanger: colors.red7,
    borderInfo: colors.blue7,
    buttonPrimaryBackground: colors.blue8,
    buttonPrimaryBorder: colors.blue8,
    buttonPrimaryHover: colors.blue7,
    buttonPrimaryIcon: colors.blue12,
    buttonPrimaryText: colors.white,
    buttonPrimaryDisabledBackground: colors.blue7,
    buttonPrimaryDisabledBorder: colors.blue7,
    buttonPrimaryDisabledText: colors.slate11,
    buttonSecondaryBackground: colors.slate3,
    buttonSecondaryBorder: colors.slate8,
    buttonSecondaryHover: colors.slate4,
    buttonSecondaryIcon: colors.slate12,
    buttonSecondaryText: colors.white,
    buttonSecondaryDisabledBackground: colors.slate1,
    buttonSecondaryDisabledBorder: colors.slate7,
    buttonSecondaryDisabledText: colors.slate11,
    buttonTertiaryBackground: colors.transparent,
    buttonTertiaryBorder: colors.transparent,
    buttonTertiaryHover: colors.blue4,
    buttonTertiaryIcon: colors.blue10,
    buttonTertiaryText: colors.blue11,
    buttonTertiaryDisabledBackground: colors.transparent,
    buttonTertiaryDisabledBorder: colors.transparent,
    buttonTertiaryDisabledText: colors.blue9,
    buttonQuaternaryBackground: colors.transparent,
    buttonQuaternaryBorder: colors.transparent,
    buttonQuaternaryHover: colors.slate4,
    buttonQuaternaryIcon: colors.slate12,
    buttonQuaternaryText: colors.white,
    buttonQuaternaryDisabledBackground: colors.transparent,
    buttonQuaternaryDisabledBorder: colors.transparent,
    buttonQuaternaryDisabledText: colors.slate11,
    buttonPrimaryDestructiveBackground: colors.red8,
    buttonPrimaryDestructiveBorder: colors.red8,
    buttonPrimaryDestructiveHover: colors.red7,
    buttonPrimaryDestructiveIcon: colors.red12,
    buttonPrimaryDestructiveText: colors.white,
    buttonPrimaryDestructiveDisabledBackground: colors.red6,
    buttonPrimaryDestructiveDisabledBorder: colors.red6,
    buttonPrimaryDestructiveDisabledText: colors.red12,
    buttonSecondaryDestructiveBackground: colors.red3,
    buttonSecondaryDestructiveBorder: colors.red7,
    buttonSecondaryDestructiveHover: colors.red2,
    buttonSecondaryDestructiveIcon: colors.red9,
    buttonSecondaryDestructiveText: colors.red11,
    buttonSecondaryDestructiveDisabledBackground: colors.red2,
    buttonSecondaryDestructiveDisabledBorder: colors.red6,
    buttonSecondaryDestructiveDisabledText: colors.red10,

});

export default StyleComponent;
