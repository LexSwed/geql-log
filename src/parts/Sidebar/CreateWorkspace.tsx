import React, { useState } from 'react'
import { Button, Box, Dialog, Heading, Text, TextField, Flex, Icon } from '@fxtrot/ui'
import { HiOutlinePlus } from 'react-icons/hi'
import { gql, useMutation } from '@apollo/client'
import { CreateWorkspaceMutation, MutationCreateWorkspaceArgs } from '../../graphql/generated'
import Router from 'next/router'

const CreateWorkspace: React.FC<{ defaultOpen: boolean }> = ({ defaultOpen }) => {
  return (
    <Box padding="size-150">
      <Dialog.Trigger defaultOpen={defaultOpen}>
        <Button>
          <Icon as={HiOutlinePlus} />
          <span>Create new workspace</span>
        </Button>
        {(close) => (
          <Dialog.Modal>
            <CreateWorkspaceForm title="Create new workspace" onCreate={close} />
          </Dialog.Modal>
        )}
      </Dialog.Trigger>
    </Box>
  )
}

export default CreateWorkspace

const createWorkspaceMutation = gql`
  mutation createWorkspace($name: String!) {
    createWorkspace(name: $name) {
      workspace {
        id
      }
    }
  }
`

interface FormProps {
  onCreate?: () => void
  title?: string
}
export function CreateWorkspaceForm({ onCreate, title }: FormProps) {
  const [name, setName] = useState('')
  const [createWorkspace, { error }] = useMutation<CreateWorkspaceMutation, MutationCreateWorkspaceArgs>(
    createWorkspaceMutation,
    {
      variables: {
        name,
      },
    }
  )

  const handleCreate = async (e: React.FormEvent<Element>) => {
    e.preventDefault()
    const { data } = await createWorkspace()
    if (data?.createWorkspace?.workspace?.id) {
      Router.push(`/${data?.createWorkspace?.workspace.id}`)
      onCreate()
    }
  }

  return (
    <>
      <Heading>{title}</Heading>
      <Box>
        <Flex space="$6">
          <Text size="sm">Create a new workspace where you can setup your GraphQL monitoring</Text>
          <Box as="form" width="100%" onSubmit={handleCreate}>
            <TextField
              required
              label="Name"
              secondaryLabel="*"
              value={name}
              onChange={setName}
              placeholder="Awesome Company"
              autoFocus
              autoComplete="organization"
              validity={error ? 'invalid' : null}
              hint={error ? error.message : null}
            />
            <Box pb="$8" />
            <Flex flow="row-reverse" main="spread" space="sm">
              <Button type="submit">Confirm</Button>
              <Button variant="outline">Join existing workspace</Button>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  )
}
