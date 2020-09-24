import Head from 'next/head';
import { SSRProvider, Provider, defaultTheme } from '@adobe/react-spectrum';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <SSRProvider>
        <Provider theme={defaultTheme}>
          <Component {...pageProps} />
        </Provider>
      </SSRProvider>
      <style global jsx>
        {`
          body {
            margin: 0;
            body: 0;
          }
        `}
      </style>
    </>
  );
}

export default MyApp;
