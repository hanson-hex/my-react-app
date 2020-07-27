import * as React from "react";
import ReactEcharts from "echarts-for-react";
import "echarts/lib/component/tooltip";
import _ from 'lodash';
import echarts, { EChartOption } from "echarts";

function Test(props: any) {
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

    const settingIntervals = [0.1, 0.4, 1, 2, 3, 5, 10, 25, 50, 100, 1000, 10000, 100000];
    const maxSettingValues = settingIntervals.map(item => item * 4);
    const xAxisNames = extendList.map(item => item.xAxisName)
    const charts = extendList.map(item => item.chatCount)
    const missCharts = extendList.map(item => item.missedChatCount)
    const refusedCharts = extendList.map(item => item.refusedChatCount)
    const allCharts = extendList.map(item => item.chartsCount)
    const visits = extendList.map(item => item.visitCount)
    const chatAcceptances = extendList.map(item => item.chatAcceptanceRate)

    const maxAllChart = Math.max(...allCharts);
    _.findLastIndex(maxSettingValues, (maxSettingValue) => {
        return maxSettingValue < maxAllChart
    })

    


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
          show: false,
        },
        axisLabel: {
          color: "#637381", // y axis color
        },
        splitNumber: 4,
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
        splitNumber: 4,
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
          color: "#3EC32D", // y axis color
        },
        splitNumber: 4,
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
        name: "Chat Acceptance Rate",
        data: chatAcceptances,
        yAxisIndex: 1,
        type: "line",
        itemStyle: {
          normal: { color: "#3EC32D" },
        },
      },
      {
        name: "Visits",
        yAxisIndex: 2,
        data: visits,
        type: "line",
        itemStyle: {
          normal: { color: "#756DD0" },
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

  const handleToggle = (e: any): void => {};

  return (
    <div>
      <ReactEcharts
        option={option}
        ref={(dom) => dom && (chartDom = dom as ReactEcharts)}
        style={style}
        onChartReady={onChartReadyCallBack}
      />
      <button onClick={(e) => handleToggle}>切换显示</button>
      <button onClick={(e) => handleToggle}>切换显示折线</button>
    </div>
  );
}

export default Test;
