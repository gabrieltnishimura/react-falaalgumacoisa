import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: ['Inter'].join(','),
  },
  palette: {
    primary: {
      light: '#0d3b66',
      main: '#0d3b66',
      dark: '#0d3b66',
      contrastText: '#0d3b66',
    },
    secondary: {
      light: '#0d3b66',
      main: '#0d3b66',
      dark: '#0d3b66',
      contrastText: '#0d3b66',
    },
  },
});

export default theme;