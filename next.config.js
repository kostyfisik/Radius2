/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheHandler: require.resolve(
      'next/dist/server/lib/incremental-cache/file-system-cache.js'
    ),
  trailingSlash: true,
  redirects() {
    return [
      {
        source: '/settings',
        destination: '/settings/appearance',
        permanent: false
      }
    ]
  }
}

module.exports = nextConfig
