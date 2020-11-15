import React from 'react'
import { Flex, Heading } from '@fxtrot/ui'
import Image from 'next/image'

const NoStats = () => {
  return (
    <Flex cross="center" space="md">
      <Heading as="h2">No stats reported yet</Heading>
      <Flex cross="center">
        <Image src="/empty.svg" alt="No stats yet" width="200px" height="200px" />
      </Flex>
    </Flex>
  )
}

export default NoStats
