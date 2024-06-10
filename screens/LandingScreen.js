import React, { useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

import { View, Text, FlatList } from 'react-native';
import Layout from './Layout';

const HomeScreen = ({ route, navigation }) => {
    const { theme } = useTheme();
    const { session } = useAuth(); // Accedi ai dati della sessione

    if (!session) {
        return <Text>Loading session data...</Text>; // O qualsiasi UI di caricamento
    }

    return (
        <Layout
            navigation={navigation}
            showTopBar={true}
            header={<Text style={theme.headerTitle}>Valorian</Text>}
            footer={<Text>Another Footer</Text>}
        //fab={<Text style={styles.fabText}>+</Text>}
        >
            <View style={{ backgroundColor: theme.colors.background }}>

            </View>
        </Layout>
    );
}

export default HomeScreen;
