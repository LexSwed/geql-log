import { AzureFunction, Context, HttpRequest } from '@azure/functions'

const createProject = async (context: Context) => {
  const item = JSON.stringify({
    id: require('cuid')(),
    setups: [],
  })

  // context.bindings.projectDocument = item

  return {
    body: item,
  }
}

const getProject = async (context: Context, req: HttpRequest) => {
  // fetch items using cosmosdb client

  return {
    body: {
      id: req.params?.id,
    },
  }
}

const httpTrigger: AzureFunction = function (context: Context, req: HttpRequest) {
  switch (req.method) {
    case 'GET':
      return getProject(context, req)
    case 'POST':
      return createProject(context)
  }
}

export default httpTrigger
