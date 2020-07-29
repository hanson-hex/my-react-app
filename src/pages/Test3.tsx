import * as React from "react";
import ReactEcharts from "echarts-for-react";
import "echarts/lib/component/tooltip";
import _ from 'lodash';

function Test3(props: any) {
    const dataList = [
        {
            chatCount: 1,
            missedChatCount: 0,
            refusedChatCount: 0,
            visitCount: 1,
            chatAcceptanceRate: 100,
            xAxisName: 'Jun'
        },
        {
            chatCount: 16,
            missedChatCount: 7,
            refusedChatCount: 5,
            visitCount: 19,
            chatAcceptanceRate: 10,
            xAxisName: 'Jul'
        }
    ]

    const extendList = dataList.map(item => ({...item, chartsCount: item.chatCount + item.missedChatCount + item.refusedChatCount}))

    const settingIntervals = [0.1, 0.4, 1, 2, 3, 5, 10, 25, 50, 100, 500, 1000, 5000, 10000, 50000, 100000];
    const maxSettingValues = settingIntervals.map(item => item * 4);
    const xAxisNames = extendList.map(item => item.xAxisName)
    const charts = extendList.map(item => item.chatCount)
    const missCharts = extendList.map(item => item.missedChatCount)
    const refusedCharts = extendList.map(item => item.refusedChatCount)
    const allCharts = extendList.map(item => item.chartsCount)
    const visits = extendList.map(item => item.visitCount)
    const chatAcceptances = extendList.map(item => item.chatAcceptanceRate)


    const maxAllChart = Math.max(...allCharts);
    const cIndex = _.findLastIndex(maxSettingValues, (maxSettingValue) => {
        return maxSettingValue < maxAllChart
    })
    const chartIndex = cIndex + 1
    const maxYCharts = maxSettingValues[chartIndex]
    const intervalCharts = settingIntervals[chartIndex]

    const maxVisit = Math.max(...visits);
    const vIndex = _.findLastIndex(maxSettingValues, (maxSettingValue) => {
      return maxSettingValue < maxVisit
    })
    const visitIndex = vIndex + 1
    const maxYVisits = maxSettingValues[visitIndex]
    const intervalVisits = settingIntervals[visitIndex]


    const maxChatAccept = Math.max(...chatAcceptances)
    const Aindex = _.findLastIndex(maxSettingValues, (maxSettingValue) => {
      return maxSettingValue < maxChatAccept
    })
    const AcceptIndex = Aindex + 1
    const maxYAccept = maxSettingValues[AcceptIndex]
    const intervalAccept = settingIntervals[AcceptIndex]
    
  const option = {
    tooltip: {
      trigger: "axis" as "axis",
      axisPointer: {
        type: "line" as "line",
      },
      textStyle: {
        color: "#66788A",
      },
      extraCssText: "box-shadow:0px 1px 3px rgba(63,63,68,0.15);",
      backgroundColor: "#fff",
    },
    grid: {
      top: 50,
      left: 50,
      right: 50,
      bottom: 50
    },
    xAxis: {
      type: "category" as "category",
      axisTick: {
        show: false, // 不显示刻度
      },
      axisLabel: {
        color: "#A6B1BB",
      },
      axisLine: {
        lineStyle: {
          color: "#E4E7EB",
          type: "dashed" as "dashed",
        },
      },
    //   data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    data: xAxisNames
    },
    yAxis: [
      {
        type: "value" as "value",
        axisTick: {
          show: false, // 不显示刻度
        },
        axisLine: {
          show: false,  // 不显示线
        },
        axisLabel: {
          color: "#637381", // y axis color
        },
        min: 0,
        max: maxYCharts,        // 计算最大值
        interval: intervalCharts,
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed" as "dashed",
            color: "#E4E7EB",
          },
        },
      },
      {
        type: "value" as "value",
        axisTick: {
          show: false, // 不显示刻度
        },
        axisLine: {
          show: false,
        },
        position: "right" as "right",
        axisLabel: {
          color: "#9791DB", // y axis color
        },
        min: 0,
        max: maxYVisits,
        interval: intervalVisits,
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed" as "dashed",
            color: "#E4E7EB",
          },
        },
      },
      {
        type: "value" as "value",
        axisTick: {
          show: false, // 不显示刻度
        },
        axisLine: {
          show: false,
        },
        position: "right" as "right",
        axisLabel: {
          color: "#3EC32D", // y axis color green
        },
        min: 0,
        max: maxYAccept,
        interval: intervalAccept,
        offset: 40,
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed" as "dashed",
            color: "#E4E7EB",
          },
        },
      },
    ],
    legend: {
      // data:["Chats", "Missed Chats","Refused Chats", "Visits", "Chat Acceptance Rate"],
      show: false
    },
    series: [
      {
        name: "Chats",
        data: charts,
        barMaxWidth: "50",
        type: "bar",
        stack: "chats",
        itemStyle: {
          normal: { color: "#026AB5" },
        },
      },
      {
        name: "Missed Chats",
        data: missCharts,
        barMaxWidth: "50",
        type: "bar",
        stack: "chats",
        itemStyle: {
          normal: { color: "#58AAf0" },
        },
      },
      {
        name: "Refused Chats",
        data: refusedCharts,
        barMaxWidth: "50",
        type: "bar",
        stack: "chats",
        itemStyle: {
          normal: { color: "#76DAFF" },
        },
      },
      {
        name: "Visits",
        yAxisIndex: 1,
        data: visits,
        type: "line",
        itemStyle: {
          normal: { color: "#756DD0" },
        },
      },
      {
        name: "Chat Acceptance Rate",
        data: chatAcceptances,
        yAxisIndex: 2,
        type: "line",
        itemStyle: {
          normal: { color: "#3EC32D" },
        },
      },
    ],
  };

  const style = {
    width: "100%",
    height: "466px",
  };

  let chartDom: ReactEcharts | null = null;
  const onChartReadyCallBack = (e: any) => {
    console.log("e:", e);
  };

  const handleToggleChart = (e: any): void => {
    const instance = chartDom?.getEchartsInstance()
    console.log('instance:', instance)
    instance?.dispatchAction({
      type: 'legendToggleSelect',
      name: 'Chats'
    })
  };
  const handleToggle = (e: any): void => {
    const instance = chartDom?.getEchartsInstance()
    console.log('instance:', instance)
    instance?.dispatchAction({
      type: 'legendToggleSelect',
      name: 'Visits'
    })
  };

  return (
    <div>
      <ReactEcharts
        option={option}
        ref={(dom) => dom && (chartDom = dom as ReactEcharts)}
        style={style}
        onChartReady={onChartReadyCallBack}
      />
      <button onClick={handleToggleChart}>切换显示</button>
      <button onClick={handleToggle}>切换显示折线</button>
    </div>
  );
}

export default Test3;
