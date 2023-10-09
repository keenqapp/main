import preact from '@preact/preset-vite'
import path from 'path'
import { defineConfig } from 'vite'
import inspect from 'vite-plugin-inspect'
import { VitePWA } from 'vite-plugin-pwa'


const manifest = {
	theme_color: '#fff',
	background_color: '#fff',
	display: 'standalone',
	scope: '/',
	start_url: '/',
	name: 'keenq',
	short_name: 'keenq',
	description: 'Dating app for special as you',
	icons: [
		{
			src: '/keenq.svg',
			type: 'image/svg+xml'
		},
		{
			src: '/icon-192x192.png',
			sizes: '192x192',
			type: 'image/png'
		},
		{
			src: '/icon-256x256.png',
			sizes: '256x256',
			type: 'image/png'
		},
		{
			src: '/icon-384x384.png',
			sizes: '384x384',
			type: 'image/png'
		},
		{
			src: '/icon-512x512.png',
			sizes: '512x512',
			type: 'image/png'
		}
	]
}

export default defineConfig(({ mode }) => ({
	server: {
		port: 9001
	},
	plugins: [
		VitePWA({
			strategies: 'injectManifest',
			injectManifest: {
				swSrc: 'public/sw.js',
				swDest: 'dist/sw.js',
				globDirectory: 'dist',
				globPatterns: ['**/*.{woff,woff2,png,jpeg,webm,svg}']
			},
			registerType: 'autoUpdate',
			manifest,
			manifestFilename: 'manifest.json',
			devOptions: {
				enabled: mode === 'development'
			},
		}),
		inspect(),
		preact({
			babel: {
				plugins: ['babel-plugin-transform-react-pug'],
			}
		})
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			react: 'preact/compat',
			'@types/react': 'preact/compat',
			'react-dom/test-utils': 'preact/test-utils',
			'react-dom': 'preact/compat',
			'react/jsx-runtime': 'preact/jsx-runtime',
		}
	}
}))
