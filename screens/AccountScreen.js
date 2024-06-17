import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { supabase } from "../lib/supabase"; // Import Supabase client
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

import Layout from './Layout';
import Avatar from "./Avatar";
import {
    StyleSheet,
    View,
    Alert, Button,
    Text, ActivityIndicator, TextInput
} from "react-native";

export default function AccountScreen({ navigation}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const { theme } = useTheme();
    const { session } = useAuth();
    const [username, setUsername] = useState(""); 
    const [website, setWebsite] = useState('')
    const [avatarUrl, setAvatarUrl] = useState("");

    useEffect(() => {
        if (session) getProfile()
        console.log(session)

    }, [session])
    async function getProfile() {
        try {
            setLoading(true)
            if (!session?.user) throw new Error('No user on the session!')
            let { data, error, status } = await supabase
                .from('profiles')
                .select(`username, website, avatar_url`)
                .eq('id', session?.user.id)
                .single()
            if (error && status !== 406) {
                throw error
            }

            if (data) {
                setUsername(data.username)
                setWebsite(data.website)
                setAvatarUrl(data.avatar_url)
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message)
            }
        } finally {
            setLoading(false)
        }
    }
    async function updateProfile({username,website,avatar_url}) {
        try {
            setLoading(true)
            if (!session?.user) throw new Error('No user on the session!')

            const updates = {
                id: session?.user.id,
                username,
                website,
                avatar_url,
                updated_at: new Date(),
            }

            let { error } = await supabase.from('profiles').upsert(updates)

            if (error) {
                throw error
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {loading ? (
                <View style={theme.container}>
                    <Text style={{ color: 'red', textAlign: 'center' }}>Loading...</Text>
                    <ActivityIndicator size="large" />
                </View>
            ) : (

                <View style={theme.container}>

                    <Text style={{
                        color: theme.colors.text,
                        fontSize: 18,
                        fontWeight: '600',
                        marginBottom: 16,
                            marginTop: 16,
                        alignSelf: 'center',
                    }}>
                            Bentornato, {username},{session?.user.id}
                    </Text>

                    <View style={[styles.verticallySpaced, styles.mt20]}>
                        <TextInput
                            label="Email"
                            value={session?.user?.email}
                            editable={false}
                            style={styles.input}
                        />
                        </View>

                    <View style={[styles.verticallySpaced, styles.mt20]}>
                        <TextInput
                            style={styles.input}
                            label="Username"
                            value={username}
                            onChangeText={(text) => setUsername(text)}
                        />
                    </View>
                    <View style={[styles.verticallySpaced, styles.mt20]}>
                        <TextInput
                            style={styles.input}
                            label="Website"
                            value={website}
                            onChangeText={(text) => setWebsite(text)}
                        />
                    </View>
                    <View style={[styles.verticallySpaced, styles.mt20]}>
                        <Avatar
                            size={80}
                            url={avatarUrl}
                            onUpload={(url) => {
                                setAvatarUrl(url);
                                updateProfile({ username, website, avatar_url: url });
                            }}
                        />
                    </View>
                    <View style={[styles.verticallySpaced, styles.mt20]}>
                        <Button
                            onPress={() => updateProfile({ username, website, avatar_url: avatarUrl })}
                            title={loading ? "Loading ..." : "Update"}
                        />
                        <Button
                            onPress={async () => {
                                await supabase.auth.signOut();
                                navigation.replace('Login'); // Naviga verso la schermata di accesso dopo il logout
                            }}
                            title="Esci"
                        />
                    </View>
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        padding: 12,
        color: "#000",
    },
    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: 'stretch',
    },
    mt20: {
        marginTop: 20,
    },
    input: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
    },
});
