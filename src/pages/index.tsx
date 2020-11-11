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

const Home: React.FC<Props> = ({ redirectUrl }) => {
  useEffect(() => {
    if (redirectUrl) {
      Router.push(redirectUrl)
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
        default: true,
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
            redirectUrl: `/workspace/${res?.id}`,
          }
        : {
            redirectUrl: `/new`,
          },
    }
  }

  return {
    props: {
      redirectUrl: '/signin',
    },
  }
}
