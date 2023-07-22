import { CorsOptions, defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import fs from 'fs';
import { SecureContextOptions } from 'tls';
import legacy from '@vitejs/plugin-legacy';
import { VitePWA } from 'vite-plugin-pwa';

const HOST = 'sample';
const PORT = 5173;
const VHOST_FQDN = process.env.VHOST_FQDN ?? "test.test";
const HTTPS_OPTIONS: SecureContextOptions = {
  key: fs.readFileSync(`../certs/${VHOST_FQDN}/key.pem`),
  cert: fs.readFileSync(`../certs/${VHOST_FQDN}/cert.pem`)
};
const PROTOCOL = 'https://';
const CORS_OPTION: CorsOptions = {
  origin: `${PROTOCOL}${VHOST_FQDN}`
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: [
        '>0.2%',
        'not dead',
        'not op_mini all',
        'IE 11'
      ]
    }),
    VitePWA({
      manifest: {
        name: "Vite + React + TypeScript",
        short_name: "ViteReactTS",
        description: "Vite + React + TypeScript (PWA)",
        theme_color: "#ffffff",
        icons: [
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png'
          },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          }
        ]
      },
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      devOptions: {
        enabled: true
      }
    })
  ],
  server: {
    host: HOST,
    origin: `${PROTOCOL}${VHOST_FQDN}`,
    https: HTTPS_OPTIONS,
    hmr: {
      host: VHOST_FQDN,
      port: PORT
    },
    strictPort: true,
    cors: CORS_OPTION
  },
  preview: {
    host: HOST,
    port: PORT,
    https: HTTPS_OPTIONS,
    strictPort: true,
    cors: CORS_OPTION
  }
});
