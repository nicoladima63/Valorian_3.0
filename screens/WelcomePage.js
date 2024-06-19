import React from 'react';
import { View, StyleSheet, Text, Button, Pressable, StatusBar, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const StyleComponent = () => {
    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="light-content" // Stile delle icone (può essere 'default', 'light-content', 'dark-content')
                backgroundColor="#161b21" // Colore di sfondo della Status Bar (solo Android)
            />
            <View style={styles.header} >
                <Text style={styles.headerTitle}>Expo Go</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.body}>
                    <Text style={[styles.text, styles.mt20, styles.mb10, styles.ml20]}>Development server </Text>

                    <View style={styles.articleTop}>
                        <Text style={[styles.text, styles.mt10, styles.mb10]}>Start a local development server with:</Text>
                        <View style={styles.contentArticle}>
                            <Text>Article</Text>
                        </View>
                        <Text style={[styles.text, styles.mt10, styles.mb20]}>Select the local server when it appears here.</Text>
                    </View>

                    <View style={styles.articleMiddle}>
                        <Text style={styles.text}>Valorian</Text>
                        <Text style={styles.text}>nicoladimartino@gmail.com</Text>
                    </View>
                    <View style={styles.articleMiddle}>
                        <Text style={styles.text}>Valorian</Text>
                        <Text style={styles.text}>nicoladimartino@gmail.com</Text>
                    </View>
                    <View style={styles.articleBottom}>
                        <Text style={styles.text}>Valorian</Text>
                        <Text style={styles.text}>nicoladimartino@gmail.com</Text>
                    </View>
                    <Text style={[styles.text, styles.mt20, styles.mb10, styles.ml20]}>Project</Text>

                    <View style={styles.article}>
                        <Text style={styles.text}>Valorian</Text>
                        <Text style={styles.text}>nicoladimartino@gmail.com</Text>
                    </View>
                    <Text style={[styles.text, styles.mt20, styles.mb10, styles.ml20]}>Smacks</Text>

                    <View style={styles.article}>
                        <Text style={[styles.text, styles.fwb, styles.fs20, styles.mb10]}>Valorian</Text>
                        <Text style={[styles.text, styles.link]}>nicoladimartino@gmail.com</Text>
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
            </View>
            <View style={styles.footer} >
                <View style={styles.iconContainer}>
                    <Icon name="home" size={30} color="#D8BFD8" />
                    <Icon name="cog" size={30} color="#D8BFD8" />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    safeAreaViewx: {
        backgroundColor: '#1c1c1c  ',
        marginTop: 60,
    },
    container: {
        flex: 1,
        backgroundColor: '#1c1c1c  ',
    },
    header: {
        flex: 0.1,
        backgroundColor: '#161b21',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 40,
        color: '#dedede',
    },
    content: {
        flex: 1.5,
        flexDirection: 'column',
    },
    body: {
        flex: 1,
        backgroundColor: '#1c1c1c',
        position: 'relative',
    },
    article: {
        backgroundColor: '#161b21',
        margin: 12,
        padding: 14,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#3F424A',
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
    }, contentArticle: {
        backgroundColor: '#21262c',
        margin: 0,
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#3F424A',
    },
    bodyFooter: {
        backgroundColor: '#21262c',
        margin: 0,
        padding: 20,
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
    },
    text: { color: '#a9a9a9' },
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
    buttonText: {
        //paddingTop: 10,
        paddingHorizontal: 35,
        paddingVertical: 10,
        fontSize: 16,
        color:'#fff',
        fontWeight: 'bold',
        letterSpacing: 0.8,
    },



    buttonOK: {
        backgroundColor: '#2ECC71',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginVertical: 10,
    },
    buttonCancel: {
        backgroundColor: '#AAAAAA',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginVertical: 10,
    },
    buttonSave: {
        backgroundColor: '#3498DB',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginVertical: 10,
    },
    buttonDelete: {
        backgroundColor: '#E74C3C',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginVertical: 10,
    },
    buttonText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 16,
    },
});

export default StyleComponent;
