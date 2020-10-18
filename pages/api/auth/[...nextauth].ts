import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Adapters from 'next-auth/adapters'
import { NextApiHandler } from 'next'

import { prisma } from '../../../prisma'

const options = {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  adapter: Adapters.Prisma.Adapter({ prisma }),
  // events: {
  //   createUser: (message: unknown) => {
  //     // make request to GitHub /user/orgs to check whether org already exist in Geql
  //     // and automatically assign the user to it
  //   },
  // },
}

const handler: NextApiHandler = (req, res) => NextAuth(req, res, options)

export default handler
