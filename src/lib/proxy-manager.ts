import { HttpsProxyAgent } from 'https-proxy-agent'
import { Agent as HttpAgent } from 'node:http'

interface ProxyConfig {
  protocol: string
  host: string
  port: number
  username?: string
  password?: string
}

class ProxyManager {
  private currentProxy: ProxyConfig | null = null
  private httpsAgent: HttpsProxyAgent<string> | null = null
  private httpAgent: HttpAgent = new HttpAgent()

  setProxy(proxyConfig: ProxyConfig | null) {
    this.currentProxy = proxyConfig

    if (proxyConfig) {
      const { protocol, host, port, username, password } = proxyConfig

      // Создаем прокси URL с аутентификацией
      const auth = username && password ? `${username}:${password}@` : ''
      const proxyUrl = `${protocol}://${auth}${host}:${port}`

      // Создаем HTTPS агент с прокси
      this.httpsAgent = new HttpsProxyAgent(proxyUrl)

      console.log(`Proxy set to: ${host}:${port}`)
    } else {
      this.httpsAgent = null
      console.log('Proxy disabled')
    }
  }

  getHttpsAgent() {
    return this.httpsAgent
  }

  getHttpAgent() {
    return this.httpAgent
  }

  getCurrentProxy() {
    return this.currentProxy
  }
}

export const proxyManager = new ProxyManager()

export type { ProxyConfig }
