import type { NextApiRequest, NextApiResponse } from 'next'
import { createBareServer } from '@tomphttp/bare-server-node'
import { proxyManager, ProxyConfig } from '@/lib/proxy-manager'

const proxyConfig =  {
    protocol: 'http',
    host: '80.243.141.77',
    port: 50100,
    username: 'TxWfUv58',
    password: 'Z4ADx8b1wR'
  } as ProxyConfig;


function createBareServerId(id: string) {
  proxyManager.setProxy(proxyConfig)
  return createBareServer(`/api/bare/${id}/`,  {
    logErrors: false,
    localAddress: undefined,
    maintainer: {
      email: 'contact@proudparrot2.tech',
      website: 'https://github.com/proudparrot2/'
    },
    httpAgent: proxyManager.getHttpAgent(),
    httpsAgent: proxyManager.getHttpsAgent() || undefined
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
