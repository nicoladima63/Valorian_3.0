
export const BaseTheme = (colors) => ({
    safeAreaView: {
        flex: 1,
        backgroundColor: colors.background,
    },

    //page component
    container: {
        flex: 1,
        backgroundColor: colors.slate2,
        padding: 0,
        justifyContent: 'center',
        alignItems: 'center',

    },
    header: {
        height: 60,
        backgroundColor: colors.slate2,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.slate2,
        //    paddingHorizontal: 10,
    },
    body: {
        flex: 1,
        backgroundColor: colors.slate2,
        position: 'relative',
        paddingHorizontal: 20,
    },
    article: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        borderWidth: 1,
        marginBottom: 0,
        backgroundColor: colors.background,
        borderColor: colors.slate7,
    },
    articleDefault: {
        backgroundColor: colors.background,
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
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
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
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
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
    text22: { fontSize: 22, },
    text24: { fontSize: 24, },
    textArticle: { color: colors.slate12, },
    textSuccess: { color: colors.green11, },
    textDanger: { color: colors.red11, },
    textWarning: { color: colors.yellow10, },
    textInfo: { color: colors.blue11, },
    textSecondary: { color: colors.slate11, },
    textTertiary: { color: colors.slate10, },
    textQuaternary: { color: colors.slate9, },
    textLink: { color: colors.blue11, },


    paragraph: {
        marginTop: 15,
        color: colors.slate12,
        flexDirection: 'column',
        fonstSize: 14,
    },
    //margin
    mt10: { marginTop: 10 },
    mt20: { marginTop: 20 },

    mb10: { marginBottom: 10 },
    ml10: { marginLeft: 10 },
    mr10: { marginRight: 10 },
    ml40: { marginLeft: 40 },
    mr40: { marginRight: 40 },
    mb20: { marginBottom: 20 },
    ml20: { marginLeft: 20 },
    mr20: { marginRight: 20 },

    lh10: { lineheight: 10 },
    lh15: { lineheight: 15 },
    lh20: { lineheight: 20 },
    lh25: { lineheight: 25 },
    lh30: { lineheight: 30 },
    lh35: { lineheight: 35 },
    lh40: { lineheight: 40 },
    //svarioni
    verticallySpaced: { paddingTop: 4, paddingBottom: 4, alignSelf: 'stretch', },
    overflowHidden: { overflow: 'hidden', },
    grid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    column: { flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
    grid3: { flexDirection: 'row', justifyContent: 'space-evenly', },
    grid2: { flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'center' },

    space50: { height: 50 },
    space100: { height: 100 },
    space150: { height: 150 },
    space200: { height: 200 },
    space250: { height: 250 },
    contentPadding: { height: 100, },
    center: { alignItems: 'center', justifyContent: 'center', },
    right: { alignSelf: 'flex-end', },
    left: { alignSelf: 'flex-start', },
    //border
    bt: {borderTopWidth:1,borderColor:colors.slate7},
    bb: { borderBottomWidth: 1, borderColor: colors.slate7 },
    bl: { borderLeftWidth: 1, borderColor: colors.slate7 },
    br: { borderRightWidth: 1, borderColor: colors.slate7 },
    br0: { borderRadius: 0 },
    br2: { borderRadius: 2 },
    br4: { borderRadius: 4 },
    br6: { borderRadius: 6 },
    br8: { borderRadius: 8 },
    br10: { borderRadius: 10 },
    br16: { borderRadius: 16 },
    br20: { borderRadius: 20 },
    //padding
    p2: { padding: 2 },
    p4: { padding: 4 },
    p8: { padding: 8 },
    p16: { padding: 16 },
    p20: { padding: 20 },
    p24: { padding: 24 },
    p32: { padding: 32 },
    p40: { padding: 40 },
    pv2: { paddingVertical: 2 },
    ph2: { paddingHorizontal: 2 },
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

    contentArticleSquareContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
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
        borderRadius: 2
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
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
        //position: 'absolute',
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
        paddingVertical: 4,
        borderRadius: 5,
        marginVertical: 10,
        width: 150,
    },
    buttonSave: {
        backgroundColor: colors.secondary,
        paddingHorizontal: 20,
        paddingVertical: 4,
        borderRadius: 5,
        marginVertical: 10,
        width: 150,
    },
    buttonDelete: {
        backgroundColor: colors.error,
        paddingHorizontal: 20,
        paddingVertical: 4,
        borderRadius: 5,
        marginVertical: 10,
        width: 150,
    },
    buttonUndo: {
        backgroundColor: colors.undo,
        paddingHorizontal: 20,
        paddingVertical: 4,
        borderRadius: 5,
        marginVertical: 10,
        width: 150,
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
        backgroundColor: colors.slate8,
    },
    modalContent: {
        backgroundColor: colors.slate12,
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
})
