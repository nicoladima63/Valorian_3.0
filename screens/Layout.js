import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { View, SafeAreaView } from 'react-native';
import TopBar from '../components/TopBar';
import styles from '../themes/style';

const Layout = ({ children, navigation, showTopBar,
    header, leftSide, rightSide, footer, fab }) => {
    const { theme } = useTheme();

    const navigateToSettings = () => {
        navigation.navigate('Settings');
    };



    return (
        <SafeAreaView style={[styles.container, backgroundColor = theme.colors.background]}>
            {header && <View style={[styles.header, backgroundColor = theme.colors.background]}>{header}{showTopBar && <TopBar navigation={navigation} />}</View>}
            <View style={styles.content}>
                {leftSide && <View style={styles.leftSide}>{leftSide}</View>}
                <View style={[styles.mainContent, backgroundColor = theme.colors.background]}>
                    {children}
                </View>
                {rightSide && <View style={styles.rightSide}>{rightSide}</View>}
            </View>
            {footer && <View style={styles.footer}>{footer}</View>}
            {fab && <View style={styles.fab}>{fab}</View>
            }
        </SafeAreaView>
    );
};

export default Layout;
