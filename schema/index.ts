import { makeSchema } from '@nexus/schema'
import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema'
import path from 'path'
import * as entities from './entities'
import { Mutation } from './mutation'
import { Query } from './query'

export const schema = makeSchema({
  types: { Query, Mutation, ...entities },
  plugins: [nexusSchemaPrisma({ experimentalCRUD: true })],
  outputs: {
    schema: path.join(process.cwd(), 'schema.graphql'),
    typegen: path.join(process.cwd(), 'nexus.ts'),
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@prisma/client',
        alias: 'prisma',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
  },
})
