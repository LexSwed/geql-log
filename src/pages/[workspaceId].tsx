import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Sidebar } from '../parts/Sidebar'
import { Box } from '@fxtrot/ui'

const head = (
  <Head>
    <title>Geql Log</title>
    <link rel="icon" href="/favicon.ico" />
  </Head>
)

const Workspace = (props) => {
  const router = useRouter()

  return (
    <>
      {head}
      <Box display="grid" gridTemplateColumns={'300px 3fr'} height="100vh">
        <Sidebar />
        <Box>{/* <div>{router.query}</div> */}</Box>
      </Box>
    </>
  )
}

export default Workspace
