import React, { useState, useEffect } from "react";
import { useNavigation, Pressable } from '@react-navigation/native';
import { supabase } from "../lib/supabase"; // Import Supabase client
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

import Layout from './Layout';
import Avatar from "./Avatar";
import ButtonsContainer from '../components/ButtonsContainer';
import {
    StyleSheet,
    View,
    Alert, Button,
    Text, ActivityIndicator, TextInput
} from "react-native";

export default function AccountScreen({ navigation }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const { theme } = useTheme();
    const { session } = useAuth();
    const [username, setUsername] = useState("");
    const [website, setWebsite] = useState('')
    const [avatarUrl, setAvatarUrl] = useState("");

    useEffect(() => {
        if (session) getProfile()
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
    async function updateProfile({ username, website, avatar_url }) {
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

    const Header = () => (
        <Text style={[theme.h4, theme.mb20, theme.mt10, theme.ml20, { backgroundColor: theme.colors.slate2 }]}>
            Bentornato, {username}
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

    const buttons = [
        {
            title: 'Aggiorna',
            onPress: () => {
                updateProfile({ username, website, avatar_url: avatarUrl })
            },
            colore: theme.colors.blue10
        },

        {
            title: 'LogOut',
            onPress: async () => {
                await supabase.auth.signOut();
                navigation.replace('Login');
            },
            colore: theme.colors.red10
        },
    ];


    return (
        <>
            {loading ? (
                <View style={theme.container}>
                    <Text style={{ color: 'red', textAlign: 'center' }}>Loading...</Text>
                    <ActivityIndicator size="large" />
                </View>
            ) : (

                <Layout
                    navigation={navigation}
                    showTopBar={false}
                    header={<Header />}
                    //fab={<Fab />}
                    //fabAction={handlePressFab}
                    showBodyFooter={false}
                    bodyFooter={<BodyFooter />}
                >
                    {/* titolo della pagina */}


                    <View style={theme.body}>
                            <View style={[theme.article, theme.articleTop]}>
                                <Text style={[theme.h6, theme.textSecondary]}>AVATAR</Text>
                                <Avatar style={[theme.left, theme.mr20]}
                                    size={80}
                                    url={avatarUrl}
                                    onUpload={(url) => {
                                        setAvatarUrl(url);
                                        updateProfile({ username, website, avatar_url: url });
                                    }}
                                />
                            </View>
                            <View style={[theme.article, theme.articleMiddle]}>
                                    <TextInput style={[theme.text]}
                                    label="Email"
                                    value={session?.user?.email}
                                    editable={false}
                                />
                                <View style={[theme.article, theme.articleSuccess, theme.br20, theme.mt10]}>
                                    <Text style={[theme.text, theme.h5, theme.fwb, theme.textSuccess]}> email verificata</Text>
                                </View>

                            </View>
                            <View style={[theme.article, theme.articleMiddle]}>
                                <Text style={[theme.h6, theme.textSecondary]}>Username</Text>
                                <TextInput
                                    style={theme.text}
                                    label="Username"
                                    value={username}
                                    onChangeText={(text) => setUsername(text)}
                                />
                            </View>
                            <View style={[theme.article, theme.articleMiddle]}>
                                <Text style={[theme.h6, theme.textSecondary]}>Sito Web</Text>
                                <TextInput
                                    style={theme.text}
                                    label="Website"
                                    value={website}
                                    onChangeText={(text) => setWebsite(text)}
                                />

                            </View>
                            <View style={[theme.article, theme.articleBottom]}>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <ButtonsContainer buttons={buttons} />
                                </View>

                            </View>

                        </View>
                </Layout>

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
