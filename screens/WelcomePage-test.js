import React from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView, StatusBar, TouchableOpacity, Image, TextInput, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const StyleComponent = () => {
    const logo = require("../assets/images/logo.png")

    const data = [
        { id: '1', text: 'Item 1' },
        { id: '2', text: 'Item 2' },
        { id: '3', text: 'Item 3' },
    ];

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <KeyboardAwareScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                <View style={styles.container}>
                    <StatusBar
                        barStyle="light-content" // Stile delle icone (può essere 'default', 'light-content', 'dark-content')
                        backgroundColor="#0d1017" // Colore di sfondo della Status Bar (solo Android)
                    />
                    <View style={styles.header}>
                        <Image source={logo} style={styles.logo} resizeMode='contain' />
                        <Text style={styles.headerTitle}>Valorian</Text>
                    </View>
                    <View style={styles.content}>
                        <ScrollView>
                            <View style={styles.body}>
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
                        </ScrollView>
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
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: '#0d1017',
    },
    container: {
        flex: 1,
        backgroundColor: '#1C1C1C  ',
    },
    header: {
        flex: 0.1,
        backgroundColor: '#161b21',
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
        color: '#dedede',
    },
    content: {
        flex: 1.5,
        flexDirection: 'column',
    },
    contentTitle: {
        fontSize: 16,
        marginLeft: 12,
        color: '#dedede',
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
        color: '#dedede',
        marginBottom: 10
    },
    articleText: {
        color: '#E3E3E3',
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

export default StyleComponent;
