import type { NextApiRequest, NextApiResponse } from 'next'
import { createBareServer } from '@tomphttp/bare-server-node'


const bare =  createBareServer('/api/bare/direct/', {
    logErrors: false,
    localAddress: undefined,
    maintainer: {
      email: 'contact@proudparrot2.tech',
      website: 'https://github.com/proudparrot2/'
    },
  })


export const config = {
  api: {
    responseLimit: false,
    externalResolver: true
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  bare.routeRequest(req, res)
}
