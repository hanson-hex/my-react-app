import echarts, { EChartOption } from 'echarts';
import React, { Component, useEffect } from 'react';
import _ from 'lodash';

class Echarts extends Component {
    componentDidMount () {
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
        const chartDom = document.getElementById('chart') as HTMLCanvasElement;
        const myEcharts = echarts.init(chartDom);
        myEcharts.setOption(option)
    }
    render() {
        return (
            <div>
                <div id="chart" style={{width: '100%', height: '300px'  }}></div>
            </div>
        );
    }
}


export interface IChartsProps {
    // unique
    id: string,
    option?: EChartOption,
    style?: {
        width: string,
        height: string
    },
    className?: string
}

export const Charts = (props: IChartsProps): React.ReactElement  => {
    const {
        className,
        option,
        id,
        style = {
            width: '100%',
            height: '100vh'
        }
    } = props;

    let chartDom: HTMLDivElement | HTMLCanvasElement | null = null;
    useEffect(() => {
        let instance = chartDom && (echarts.getInstanceByDom(chartDom) || echarts.init(chartDom));
        if (!instance || !option) {
            return;
        }
        instance.setOption(option);

        const resize = () => instance?.resize();
        const debounceReize = _.debounce(resize, 500)
        window.addEventListener('resize',  debounceReize);

        return () => {
            instance && echarts.dispose(instance);
            window.removeEventListener('resize', debounceReize);
        };


    }, [chartDom, option]);

    return (
        <div 
        id={id}
        ref={dom => dom && (chartDom = dom as HTMLDivElement)} 
        style={style} 
        className={className}
         ></div>
    );
}


export default Echarts;