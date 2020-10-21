import { queryType } from '@nexus/schema'

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
