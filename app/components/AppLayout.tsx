import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';
import Head from 'next/head';
import { useAuthChange } from '../../features/Auth/common/useAuthChange';
import type { ReactNode } from 'react';
import createEmotionCache from '../createEmotionCache';
import theme from '../theme';
import { AppPopups } from './AppPopups';
import { AppHeaders } from './AppHeaders';
import { FacebookProvider } from 'react-facebook';

const clientSideEmotionCache = createEmotionCache();

export const AppLayout = ({ children }: { children: ReactNode }) => {
  useAuthChange();

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        <FacebookProvider appId={'909804982388323'}>
          <AppPopups />
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Head>
            <link rel="apple-touch-icon" href="/favicon.ico" />
            <link rel="shortcut icon" href="/favicon.ico" />
          </Head>
          <div id="app">{children}</div>
        </FacebookProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};
