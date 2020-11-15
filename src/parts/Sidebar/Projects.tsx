import { MenuList, Section } from '@fxtrot/ui'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { ListWorkspaceProjectsQuery } from '../../graphql/generated'
import { useSchemaId } from '../../utils'

const Projects: React.FC<{
  projects: ListWorkspaceProjectsQuery['userWorkspace']['workspace']['projects']['edges']
}> = ({ projects }) => {
  const { asPath, replace } = useRouter()
  const routeSchemaId = useSchemaId()

  useEffect(() => {
    if (!routeSchemaId && projects?.length > 0) {
      replace(`${asPath}/schema/${projects[0]?.node.id}`)
    }
  }, [asPath, routeSchemaId])

  return (
    <MenuList>
      <Section title="Schemas">
        {projects.map((p) => (
          <MenuList.Item key={p.node.id} selected={p.node.id === routeSchemaId} as="li">
            {p.node.name}
          </MenuList.Item>
        ))}
      </Section>
    </MenuList>
  )
}

export default Projects
