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
        return prisma.workspaceProject.count({
          where: {
            workspaceId: (root as any).id,
          },
        })
      },
      nodes: (root, args, { prisma }) => {
        return prisma.workspaceProject.findMany({
          where: {
            workspaceId: root.id,
          },
          select: {
            id: true,
            name: true,
            setup: {
              select: {
                id: true,
                key: true,
                lastUsedAt: true,
              },
            },
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

export const WorkspaceProjectSetup = objectType({
  name: 'WorkspaceProjectSetup',
  definition(t) {
    t.implements(Node)
    t.model.id()
    t.model.key()
    t.model.lastUsedAt()
  },
})

export const WorkspaceProjectStats = objectType({
  name: 'WorkspaceProjectStats',
  definition(t) {
    t.implements(Node)
    t.model.id()
  },
})

export const WorkspaceProject = objectType({
  name: 'WorkspaceProject',
  definition(t) {
    t.implements(Node)
    t.model.id()
    t.model.name()
    t.model.Workspace({ alias: 'workspace' })
    t.field('activeSetup', {
      type: 'WorkspaceProjectSetup',
      resolve: (root, args, { prisma }) => {
        return prisma.workspaceProjectSetup.findFirst({
          where: {
            projectId: root.id,
          },
        })
      },
    })

    t.connectionField('stats', {
      type: 'WorkspaceProjectStats',
      totalCount: (root: any, args, { prisma }) => {
        return prisma.workspaceProjectStats.count({
          where: {
            workspaceProjectId: root.id,
          },
        })
      },
      nodes: async (root, args, { prisma, session }) => {
        return prisma.workspaceProjectStats.findMany({
          where: {
            workspaceProjectId: root.id,
          },
        })
      },
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
