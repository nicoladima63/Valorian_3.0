import React, { useMemo } from 'react';
import { AppContext } from '../context/AppContext';
import RadioButtonRN from 'radio-buttons-react-native';
import { Text, View, ScrollView } from 'react-native';
import Layout from './Layout';
import styles from '../themes/style';
import { useTheme } from '../context/ThemeContext';

const Settings = ({ navigation }) => {
    const { toggleTheme, theme } = useTheme();
    const { isDarkTheme, setIsDarkTheme } = React.useContext(AppContext);

    const data = useMemo(() => ([
        { label: 'Tema chiaro', id: '1' },
        { label: 'Tema scuro', id: '2' },
    ]), []);

    return (
        <Layout
            navigation={navigation}
            showTopBar={false}
            header={<Text style={theme.headerTitle}>Impostazioni</Text>}
            //footer={<Text>Another Footer</Text>}
            //fab={<Text style={styles.fabText}>+</Text>}

        >
            <View style={theme.content}>
                <Text style={[theme.title,theme.text]}>Tema</Text>

                <RadioButtonRN
                    boxStyle={{ flexDirection: 'row-reverse', justifyContent: 'space-between', backgroundColor: theme.colors.text }}
                    initial={isDarkTheme ? 2 : 1}
                    activeColor={theme.colors.boxBorder}
                    deactiveColor={theme.colors.inactive}
                    data={data}
                    selectedBtn={(e) => {
                        const selectedId = e.id === '2';
                        if (selectedId !== isDarkTheme) {
                            setIsDarkTheme(selectedId);
                            toggleTheme();
                        }
                    }}
                />
                <Text style={theme.title}></Text>
                <Text style={theme.title}>Tema</Text>

                <ScrollView>
                    <View style={[styles.box, styles.box1]} />
                    <View style={[styles.box, styles.box3]} />
                    <View style={[styles.box, styles.box4]} />
                    <View style={[styles.box, styles.box5]} />
                </ScrollView>
            </View>
        </Layout>
    );
};

export default Settings;
