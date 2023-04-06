import React from 'react';
import {Redirect} from 'react-router-dom';
import taskSearch from '../components/task/taskSearch';
import taskAudit from '../components/task/taskAudit';
import home from '../view/home/home';
import system from '../view/system/system';
import NotFound from '../view/notFound';
import Auth from '../router/auto';


const routers = [
  {path: '/404', component: NotFound},
  {path: '/', exact: true, render: () => <Redirect to="/home" />},
  {path: '/system', component: system},
  {
    path: '/home',
    component: home,
    children: [
      {
        path: '/home/taskSearch',
        component: taskSearch
      },
      {
        path: '/home/taskAudit',
        component: taskAudit
      }
    ]
  }
];
export default routers;
