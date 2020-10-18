import { objectType, enumType } from '@nexus/schema'
import { WorkspaceUserRole as Role } from '@prisma/client'

const members: Role[] = ['ADMIN', 'USER']
export const WorkspaceUserRole = enumType({
  name: 'Role',
  members,
})

export const Workspace = objectType({
  name: 'Workspace',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.image()
  },
})

export const WorkspaceUser = objectType({
  name: 'WorkspaceUser',
  definition(t) {
    t.model.id()
    t.model.role()
    t.model.user()
    t.model.workspace()
  },
})

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.email()
    t.model.image()
    t.model.workspaces()
  },
})
