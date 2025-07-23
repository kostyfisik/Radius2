import type { NextApiRequest, NextApiResponse } from 'next'
import { createBareServer } from '@tomphttp/bare-server-node'

function createBareServerId(id: string) {
  return createBareServer(`/api/bare/${id}/`,  {
    logErrors: false,
    localAddress: undefined,
    maintainer: {
      email: 'contact@proudparrot2.tech',
      website: 'https://github.com/proudparrot2/'
    },
  })
}

export const config = {
  api: {
    responseLimit: false,
    externalResolver: true
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // get id param from route
  const id = req.query.id as string
  if (!id) {
    res.status(400).json({ error: 'Missing id parameter' })
    return
  }
  const bare = createBareServerId(id)
  bare.routeRequest(req, res)
}
