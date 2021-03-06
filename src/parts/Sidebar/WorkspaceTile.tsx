import React from 'react'
import { Text, Box, Flex, Button, Heading, Icon, Menu } from '@fxtrot/ui'
import { Workspace } from '../../graphql/generated'
import { HiOutlineDotsVertical, HiOutlineAdjustments, HiOutlineSwitchVertical, HiOutlineLogout } from 'react-icons/hi'
import { useSession, signOut as nextSignOut } from 'next-auth/client'

const WorkspaceTile: React.FC<{ name: Workspace['name'] }> = ({ name }) => {
  const [session] = useSession()

  function signOut() {
    nextSignOut({
      callbackUrl: '/',
    })
  }
  return (
    <Flex flow="row" space="sm" main="spread" cross="center">
      <Box flexShrink={0} borderRadius="large" size="$16">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#FF0066"
            d="M39.7,-67.2C52.1,-61.7,63.1,-52.2,70,-40.4C76.9,-28.5,79.7,-14.2,80.3,0.3C80.9,14.9,79.3,29.9,73,42.9C66.8,55.9,56,67.1,43,73.6C30.1,80.2,15.1,82.2,0.3,81.7C-14.5,81.2,-29,78.3,-42.6,72.1C-56.1,65.9,-68.7,56.4,-74.3,43.8C-79.9,31.3,-78.6,15.6,-76.5,1.2C-74.5,-13.2,-71.6,-26.5,-65.3,-37.8C-58.9,-49.1,-49,-58.4,-37.5,-64.4C-26.1,-70.3,-13,-73,0.3,-73.5C13.7,-74.1,27.4,-72.7,39.7,-67.2Z"
            transform="translate(100 100)"
          />
        </svg>
      </Box>
      <Flex as={Box} justifySelf="end" cross="end" space="$2">
        <Flex flow="row" cross="center" main="end" space="$2">
          <Heading as="h3">{name}</Heading>
          <Menu>
            <Menu.Button variant="flat" cross="center" aria-label="Switch workspace">
              <Icon as={HiOutlineDotsVertical} size="md" />
            </Menu.Button>
            <Menu.List>
              <Menu.Item space="sm">
                <Icon as={HiOutlineSwitchVertical} />
                Switch
              </Menu.Item>
              <Menu.Item space="sm">
                <Icon as={HiOutlineAdjustments} />
                Settings
              </Menu.Item>
              <Menu.Item space="sm" onClick={signOut}>
                <Icon as={HiOutlineLogout} />
                Log Out
              </Menu.Item>
            </Menu.List>
          </Menu>
        </Flex>

        <Box pr="$10">
          <Text size="sm" tone="light">
            {session?.user?.name}
          </Text>
        </Box>
      </Flex>
    </Flex>
  )
}

export default WorkspaceTile
