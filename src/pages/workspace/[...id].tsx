import React, { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Sidebar } from '../../parts/Sidebar'
import { Box } from '@fxtrot/ui'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { getSession } from 'next-auth/client'
import { prisma } from '../../../prisma'

const head = (
  <Head>
    <title>Geql Log</title>
    <link rel="icon" href="/favicon.ico" />
  </Head>
)

const Workspace = ({ redirectUrl }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()

  useEffect(() => {
    if (redirectUrl) {
      router.replace(redirectUrl)
    }
  }, [])

  return redirectUrl ? null : (
    <>
      {head}
      <Box display="grid" gridTemplateColumns={'300px 3fr'} height="100vh">
        <Sidebar />
        <Box>{/* <div>{router.query}</div> */}</Box>
      </Box>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const workspaceId = Number(ctx.params?.id?.[0])
  const session = await getSession(ctx)
  if (workspaceId && session) {
    const workspaces = await prisma.workspaceUser.findMany({
      where: {
        user: {
          email: session.user.email,
        },
      },
      select: {
        workspaceId: true,
      },
    })
    if (workspaces.find((w) => w.workspaceId === workspaceId)) {
      return {
        props: {
          redirectUrl: null,
        },
      }
    } else if (!workspaces.length) {
      return {
        props: {
          redirectUrl: '/new',
        },
      }
    } else {
      return {
        props: {
          redirectUrl: `/workspace/${workspaces[0]?.workspaceId}`,
        },
      }
    }
  }
  return {
    props: {
      redirectUrl: null,
    },
  }
}

export default Workspace
