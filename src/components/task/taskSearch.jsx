import React, {memo, useEffect, useState} from 'react';
import {DatePicker, Select, InputNumber} from 'antd';
import * as echarts from 'echarts/core';
import {SankeyChart} from 'echarts/charts';
import {CanvasRenderer} from 'echarts/renderers';

const {RangePicker} = DatePicker;

echarts.use([SankeyChart, CanvasRenderer]);
function taskSearch() {
  const [dateItem, getDateItem] = useState(null);
  const [inputNum, getInputNum] = useState(1);
  useEffect(() => {
    const chartDom = document.getElementById('main');
    const myChart = echarts.init(chartDom);
    const option = {
      graphic: {
        elements: [
          {
            type: 'text',
            left: 'center',
            top: 'center',
            style: {
              text: '衡康净',
              fontSize: 80,
              fontWeight: 'bold',
              lineDash: [0, 200],
              lineDashOffset: 0,
              fill: 'transparent',
              stroke: '#000',
              lineWidth: 1
            },
            keyframeAnimation: {
              duration: 3000,
              loop: true,
              keyframes: [
                {
                  percent: 0.7,
                  style: {
                    fill: 'transparent',
                    lineDashOffset: 200,
                    lineDash: [200, 0]
                  }
                },
                {
                  // Stop for a while.
                  percent: 0.8,
                  style: {
                    fill: 'transparent'
                  }
                },
                {
                  percent: 1,
                  style: {
                    fill: 'black'
                  }
                }
              ]
            }
          }
        ]
      }
    };
    option && myChart.setOption(option);
  });
  const handleChange = (value) => {
    console.log(dateItem);
    getDateItem(null);
  };
  const onChangeInput = (value) => {
    getInputNum(value);
    if (value >= 2.999999) {
      getInputNum(0);
    }
  };
  return (
    <div>
      <h1 className="taskSearch">taskSearch</h1>
      <Select defaultValue="lucy" style={{width: 120}} onChange={handleChange}>
        <Select value="jack">Jack</Select>
        <Select value="lucy">Lucy</Select>
        <Select value="disabled" disabled>
          Disabled
        </Select>
        <Select value="Yiminghe">yiminghe</Select>
      </Select>
      <RangePicker value={dateItem} onChange={(val) => getDateItem(val)} />
      <InputNumber
        style={{
          width: 200,
        }}
        value={inputNum}
        min={0}
        max={2.999999}
        onChange={onChangeInput}
        stringMode
      />
      <div id="main" style={{width: 1000, height: 500}} />
    </div>
  );
}

export default memo(taskSearch);
