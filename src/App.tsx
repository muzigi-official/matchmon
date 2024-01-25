import React, { useState } from 'react';
import './App.css';

import { Provider } from 'react-redux';
import store from './redux/store';

import { BrowserRouter } from 'react-router-dom';
import Router from './router/Router';

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
