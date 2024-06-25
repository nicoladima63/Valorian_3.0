import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { View, SafeAreaView, TouchableOpacity, StatusBar, Image, StyleSheet, Text } from 'react-native';
import TopBar from '../components/TopBar';

const Layout = ({ children, navigation, showTopBar, showBodyFooter, header, bodyFooter, leftSide, rightSide, footer, fab, fabAction }) => {

    const logo = require("../assets/images/logo.png")
    const { theme } = useTheme();
    return (
        <SafeAreaView style={theme.safeAreaView}>
            <View style={theme.container}>

                {header && (
                    <View>
                        {showTopBar && <TopBar navigation={navigation} />}
                    </View>
                )}

                {/*{leftSide &&*/}
                {/*    <View style={styles.leftSide}>*/}
                {/*        {leftSide}*/}
                {/*    </View>*/}
                {/*}*/}

                <View style={theme.content}>
                    {children}
                </View>

                {bodyFooter && showBodyFooter &&
                    <View style={theme.bodyFooter}>
                        {bodyFooter}
                    </View>
                }
                {/*    {rightSide &&*/}
                {/*        <View style={styles.rightSide}>*/}
                {/*            {rightSide}*/}
                {/*        </View>*/}
                {/*    }*/}

                {footer && <View style={theme.footer}>{footer}</View>}

                {fab && (
                    <TouchableOpacity style={theme.fab} onPress={fabAction}>
                        {fab}
                    </TouchableOpacity>
                )}
            </View>
        </SafeAreaView>
    );
};



export default Layout;
