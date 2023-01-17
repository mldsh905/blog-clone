/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript:{
    ignoreBuildErrors:true
  },
  reactStrictMode: true,
  images: {
    domains: ['media.graphassets.com']
  }
}

module.exports = nextConfig
