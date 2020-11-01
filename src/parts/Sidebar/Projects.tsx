import { MenuList, Section } from '@fxtrot/ui'
import React from 'react'

const Projects = () => {
  return (
    <MenuList>
      <Section title="Schemas">
        <MenuList.Item selected>Project 1</MenuList.Item>
      </Section>
    </MenuList>
  )
}

export default Projects
