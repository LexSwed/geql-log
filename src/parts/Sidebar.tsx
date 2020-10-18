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
} from '@adobe/react-spectrum'
import Add from '@spectrum-icons/workflow/Add'
import { WorkspaceUser } from '@prisma/client'
import User from '@spectrum-icons/workflow/User'

type UIWorkspace = {
  id: number
  role: WorkspaceUser['role']
  workspace: {
    name: string
  }
}

const Sidebar: React.FC = () => {
  const workspaces = []
  return (
    <View elementType="aside" paddingX="size-200" padding="size-150">
      <DialogTrigger defaultOpen={workspaces.length === 0}>
        <ActionButton width="100%">
          <Add />
          <Text>Create new workspace</Text>
        </ActionButton>
        {(close) => <CreateWorkspaceDialog close={close} />}
      </DialogTrigger>
      {workspaces.length > 0 ? (
        <ListBox
          selectionMode="single"
          selectedKeys={['']}
          onSelectionChange={(item) => {
            console.log(item)
          }}
          aria-label="Workspaces"
        >
          <Section title="Workspaces">
            {workspaces.map((w) => (
              <Item textValue={w.workspace.name} key={w.id}>
                <Text>{w.workspace.name}</Text>
                <Text slot="description">
                  <Flex direction="row" alignItems="center">
                    <User size="XS" />
                    <Text>{w.role}</Text>
                  </Flex>
                </Text>
              </Item>
            ))}
          </Section>
        </ListBox>
      ) : null}
    </View>
  )
}

export default Sidebar

type DialogProps = {
  close: () => void
}
function CreateWorkspaceDialog({ close }) {
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
