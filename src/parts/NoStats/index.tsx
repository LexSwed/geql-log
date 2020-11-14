import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { Box, Flex, Heading, Text } from '@fxtrot/ui'
import Image from 'next/image'

import CodeBlock, { Code } from '../CodeBlock'
import { useSchemaId } from '../../utils'
import { GetActiveSetupQuery, GetActiveSetupQueryVariables } from '../../graphql/generated'

const getActiveSetup = gql`
  query getActiveSetup($projectId: Int!) {
    project(id: $projectId) {
      activeSetup {
        id
        key
      }
    }
  }
`

// TODO: Use .mdx here

const NoStats = () => {
  const projectId = useSchemaId()
  const { data } = useQuery<GetActiveSetupQuery, GetActiveSetupQueryVariables>(getActiveSetup, {
    variables: {
      projectId,
    },
  })

  return (
    <Flex cross="center">
      <Box maxWidth="720px" pt="$8" px="$6" minWidth="320px">
        <Flex cross="center" space="md">
          <Heading as="h2">No stats reported yet</Heading>
          <Flex cross="center">
            <Image src="/empty.svg" alt="No stats yet" width="200px" height="200px" />
          </Flex>
        </Flex>
        <Box pb="$24" />
        <Heading as="h3">How to setup</Heading>
        <Text as="p">
          Install <Code>geql</Code> middleware into your project:
        </Text>
        <CodeBlock lang="bash">yarn add @geql/log</CodeBlock>
        <Text as="p">Add installed middleware by adding it to the `plugins` array of your server instance:</Text>
        <CodeBlock lang="js">
          {`const GeqlLog = require("@geql/log")

const server = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions: false,
  plugins: [
    GeqlLog({}) //add additional params here
  ]
});`}
        </CodeBlock>
        <Text as="p">
          And add your API key as a <Code>GEQL_API_KEY</Code> environment variable:
        </Text>
        <CodeBlock lang="bash">{`GEQL_API_KEY=${data?.project?.activeSetup?.key || 'XXX'}`}</CodeBlock>
      </Box>
    </Flex>
  )
}

export default NoStats
