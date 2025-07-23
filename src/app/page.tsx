'use client'
import { Input } from '@/components/ui/input'
import { Flame, Radius, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Item } from '@/lib/types'
import store from 'store2'

export default function Home() {
  const router = useRouter()
  const [isProxy, setIsProxy] = useState(false)
  useEffect(() => {
    const storedProxy = store.get('isProxy')
    if (storedProxy !== null) {
      setIsProxy(storedProxy)
    }
  }, [])
  // Save url to local storage
  const [url, setUrl] = useState('')
  useEffect(() => {
    const storedUrl = store.get('url')
    if (storedUrl) {
      setUrl(storedUrl)
    }
  }, [])
    
  return (
    <div>
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-6">
        <div className="flex items-center gap-2">
          <Radius className="h-16 w-16 rotate-180" />
          <h1 className="text-6xl font-semibold">Radius</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            {/* Use url from local storage as initial value */}
            <Input
              className="w-[26rem] px-9 h-12 rounded-lg"
              placeholder="Search the web"
              defaultValue={url}
              onKeyDown={(e) => {
                if (e.key !== 'Enter') return
                store.set('url', e.currentTarget.value)
                router.push(`/go/${isProxy ? 'proxyID/' : ''}${btoa(e.currentTarget.value)}`)
              }}
            />
            <Search className="h-4 w-4 text-muted-foreground absolute top-1/2 -translate-y-1/2 left-3" />
          </div>
        </div>
                 {/* Add a button to toggle proxy mode */}
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={() => {
            setIsProxy(!isProxy)
            store.set('isProxy', !isProxy)
          }}
        >
          {isProxy ? 'Use direct connection' : 'Enable Proxy'}
        </button>

      </div>
    </div>
  )
}
