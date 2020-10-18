import React from 'react'
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

const Workspace = () => {
  const workspace = {
    name: '',
  }
  return (
    <>
      {head}
      <Grid areas={['sidebar content']} columns={['240px', '3fr']} height="100vh">
        <View gridArea="sidebar" borderEndWidth="thin" borderColor="gray-300">
          <Sidebar />
        </View>
        <View gridArea="content">{workspace?.name || 'None of the workspaces selected'}</View>
      </Grid>
    </>
  )
}

export default Workspace
