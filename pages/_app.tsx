import '../styles/globals.css';
import '../app/main.scss';
import 'react-toastify/dist/ReactToastify.min.css';
import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/grid';

import { wrapper } from '../app/store';
import { appWithTranslation } from 'next-i18next';
import { StylesProvider } from '@material-ui/core';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { Montserrat, Open_Sans } from '@next/font/google';
import { AppInit } from '../app/components/AppInit';
import { AppLayout } from '../app/components/AppLayout';
import { Provider } from 'react-redux';

export const monserrat = Montserrat({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

export const openSans = Open_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

const AppLoading = dynamic(() => import('../app/components/AppLoading'));

function MyApp({ Component, pageProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(pageProps);

  return (
    <div className={monserrat.className}>
      <AppInit />
      <AppLoading />
      <StylesProvider injectFirst>
        <Provider store={store}>
          <AppLayout>
            <Component {...props} />
          </AppLayout>
        </Provider>
      </StylesProvider>
    </div>
  );
}

export default appWithTranslation(MyApp);
