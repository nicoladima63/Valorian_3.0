import React, { useMemo, useState } from 'react'; import { AppContext } from '../context/AppContext';
import RadioButtonRN from 'radio-buttons-react-native';
import { Text, View, ScrollView, Pressable, StyleSheet, Button } from 'react-native';
import Layout from './Layout';
import styles from '../themes/style';
import { useTheme } from '../context/ThemeContext';

const Settings = ({ navigation }) => {
    const { toggleTheme, theme } = useTheme();
    const { isDarkTheme, setIsDarkTheme } = React.useContext(AppContext);
    const [selectedId, setSelectedId] = useState();

    const data = useMemo(() => ([
        {label: 'Tema chiaro',id: '1',},
        {label: 'Tema scuro',id: '2',}
    ]), []);

    return (
        <Layout
            navigation={navigation}
            showTopBar={false}
            header={<Text style={theme.headerTitle}>Settings</Text>}
            //footer={<Text>Another Footer</Text>}
            //fab={<Text style={styles.fabText}>+</Text>}
        >
            <View >
                <Text style={theme.title}>Tema</Text>
                <View style={[styles.box, styles.box1]} />
                <RadioButtonRN
                    initial={isDarkTheme ? 2 : 1}
                    activeColor={theme.colors.primary} 
                    deactiveColor={theme.colors.secondary}
                    data={data}
                    selectedBtn={(e) => {
                        setIsDarkTheme(e.id === '2');
                        toggleTheme();
                    }}
                />
            </View>
        </Layout>
    );
};
export default Settings;
