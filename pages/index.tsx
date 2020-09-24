import { Button, Flex, View } from '@adobe/react-spectrum';
import Head from 'next/head';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Fxtrot Connect</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <View minHeight="100vh" minWidth="100vw">
        <Flex height="100vh" alignItems="center" justifyContent="center">
          <Button variant="cta" elementType="a" href="/api/jira/connect">
            Connect
          </Button>
        </Flex>
      </View>
    </div>
  );
}
