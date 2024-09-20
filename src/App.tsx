// pages/_app.tsx
import { ThemeProvider } from '@mui/material/styles';
import theme from '../src/theme';
import '../styles/global.css';

function MyApp({ Component, pageProps }: any) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
