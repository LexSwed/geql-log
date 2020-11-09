import { mutationType, stringArg } from '@nexus/schema'
import { createProject } from './azure'

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
        const count = await prisma.workspaceUser.count({
          where: {
            user: {
              email: session.user.email,
            },
          },
        })
        if (count > 2) {
          throw new Error('Max workspaces limit reached')
        }

        const project = await createProject({ name: 'Development' })

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
                  create: project,
                },
              },
            },
          },
        })
      },
    })
  },
})
