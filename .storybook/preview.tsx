import React from 'react';

import type { Preview } from '@storybook/react';
import { ThemeProvider } from 'styled-components';

import { merge } from 'ts-deepmerge';
import { createTheme, responsiveFontSizes, Theme } from '@mui/material/styles';
import { getDesignTokens, getThemedComponents } from '../src/theme/Theme';
import GlobalStyle from '../src/styles/global-styles';

import { BrowserRouter } from 'react-router-dom';

const mode = 'light';
let theme: Theme = createTheme(merge(getDesignTokens(mode), getThemedComponents(mode)));
theme = responsiveFontSizes(theme);

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export const decorators = [
  Story => (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    </ThemeProvider>
  ),
];

export default preview;
