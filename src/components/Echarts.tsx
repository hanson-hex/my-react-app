import echarts, { EChartOption } from 'echarts';
import React, { useEffect } from 'react';
import _ from 'lodash';

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


export default Charts;