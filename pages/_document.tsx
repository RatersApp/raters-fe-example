import type { DocumentContext } from 'next/document';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import * as React from 'react';
import { ServerStyleSheets } from '@material-ui/styles';
import Script from 'next/script';
import CleanCSS from 'clean-css';

/* eslint-enable global-require */
const cleanCSS = new CleanCSS();

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);
    let css = sheets.toString();
    if (css) {
      css = cleanCSS.minify(css).styles;
    }

    return {
      ...initialProps,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [
        ...React.Children.toArray(initialProps.styles),
        <style id="jss-server-side" key="jss-server-side">
          {css}
        </style>,
      ],
    };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />

          <meta property="og:site_name" content="Raters" />
          <meta property="og:type" content="website" />
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#000000" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
