import type { NextApiRequest, NextApiResponse } from 'next'
import { createBareServer } from '@tomphttp/bare-server-node'
import { proxyManager } from '@/lib/proxy-manager'

// Функция для получения прокси из куки
function getProxyFromCookie(req: NextApiRequest) {
  const bareUrl = req.headers['x-bare-url']
  if (bareUrl) {
    try {
      const url = new URL(bareUrl as string)
      const proxyParam = url.searchParams.get('proxy')
      if (proxyParam) {
        const proxyData = JSON.parse(decodeURIComponent(proxyParam))
        console.log('Proxy config loaded from x-bare-url:', proxyData)
        return proxyData
      }
    } catch (error) {
      console.error('Failed to parse proxy from x-bare-url:', error)
    }
  }

  return null
}

// Создаем bare сервер с динамическим прокси
let bare: any = null

function createBareServerWithProxy(req: NextApiRequest) {
  const proxyConfig = getProxyFromCookie(req)

  if (proxyConfig) {
    proxyManager.setProxy(proxyConfig)
  } else {
    // Без прокси по умолчанию
    proxyManager.setProxy(null)
  }

  return createBareServer('/api/bare/', {
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
    externalResolver: true
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Создаем bare сервер для каждого запроса с актуальным прокси
  console.log('============ =>> x-bare-url has proxy: ',
     req.headers['x-bare-url']?.includes("proxy"));
  if (req.headers['x-bare-url']?.includes("proxy")) {
    console.log("x-bare-url = ", req.headers['x-bare-url'])
  }
  bare = createBareServerWithProxy(req)
  bare.routeRequest(req, res)
}
