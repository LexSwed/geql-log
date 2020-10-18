import Head from 'next/head'
import { useSession } from 'next-auth/client'
import SignIn from '../parts/SignIn'
import Workspace from './[workspaceId]'

const head = (
  <Head>
    <title>Geql Log</title>
    <link rel="icon" href="/favicon.ico" />
  </Head>
)

const Home = () => {
  const [session, loading] = useSession()

  if (loading) {
    return head
  }

  if (!session) {
    return <SignIn />
  }

  return <Workspace />
}

export default Home
