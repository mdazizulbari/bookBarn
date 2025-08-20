// src/theme.js
import { createTheme } from '@mui/material/styles';

const Theme = createTheme({
  palette: {
    primary: {
      main: '#1565c0', // Your blue
      dark: '#155a9f',
      light: '#1e88e5',
    },
    background: {
      default: '#dbeafe',
      paper: '#ffffff',
    },
    text: {
      primary: '#1565c0',
      secondary: '#555', // tweak as you want
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h2: {
      fontWeight: 900,
      color: '#1565c0',
      textShadow: '1px 1px 5px rgba(21, 101, 192, 0.4)',
    },
    h4: {
      fontWeight: 700,
      color: '#1565c0',
    },
    button: {
      fontWeight: 'bold',
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '30px',
          boxShadow: '0 4px 15px rgba(24, 118, 209, 0.4)',
          paddingLeft: 40,
          paddingRight: 40,
          paddingTop: 12,
          paddingBottom: 12,
          '&:hover': {
            backgroundColor: '#155a9f',
            boxShadow: '0 6px 20px rgba(21, 90, 159, 0.6)',
          },
        },
      },
    },
  },
});

export default Theme;
