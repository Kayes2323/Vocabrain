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
  // The Mino Coach rig artwork (21 small webp layers) is static: let browsers reuse it instead of revalidating each lesson step.
  async headers() {
    return [{ source: '/mino/coach/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=3600, stale-while-revalidate=86400' }] }]
  },
  devIndicators: process.env.NEXT_DEV_INDICATORS === 'off' ? false : { position: 'top-right' },
}

export default nextConfig
