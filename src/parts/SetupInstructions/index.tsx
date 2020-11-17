import React from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import { Box, Button, Flex, Heading, Icon, Text, TextField } from '@fxtrot/ui'
import { HiClipboardCopy } from 'react-icons/hi'

import CodeBlock, { Code } from '../CodeBlock'
import { copyText, useSchemaId } from '../../utils'
import {
  CreateSetupMutation,
  CreateSetupMutationVariables,
  GetActiveSetupQuery,
  GetActiveSetupQueryVariables,
} from '../../graphql/generated'

const setupFragment = gql`
  fragment SetupFragment on WorkspaceProjectSetup {
    id
    key
  }
`

const getActiveSetup = gql`
  query getActiveSetup($projectId: Int!) {
    project(id: $projectId) {
      id
      activeSetup {
        ...SetupFragment
      }
    }
  }
  ${setupFragment}
`

const SetupInstructions = () => {
  const projectId = useSchemaId()
  const { data } = useQuery<GetActiveSetupQuery, GetActiveSetupQueryVariables>(getActiveSetup, {
    variables: {
      projectId,
    },
  })

  if (!data) {
    return null
  }
  console.log(data)
  const { activeSetup } = data.project

  return (
    <Flex cross="center">
      <CreateSetup setup={activeSetup} />
      <Instructions setup={activeSetup} />
    </Flex>
  )
}

export default SetupInstructions

function Card({ children }) {
  return (
    <Box maxWidth="720px" py="$8" px="$6" width="100%">
      {children}
    </Box>
  )
}

const createSetupMutation = gql`
  mutation createSetup($projectId: Int!) {
    createSetup(projectId: $projectId) {
      ...SetupFragment
    }
  }
  ${setupFragment}
`

function CreateSetup({ setup }) {
  const projectId = useSchemaId()
  const [createSetup] = useMutation<CreateSetupMutation, CreateSetupMutationVariables>(createSetupMutation, {
    variables: {
      projectId,
    },
    update(cache, { data: { createSetup: activeSetup } }) {
      const ref = cache.writeFragment({
        fragment: setupFragment,
        data: activeSetup,
      })
      cache.modify({
        id: cache.identify({ __typename: 'WorkspaceProject', id: projectId }),
        fields: {
          activeSetup: () => ref,
        },
      })
    },
  })

  return (
    <Card>
      <Heading as="h3">API key</Heading>
      {setup?.key ? (
        <Box width="320px">
          <Flex flow="row">
            <TextField
              value={setup.key}
              readOnly
              css={{ '& input': { borderTopRightRadius: 0, borderBottomRightRadius: 0 } }}
            />
            <Box ml={-1} zIndex={2}>
              <Button
                aria-label="Copy key to clipboard"
                variant="outline"
                css={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                onClick={() => copyText(setup.key)}
              >
                <Icon as={HiClipboardCopy} />
              </Button>
            </Box>
          </Flex>
        </Box>
      ) : (
        <Flex space="$3">
          <Text as="p">First, you need to generate an API key first to be able to setup your project</Text>
          <Box alignSelf="center">
            <Button onClick={createSetup} size="lg">
              Generate new API key
            </Button>
          </Box>
        </Flex>
      )}
    </Card>
  )
}

// TODO: Use .mdx here
function Instructions({ setup }) {
  return (
    <Card>
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
      <CodeBlock lang="bash">{`GEQL_API_KEY=${setup?.key || 'XXX'}`}</CodeBlock>
    </Card>
  )
}
