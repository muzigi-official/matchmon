import React, { useMemo, Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { merge } from 'ts-deepmerge';

import store from '@/redux/store';
import router from '@/router';

import { getDesignTokens, getThemedComponents } from '@/theme/Theme';
import { createTheme, responsiveFontSizes, Theme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material';

import GlobalStyle from '@/styles/global-styles';
import './App.css';

const renderLoader = () => <p>Loading</p>;

function App() {
  const mode = 'light';
  let theme: Theme = useMemo(() => createTheme(merge(getDesignTokens(mode), getThemedComponents(mode))), [mode]);
  theme = responsiveFontSizes(theme);

  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Suspense fallback={renderLoader()}>
            <RouterProvider router={router} />
          </Suspense>
          <ToastContainer />
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default App;
