import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 12,
    h4: {
      fontSize: '1.5rem',
    },
    h6: {
      fontSize: '1.1rem',
    },
    body1: {
      fontSize: '12px',
    },
    body2: {
      fontSize: '12px',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontSize: '12px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input': {
            fontSize: '12px',
          },
          '& .MuiInputLabel-root': {
            fontSize: '12px',
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: '12px',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: '12px',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: '12px',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: '12px',
        },
        h6: {
          fontSize: '1.1rem',
        },
        subtitle1: {
          fontSize: '1rem',
        },
        subtitle2: {
          fontSize: '0.875rem',
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
); 