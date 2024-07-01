import React, { useEffect, useState, useCallback } from 'react';
import * as BisogniController from '../controllers/bisogniController';
import { useTheme } from '../context/ThemeContext';
import { ScrollView, RefreshControl, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-big-calendar';
import { MaterialIcons } from '@expo/vector-icons';

import 'dayjs/locale/it';
import dayjs from 'dayjs';
import Layout from './Layout';
import FlexibleView from '../components/FlexibleComponent';
import IconaTestoIconaView from '../components/IconaTestoIconaView';
import { GestureHandlerRootView, PanGestureHandler, State as GestureState } from 'react-native-gesture-handler';

export default function CalendarPage({ navigation }) {
    const [bisogni, setBisogni] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [headerText, setHeaderText] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const { theme } = useTheme();

    useEffect(() => {
        getBisogni();
        updateHeader(currentDate);
    }, [currentDate]);

    const updateHeader = (date) => {
        const monthName = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        setHeaderText(`${monthName} ${year}`);
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getBisogni().then(() => {
            setRefreshing(false);
        });
    }, []);

    const getBisogni = async () => {
        setLoading(true);
        try {
            const data = await BisogniController.getBisogni();
            if (Array.isArray(data)) {
                setBisogni(data);
            } else {
                console.error('getBisogni non ha restituito un array:', data);
                setBisogni([]);
            }
        } catch (error) {
            console.error('Errore nel recupero dei bisogni:', error);
            setBisogni([]);
        } finally {
            setLoading(false);
        }
    };

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

    const Header = () => (
        <Text style={[theme.h3, theme.mb20, theme.mt10, theme.ml20, { backgroundColor: theme.colors.slate2 }]}>
            Calendario delle soddisfazioni
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

    return (
        <Layout
            navigation={navigation}
            showTopBar={false}
            header={<Header />}
            //fab={<Fab />}
            //fabAction={handlePressFab}
            showBodyFooter={false}
            bodyFooter={<BodyFooter />}
        >
            <View style={theme.body}>
                <View style={{ backgroundColor: '#fff' }}>
                    <IconaTestoIconaView
                        leftIcon={<MaterialIcons name="navigate-before" size={36} color={theme.colors.blue10} style={theme.ml20} />}
                        text={<Text style={[theme.text, theme.h3,theme.ml40,theme.fwb, {color:theme.colors.blue10}]}>{headerText}</Text>}
                        rightIcon={<MaterialIcons name="chevron-right" size={36} color={theme.colors.blue10} style={theme.mr20} />}
                        onPressLeftIcon={handlePrevMonth}
                        onPressRightIcon={handleNextMonth}
                    />
                    <View style={{ backgroundColor: '#fff' }}>

                        <ScrollView
                            style={{ backgroundColor: '#fff' }}
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
                                weekStartsOn={1}  // Imposta il primo giorno della settimana a luned́
                                eventCellStyle={eventCellStyle} // Applica lo stile personalizzato agli eventi
                                date={currentDate} // Usa lo stato aggiornato
                                swipeEnabled={true} // Abilita lo swipe nativo del calendario
                                onSwipeEnd={onSwipeEnd} // Gestisce l'evento di fine swipe
                            />
                        </ScrollView>
                    </View>
                </View>
            </View>
        </Layout >
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
