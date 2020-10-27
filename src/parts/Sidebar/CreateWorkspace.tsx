import React, { useState } from 'react'
import { Button, Box, Dialog, Heading, Text, TextField, Flex, Icon } from '@fxtrot/ui'
import { HiOutlinePlus } from 'react-icons/hi'

const CreateWorkspace: React.FC<{ defaultOpen: boolean }> = ({ defaultOpen }) => {
  return (
    <Box padding="size-150">
      <Dialog.Trigger defaultOpen={defaultOpen}>
        <Button>
          <Icon as={HiOutlinePlus} />
          <span>Create new workspace</span>
        </Button>
        {(close) => <CreateWorkspaceDialog close={close} />}
      </Dialog.Trigger>
    </Box>
  )
}

export default CreateWorkspace

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
    <Dialog.Modal>
      <Heading>Create new workspace</Heading>
      <Box>
        <Flex space="$6">
          <Text>Create a new workspace where you can setup your GraphQL monitoring</Text>
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
            />
            <Box pb="$8" />
            <Flex flow="row" main="end">
              <Button type="submit">Confirm</Button>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Dialog.Modal>
  )
}
