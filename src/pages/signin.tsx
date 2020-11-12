import { signIn, useSession } from 'next-auth/client'
import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { Box, Flex, Button } from '@fxtrot/ui'

const SignIn = () => {
  const [session] = useSession()

  if (session) {
    Router.push('/')
  }

  async function handleSignIn() {
    await signIn('github', { callbackUrl: window.sessionStorage.getItem('signInRedirectUrl') || '/' })
    window.sessionStorage.removeItem('signInRedirectUrl')
  }

  return (
    <>
      <Head>
        <title>Geql - Sign In</title>
      </Head>
      <Flex main="center" cross="center" as={Box} minHeight="100vh" minWidth="100vw">
        <Button onClick={handleSignIn}>Connect</Button>
      </Flex>
    </>
  )
}

export default SignIn
