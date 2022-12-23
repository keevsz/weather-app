import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'logo.svg'],
      manifest: {
        name: 'Weather App by keevsz',
        short_name: 'Weather',
        description: 'Application made to see weather of your city',
        theme_color: '#121212',
        background_color: '#121212',
        icons: [
          {
            src: 'weather.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'weather.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
})
