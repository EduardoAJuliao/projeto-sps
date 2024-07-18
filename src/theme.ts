// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1e3a8a', // Azul escuro
    },
    secondary: {
      main: '#2563eb', // Azul médio
    },
    background: {
      default: '#1e3a8a', // Cor de fundo da página
      paper: '#ffffff', // Cor de fundo do card
    },
  },
});

export default theme;
