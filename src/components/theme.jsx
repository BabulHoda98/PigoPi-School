// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f5a623',   // Yellow
      dark: '#e0951f',   // Darker yellow
      contrastText: '#fff'
    },
    secondary: {
      main: '#555555',   // Gray
      contrastText: '#fff'
    },
  },
});

export default theme;
