import { ActionButton, Flex, View } from '@adobe/react-spectrum'
import Head from 'next/head'
import { signIn, signOut, useSession } from 'next-auth/client'

const head = (
  <Head>
    <title>Geql Log</title>
    <link rel="icon" href="/favicon.ico" />
  </Head>
)

export default function Home() {
  const [session, loading] = useSession()

  if (loading) {
    return head
  }

  if (session) {
    return <pre>{JSON.stringify(session)}</pre>
  }

  return (
    <>
      {head}
      <View minHeight="100vh" minWidth="100vw">
        <Flex height="100vh" alignItems="center" justifyContent="center">
          <ActionButton onPress={() => signIn()}>Connect</ActionButton>
        </Flex>
      </View>
    </>
  )
}
