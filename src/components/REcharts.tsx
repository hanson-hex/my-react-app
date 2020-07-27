import * as React from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts, { EChartOption } from 'echarts';


export interface IChartsProps {
    option: EChartOption,
    style?: {
        width: string,
        height: string
    },
}

export const REcharts = (props: IChartsProps): React.ReactElement  => {
    const {
        option,
        style = {
            width: '100%',
            height: '466px'
        }
    } = props;

    let chartDom: ReactEcharts | null = null;
    const onChartReadyCallBack = (e: any) => {
        console.log('e:', e)
    }

    return (
<ReactEcharts
  option={option}
  ref={dom => dom && (chartDom = dom as ReactEcharts)}
  style={style}
  onChartReady={onChartReadyCallBack} />
    )
}