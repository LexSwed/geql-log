import React from 'react'
import { Box, Flex } from '@fxtrot/ui'
import { CreateWorkspaceForm } from '../parts/Sidebar/CreateWorkspace'

const New = (props) => {
  return (
    <Flex main="center" cross="center" width="100vw" height="100vh" bc="$grey050">
      <Box>
        <CreateWorkspaceForm title="Join workspace" onCreate={() => {}} />
      </Box>
    </Flex>
  )
}

export default New
