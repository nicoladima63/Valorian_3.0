import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import * as BisController from '../controllers/bisogniController';
import * as DetController from '../controllers/dettagliController';
import EChartsComponent from '../components/EChartsComponent';
import Layout from './Layout';
import Spinner from 'react-native-loading-spinner-overlay';
import { MaterialIcons } from '@expo/vector-icons';

const StatusPage = ({ navigation }) => {
    const { theme } = useTheme();
    const { session } = useAuth();
    const [loading, setLoading] = useState(false);

    const [needsData, setNeedsData] = useState([]);
    const [soddisfazione, setSoddisfazione] = useState(0);
    const [bisogno, setBisogno] = useState({});
    const [bisogni, setBisogni] = useState([]);
    const [dettaglio, setDettaglio] = useState({});
    const [dettagli, setDettagli] = useState([]);

    useEffect(() => {
        if (!session) {
            navigation.replace('Login');
        } else {
            getBisogni();
        }
    }, [session]);


    const getBisogni = async () => {
        setLoading(true);

        try {
            const data = await BisController.getBisogni()
            setBisogni(data)
            setLoading(false);
            return data
        } catch (error) {
            console.log('Errore nel reupero dei bisogni:', error)
        }

    };

    const getDettagli = async (bisognoid) => {
        try {
            const data = await DetController.getDettagli(bisognoid)
            setBisogni(data)
            return data
        } catch (error) {
            console.log('Errore nel reupero dei bisogni:', error)
        }
    };

    function calcolaDifferenzaGiorni(bisogno) {
        const oggi = new Date();
        const dataUltimaSoddisfazione = new Date(bisogno.soddisfattoil);
        const differenzaGiorni = Math.floor((oggi - dataUltimaSoddisfazione) / (1000 * 60 * 60 * 24)); // Calcola la differenza in giorni
        return differenzaGiorni;
    }
    function calcolaStato(bisogno) {
        const oggi = new Date();
        const dataUltimaSoddisfazione = new Date(bisogno.soddisfattoil);
        const differenzaGiorni = calcolaDifferenzaGiorni(bisogno);
        const stato = bisogno.tolleranza - differenzaGiorni;
        console.log('stato', stato, bisogno.nome, bisogno.tolleranza)
        return stato;
    }




    useEffect(() => {
        const calcolaIndiceSoddisfazione = () => {
            if (bisogni.length === 0) return 0;

            // Calcola il totale dei giorni soddisfatti e il totale della tolleranza
            const totaleGiorniSoddisfatti = bisogni.reduce((acc, item) => acc + calcolaDifferenzaGiorni(item.soddisfattoil), 0);
            console.log('totaleGiorniSoddisfatti', totaleGiorniSoddisfatti)
            const totalToleranze = bisogni.reduce((acc, item) => acc + item.tolleranza, 0);
            console.log('totalToleranze', totalToleranze)
            // Calcola l'indice di soddisfazione in base alla percentuale di giorni soddisfatti rispetto alla tolleranza totale
            const indiceSoddisfazione = (totaleGiorniSoddisfatti / totalToleranze) * 100;
            console.log('indiceSoddisfazione', indiceSoddisfazione)

            // Arrotonda l'indice di soddisfazione
            return Math.round(indiceSoddisfazione);
        };

        // Aggiorna lo stato dell'indice di soddisfazione quando cambiano i dati dei bisogni
        setSoddisfazione(calcolaIndiceSoddisfazione());
    }, [needsData]);


    const optionGauge = {
        series: [
            {
                type: 'gauge',
                startAngle: 180,
                endAngle: 0,
                center: ['50%', '60%'],
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
                    color: theme.colors.onBackground,
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
                        value: Math.max(0, soddisfazione), // Mostra almeno 0 se satisfactionIndex è negativo
                        //name: 'Livello di benessere',
                        color: theme.colors.onBackground
                    }
                ]
            }
        ]
    };


    const optionBar = {
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
            data: bisogni.map(item => item.nome),
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
                data: bisogni.map(item => {
                    const daysSatisfied = calcolaStato(item);
                    return daysSatisfied; // Barra piena
                }),
                itemStyle: {
                    color: function (params) {
                        // Cambia colore basato sul valore negativo
                        return params.data < 0 ? theme.colors.red12 : theme.colors.blue12;
                    }
                }
            }
        ]
    };

    const handlePressFab = () => {
        getBisogni();
    };

    return (
        <Layout
            navigation={navigation}
            showTopBar={true}
            header={
                <Text style={[theme.h4, theme.mb20, theme.mt10, theme.ml10,]}>Ecco come stai</Text>
            }
            fab={<MaterialIcons name="replay" size={24} color={theme.colors.onPrimary} />}
            fabAction={handlePressFab}
        >
            <View style={[theme.body, { borderTopColor: theme.colors.slate7, borderTopWidth: 1, paddingTop: 10 }]}>

                <View style={{ flex: 1 }}>

                    <Text style={theme.h5}>Livello di benessere:</Text>
                    <View style={{ height: 250 }}>
                        <EChartsComponent option={optionGauge} height={300} />
                    </View>

                    <Text style={theme.h5}>Soddisfazione dei bisogni:</Text>
                    <View style={{ height: 300 }}>
                        <EChartsComponent option={optionBar} height={300} />
                    </View>
                </View>
            </View>
            <Spinner
                visible={loading}
                textContent={'Aggiornamento in corso...'}
                textStyle={styles.spinnerTextStyle}
            />

        </Layout>
    );
};
const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#00000090'
    },
});


export default StatusPage;

