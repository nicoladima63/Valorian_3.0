import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { View, SafeAreaView, TouchableOpacity, StatusBar, Image, StyleSheet,Text } from 'react-native';
import TopBar from '../components/TopBar';

const Layout = ({ children, navigation, showTopBar,showBodyFooter, header, bodyFooter, leftSide, rightSide, footer, fab, fabAction }) => {

    const logo = require("../assets/images/logo.png")
    const { theme } = useTheme();

    return (
        <SafeAreaView style={[styles.safeAreaView, { backgroundColor: theme.colors.background }]}>
            <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
                <StatusBar
                    barStyle="light-content" // Stile delle icone (può essere 'default', 'light-content', 'dark-content')
                    backgroundColor="#0d1017" // Colore di sfondo della Status Bar (solo Android)
                />

                {header && (
                    <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
                        <Image source={logo} style={styles.logo} resizeMode='contain' />
                        <Text style={styles.headerTitle}>Valorian</Text>
                        {showTopBar && <TopBar navigation={navigation} />}
                    </View>
                )}

                    {/*{leftSide &&*/}
                    {/*    <View style={styles.leftSide}>*/}
                    {/*        {leftSide}*/}
                    {/*    </View>*/}
                    {/*}*/}

                    <View style={[styles.content, { backgroundColor: theme.colors.background }]}>
                        {children}
                    </View>

                    {bodyFooter && showBodyFooter &&
                        <View style={styles.bodyFooter}>
                            {bodyFooter}
                        </View>
                    }
                    {/*    {rightSide &&*/}
                    {/*        <View style={styles.rightSide}>*/}
                    {/*            {rightSide}*/}
                    {/*        </View>*/}
                    {/*    }*/}

                {footer && <View style={styles.footer}>{footer}</View>}

                {fab && (
                    <TouchableOpacity style={theme.fab} onPress={fabAction}>
                        {fab}
                    </TouchableOpacity>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        //backgroundColor: '#0d1017',
    },
    container: {
        flex: 1,
       // backgroundColor: '#1C1C1C  ',
    },
    header: {
        flex: 0.1,
        //backgroundColor: '#161b21',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    logo: {
        width: 28,
        height: 28,
        marginRight: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fefefe',
    },
    content: {
        flex: 1.5,
        flexDirection: 'column',
    },
    contentTitle: {
        fontSize: 16,
        marginLeft: 12,
        color: '#ffffff',
        marginBottom: 8,
        marginTop: 20,
    },



    contentArticle: {
        backgroundColor: '#21262c',
        margin: 0,
        padding: 12,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#3F424A',
        minHeight: 60,
        marginTop: 4,
        flexDirection: 'row', // Dispone gli elementi in fila
        alignItems: 'center', // Centra gli elementi verticalmente
        justifyContent: 'space-between', // Spazio tra gli elementi
    },
    contentArticleSquareContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    contentArticleSquare: {
        backgroundColor: '#21262c',
        marginVertical: 4,
        padding: 12,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#3F424A',
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
        color: '#fff',
        marginRight: 20, // Spazio tra il testo e l'icona angle-right
    },
    angleRightIcon: {
        // Nessun margine sinistro necessario per l'icona angle-right
    },





    contentPadding: {
        height: 100, // Aggiungi uno spazio extra in fondo al contenuto
    },
    body: {
        flex: 1,
        backgroundColor: '#0d1017',
        position: 'relative',
    },
    article: {
        backgroundColor: '#161b21',
        marginHorizontal: 12,
        padding: 14,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#3F424A',
    },
    articleTitle: {
        fontSize: 16,
        color: '#f1f1f1',
        marginBottom: 10
    },
    articleText: {
        color: '#fff',
    },
    articleTop: {
        backgroundColor: '#161b21',
        marginHorizontal: 12,
        padding: 14,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderWidth: 1,
        borderColor: '#3F424A',
    },
    articleMiddle: {
        backgroundColor: '#161b21',
        marginHorizontal: 12,
        padding: 14,
        borderRadius: 0,
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: '#3F424A',
    },
    articleBottom: {
        backgroundColor: '#161b21',
        marginHorizontal: 12,
        padding: 14,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: '#3F424A',
    },
    bodyFooter: {
        backgroundColor: '#21262c',
        margin: 0,
        padding: 10,
        borderRadius: 4,
        //borderWidth: 1,
        borderColor: 'grey',
        position: 'absolute', // Mantieni posizione assoluta
        bottom: 0, // Mantieni in fondo al contenitore
        left: 0,  // Allinea a sinistra
        right: 0, // Allinea a destra
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    footer: {
        flex: 0.1,
        backgroundColor: '#161b21',
        justifyContent: 'center',

    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 12,
    },
    mt10: { marginTop: 10 },
    mb10: { marginBottom: 10 },
    ml10: { marginLeft: 10 },
    mr10: { marginRight: 10 },
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
    link: { color: '#D8BFD8' },
    primary: { backgroundColor: '#2124bb' },
    undo: { backgroundColor: '#aaaaaa50' },
    danger: { backgroundColor: '#bb211450' },
    warning: { backgroundColor: '#e2f04e' },
    success: { backgroundColor: '#24bb2150' },
    info: { backgroundColor: '#D8BFD8' },
    //buttonText: {
    //    //paddingTop: 10,
    //    paddingHorizontal: 35,
    //    paddingVertical: 6,
    //    fontSize: 14,
    //    color:'#fff',
    //    fontWeight: 'bold',
    //    letterSpacing: 0.8,
    //},

    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#3F424A',
        padding: 10,
    },

    buttonOK: {
        backgroundColor: '#2ECC71',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginVertical: 10,
        width: 100,
    },
    buttonCancel: {
        backgroundColor: '#AAAAAA',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginVertical: 10,
        width: 100,
    },
    buttonSave: {
        backgroundColor: '#3498DB',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginVertical: 10,
        width: 100,
    },
    buttonDelete: {
        backgroundColor: '#E74C3C',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginVertical: 10,
        width: 100,
    },
    buttonText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 14,
    },
});


export default Layout;
