import { intArg, queryType, stringArg } from '@nexus/schema'

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
        id: stringArg({
          required: true,
        }),
      },
      resolve: async (_root, { id }, { prisma }, { fieldNodes }) => {
        const [project] = await Promise.all([
          prisma.project.findOne({
            where: {
              id,
            },
            select: {
              id: true,
              name: true,
            },
          }),
        ])

        console.log(fieldNodes)

        return project
      },
    })
  },
})
