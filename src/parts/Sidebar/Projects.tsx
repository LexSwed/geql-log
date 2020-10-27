import { MenuList, Section } from '@fxtrot/ui'
import React from 'react'
import NextLink from 'next/link'

const Projects = () => {
  return (
    <MenuList>
      <Section title="Schemas">
        <MenuList.Item as={NextLink}>Project 1</MenuList.Item>
      </Section>
    </MenuList>
  )
}

export default Projects
