import React from 'react'
import { Box, Flex, Heading, Text } from '@fxtrot/ui'

import CodeBlock, { Code } from '../CodeBlock'

const CreateProjectSetup = () => {
  return (
    <Flex main="center" cross="center">
      <Box py="$2" px="$6" minWidth="320px">
        <Heading as="h3">Create project setup</Heading>
        <Text as="p">
          Install <Code>geql</Code> middleware:
        </Text>
        <CodeBlock lang="bash">yarn add @geql/log</CodeBlock>
      </Box>
    </Flex>
  )
}

export default CreateProjectSetup
