import { signIn, useSession } from 'next-auth/client'
import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { Box, Flex, Button } from '@fxtrot/ui'

const SignIn = (props) => {
  const [session] = useSession()

  if (session) {
    Router.push('/')
  }

  return (
    <>
      <Head>
        <title>Geql - Sign In</title>
      </Head>
      <Flex main="center" cross="center" minHeight="100vh" minWidth="100vw">
        <Button onClick={() => signIn('github')}>Connect</Button>
      </Flex>
    </>
  )
}

export default SignIn
