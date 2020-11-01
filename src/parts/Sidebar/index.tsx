import React from 'react'
import { Box, Flex } from '@fxtrot/ui'
import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import WorkspaceTile from './WorkspaceTile'
import Projects from './Projects'
import { ListWorkspaceProjectsQuery, ListWorkspaceProjectsQueryVariables } from '../../graphql/generated'

const queryWorkspace = gql`
  query listWorkspaceProjects($workspaceId: Int!) {
    userWorkspace(workspaceId: $workspaceId) {
      workspace {
        id
        name
        projects(first: 10) {
          edges {
            cursor
            node {
              id
              name
            }
          }
        }
      }
    }
  }
`

export const Sidebar: React.FC = () => {
  const { query } = useRouter()
  const workspaceId = Number(query.workspaceId)
  console.log({ query, workspaceId })
  const { data, loading } = useQuery<ListWorkspaceProjectsQuery, ListWorkspaceProjectsQueryVariables>(queryWorkspace, {
    variables: {
      workspaceId,
    },
    skip: !workspaceId,
  })

  if (loading || !data) {
    return <Box borderRight="1px solid $gray100" as="aside" height="100%" />
  }
  const {
    userWorkspace: { workspace },
  } = data

  return (
    <Box borderRight="1px solid $gray100" as="aside" height="100%">
      <Box p="$8">
        <Flex space="md" cross="stretch">
          <Box br="$md">
            <WorkspaceTile name={workspace.name} />
          </Box>
          <Projects projects={workspace.projects.edges} />
        </Flex>
      </Box>
    </Box>
  )
}
