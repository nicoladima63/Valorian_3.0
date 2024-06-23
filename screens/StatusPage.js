import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import EChartsComponent from '../components/EChartsComponent';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { AppContext } from '../context/AppContext';
import Layout from './Layout';

// Funzione immaginaria per ottenere i dati dei bisogni dal controller
const fetchNeedsData = async () => {
    //esempio a zero
    //return [
    //    { name: 'Sport', daysSatisfied: -6, tolerance: 10 },    // Sport non soddisfatto per nessuno dei giorni consentiti
    //    { name: 'Pizza', daysSatisfied: -4, tolerance: 4 },     // Pizza non soddisfatta per nessuno dei giorni consentiti
    //    { name: 'Cinema', daysSatisfied: -5, tolerance: 5 },    // Cinema non soddisfatto per nessuno dei giorni consentiti
    //    { name: 'Pollo', daysSatisfied: -1, tolerance: 3 },     // Pollo non soddisfatto per nessuno dei giorni consentiti
    //    { name: 'Amici', daysSatisfied: 0, tolerance: 5 },     // Amici non soddisfatti per nessuno dei giorni consentiti
    //    { name: 'Sesso', daysSatisfied: 0, tolerance: 4 },     // Sesso non soddisfatto per nessuno dei giorni consentiti
    //    { name: 'Leggere', daysSatisfied: 3, tolerance: 3 },   // Leggere non soddisfatto per nessuno dei giorni consentiti
    //    { name: 'nuotare', daysSatisfied: 2, tolerance: 2 },   // Nuotare non soddisfatto per nessuno dei giorni consentiti
    //    { name: 'Cinema', daysSatisfied: 1, tolerance: 1 }     // Cinema non soddisfatto per nessuno dei giorni consentiti
    //];

    //esempio al 50
    return [
        { name: 'Sport', daysSatisfied: -3, tolerance: 10 },    // Sport non soddisfatto per nessuno dei giorni consentiti
        { name: 'Pizza', daysSatisfied: -4, tolerance: 4 },     // Pizza non soddisfatta per nessuno dei giorni consentiti
        { name: 'Cinema', daysSatisfied: -2, tolerance: 5 },    // Cinema non soddisfatto per nessuno dei giorni consentiti
        { name: 'Pollo', daysSatisfied: -1, tolerance: 3 },     // Pollo non soddisfatto per nessuno dei giorni consentiti
        { name: 'Amici', daysSatisfied: 2, tolerance: 5 },     // Amici soddisfatti per metà dei giorni consentiti
        { name: 'Sesso', daysSatisfied: 2, tolerance: 4 },     // Sesso soddisfatto per metà dei giorni consentiti
        { name: 'Leggere', daysSatisfied: 1, tolerance: 3 },   // Leggere soddisfatto per un terzo dei giorni consentiti
        { name: 'nuotare', daysSatisfied: 1, tolerance: 2 },   // Nuotare soddisfatto per metà dei giorni consentiti
        { name: 'Cinema', daysSatisfied: 1, tolerance: 1 }     // Cinema soddisfatto per l'unico giorno consentito
    ];


    // Esempio di dati simulati 100
    //return [
    //    { name: 'Sport', daysSatisfied: 10, tolerance: 10 },    // Sport soddisfatto per tutti i 10 giorni consentiti
    //    { name: 'Pizza', daysSatisfied: 4, tolerance: 4 },      // Pizza soddisfatta per tutti i 4 giorni consentiti
    //    { name: 'Cinema', daysSatisfied: 5, tolerance: 5 },     // Cinema soddisfatto per tutti i 5 giorni consentiti
    //    { name: 'Pollo', daysSatisfied: 3, tolerance: 3 },      // Pollo soddisfatto per tutti i 3 giorni consentiti
    //    { name: 'Amici', daysSatisfied: 5, tolerance: 5 },      // Amici soddisfatti per tutti i 5 giorni consentiti
    //    { name: 'Sesso', daysSatisfied: 4, tolerance: 4 },      // Sesso soddisfatto per tutti i 4 giorni consentiti
    //    { name: 'Leggere', daysSatisfied: 3, tolerance: 3 },    // Leggere soddisfatto per tutti i 3 giorni consentiti
    //    { name: 'nuotare', daysSatisfied: 2, tolerance: 2 },    // Nuotare soddisfatto per tutti i 2 giorni consentiti
    //    { name: 'Cinema', daysSatisfied: 1, tolerance: 1 }      // Cinema soddisfatto per l'unico giorno consentito
    //]

};

const LandingPage = ({ navigation }) => {
    const { theme } = useTheme();
    const { session } = useAuth();
    const [needsData, setNeedsData] = useState([]);
    const [satisfactionIndex, setSatisfactionIndex] = useState(0);

    useEffect(() => {
        if (!session) {
            navigation.replace('Login');
        }
    }, [session]);

    useEffect(() => {
        const calculateSatisfactionIndex = () => {
            if (needsData.length === 0) return 0;

            // Calcola il totale dei giorni soddisfatti e il totale della tolleranza
            const totalSatisfiedDays = needsData.reduce((acc, item) => acc + item.daysSatisfied, 0);
            const totalTolerance = needsData.reduce((acc, item) => acc + item.tolerance, 0);

            // Calcola l'indice di soddisfazione in base alla percentuale di giorni soddisfatti rispetto alla tolleranza totale
            const satisfactionIndex = (totalSatisfiedDays / totalTolerance) * 100;

            // Arrotonda l'indice di soddisfazione
            return Math.round(satisfactionIndex);
        };

        // Aggiorna lo stato dell'indice di soddisfazione quando cambiano i dati dei bisogni
        setSatisfactionIndex(calculateSatisfactionIndex());
    }, [needsData]);

    useEffect(() => {
        // Esegui il fetch dei dati dei bisogni quando il componente viene montato
        const fetchData = async () => {
            try {
                const data = await fetchNeedsData();
                setNeedsData(data);
            } catch (error) {
                console.error('Errore nel recupero dei dati dei bisogni:', error);
            }
        };

        fetchData();
    }, []);

    const option1 = {
        series: [
            {
                type: 'gauge',
                startAngle: 180,
                endAngle: 0,
                center: ['50%', '75%'],
                radius: '90%',
                min: 0,
                max: 100,
                splitNumber: 10,
                axisLine: {
                    lineStyle: {
                        width: 6,
                        color: [
                            [0.25, '#FF6E76'],
                            [0.50, '#FDDD60'],
                            [0.75, '#58D9F9'],
                            [1, '#7CFFB2']
                        ]
                    }
                },
                pointer: {
                    icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
                    length: '12%',
                    width: 20,
                    offsetCenter: [0, '-60%'],
                    itemStyle: {
                        color: 'auto'
                    }
                },
                axisTick: {
                    length: 12,
                    lineStyle: {
                        color: 'auto',
                        width: 2
                    }
                },
                splitLine: {
                    length: 20,
                    lineStyle: {
                        color: 'auto',
                        width: 5
                    }
                },
                axisLabel: {
                    color: theme.contentTitle,
                    fontSize: 14,
                    distance: -60,
                    rotate: 'tangential',
                    formatter: function (value) {
                        if (value === 87.5) {
                            return 'Grade A';
                        } else if (value === 62.5) {
                            return 'Grade B';
                        } else if (value === 37.5) {
                            return 'Grade C';
                        } else if (value === 12.5) {
                            return 'Grade D';
                        }
                        return '';
                    }
                },
                title: {
                    offsetCenter: [0, '10'],
                    fontSize: 14,
                    color: theme.grey,
                },
                detail: {
                    fontSize: 25,
                    offsetCenter: [0, '-35%'],
                    valueAnimation: true,
                    formatter: function (value) {
                        return Math.abs(Math.round(value)) + '';
                    },
                    color: 'inherit'
                },
                data: [
                    {
                        value: Math.max(0, satisfactionIndex), // Mostra almeno 0 se satisfactionIndex è negativo
                        name: 'Livello di benessere',
                        color: theme.colors.contentTitle
                    }
                ]
            }
        ]
    };

    const option3 = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            top: 20,
            bottom: 30
        },
        xAxis: {
            type: 'value',
            position: 'top',
            splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
            }
        },
        yAxis: {
            type: 'category',
            axisLine: { show: false },
            axisLabel: { show: false },
            axisTick: { show: false },
            splitLine: { show: false },
            data: needsData.map(item => item.name),
        },
        series: [
            {
                name: 'bisogni',
                type: 'bar',
                stack: 'Total',
                label: {
                    show: true,
                    formatter: '{b}'
                },
                data: needsData.map(item => {
                    const daysRemaining = item.tolerance - item.daysSatisfied;
                    if (daysRemaining >= 0) {
                        return daysRemaining; // Barra piena
                    } else {
                        return { value: -Math.abs(daysRemaining), label: { position: 'insideLeft' } }; // Barra spostata a sinistra e negativa
                    }
                })
            }
        ]
    };

    const option2 = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            top: 20,
            bottom: 30
        },
        xAxis: {
            type: 'value',
            position: 'top',
            splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
            }
        },
        yAxis: {
            type: 'category',
            axisLine: { show: false },
            axisLabel: { show: false },
            axisTick: { show: false },
            splitLine: { show: false },
            data: needsData.map(item => item.name),
        },
        series: [
            {
                name: 'bisogni',
                type: 'bar',
                stack: 'Total',
                label: {
                    show: true,
                    formatter: '{b}'
                },
                data: needsData.map(item => {
                    const daysSatisfied = item.daysSatisfied;
                    return daysSatisfied; // Barra piena
                })
            }
        ]
    };

    return (
        <Layout
            navigation={navigation}
            showTopBar={true}
            header={<Text style={theme.headerTitle}></Text>}
        //fab={<Text>+</Text>}
        //fabAction={handleFabPressHome}
        >
            <View style={theme.content}>
                <Text style={theme.contentTitle}>Ecco come stai:</Text>
                <Text style={theme.contentTitle}>Livello di benessere:</Text>

                <EChartsComponent option={option1} height={300} />

                <Text style={theme.contentTitle}>Soddisfazione dei bisogni:</Text>
                <EChartsComponent option={option2} height={350} />
            </View>
        </Layout>
    );
};

export default LandingPage;

