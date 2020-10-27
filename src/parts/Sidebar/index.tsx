import React from 'react'
import { Box, Flex } from '@fxtrot/ui'
import { gql, useQuery } from '@apollo/client'
import { GetWorkspacesQueryVariables, GetWorkspacesQuery } from '../../graphql/generated'
import { useRouter } from 'next/router'
import WorkspaceTile from './WorkspaceTile'
import Projects from './Projects'

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

export const Sidebar: React.FC = () => {
  const { data, loading } = useQuery<GetWorkspacesQuery, GetWorkspacesQueryVariables>(WORKSPACES_QUERY)
  const router = useRouter()
  const workspaceId = Number(router.query.workspaceId)

  if (loading) {
    return <Box as="aside" px="$12" />
  }

  const workspaces = data?.workspaces?.edges

  return (
    <Box as="aside" height="100%">
      <Flex as={Box} height="100%" main="spread">
        {workspaces.length > 0 ? (
          <Box p="$8">
            {workspaces.map(({ node }, i) => {
              const isCurrent = node.workspace.id === workspaceId
              return (
                <React.Fragment key={node.id}>
                  <Box br="$md" p="$8">
                    <WorkspaceTile isCurrent={isCurrent} name={node.workspace.name} />
                  </Box>
                  {isCurrent ? <Projects /> : null}
                  {i !== workspaces.length - 1 ? <Box width="100%" borderBottom="1px solid $borderStill" /> : null}
                </React.Fragment>
              )
            })}
          </Box>
        ) : null}
      </Flex>
    </Box>
  )
}
