import { intArg, objectType, queryType, unionType } from '@nexus/schema'
import Project from '@spectrum-icons/workflow/Project'

export const Query = queryType({
  definition(t) {
    t.field('me', {
      type: 'User',
      resolve: (root, args, { prisma, session }) => {
        return prisma.user.findOne({
          where: {
            email: session?.user?.email,
          },
        })
      },
    })

    t.field('userWorkspace', {
      type: 'WorkspaceUser',
      args: {
        workspaceId: intArg({
          nullable: false,
        }),
      },
      resolve: (root, args, { prisma, session }) => {
        return prisma.workspaceUser.findFirst({
          where: {
            user: {
              email: session?.user?.email,
            },
            workspaceId: args.workspaceId,
          },
        })
      },
    })

    t.connectionField('userWorkspaces', {
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

    t.field('project', {
      type: 'WorkspaceProject',
      args: {
        id: intArg({
          required: true,
        }),
      },
      resolve: (_root, { id }, { prisma }) => {
        return prisma.project.findOne({
          where: {
            id,
          },
          select: {
            id: true,
            name: true,
            setup: true,
            stats: true,
          },
        })
      },
    })
  },
})
