import Head from 'next/head'
import { SSRProvider, Provider, defaultTheme } from '@adobe/react-spectrum'
import { Provider as AuthProvider } from 'next-auth/client'
import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../apollo'

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <SSRProvider>
        <Provider theme={defaultTheme}>
          <ApolloProvider client={apolloClient}>
            <AuthProvider session={pageProps.session}>
              <Component {...pageProps} />
            </AuthProvider>
          </ApolloProvider>
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
  )
}

export default MyApp
