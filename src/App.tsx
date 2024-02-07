import React, { useMemo } from 'react';
import { merge } from 'ts-deepmerge';
import './App.css';
import { ToastContainer } from 'react-toastify';

import { Provider } from 'react-redux';
import store from '@/redux/store';

import { BrowserRouter } from 'react-router-dom';
import Router from '@/router/Router';

import { createTheme, ThemeProvider, responsiveFontSizes, Theme } from '@mui/material/styles';
import { getDesignTokens, getThemedComponents } from '@/theme/Theme';
import GlobalStyle from '@/styles/global-styles';

function App() {
  const mode = 'light';
  let theme: Theme = useMemo(() => createTheme(merge(getDesignTokens(mode), getThemedComponents(mode))), [mode]);
  theme = responsiveFontSizes(theme);

  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <BrowserRouter>
            <Router />
            <ToastContainer />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default App;
