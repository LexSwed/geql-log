import { mutationType, stringArg } from '@nexus/schema'

export const Mutation = mutationType({
  definition(t) {
    t.field('createWorkspace', {
      type: 'WorkspaceUser',
      description: 'Create a workspace for current user',
      nullable: false,
      args: {
        name: stringArg({ required: true }),
      },
      resolve: async (_root, { name }, { prisma, session }) => {
        return prisma.workspaceUser.create({
          data: {
            role: 'ADMIN',
            user: {
              connect: {
                email: session.user.email,
              },
            },
            workspace: {
              create: {
                name,
              },
            },
          },
        })
      },
    })
  },
})
