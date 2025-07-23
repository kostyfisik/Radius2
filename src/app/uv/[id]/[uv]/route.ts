import fs from 'fs'
import { notFound } from 'next/navigation'
import { NextRequest } from 'next/server'

// Only config.js and sw.js are served from the local filesystem
export async function GET(_req: NextRequest, { params }: {  params: { id: string; uv: string } }) {
  const proxyId = params.id
  const requestedFile = params.uv
  if (requestedFile === 'uv.config.js' || requestedFile === 'sw.js') {
    const file = fs.readFileSync(process.cwd() + `/src/lib/uv/${requestedFile}`)
    const fileContent = file.toString().replace(/direct/g, `${proxyId}`)
    // console.log(`==== proxy ID: ${proxyId} serving:\n ${fileContent} for `)  
    const fileBlob = new Blob([fileContent])
    return new Response(fileBlob, {
      headers: {
        'Content-Type': 'application/javascript'
      }
    })
  } else {
    notFound()
  }
}