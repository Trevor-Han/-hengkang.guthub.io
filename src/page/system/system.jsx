import React, {memo, useState, useEffect,useRef} from 'react';
import {HistoryOutlined} from '@ant-design/icons';
// import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {Layout, Col, Row, Button} from 'antd';
import './system.css';
import { defaultList} from './systemDataList'

const {
  Header, Footer, Sider, Content
} = Layout;
let listMap = JSON.parse(JSON.stringify(defaultList))
listMap.forEach(item =>{
  item.children.forEach(v =>{
    v.type = '1'
  })
})

function System(props) {
  const navigate = useNavigate()
  const defaultTime = new Date().toLocaleTimeString();
  const [time, setTime] = useState(defaultTime);
  const [list, setList] = useState(listMap);
  const [tip] = useState(document.createElement('div'));
  const contentView = useRef()

  // 处理加载数据
  const changeListMap = (type) => {
    const changeMap = type === '2'?[...list] : JSON.parse(JSON.stringify(defaultList));
    changeMap.forEach(item => {
      item.children.forEach(val => {
        val.type = type;
        if (type === '2'){
          val.name = ''
        }
      });
    });
    return changeMap;
  };
  const goBack = () => {
    navigate('/home');
  };
  // 点击数据变化按钮
  const handleChange = (e) => {
    if (e !== '4') {
      setList(changeListMap(e));
    } else {
      const listMap = JSON.parse(JSON.stringify(defaultList));
      listMap.forEach(item => {
        item.children.forEach(val => {
          if (val.type === '2'){
            val.name = ''  // 空缺时清空人名
          }
        });
      });
      setList(listMap);
    }
  };
  // 添加tip
  const showInfo = (e,item) =>{
    let x = e.clientX
    let y = e.clientY
    let color = '#6293ea'
    let colorList = [
      {type:'1',color:'#ac4a61'},
      {type:'2',color:'#3eaf7c'},
      {type:'3',color:'#ffa500'},
    ]
    colorList.forEach(v =>{
      if (v.type === item.type){
        color = v.color
      }
    })
    tip.style.cssText =
        `display: none;
           position: absolute;
           background: #fff;
           color: #333;
           border-radius: 5px;
           border: 1px solid ${color};
           padding: 10px;
           font-size: 8px;
           z-index: 99;`;
    let html = '';
    html += `<p>${item.title}</p>`;
    html += `<p>姓名：${item.name}</p>`;

    tip.innerHTML = html;
    tip.style.left = (x + 15) + 'px';
    tip.style.top = (y +15) + 'px';
    tip.style.display = 'block';
  }
  // 清除tip
  const delInfo = () =>{
    tip.style.display = 'none';
  }

  useEffect(() => {
    document.body.appendChild(tip)
    setInterval(() => {
      setTime(new Date().toLocaleString());
    }, 1000);
    return () => {};
  });
  return (
    <Layout className="system">
      <Sider>Sider</Sider>
      <Layout>
        <Header className="header">
          <Row>
            <Col span={16} className="header-title">康复科床位使用情况</Col>
            <Col span={8}>
              <span><HistoryOutlined /> {time}</span>
            </Col>
          </Row>
        </Header>
        <Content className="content">
          <div className="content-view">
            {list.map(item => (
              <div className="content-item" key={item.id}>
                <p className="content-title">{item.title}</p>
                <div className="content-wrapper">
                  {item.children.map(val => {
                    const style = val.type === '1' ? 'content-slide button1' :
                      (val.type === '2' ? 'content-slide button2' : 'content-slide button3');
                    return <div
                        ref={contentView}
                        className={style}
                        key={val.id}
                        onMouseMove={(e)=>showInfo(e,val)}
                        onMouseLeave={()=>delInfo()}
                    >
                      {val.type === '2'?'空缺': val.name}
                    </div>;
                  })}
                </div>
              </div>
            ))}
          </div>
          <div>
            <span className="button-span button1" onClick={() => handleChange('1')}>有人</span>
            <span className="button-span button2" onClick={() => handleChange('2')}>空缺</span>
            <span className="button-span button3" onClick={() => handleChange('3')}>等待</span>
            <span className="button-span button4" onClick={() => handleChange('4')}>随机</span>
            {/*<span className="button-span button4" onClick={() => stopInterval()}>停止自动</span>*/}
          </div>
        </Content>
        <Footer>
          <Button type="primary" shape="round" onClick={() => goBack()}>返回首页</Button>
        </Footer>
      </Layout>
    </Layout>
  );
}

export default memo(System);
