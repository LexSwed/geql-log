import { NextApiHandler } from 'next'
import { getSession } from 'next-auth/client'
import { prisma } from '../../prisma'

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req })
  if (!session?.user) {
    res.status(401)
    return
  }

  if (req.method.toLowerCase() === 'post') {
    const workspace: { name: string } = JSON.parse(req.body)
    const session = await getSession({ req })

    const newWorkspace = await prisma.workspaceUser.create({
      data: {
        role: 'ADMIN',
        user: {
          connect: {
            email: session.user.email,
          },
        },
        workspace: {
          create: {
            name: workspace.name,
          },
        },
      },
      select: {
        id: true,
        role: true,
        workspace: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })
    res.send(newWorkspace)

    return
  }
}

export default handler
