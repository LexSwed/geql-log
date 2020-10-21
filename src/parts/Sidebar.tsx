import React, { useState } from 'react'
import {
  ActionButton,
  Button,
  Content,
  Dialog,
  DialogTrigger,
  Divider,
  Heading,
  Text,
  View,
  ListBox,
  Item,
  Section,
  TextField,
  Form,
  Flex,
  ProgressCircle,
} from '@adobe/react-spectrum'
import Add from '@spectrum-icons/workflow/Add'
import { gql, useQuery } from '@apollo/client'
import { GetWorkspacesQueryVariables, GetWorkspacesQuery } from '../graphql/generated'

const WORKSPACES_QUERY = gql`
  query getWorkspaces {
    workspaces(first: 10) {
      edges {
        cursor
        node {
          id
          workspace {
            id
            name
            projects(first: 10) {
              edges {
                node {
                  id
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`

const Sidebar: React.FC = () => {
  const { data, loading } = useQuery<GetWorkspacesQuery, GetWorkspacesQueryVariables>(WORKSPACES_QUERY)

  if (loading) {
    return (
      <View elementType="aside" paddingX="size-200" padding="size-150">
        <div>Hello world</div>
      </View>
    )
  }

  const workspaces = data?.workspaces?.edges

  return (
    <View elementType="aside" height="100%">
      <Flex height="100%" direction="column" justifyContent="space-between">
        {workspaces.length > 0 ? (
          <View padding="size-150">
            <ListBox
              selectionMode="single"
              selectedKeys={['']}
              onSelectionChange={(item) => {
                console.log(item)
              }}
              aria-label="Workspaces"
            >
              <Section title="Workspaces">
                {workspaces.map(({ node }) => (
                  <Item textValue={node.workspace.name} key={node.id}>
                    <Text>{node.workspace.name}</Text>
                  </Item>
                ))}
              </Section>
            </ListBox>
          </View>
        ) : null}
        <View padding="size-150">
          <DialogTrigger defaultOpen={workspaces.length === 0}>
            <ActionButton width="100%">
              <Add />
              <Text>Create new workspace</Text>
            </ActionButton>
            {(close) => <CreateWorkspaceDialog close={close} />}
          </DialogTrigger>
        </View>
      </Flex>
    </View>
  )
}

export default Sidebar

type DialogProps = {
  close: () => void
}
function CreateWorkspaceDialog({ close }: DialogProps) {
  const [name, setName] = useState('')

  const handleCreate = async (e: React.FormEvent<Element>) => {
    e.preventDefault()
    close()
  }

  return (
    <Dialog size="S" isDismissable>
      <Heading>Create new workspace</Heading>
      <Divider />
      <Content>
        <Flex direction="column" gap="size-200">
          <Text>Create a new workspace where you can setup your GraphQL monitoring</Text>
          <Form onSubmit={handleCreate}>
            <TextField
              isRequired
              label="Name"
              value={name}
              onChange={setName}
              placeholder="Awesome Company"
              autoFocus
              autoComplete="organization"
            />
          </Form>
          <Flex justifyContent="end">
            <Button variant="cta" type="submit">
              Confirm
            </Button>
          </Flex>
        </Flex>
      </Content>
    </Dialog>
  )
}
