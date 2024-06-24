export const BaseTheme = (colors) => ({
    safeAreaView: {
        flex: 1,
        backgroundColor: colors.background,
    },

    //container
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    containerBorder: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 5,
        marginTop: 10,
    },

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

    //header
    header: {
        flex: 0.1,
        backgroundColor: colors.background,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.onBackground,
    },
    logo: {
        width: 28,
        height: 28,
        marginRight: 20,
    },

    //content
    content: {
        flex: 1.5,
        flexDirection: 'column',
        backgroundColor: colors.content,
    },
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
    body: {
        flex: 1,
        backgroundColor: colors.contentBody,
        position: 'relative',
    },
    article: {
        backgroundColor: colors.article,
        marginHorizontal: 12,
        padding: 14,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
    },
    articleTitle: {
        fontSize: 16,
        color: colors.background,
        marginBottom: 10
    },
    articleText: {
        color: colors.onBackground,
    },
    articleTop: {
        backgroundColor: colors.background,
        marginHorizontal: 12,
        padding: 14,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderWidth: 1,
        borderColor: colors.border,
    },
    articleMiddle: {
        backgroundColor: colors.background,
        marginHorizontal: 12,
        padding: 14,
        borderRadius: 0,
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: colors.border,
    },
    articleBottom: {
        backgroundColor: colors.background,
        marginHorizontal: 12,
        padding: 14,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: colors.border,
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
})
