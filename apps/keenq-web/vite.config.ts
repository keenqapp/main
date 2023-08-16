import preact from '@preact/preset-vite'
// import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { defineConfig } from 'vite'
import inspect from 'vite-plugin-inspect'


export default defineConfig({
	plugins: [
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
})
