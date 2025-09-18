/** @type {import('next').NextConfig} */

import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'firebasestorage.googleapis.com',
      'ik.imagekit.io',
    ],
  },
}

export default withBundleAnalyzer(nextConfig)
