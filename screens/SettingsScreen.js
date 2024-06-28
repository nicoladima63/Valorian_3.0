import React from 'react';
import { AppContext } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import Layout from './Layout';
import { View, Text, Animated, Dimensions, Pressable, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RadioButton } from 'react-native-paper';

const SettingsScreen = ({ navigation }) => {
    const { themeMode, toggleTheme } = useTheme();
    const { theme } = useTheme();
    const { isDarkTheme, setIsDarkTheme } = React.useContext(AppContext);
    const [animation] = React.useState(new Animated.Value(0));
    const [isMoving, setIsMoving] = React.useState(false);
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;


    const moveView = () => {
        setIsMoving(!isMoving);
        const toValue = isMoving ? 0 : windowWidth;
        Animated.timing(animation, {
            toValue,
            duration: 500,
            useNativeDriver: false,
        }).start();
    };

    handleToggleTheme = (value) => {
        toggleTheme(value);
        moveView();
    };

    return (
        <Layout
            navigation={navigation}
            showTopBar={false}
            header={
                <Text style={[theme.h4, theme.mb20, theme.mt10, theme.ml20]}>Impostazioni</Text>
            }
        //footer={<Text>Another Footer</Text>}
        //fab={<Text style={theme.fabText}>+</Text>}
        >
            <View style={[theme.body, { borderTopColor: theme.colors.slate7, borderTopWidth: 1, paddingTop: 10 }]}>
                <Text style={[theme.text, theme.mb10, theme.ml10, { color: theme.colors.slate11 }]}>Tema</Text>
                <RadioButton.Group onValueChange={handleToggleTheme} value={themeMode}>
                    <TouchableOpacity onPress={() => handleToggleTheme('auto')}>
                        <View style={[theme.article, theme.articleTop]}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon name="adjust" size={20} color={theme.colors.slate12} style={{ marginRight: 20 }} />
                                    <Text style={theme.text}>Automatico</Text>
                                </View>
                                <RadioButton value="auto" />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleToggleTheme('light')}>
                        <View style={[theme.article, theme.articleMiddle]}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon name="sun-o" size={20} color={theme.colors.slate12} style={{ marginRight: 20 }} />
                                    <Text style={theme.text}>Chiaro</Text>
                                </View>
                                <RadioButton value="light" color={theme.colors.slate12} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleToggleTheme('dark')}>
                        <View style={[theme.article, theme.articleBottom]}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon name="moon-o" size={20} color={theme.colors.slate12} style={{ marginRight: 20 }} />
                                    <Text style={theme.text}>Scuro</Text>
                                </View>
                                <RadioButton value="dark" />
                            </View>
                        </View>
                    </TouchableOpacity>
                </RadioButton.Group>
                <Text style={{ marginTop: 10, marginLeft: 15, color: theme.colors.slate10 }}>
                    <Text style={{ color: theme.colors.slate12 }}>Automatico </Text>
                    &egrave; supportato solo sui sistemi operativi che consentono di controllare i colori a livello di sistema.
                </Text>
            </View>
        </Layout >
    )
};

export default SettingsScreen;
