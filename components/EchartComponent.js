import React, { useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const EChartsExample = () => {
    const webViewRef = useRef(null);

    useEffect(() => {
        if (webViewRef.current) {
            // Definisci l'opzione del grafico con i dati di esempio
            const option = {
                dataset: {
                    source: [
                        ['score', 'amount', 'product'],
                        [-4, -4, 'Matcha Latte'],
                        [0, 7, 'Milk Tea'],
                        [0, 4, 'Cheese Cocoa'],
                        [0, 2, 'Cheese Brownie'],
                        [0, 5, 'Matcha Cocoa'],
                        [6, 10, 'Tea'],
                        [0, 3, 'Orange Juice'],
                        [0, 2, 'Lemon Juice'],
                        [0, 2, 'Walnut Brownie']
                    ]
                },
                grid: { containLabel: true },
                xAxis: { name: 'amount' },
                yAxis: { type: 'category' },
                visualMap: {
                    orient: 'horizontal',
                    left: 'center',
                    min: -5,
                    max: 5,
                    text: ['High Score', 'Low Score'],
                    dimension: 0,
                    inRange: {
                        color: ['#ff0000', '#00ff00']
                    }
                },
                series: [
                    {
                        type: 'bar',
                        encode: {
                            x: 'amount',
                            y: 'product'
                        }
                    }
                ]
            };

            // Inietta lo script per configurare il grafico con l'opzione definita
            const script = `
        var myChart = echarts.init(document.getElementById('chart'));
        myChart.setOption(${JSON.stringify(option)});
      `;

            webViewRef.current.injectJavaScript(script);
        }
    }, []);

    return (
        <View style={styles.container}>
            <WebView
                ref={webViewRef}
                originWhitelist={['*']}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                source={{
                    html: `
          <html>
            <head>
              <script src="https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js"></script>
              <style>
                body, html, #chart {
                  height: 100%;
                  width: 100%;
                  margin: 0;
                  padding: 0;
                }
              </style>
            </head>
            <body>
              <div id="chart"></div>
            </body>
          </html>
        ` }}
                style={styles.webview}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webview: {
        flex: 1,
    },
});

export default EChartsExample;
