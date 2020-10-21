import React from 'react'
import { ActionButton, Flex, View, Grid } from '@adobe/react-spectrum'
import Head from 'next/head'
import { getSession, signIn, useSession } from 'next-auth/client'
import Sidebar from '../parts/Sidebar'
import { prisma } from '../../prisma'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'

const head = (
  <Head>
    <title>Geql Log</title>
    <link rel="icon" href="/favicon.ico" />
  </Head>
)

const Workspace = () => {
  const router = useRouter()
  console.log(router.query)

  return (
    <>
      {head}
      <Grid areas={['sidebar content']} columns={['240px', '3fr']} height="100vh">
        <View gridArea="sidebar" borderEndWidth="thin" borderColor="gray-300">
          <Sidebar />
        </View>
        <View gridArea="content">{/* <div>{router.query}</div> */}</View>
      </Grid>
    </>
  )
}

export default Workspace
