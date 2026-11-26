import type { MetadataRoute } from 'next';
import { APP_NAME, APP_TAGLINE } from '@/lib/constants';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: APP_NAME,
    short_name: APP_NAME,
    description: APP_TAGLINE,
    id: '/',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#fafafc',
    theme_color: '#1e2a4a',
    // The approved Mino logo artwork, resized (never redrawn): scripts/brand/gen-mino-logo.mjs. `?v=mino` busts the
    // browsers'/installed apps' cache of the previous brand's icons (same file names).
    icons: [
      { src: '/icon-48.png?v=mino', sizes: '48x48', type: 'image/png' },
      { src: '/icon-192.png?v=mino', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png?v=mino', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon-maskable-512.png?v=mino', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      { src: '/apple-icon.png?v=mino', sizes: '180x180', type: 'image/png' },
    ],
  };
}
