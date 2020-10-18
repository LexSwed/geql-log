import { ActionButton, Flex, View, Grid } from '@adobe/react-spectrum'
import Head from 'next/head'
import { getSession, signIn, useSession } from 'next-auth/client'
import Sidebar from '../parts/Sidebar'
import { prisma } from '../prisma'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

const head = (
  <Head>
    <title>Geql Log</title>
    <link rel="icon" href="/favicon.ico" />
  </Head>
)

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const Home = ({ workspaces }: Props) => {
  const [session, loading] = useSession()

  if (loading) {
    return head
  }

  if (session) {
    return (
      <>
        {head}
        <Grid areas={['sidebar content']} columns={['240px', '3fr']} height="100vh">
          <View gridArea="sidebar" borderEndWidth="thin" borderColor="gray-300">
            <Sidebar workspaces={workspaces} />
          </View>
          <View gridArea="content" />
        </Grid>
      </>
    )
  }

  return (
    <>
      {head}
      <View minHeight="100vh" minWidth="100vw">
        <Flex height="100vh" alignItems="center" justifyContent="center">
          <ActionButton onPress={() => signIn('github')}>Connect</ActionButton>
        </Flex>
      </View>
    </>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })

  const workspaces = await prisma.workspaceUser.findMany({
    where: {
      user: {
        email: session.user.email,
      },
    },
    select: {
      id: true,
      role: true,
      workspace: {
        select: {
          name: true,
        },
      },
    },
  })

  return {
    props: {
      workspaces,
    },
  }
}
