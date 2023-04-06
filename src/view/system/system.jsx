import React, {memo, useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {HistoryOutlined} from '@ant-design/icons';
// import styled from 'styled-components';
import {Layout, Col, Row, Button, Radio} from 'antd';
import './system.css';

const {
  Header, Footer, Sider, Content
} = Layout;
const defaultList = [{
  title: '1号科室',
  id: '1',
  children: [
    {type: '1', title: '床位xxx', id: '1-1'},
    {type: '2', title: '床位xxx', id: '1-2'}
  ]
},
{
  title: '2号科室',
  id: '2',
  children: [
    {type: '1', title: '床位xxx', id: '2-1'},
    {type: '1', title: '床位xxx', id: '2-2'}
  ]
},
{
  title: '3号科室',
  id: '3',
  children: [
    {type: '1', title: '床位xxx', id: '3-1'},
    {type: '1', title: '床位xxx', id: '3-2'}
  ]
},
{
  title: '4号科室',
  id: '4',
  children: [
    {type: '2', title: '床位xxx', id: '4-1'},
    {type: '3', title: '床位xxx', id: '4-2'}
  ]
},
{
  title: '5号科室',
  id: '5',
  children: [
    {type: '2', title: '床位xxx', id: '5-1'},
    {type: '1', title: '床位xxx', id: '5-2'}
  ]
},
{
  title: '6号科室',
  id: '6',
  children: [
    {type: '1', title: '床位xxx', id: '6-1'},
    {type: '3', title: '床位xxx', id: '6-2'}
  ]
}];

function system(props) {
  const defaultTime = new Date().toLocaleTimeString();
  const [time, setTime] = useState(defaultTime);
  const [timers, setTimers] = useState(null);
  const [list, setList] = useState([
    {
      title: '1号科室',
      id: '1',
      children: [
        {type: '1', title: '床位xxx', id: '1-1'},
        {type: '2', title: '床位xxx', id: '1-2'}
      ]
    },
    {
      title: '2号科室',
      id: '2',
      children: [
        {type: '1', title: '床位xxx', id: '2-1'},
        {type: '1', title: '床位xxx', id: '2-2'}
      ]
    },
    {
      title: '3号科室',
      id: '3',
      children: [
        {type: '1', title: '床位xxx', id: '3-1'},
        {type: '1', title: '床位xxx', id: '3-2'}
      ]
    },
    {
      title: '4号科室',
      id: '4',
      children: [
        {type: '2', title: '床位xxx', id: '4-1'},
        {type: '3', title: '床位xxx', id: '4-2'}
      ]
    },
    {
      title: '5号科室',
      id: '5',
      children: [
        {type: '2', title: '床位xxx', id: '5-1'},
        {type: '1', title: '床位xxx', id: '5-2'}
      ]
    },
    {
      title: '6号科室',
      id: '6',
      children: [
        {type: '1', title: '床位xxx', id: '6-1'},
        {type: '3', title: '床位xxx', id: '6-2'}
      ]
    }]);

  const changeListMap = (type) => {
    const changeMap = [...list];
    changeMap.forEach(item => {
      item.children.forEach(val => {
        val.type = type;
      });
    });
    return changeMap;
  };
  const goBack = () => {
    props.history.push('/home');
  };
  const handleChange = (e) => {
    if (e !== '4') {
      setList(changeListMap(e));
    } else {
      const listMap = JSON.parse(JSON.stringify(defaultList));
      setList(listMap);
    }
    console.log(list);
  };
  const stopInterval = () => {
    const timer = setInterval(() => {
      const count = Math.floor(Math.random() * 4) + 1;
      handleChange(count.toString());
    }, 5000);
    return timer;
  };

  useEffect(() => {
    setInterval(() => {
      setTime(new Date().toLocaleString());
    }, 1000);
    // const timer = setInterval(() => {
    //   const count = Math.floor(Math.random() * 4) + 1;
    //   handleChange(count.toString());
    // }, 5000);
    return () => {
      // clearInterval(timer);
    };
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
                    return <div className={style} key={val.id}>{val.title}</div>;
                  })}
                </div>
              </div>
            ))}
          </div>
          <div>
            <span className="button-span button1" onClick={() => handleChange('1')}>有人</span>
            <span className="button-span button2" onClick={() => handleChange('2')}>空缺</span>
            <span className="button-span button3" onClick={() => handleChange('3')}>等待</span>
            <span className="button-span button4" onClick={() => handleChange('4')}>复位</span>
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

export default withRouter(memo(system));
