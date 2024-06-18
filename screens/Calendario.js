import React, { useEffect, useState, useCallback } from 'react';
import * as Controller from '../controllers/bisogniController';
import { useTheme } from '../context/ThemeContext';
import { ScrollView, RefreshControl, View, Text, StyleSheet, Alert } from 'react-native';
import { Calendar } from 'react-native-big-calendar';
import 'dayjs/locale/it';
import dayjs from 'dayjs';
import Layout from './Layout';
import CustomText from '../components/CustomTextComponent';
import { GestureHandlerRootView, PanGestureHandler, State as GestureState } from 'react-native-gesture-handler';

export default function CalendarPage({ navigation }) {
    const [bisogni, setBisogni] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [refreshing, setRefreshing] = useState(false);
    const { theme } = useTheme();

    useEffect(() => {
        loadBisogni();
    }, []);

    useEffect(() => {
        console.log("Current date changed to:", currentDate);
    }, [currentDate]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        loadBisogni().then(() => {
            setRefreshing(false);
        });
    }, []);

    const loadBisogni = async () => {
        try {
            const data = await Controller.getBisogni();
            setBisogni(data);
        } catch (error) {
            console.error(error);
        }
    }

    const handlePrevMonth = () => {
        setCurrentDate(prevDate => dayjs(prevDate).subtract(1, 'month').toDate());
    };

    const handleNextMonth = () => {
        setCurrentDate(prevDate => dayjs(prevDate).add(1, 'month').toDate());
    };

    const onSwipeEnd = useCallback((date) => {
        if (date > currentDate) {
            handleNextMonth();
        } else if (date < currentDate) {
            handlePrevMonth();
        }
    }, [currentDate]);

    const renderHeader = (date) => {
        const monthName = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        return (
            <View>
                <Text style={styles.headerText}>{monthName} {year}</Text>
            </View>
        );
    };

    const transformBisogniToEvents = () => {
        return bisogni.map(bisogno => ({
            title: bisogno.nome,
            start: new Date(bisogno.soddisfattoil),
            end: new Date(bisogno.soddisfattoil),
            color: bisogno.colore,
        }));
    };

    const events = transformBisogniToEvents();
    const eventCellStyle = (event, start, end, isSelected) => {
        return {
            height: 20,
            alignItems: 'center',
            backgroundColor: event.color,
            color: 'red',
        };
    };

    return (
        <Layout
            navigation={navigation}
            showTopBar={false}
            header={<Text style={theme.headerTitle}></Text>}
        >
            <CustomText style={theme.headerTitle}>Calendario delle soddisfazioni</CustomText>
            <CustomText style={theme.title}>{renderHeader(currentDate)}</CustomText>

            <ScrollView
                style={styles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <Calendar
                    events={events}
                    height={600}  // Altezza del calendario
                    mode="month"  // Modalità di visualizzazione mensile
                    locale="it"
                    weekStartsOn={1}  // Imposta il primo giorno della settimana a lunedì
                    eventCellStyle={eventCellStyle} // Applica lo stile personalizzato agli eventi
                    currentDate={currentDate} // Usa lo stato aggiornato
                    swipeEnabled={true} // Abilita lo swipe nativo del calendario
                    onSwipeEnd={onSwipeEnd} // Gestisce l'evento di fine swipe
                />
            </ScrollView>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f0f0f0',
    },
    headerText: {
        fontSize: 28,
        color: 'black',
    },
});
