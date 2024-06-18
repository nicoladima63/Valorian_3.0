export const BaseTheme = (colors) => ({
    container: {
        flex: 1,
        paddingVertical: 0,
        paddingHorizontal: 16,
        backgroundColor: colors.background,
    },
    content: {
        flex: 1,
        //flexDirection: 'row',
        //alignItems: 'center',
        //justifyContent: 'space-between'
        padding: 8,
    },
    contentTitle: {
        fontSize: 18,
        color: colors.contentTitle,
        marginLeft: 10,
    },
    contentText: {
        fontSize: 14,
        color: colors.contentText
    },
    containerBorder: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 5,
        marginTop: 10
    },
    image: {
        height: 160,
        width: 170
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        //marginLeft: 10,
        color: colors.headerTitle
    },

    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors.text,
        marginLeft: 15,

    },
    paragrafo: {
        fontSize: 16,
        //fontWeight: "bold",
        //textTransform: "uppercase",
        //textAlign: "center",
        color: colors.text
    },
    paragraph: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 10,
        lineHeight: 20,
    },

    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
        marginLeft: 10,

    },
    linkText: {
        color: colors.link,
    },
    mt20: {
        marginTop: 20
    },
    mb20: {
        marginBottom: 20
    },
    //FAB
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
        color: 'white',
        fontSize: 24,
    },
    //BUTTON
    buttonContainer1: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
        position: 'absolute',
        bottom: 10,
        width:'50%'
    },

    buttonContainer2: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        //alignItems: 'center',
        marginBottom: 40,
        position: 'absolute',
        bottom: 10,
        width: '50%'

    },
    buttonCancel: {
        flex: 1,
        height: 45,
        backgroundColor: colors.cancel,
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
    buttonText: {
        backgroundColor: colors.buttonText,
        fontSize: 16,
    },
    // stayElevated
    stayElevated: {
        margin: 4,
        backgroundColor: 'white',
        borderRadius: 4,
        //flex: 1,
        padding: 8,
    },
    //MODAL
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
    },
    closeButton: {
        padding: 10,
        backgroundColor: '#2196F3',
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    infoIcon: {
        marginRight: 10,
    },
    checkIcon: {
        marginLeft: 10,
    },

    //TOPBAR
    topBarContainer: {
        //    padding: 10,
        //    flexDirection: 'row',
        //    alignItems: 'center',
        //    justifyContent: 'space-between',
        //    marginTop: 20,
        //    backgroundColor:colors.background
    },
    topBarTitle: {
        fontSize: 20,
        fontWeight: 'bold',
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
    input: {
        borderWidth: 1,
        //borderColor: colors.grey5,
        borderRadius: 5,
        padding: 10,
        flex: 1,
        marginRight: 10,
    },
    //login
    Logincontainer: {
        flex: 1,
        alignItems: "center",
        paddingTop: 20,
        backgroundColor: colors.background
    },
    Loginimage: {
        height: 100,
        width: 100
    },
    Logintitle: {
        fontSize: 22,
        fontWeight: "bold",
        textTransform: "uppercase",
        textAlign: "center",
        paddingVertical: 20,
        color: colors.primary
    },
    LoginSubtitle: {
        fontSize: 20,
        fontWeight: "bold",
        textTransform: "uppercase",
        textAlign: "center",
        paddingVertical: 20,
        color: colors.secondary
    },
    LogininputView: {
        //gap: 15,
        width: "100%",
        paddingHorizontal: 40,
        marginBottom: 5,
        marginTop: 10,
        flex: 1

    },
    Logininput: {
        height: 50,
        paddingHorizontal: 20,
        borderColor: colors.grey,
        borderWidth: 1,
        borderRadius: 7,
        color: colors.grey
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
        alignItems: "center"
    },
    LoginrememberText: {
        fontSize: 13,
        color: colors.grey,
    },
    LoginforgetText: {
        fontSize: 11,
        color: colors.secondary
    },
    Loginbutton: {
        backgroundColor: colors.primary,
        height: 45,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    LoginbuttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold"
    },
    LoginbuttonView: {
        flex: 1,
        width: "100%",
        paddingHorizontal: 50
    },
    LoginoptionsText: {
        textAlign: "center",
        paddingVertical: 10,
        color: "gray",
        fontSize: 13,
        marginBottom: 6
    },
    LoginmediaIcons: {
        flexDirection: "row",
        gap: 15,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 23
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
        fontSize: 13
    }
})
