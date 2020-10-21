import { signIn, useSession } from 'next-auth/client'
import React from 'react'
import { ActionButton, Flex, View } from '@adobe/react-spectrum'
import Head from 'next/head'
import Router from 'next/router'

const SignIn = () => {
  const [session] = useSession()

  if (session) {
    Router.push('/')
  }

  return (
    <>
      <Head>
        <title>Geql - Sign In</title>
      </Head>
      <View minHeight="100vh" minWidth="100vw">
        <Flex height="100vh" alignItems="center" justifyContent="center">
          <ActionButton onPress={() => signIn('github')}>Connect</ActionButton>
        </Flex>
      </View>
    </>
  )
}

export default SignIn
