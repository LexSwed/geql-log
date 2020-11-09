import { AzureFunction, Context, HttpRequest } from '@azure/functions'

const createProjectSetup = async (context: Context, req: HttpRequest) => {
  // find projectByKey = req.params.id
  // context.bindings.projectDocument = {projectSetupDocument}

  return {
    body: {
      key: 'some key',
    },
  }
}

const getProjectSetups = async (context: Context, req: HttpRequest) => {
  // fetch items using cosmosdb client
  return {
    body: [],
  }
}

const httpTrigger: AzureFunction = function (context: Context, req: HttpRequest) {
  switch (req.method) {
    case 'GET':
      return getProjectSetups(context, req)
    case 'POST':
      return createProjectSetup(context, req)
  }
}

export default httpTrigger
