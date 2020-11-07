import { objectType, enumType, interfaceType } from '@nexus/schema'
import { WorkspaceUserRole as Role } from '@prisma/client'

export const Node = interfaceType({
  name: 'Node',
  definition(t) {
    t.int('id', { nullable: false, description: 'Resource ID' })
    t.resolveType(() => null)
  },
})

const members: Role[] = ['ADMIN', 'USER']
export const WorkspaceUserRole = enumType({
  name: 'Role',
  members,
})

export const Workspace = objectType({
  name: 'Workspace',
  definition(t) {
    t.implements(Node)
    t.model.id()
    t.model.name()
    t.model.image()
    t.connectionField('projects', {
      type: 'WorkspaceProject',
      totalCount: (root, args, { prisma }) => {
        return prisma.project.count({
          where: {
            workspaceId: (root as any).id,
          },
        })
      },
      nodes: (root, args, { prisma }) => {
        return prisma.project.findMany({
          where: {
            workspaceId: root.id,
          },
        })
      },
    })
  },
})

export const WorkspaceUser = objectType({
  name: 'WorkspaceUser',
  definition(t) {
    t.implements(Node)
    t.model.id()
    t.model.role()
    t.model.user()
    t.model.workspace()
  },
})

export const ProjectSetup = objectType({
  name: 'WorkspaceProjectSetup',
  definition(t) {
    t.implements(Node)
    t.model('ProjectSetup').id()
    t.model('ProjectSetup').active()
    t.model('ProjectSetup').projectId()
    t.model('ProjectSetup').sharedSecret()
  },
})

export const Project = objectType({
  name: 'WorkspaceProject',
  definition(t) {
    t.implements(Node)
    t.model('Project').id()
    t.model('Project').name()
    t.model('Project').Workspace({ alias: 'workspace' })
    t.model('Project').setup({
      type: 'WorkspaceProjectSetup',
    })
  },
})

export const User = objectType({
  name: 'User',
  definition(t) {
    t.implements(Node)
    t.model.id()
    t.model.name()
    t.model.email()
    t.model.image()
    t.connectionField('workspaces', {
      type: 'WorkspaceUser',
      totalCount: (root, args, { prisma, session }) => {
        return prisma.workspaceUser.count({
          where: {
            user: {
              email: session?.user?.email,
            },
          },
        })
      },
      nodes: async (root, args, { prisma, session }) => {
        return prisma.workspaceUser.findMany({
          where: {
            user: {
              email: session?.user?.email,
            },
          },
        })
      },
    })
  },
})
