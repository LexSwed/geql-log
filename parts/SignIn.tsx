import { signIn } from 'next-auth/client'
import React from 'react'
import { ActionButton, Flex, View } from '@adobe/react-spectrum'
import Head from 'next/head'

const SignIn = () => {
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
