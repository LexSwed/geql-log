import got from 'got'

const api = got.extend({ prefixUrl: process.env.AZURE_HOST, responseType: 'json' })

interface NewProject {
  id: string
  name: string
}
export const createProject = async ({ name }: { name: string }): Promise<NewProject> => {
  const res = await api.post('/api/project', {
    json: { name },
  })

  return (res.body as unknown) as NewProject
}

export const getSetupItems = async ({ id }: { id: string }): Promise<any> => {
  const res = await api.get('/api/project')

  return res.body as unknown
}
