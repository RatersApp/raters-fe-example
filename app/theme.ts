import { createTheme } from '@material-ui/core/styles';

const muiTheme = createTheme({
  breakpoints: {
    values: {
      lg: 1175,
      md: 720,
      sm: 420,
      xs: 320,
    },
  },
  palette: {
    primary: {
      light: '#47536A',
      main: '#0075ff !important',
    },
    secondary: {
      main: '#f12727',
    },
  },
  spacing: 4,
  typography: {
    fontFamily: 'inherit',
    body1: {
      lineHeight: 'normal',
      letterSpacing: 'normal',
    },
    h6: {
      letterSpacing: 'unset',
    },
    body2: {
      fontWeight: 'bold',
    },
  },
  overrides: {
    MuiPaper: {
      root: {
        boxShadow: '0px 4px 8px rgba(71, 83, 106, 0.15) !important',
      },
    },
  },
});

export default muiTheme;
