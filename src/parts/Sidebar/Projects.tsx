import { MenuList, Section } from '@fxtrot/ui'
import React, { useEffect, useState } from 'react'
import { ListWorkspaceProjectsQuery } from '../../graphql/generated'

const Projects: React.FC<{
  projects: ListWorkspaceProjectsQuery['userWorkspace']['workspace']['projects']['edges']
}> = ({ projects }) => {
  const [selectedId, setSelected] = useState<number>(null)

  useEffect(() => {
    if (!selectedId && projects?.length > 0) {
      setSelected(projects[0].node.id)
    }
  }, [])

  return (
    <MenuList>
      <Section title="Schemas">
        {projects.map((p) => (
          <MenuList.Item key={p.node.id} selected={p.node.id === selectedId}>
            {p.node.name}
          </MenuList.Item>
        ))}
      </Section>
    </MenuList>
  )
}

export default Projects
