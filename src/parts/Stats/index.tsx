import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { useSchemaId } from '../../utils'
import { Box, Flex, Spinner } from '@fxtrot/ui'
import { GetStatsQuery, GetStatsQueryVariables } from '../../graphql/generated'
import NoStats from '../NoStats'

const getStatsQuery = gql`
  query getStats($projectId: Int!) {
    project(id: $projectId) {
      stats(first: 5) {
        edges {
          node {
            id
          }
        }
      }
      activeSetup {
        id
        lastUsed
      }
    }
  }
`

const Stats = () => {
  const projectId = useSchemaId()
  const { data, error, loading } = useQuery<GetStatsQuery, GetStatsQueryVariables>(getStatsQuery, {
    variables: {
      projectId,
    },
  })

  if (loading) {
    return (
      <Flex as={Box} main="center" cross="center" width="100%" height="100%">
        <Spinner size="lg" />
      </Flex>
    )
  }

  if (data?.project?.stats?.edges.length === 0) {
    return <NoStats />
  }

  return <div></div>
}

export default Stats
