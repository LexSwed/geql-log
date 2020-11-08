import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import cuid from 'cuid'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  if (!req.body?.name) {
    return
  }

  const item = JSON.stringify({
    id: cuid(),
    name,
  })

  context.bindings.projectDocument = item

  context.res = {
    body: item,
  }

  context.done()
}

export default httpTrigger
