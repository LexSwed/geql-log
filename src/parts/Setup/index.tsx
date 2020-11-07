import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { useSchemaId } from '../../utils'
import { ProjectSetupQuery, ProjectSetupQueryVariables } from '../../graphql/generated'
import CreateProjectSetup from '../NoProjectSetup'
import { Flex, Heading } from '@fxtrot/ui'

const projectSetupQuery = gql`
  query projectSetup($projectId: Int!) {
    project(id: $projectId) {
      id
      name
      setup {
        id
        active
        projectId
        sharedSecret
      }
    }
  }
`

const Setup = () => {
  const schemaId = useSchemaId()
  const { data, loading } = useQuery<ProjectSetupQuery, ProjectSetupQueryVariables>(projectSetupQuery, {
    variables: {
      projectId: schemaId,
    },
  })
  if (loading) {
    return null
  }

  if (!data?.project?.setup) return <CreateProjectSetup />

  const { name, setup } = data.project

  return (
    <Flex>
      <Heading>{name}</Heading>
    </Flex>
  )
}

export default Setup
