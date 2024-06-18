import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { supabase } from '../lib/supabase';
import { TouchableOpacity, View, Image, Text } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import { useNavigationState } from '@react-navigation/native';

const TopBar = ({ navigation }) => {
    const { theme } = useTheme();
    const routeName = useNavigationState(state => state.routes[state.index].name);
    const { session } = useAuth();
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const logo = require("../assets/images/logo.png");

    useEffect(() => {
        if (session) {
            getProfile();
        }
    }, [session]);

    useEffect(() => {
        if (avatarUrl) {
            downloadImage(avatarUrl);
        }
    }, [avatarUrl]);

    async function getProfile() {
        try {
            setLoading(true)
            if (!session?.user) throw new Error('No user on the session!')
            let { data, error, status } = await supabase
                .from('profiles')
                .select(` avatar_url`)
                .eq('id', session?.user.id)
                .single()
            if (data) {
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

    async function downloadImage(path) {
        try {
            const { data, error } = await supabase.storage.from('avatars').download(path);

            if (error) {
                throw error;
            }

            const fr = new FileReader();
            fr.readAsDataURL(data);
            fr.onload = () => {
                setAvatarUrl(fr.result);
            };
        } catch (error) {
            if (error instanceof Error) {
                console.log('Error downloading image: ', error.message);
            }
        }
    }


    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: theme.colors.background, height: 60 }}>
            <Image source={logo} style={{ width: 30, height: 30, marginLeft: 20 }} resizeMode='stretch' />
            <Text style={[theme.headerTitle, { marginLeft: 10, color: theme.colors.headerTitle }]}>{routeName}</Text>

            <TouchableOpacity onPress={() => navigation.navigate('Account')} style={{ marginRight: 20 }}>
                <Avatar
                    rounded
                    source={avatarUrl ? { uri: avatarUrl } : require('../assets/images/avatar.png')}
                    size="small"
                />
            </TouchableOpacity>
        </View>
    );
};

export default TopBar;
