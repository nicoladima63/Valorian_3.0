import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function App() {
    return (
        <View style={styles.container}>
            <View style={styles.devServerContainer}>
                <Text style={styles.devServerTitle}>Development servers</Text>
                <View style={styles.commandBox}>
                    <Text style={styles.commandText}>Start a local development server with:</Text>
                    <TextInput style={styles.commandInput} value="npx expo start" editable={false} />
                </View>
                <Text style={styles.selectServerText}>Select the local server when it appears here.</Text>
                <TouchableOpacity style={styles.manualEntry}>
                    <Text style={styles.manualEntryText}>Enter URL manually</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.qrCode}>
                    <Text style={styles.qrCodeText}>Scan QR code</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.recentlyOpenedContainer}>
                <Text style={styles.sectionTitle}>Recently opened</Text>
                    <Text style={styles.recentItemText}>valorian</Text>
                    <Text style={styles.recentItemText}>Snack</Text>
            </ScrollView>

            <ScrollView style={styles.projectsContainer}>
                <Text style={styles.sectionTitle}>Projects</Text>
                <TouchableOpacity style={styles.projectItem}>
                    <Text style={styles.projectItemText}>Valorian</Text>
                    <Text style={styles.projectItemSubText}>@nicoladimartino/valorian</Text>
                </TouchableOpacity>
            </ScrollView>

            <ScrollView style={styles.snacksContainer}>
                <Text style={styles.sectionTitle}>Snacks</Text>
                <TouchableOpacity style={styles.snackItem}>
                    <Text style={styles.snackItemText}>laughing yellow marshmallows</Text>
                    <Text style={styles.snackItemSubText}>Draft</Text>
                </TouchableOpacity>
            </ScrollView>

            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem}>
                    <Text style={styles.navItemText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Text style={styles.navItemText}>Settings</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1c1c1c',
        padding: 20,
    },
    devServerContainer: {
        marginBottom: 20,
    },
    devServerTitle: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    commandBox: {
        backgroundColor: '#2a2a2a',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    commandText: {
        color: '#b0b0b0',
        marginBottom: 5,
    },
    commandInput: {
        color: '#ffffff',
        backgroundColor: '#333333',
        padding: 10,
        borderRadius: 5,
    },
    selectServerText: {
        color: '#b0b0b0',
        marginBottom: 10,
    },
    manualEntry: {
        padding: 10,
        backgroundColor: '#2a2a2a',
        borderRadius: 5,
        marginBottom: 10,
    },
    manualEntryText: {
        color: '#ffffff',
    },
    qrCode: {
        padding: 10,
        backgroundColor: '#2a2a2a',
        borderRadius: 5,
        marginBottom: 10,
    },
    qrCodeText: {
        color: '#ffffff',
    },
    recentlyOpenedContainer: {
        marginBottom: 20,
    },
    sectionTitle: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    recentItem: {
        padding: 10,
        backgroundColor: '#2a2a2a',
        borderRadius: 5,
        marginBottom: 10,
    },
    recentItemText: {
        color: '#ffffff',
    },
    projectsContainer: {
        marginBottom: 20,
    },
    projectItem: {
        padding: 10,
        backgroundColor: '#2a2a2a',
        borderRadius: 5,
        marginBottom: 10,
    },
    projectItemText: {
        color: '#ffffff',
    },
    projectItemSubText: {
        color: '#b0b0b0',
    },
    snacksContainer: {
        marginBottom: 20,
    },
    snackItem: {
        padding: 10,
        backgroundColor: '#2a2a2a',
        borderRadius: 5,
        marginBottom: 10,
    },
    snackItemText: {
        color: '#ffffff',
    },
    snackItemSubText: {
        color: '#b0b0b0',
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#2a2a2a',
        padding: 10,
        borderRadius: 5,
    },
    navItem: {
        padding: 10,
    },
    navItemText: {
        color: '#ffffff',
    },
});