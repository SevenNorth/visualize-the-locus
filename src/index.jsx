import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Provider } from 'react-redux';
import "@arcgis/core/assets/esri/themes/light/main.css";

import Main from './pages/main/Main';
import './App.less';

import fm from './redux';

const store = fm.store;
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
            <Route path='/' element={ <Main /> } />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);