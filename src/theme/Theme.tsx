import { grey, common } from '@mui/material/colors';
import { Theme } from '@mui/material/styles';

const palette = {
  light: {
    primary: {
      light: '#60A5FA',
      main: '#2563EB',
      dark: '#1D4ED8',
    },
    secondary: {
      light: '#CFFAFE',
      main: '#06B6D4',
      dark: '#0E7490',
    },
    tableColor: {
      border: 'rgba(15, 23, 42, 0.10)',
      body: 'rgba(15, 23, 42, 0.72)',
      head: 'rgb(15, 23, 42)',
    },
    textColor: {
      basic: 'rgb(15, 23, 42)',
      light: common.white,
    },
  },
  dark: {
    primary: {
      light: '#CAC2FF',
      main: '#9584FF',
      dark: '#6047FF',
    },
    secondary: {
      light: '##ADE8FF',
      main: '#70D7FF',
      dark: '##1FBFFF',
    },
  },
};
type TPaletteMode = 'light' | 'dark';
export const getDesignTokens = (mode: TPaletteMode | undefined) =>
  ({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            primary: {
              main: palette.light.primary.main,
              light: palette.light.primary.light,
              dark: palette.light.primary.dark,
              contrastText: 'white',
            },
            // divider: '#000',
            background: {
              default: grey[50], // background
              paper: grey[50],
            },
            text: {
              primary: palette.light.textColor.basic,
              secondary: grey[500], // select form label
              info: palette.light.textColor.light,
            },
            icon: {
              primary: common.white,
            },
          }
        : {
            primary: {
              main: palette.dark.primary.main,
              light: palette.dark.primary.light,
              dark: palette.dark.primary.dark,
              contrastText: palette.light.textColor.basic,
            },
            background: {
              default: grey[900], // background
              paper: grey[900],
            },
            text: {
              primary: grey[500],
              secondary: grey[50],
            },
          }),
    },
    typography: {
      fontFamily: ['Montserrat', 'Noto Sans KR', 'Arial', 'sans-serif'].join(','),
      body1: {
        fontFamily: 'Montserrat, Noto Sans KR, Arial, sans-serif',
      },
    },
  }) as Theme;

export const getThemedComponents = (mode: TPaletteMode | undefined) =>
  ({
    components: {
      ...(mode === 'light'
        ? {
            MuiPaper: {
              styleOverrides: {
                root: {
                  backgroundColor: 'white',
                },
              },
            },
            MuiLink: {
              variant: 'h3',
            },
            MuiButton: {
              styleOverrides: {
                root: {
                  fontFamily: "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
                },
              },
              variants: [
                {
                  props: { variant: 'contained' },
                  style: {
                    color: common.white,
                    fontFamily: "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
                  },
                },
                {
                  props: { variant: 'outlined' },
                  style: {
                    color: palette.light.primary.main,
                  },
                },
                {
                  props: { variant: 'primary', color: 'primary' },
                  style: {
                    border: '4px dashed blue',
                  },
                },
              ],
            },
            MuiList: {
              styleOverrides: {
                root: {},
              },
            },
            MuiFormLabel: {
              styleOverrides: {
                root: {
                  fontSize: '0.9375rem',
                },
              },
            },
            MuiTableCell: {
              styleOverrides: {
                head: {
                  color: palette.light.tableColor.head,
                },
                root: {
                  color: palette.light.tableColor.body,
                },
              },
            },
          }
        : {}),
    },
  }) as Theme;
