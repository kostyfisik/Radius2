import fs from 'fs'
import { notFound } from 'next/navigation'
import { NextRequest } from 'next/server'

// Only config.js and sw.js are served from the local filesystem
export async function GET(_req: NextRequest, { params }: { params: { uv: string } }) {
  const requestedFile = params.uv
  if (requestedFile === 'uv.config.js' || requestedFile === 'sw.js') {
    const file = fs.readFileSync(process.cwd() + `/src/lib/uv/${requestedFile}`)
    const fileBlob = new Blob([file])
    return new Response(fileBlob, {
      headers: {
        'Content-Type': 'application/javascript'
      }
    })
  } else {
    notFound()
  }
}