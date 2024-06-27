const br = { br2: 2, br4: 4, br6: 6, br8: 8, br12: 12, br16: 16, br20: 20 };
const fs = { xxsmall: 10, xsmall: 12, small: 14, medium: 16, large: 18, xlarge: 20, xxlarge: 24 };
const fw = { light: 300, regular: 400, medium: 500, semiBold: 600, bold: 700, extraBold: 800, black: 900 };
const m = { m2: 2, m4: 4, m8: 8,m10:10,  m16: 16, m24: 24, m32: 32, m40: 40 };
const p = { p2: 2, p4: 4, p8: 8, p16: 16, p20: 20, p24: 24, p32: 32, p40: 40 };
const gap = { gap2: 2, gap4: 4, gap8: 8, gap16: 16, gap24: 24, gap32: 32, gap40: 40 };
const lh = { lh1: 1.2, lh2: 1.4, lh3: 1.6, lh4: 1.8, lh5: 2.0 };

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

    },
    header: {
        height: 60,
        backgroundColor: colors.slate2,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderTopColor: colors.slate7,
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
        borderRadius: br.br8,
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
        borderTopLeftRadius: br.br8,
        borderTopRightRadius: br.br8,
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
        borderBottomLeftRadius: br.br8,
        borderBottomRightRadius: br.br8,
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
        fontWeight: fw.bold,
        color: colors.slate12,
    },

    //font
    fwb: { fontWeight: fw.bold, },

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


    paragraph: {
        marginTop: 15,
        color: colors.slate12,
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
    right: { alignSelf: 'flex-end', },
    left: { alignSelf: 'flex-start', },
    //border
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
        marginTop: m.m20,
        marginBottom: m.m20,
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
        borderRadius: br.br2
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

})
