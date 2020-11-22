import { ApolloServer } from 'apollo-server-micro'
import { ApolloServerPlugin } from 'apollo-server-plugin-base'
import { NextApiHandler } from 'next'
import { getSession } from 'next-auth/client'
import { schema } from '../../../schema'
import { createContext } from '../../../schema/context'

const server = new ApolloServer({
  schema,
  context: createContext,
  tracing: process.env.NODE_ENV === 'development',
  introspection: process.env.NODE_ENV === 'development',
  plugins: [plugin()],
})

const graphqlHandler = server.createHandler({ path: '/api/gql' })

export const config = {
  api: {
    bodyParser: false,
  },
}

const handler: NextApiHandler = async (req, res) => {
  if (process.env.NODE_ENV === 'development') {
    return graphqlHandler(req, res)
  }

  const session = await getSession({ req })

  if (!session?.user) {
    res.status(401).end()

    return
  }

  return graphqlHandler(req, res)
}

export default handler

function plugin() {
  return (): ApolloServerPlugin => ({
    requestDidStart(context) {
      // console.dir(context)
      return {
        parsingDidStart() {
          return (err) => {
            if (err) {
              console.error(err)
            }
          }
        },
        validationDidStart() {
          // This end hook is unique in that it can receive an array of errors,
          // which will contain every validation error that occurred.
          return (errs) => {
            if (errs) {
              errs.forEach((err) => console.error(err))
            }
          }
        },
        executionDidStart() {
          return (err) => {
            if (err) {
              console.error(err)
            }
          }
        },
        willSendResponse(context) {
          console.dir(JSON.parse(JSON.stringify(context.request.variables)))
          console.dir(JSON.parse(JSON.stringify(context.operation)), { depth: null })
        },
      }
    },
  })
}
