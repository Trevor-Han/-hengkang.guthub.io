import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import './App.css';
import routers from './router';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      { renderRoutes(routers)}
    </Switch>
  </BrowserRouter>
  , document.getElementById('app')
);
