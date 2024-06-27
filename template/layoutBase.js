const handleCancel = () => {

}
const handleDelete = () => {

}
const handleOk = () => {

}
const handleSave = () => {

}
const handlePressFab = () => {
    if (fabAction) {
        fabAction();
    }
};

const Header = () => (
    <Text style={[theme.h4, theme.mb20, theme.mt10, theme.ml20, { backgroundColor: theme.colors.slate2 }]}>
        titolo header
    </Text>
);

const BodyFooter = () => (
    <View style={theme.bodyFooter}>
        <TouchableOpacity onPress={handleCancel} style={theme.buttonCancel}>
            <Text style={theme.buttonText}>Annulla</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete} style={theme.buttonDelete}>
            <Text style={theme.buttonText}>Elimina</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleOk} style={theme.buttonOK}>
            <Text style={theme.buttonText}>OK</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSave} style={theme.buttonSave}>
            <Text style={theme.buttonText}>Salva</Text>
        </TouchableOpacity>
    </View>
);

const Fab = () => (
    <Text style={theme.fabText}>+</Text>
);

useEffect(() => {
    if (setFabAction) {
        setFabAction(() => () => setModalVisibleAdd(true));
    }
}, [setFabAction]);


return (
    <Layout
        navigation={navigation}
        showTopBar={false}
        header={<Header />}
        fab={<Fab />}
        fabAction={handlePressFab}
        showBodyFooter={false}
        bodyFooter={<BodyFooter />}
    >
        <View style={theme.body}>
            {/* titolo della pagina */}
            <Text style={[theme.text, theme.h4, theme.fwb]}> Title h4</Text>
        </View>
    </Layout>
);
