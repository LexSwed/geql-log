import { MenuList, Section } from '@fxtrot/ui'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { ListWorkspaceProjectsQuery } from '../../graphql/generated'

const Projects: React.FC<{
  projects: ListWorkspaceProjectsQuery['userWorkspace']['workspace']['projects']['edges']
}> = ({ projects }) => {
  const { query, asPath, replace } = useRouter()
  const activeSchemaId = Number(query?.id?.[2])

  useEffect(() => {
    if (!activeSchemaId && projects?.length > 0) {
      replace(`${asPath}/schema/${projects[0]?.node.id}`)
    }
  }, [asPath, activeSchemaId])

  return (
    <MenuList>
      <Section title="Schemas">
        {projects.map((p) => (
          <MenuList.Item key={p.node.id} selected={p.node.id === activeSchemaId}>
            {p.node.name}
          </MenuList.Item>
        ))}
      </Section>
    </MenuList>
  )
}

export default Projects
