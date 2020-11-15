import { intArg, mutationType, stringArg } from '@nexus/schema'
import { ApolloError } from 'apollo-server-micro'

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
            default: true,
            user: {
              connect: {
                email: session.user.email,
              },
            },
            workspace: {
              create: {
                name,
                projects: {
                  create: {
                    name: 'Development',
                  },
                },
              },
            },
          },
        })
      },
    })

    t.field('createSetup', {
      type: 'WorkspaceProjectSetup',
      nullable: false,
      description: 'Create project API key',
      args: {
        projectId: intArg({
          required: true,
        }),
      },
      resolve: async (root, { projectId }, { prisma, session }) => {
        const { role } = await prisma.workspaceUser.findFirst({
          where: {
            user: {
              email: session.user.email,
            },
            workspace: {
              projects: {
                some: {
                  id: projectId,
                },
              },
            },
          },
          select: {
            role: true,
          },
        })

        if (role !== 'ADMIN') {
          throw new ApolloError('Not authorized')
        }

        return prisma.workspaceProjectSetup.create({
          data: {
            project: {
              connect: {
                id: projectId,
              },
            },
          },
        })
      },
    })
  },
})
