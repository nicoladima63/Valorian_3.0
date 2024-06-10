// styles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        margin: 8,
        //backgroundColor: '#f2f2f2',
        minHeight: 200,
        marginTop: 0,
        flexDirection: 'column',
    },
    header: {
        flex: 1,
        backgroundColor: '#ffffff',
        marginBottom: 0,
        maxHeight: 60,
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        //textAlign: 'center',
        marginLeft: 10,
        color: '#00000080',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subHeader: {
        height: 60,
        backgroundColor: '#f8f9fa',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        flexDirection: 'row',
    },
    contentTitle: {
        fontSize: 16,
        marginLeft: 20,
        marginTop: 15,
        marginBottom:10
    },

    leftSide: {
        width: 80,
        backgroundColor: '#e9ecef',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainContentx: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainContent: {
        flex: 1,
        marginTop: 8,
        //backgroundColor: '#f2f2f2',

    //    flexWrap: 'wrap',
    //    flexDirection: 'column',
    //    alignContent: 'stretch',
    //    paddingHorizontal: 10,
    },
    rightSide: {
        width: 80,
        backgroundColor: '#e9ecef',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        height: 60,
        backgroundColor: '#f8f9fa',
        justifyContent: 'center',
    },
    fab: {
        position: 'absolute',
        bottom: 70,
        right: 30,
        backgroundColor: '#6200ee',
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    fabText: {
        color: 'white',
        fontSize: 24,
    },
    buttonContainer: {
        height: 40,
        width: '45%',
        backgroundColor: 'aliceblue',
        borderRadius: 8,

    },
    box: {
        height: 60,
        flex: 1,
        marginBottom: 4,
        marginHorizontal: 8,
        borderRadius:4
    },
    box1: {
        backgroundColor: 'orangered',
    },
    box2: {
        backgroundColor: '#ffffff',
    },
    box3: {
        backgroundColor: '#fff',
    },
    box4: {
        backgroundColor: 'deepskyblue',
    },
    box5: {
        backgroundColor: 'mediumturquoise',
    },


});
