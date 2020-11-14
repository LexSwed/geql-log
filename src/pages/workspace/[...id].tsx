import React, { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Sidebar } from '../../parts/Sidebar'
import { Box } from '@fxtrot/ui'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { getSession } from 'next-auth/client'
import { prisma } from '../../../prisma'
import Stats from '../../parts/Stats'

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
        <Stats />
      </Box>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const workspaceId = Number(ctx.params?.id?.[0])
  const session = await getSession(ctx)
  if (workspaceId && session) {
    const workspace = await prisma.workspaceUser.findFirst({
      where: {
        user: {
          email: session.user.email,
        },
        OR: [
          {
            workspaceId,
          },
          {
            default: true,
          },
        ],
      },
      select: {
        workspaceId: true,
      },
    })

    if (!workspace) {
      return {
        props: {
          redirectUrl: '/new',
        },
      }
    } else if (workspace.workspaceId !== workspaceId) {
      return {
        props: {
          redirectUrl: `/workspace/${workspace?.workspaceId}`,
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
