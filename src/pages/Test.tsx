import React from 'react';
import { Charts } from './../components/Echarts';

function Test(props: any) {

    const option = {
        xAxis: {
            type: ('category' as 'category'),
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        legend: {
            left: 0,
            selector: true,
            textStyle: {
                fontSize: 20
            },
            data: [
                {
                    name: '显示',
                    // icon: 'circle'
                }
            ]
        },
        yAxis: {
            type: ('value' as 'value')
        },
        series: [{
            name: '显示',
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
                color: 'rgba(220, 220, 220, 0.8)'
            }
        }]
    };

    return (
        <div>
            <Charts 
            id="chart1" 
            style={{width: '100%', height: '400px'}}
            option={option} 
            />
        </div>
    );
}

export default Test;