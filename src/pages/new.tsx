import React from 'react'
import { Box, Flex } from '@fxtrot/ui'
import { CreateWorkspaceForm } from '../parts/Sidebar/CreateWorkspace'

const New = (props) => {
  return (
    <Flex main="center" cross="center" as={Box} width="100vw" height="100vh" bc="$gray050">
      <Box p="$12" bc="#fff" br="$md">
        <CreateWorkspaceForm />
      </Box>
    </Flex>
  )
}

export default New
