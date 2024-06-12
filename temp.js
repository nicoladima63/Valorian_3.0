import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import EChartsComponent from '../components/EChartsComponent';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import Layout from './Layout';
import * as echarts from 'echarts';

const LandingPage = ({ navigation }) => {
    const { theme } = useTheme();
    const { session } = useAuth(); // Accedi ai dati della sessione
    const [themeLoaded, setThemeLoaded] = useState(false);

    useEffect(() => {
        // Carica e registra i temi
        const loadThemes = async () => {
            const darkTheme = await fetch('path/to/dark.json').then(response => response.json());
            const lightTheme = await fetch('path/to/light.json').then(response => response.json());
            echarts.registerTheme('dark', darkTheme);
            echarts.registerTheme('light', lightTheme);
            setThemeLoaded(true); // Imposta il flag a true una volta che i temi sono caricati
        };

        loadThemes();
    }, []);

    // Definisci il colore di background
    const currentTheme = theme.darkMode ? 'dark' : 'light';
    console.log('currentTheme', currentTheme);

    const option1 = {
        series: [
            {
                type: 'gauge',
                startAngle: 180,
                endAngle: 0,
                center: ['50%', '75%'],
                radius: '95%',
                min: 0,
                max: 1,
                splitNumber: 8,
                axisLine: {
                    lineStyle: {
                        width: 6,
                        color: [
                            [0.25, '#FF6E76'],
                            [0.5, '#FDDD60'],
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
                    color: '#464646',
                    fontSize: 20,
                    distance: -60,
                    rotate: 'tangential',
                    formatter: function (value) {
                        if (value === 0.875) {
                            return 'Grade A';
                        } else if (value === 0.625) {
                            return 'Grade B';
                        } else if (value === 0.375) {
                            return 'Grade C';
                        } else if (value === 0.125) {
                            return 'Grade D';
                        }
                        return '';
                    }
                },
                title: {
                    offsetCenter: [0, '-10%'],
                    fontSize: 20,
                },
                detail: {
                    fontSize: 30,
                    offsetCenter: [0, '-35%'],
                    valueAnimation: true,
                    formatter: function (value) {
                        return Math.round(value * 100) + '';
                    },
                    color: 'inherit'
                },
                data: [
                    {
                        value: 0.8,
                        name: 'Livello di benessere'
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
            text: 'Soddisfazione dei bisogni'
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

    // Render solo se i temi sono stati caricati
    if (!themeLoaded) {
        return <Text>Loading...</Text>;
    }

    return (
        <Layout
            navigation={navigation}
            showTopBar={false}
            header={<Text style={theme.headerTitle}>Valorian</Text>}
            //fab={<Text>+</Text>}
            fabAction={handleFabPressHome}
        >
            <Text style={theme.contentTitle}>Bisogni</Text>
            <View style={{ flex: 1, marginTop: 0 }}>
                <EChartsComponent option={option1} theme={currentTheme} height={300} />
                <EChartsComponent option={option2} theme={currentTheme} height={300} />
            </View>
        </Layout>
    );
};

export default LandingPage;
