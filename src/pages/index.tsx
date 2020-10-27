import Head from 'next/head'
import { getSession } from 'next-auth/client'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Router from 'next/router'
import { prisma } from '../../prisma'
import { useEffect } from 'react'

const head = (
  <Head>
    <title>Geql Log</title>
    <link rel="icon" href="/favicon.ico" />
  </Head>
)

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const Home: React.FC<Props> = ({ workspaceId }) => {
  useEffect(() => {
    if (workspaceId) {
      Router.push(`/${workspaceId}`)
    } else {
      Router.push('/new')
    }
  }, [])

  return null
}

export default Home

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })
  if (session?.user?.email) {
    const res = await prisma.workspaceUser.findFirst({
      where: {
        user: {
          email: session.user.email,
        },
      },
      select: {
        id: true,
      },
    })
    return {
      props: res
        ? {
            workspaceId: res?.id,
          }
        : {},
    }
  }

  return {
    props: {
      workspaceId: null,
    },
  }
}
