import React, { useEffect, useState, useCallback } from 'react';
import * as Controller from '../controllers/bisogniController';
import { useTheme } from '../context/ThemeContext';
import { ScrollView, RefreshControl, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
            <Text style={theme.h2}>{monthName} {year}</Text>
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
            color: theme.colors.slate12,
        };
    };
    const cellStyle = () => {
        return (
            <View style={{ backgroundColor: theme.colors.slate12 }} />
        );
    };

    const Header = () => (
        <Text style={[theme.h4, theme.mb20, theme.mt10, theme.ml20, { backgroundColor: theme.colors.slate2 }]}>
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
            <View style={ {backgroundColor: theme.colors.white}}>
                <Text style={[theme.text, theme.h4, theme.fwb, theme.mb20]}>{renderHeader(currentDate)}</Text>
                <View style={[theme.article, { height: 700, backgroundColor: theme.colors.white}]}>

                    <Calendar
                        toolbar={false}
                        events={events}
                        height={600}  // Altezza del calendario
                        mode="month"  // Modalità di visualizzazione mensile
                        locale="it"
                        weekStartsOn={1}  // Imposta il primo giorno della settimana a lunedì
                        cellStyle={cellStyle}
                        eventCellStyle={eventCellStyle} // Applica lo stile personalizzato agli eventi
                        currentDate={currentDate} // Usa lo stato aggiornato
                        swipeEnabled={true} // Abilita lo swipe nativo del calendario
                        onSwipeEnd={onSwipeEnd} // Gestisce l'evento di fine swipe
                    />
                </View>
            </View>
        </Layout>
    );
};

