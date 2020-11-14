import React from 'react'
import { Box, Flex, Heading, Text } from '@fxtrot/ui'

import CodeBlock, { Code } from '../CodeBlock'

const CreateProjectSetup = () => {
  return (
    <Flex main="center" cross="center">
      <Box py="$2" px="$6" minWidth="320px">
        <Heading as="h3">Create project setup</Heading>
        <Text as="p">
          Install <Code>geql</Code> middleware into your project:
        </Text>
        <CodeBlock lang="bash">yarn add @geql/log</CodeBlock>
        <Text as="p">Add installed middleware by adding it to the `plugins` array of your server instance:</Text>
        <CodeBlock lang="js">
          {`const server = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions: false,
  plugins: [
    require("@geql/log")({}) //add additional params here
  ]
});`}
        </CodeBlock>
        <Text as="p">
          Add <Code>GEQL_API_KEY</Code> key as an environment variable:
        </Text>
        <CodeBlock lang="bash">GEQL_API_KEY=XXX</CodeBlock>
      </Box>
    </Flex>
  )
}

export default CreateProjectSetup
