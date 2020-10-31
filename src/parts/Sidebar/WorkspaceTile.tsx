import React from 'react'
import { Text, Box, Flex, Button, Heading } from '@fxtrot/ui'
import { Workspace } from '../../graphql/generated'
import { useRouter } from 'next/router'

const WorkspaceTile: React.FC<{ isCurrent: boolean; name: Workspace['name'] }> = ({ isCurrent, name }) => {
  return (
    <Flex gap="size-100" alignItems="center">
      <Box borderRadius="large" width="size-700" height="size-700">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#FF0066"
            d="M39.7,-67.2C52.1,-61.7,63.1,-52.2,70,-40.4C76.9,-28.5,79.7,-14.2,80.3,0.3C80.9,14.9,79.3,29.9,73,42.9C66.8,55.9,56,67.1,43,73.6C30.1,80.2,15.1,82.2,0.3,81.7C-14.5,81.2,-29,78.3,-42.6,72.1C-56.1,65.9,-68.7,56.4,-74.3,43.8C-79.9,31.3,-78.6,15.6,-76.5,1.2C-74.5,-13.2,-71.6,-26.5,-65.3,-37.8C-58.9,-49.1,-49,-58.4,-37.5,-64.4C-26.1,-70.3,-13,-73,0.3,-73.5C13.7,-74.1,27.4,-72.7,39.7,-67.2Z"
            transform="translate(100 100)"
          />
        </svg>
      </Box>
      <Box>
        <Box pl="$3">
          <Heading as="h3">{name}</Heading>
        </Box>

        <Box mt="$2">
          {isCurrent ? <Button variant="flat">Settings</Button> : <Button variant="flat">Switch</Button>}
        </Box>
      </Box>
    </Flex>
  )
}

export default WorkspaceTile