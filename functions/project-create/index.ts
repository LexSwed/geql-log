import { AzureFunction, Context, HttpRequest } from '@azure/functions'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const item = JSON.stringify({
    id: require('cuid')(),
    setups: [],
  })

  context.bindings.projectDocument = item

  context.done(null, {
    body: item,
  })
}

export default httpTrigger
