import React, {memo,useEffect} from 'react';
import * as echarts from 'echarts/core';
import {GraphicComponent} from 'echarts/components';
import {CanvasRenderer} from 'echarts/renderers';
import { useNavigate } from 'react-router-dom';
import {Button} from 'antd';
import './home.css';

echarts.use([GraphicComponent, CanvasRenderer]);

function Home() {
  const navigate = useNavigate()
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
              duration: 4000,
              loop: false,
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

  const handleIntoSystem = () => {
    navigate('/system');
  };
  return (
    <div className="home">
      <div className="center-item">
        <div id="main" style={{width: 500, height: 150}} />
        <p>基于新冠疫情防控下的智能医护床位管理系统</p>
        <Button type="primary" shape="round" onClick={() => handleIntoSystem()}>进入系统</Button>
      </div>

    </div>
  );
}

export default memo(Home);
