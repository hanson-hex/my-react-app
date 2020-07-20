import React from 'react';
import { Charts } from './../components/Echarts';

function Test(props: any) {

    const option = {
        xAxis: {
            type: ('category' as 'category'),
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: ('value' as 'value')
        },
        series: [{
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
            option={option} 
            />
        </div>
    );
}

export default Test;