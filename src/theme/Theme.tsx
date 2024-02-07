import { deepPurple, green, purple, lime, grey, common } from '@mui/material/colors';
import { Theme } from '@mui/material/styles';
const palette = {
  light: {
    primary: {
      light: deepPurple[300],
      main: deepPurple['A200'],
      dark: deepPurple[900],
    },
    secondary: {
      light: green[300],
      main: green[500],
      dark: green[900],
    },
    tableColor: {
      border: 'rgb(46, 38, 61, 0.12)',
      body: 'rgb(46, 38, 61, 0.7)',
      head: 'rgb(46, 38, 61)',
    },
  },
  dark: {
    primary: {
      light: purple[300],
      main: purple[500],
      dark: purple[900],
    },
    secondary: {
      light: lime[300],
      main: lime[500],
      dark: lime[900],
    },
  },
};
type PaletteMode = 'light' | 'dark';
export const getDesignTokens = (mode: PaletteMode | undefined) =>
  ({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            primary: {
              main: palette.light.primary.main,
              light: palette.light.primary.light,
              dark: palette.light.primary.dark,
              contrastText: '#000',
            },
            // divider: '#000',
            background: {
              default: grey[50], // background
              paper: grey[50],
            },
            text: {
              primary: grey[600],
              secondary: '#000', // select form label
            },
          }
        : {
            primary: {
              main: palette.dark.primary.main,
              light: palette.dark.primary.light,
              dark: palette.dark.primary.dark,
              contrastText: '#fff',
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

export const getThemedComponents = (mode: PaletteMode | undefined) =>
  ({
    components: {
      ...(mode === 'light'
        ? {
            MuiAppBar: {
              styleOverrides: {
                colorPrimary: {
                  backgroundColor: grey[800],
                  color: common.white,
                },
              },
            },
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
                  color: common.white,
                  fontFamily: "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
                },
              },
              variants: [
                {
                  props: { variant: 'contained' },
                  style: {
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
            MuiMenuItem: {
              styleOverrides: {
                root: {
                  color: common.white,
                  alignItems: 'stretch',
                  fontFamily: "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
                },
              },
            },
            MuiAccordion: {
              styleOverrides: {
                root: {
                  color: common.white,
                  fontFamily: "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
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
        : {
            MuiAppBar: {
              styleOverrides: {
                colorPrimary: {
                  backgroundColor: deepPurple[800],
                  color: common.white,
                },
              },
            },
          }),
    },
  }) as Theme;
