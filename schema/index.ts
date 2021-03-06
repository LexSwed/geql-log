import { makeSchema, connectionPlugin } from '@nexus/schema'
import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema'
import path from 'path'
import * as entities from './entities'
import { Mutation } from './mutation'
import { Query } from './query'
import { DateTime } from './scalars'

export const schema = makeSchema({
  types: { Query, Mutation, DateTime, ...entities },
  plugins: [
    nexusSchemaPrisma({
      experimentalCRUD: true,
      scalars: {
        DateTime,
      },
    }),
    connectionPlugin({
      extendConnection: {
        totalCount: { type: 'Int' },
      },
    }),
  ],
  outputs: {
    schema: path.join(process.cwd(), 'schema/generated/schema.graphql'),
    typegen: path.join(process.cwd(), 'schema/generated/nexus.ts'),
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@prisma/client',
        alias: 'prisma',
      },
      {
        source: path.join(process.cwd(), 'schema/context.ts'),
        alias: 'Context',
      },
    ],
  },
})
