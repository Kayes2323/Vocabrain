/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Development-only indicator: keep it at the top, clear of the mobile bottom navigation
  // (NEXT_DEV_INDICATORS=off hides it, e.g. for screenshots of the app).
  devIndicators: process.env.NEXT_DEV_INDICATORS === 'off' ? false : { position: 'top-right' },
}

export default nextConfig
