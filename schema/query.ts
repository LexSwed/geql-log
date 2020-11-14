import { intArg, queryType } from '@nexus/schema'

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
      resolve: (_root, { id }, { prisma, session }) => {
        // TODO: make sure it's protected well
        return prisma.workspaceProject.findFirst({
          where: {
            id,
            AND: {
              Workspace: {
                users: {
                  some: {
                    user: {
                      email: session?.user?.email,
                    },
                  },
                },
              },
            },
          },
        })
      },
    })
  },
})
