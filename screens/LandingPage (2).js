import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import EChartsComponent from '../components/EChartsComponent';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { AppContext } from '../context/AppContext';
import Layout from './Layout';

const LandingPage = ({ navigation }) => {
    const { theme } = useTheme();
    const { session } = useAuth(); // Accedi ai dati della sessione

    useEffect(() => {
        if (!session) {
            navigation.replace('Login');
        } 
    }, [session]);


    const option1 = {
        series: [
            {
                type: 'gauge',
                startAngle: 180,
                endAngle: 0,
                center: ['50%', '75%'],
                radius: '90%',
                //limiti del gauge
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
                    //i numeri intorno al gauge
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
                    //posizione rispetto al basso del gauge
                    offsetCenter: [0, '10'],
                    //titolo al centro del gauge= livello di benessere
                    fontSize: 14,
                    color: theme.grey,
                },
                detail: {
                    //numero al centro del gauge
                    fontSize: 25,
                    offsetCenter: [0, '-35%'],
                    valueAnimation: true,
                    formatter: function (value) {
                        return Math.round(value * 100) + '';
                    },
                    color: 'inherit'
                },
                data: [
                    {
                        //valore iniziale del gauge
                        value: 0,
                        name: 'Livello di benessere',
                        color: theme.colors.contentTitle

                    }
                ]
            }
        ]
    };

    const labelRight = {
        position: 'right'
    };

    const option2 = {
        title: {
            text: 'Soddisfazione dei bisogni',
            color: theme.colors.contentTitle
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            top: 80,
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
            data: [
                'pizza',
                'corsa',
                'leggere',
                'amici',
                'dipingere',
                'film',
                'aperitivo',
                'cena con partner',
                'pescare',
                'tempo per me'
            ]
        },
        series: [
            {
                name: 'Cost',
                type: 'bar',
                stack: 'Total',
                label: {
                    show: true,
                    formatter: '{b}'
                },
                data: [
                    { value: -0.07, label: labelRight },
                    { value: -0.09, label: labelRight },
                    0.2,
                    0.44,
                    { value: -0.23, label: labelRight },
                    0.08,
                    { value: -0.17, label: labelRight },
                    0.47,
                    { value: -0.36, label: labelRight },
                    0.18
                ]
            }
        ]
    };

    const handleFabPressHome = () => {
        if (fabAction) {
            fabAction();
        }
    };

    return (
        <Layout
            navigation={navigation}
            showTopBar={true}
            header={<Text style={theme.headerTitle}></Text>}
            //fab={<Text>+</Text>}
            fabAction={handleFabPressHome}
        >
            <View style={theme.content}>

                <Text style={theme.contentTitle}>Ecco come stai</Text>
                {/*<View style={{ flex: 1, marginTop: 0 }}>*/}
                    <EChartsComponent option={option1} height={300} />
                    <EChartsComponent option={option2} height={300} />
            {/*    </View>*/}
            </View>
        </Layout>
    );
};

export default LandingPage;
