import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname, // apunta al directorio de tu propio proyecto
  },
}

export default nextConfig