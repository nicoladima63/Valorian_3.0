import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { WebView } from 'react-native-webview';

const EChartsComponent = ({ option,  height }) => {
    const { theme } = useTheme();

    const echartsHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js"></script>
    </head>
    <body>
        <div id="main" style="width: 100%; height: ${height}px;"></div>
        <script>
        var chart = echarts.init(document.getElementById('main'));
        chart.setOption(${JSON.stringify(option)});
      </script>
    </body>
    </html>
  `;

    return (
        <WebView style={{backgroundColor:theme.background}}
            originWhitelist={['*']}
            source={{ html: echartsHtml }}
        />
    );
};

export default EChartsComponent;
