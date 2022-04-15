import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { createStore } from 'redux' ;
import { Provider } from 'react-redux';
import "@arcgis/core/assets/esri/themes/light/main.css";

import rootState from './redux';

const store = createStore(rootState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
            <Route path='/' element={ <App /> } />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);