import preact from '@preact/preset-vite'
import path from 'path'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'


export default defineConfig({
	plugins: [preact(), svgr()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			react: 'preact/compat',
			'react-dom/test-utils': 'preact/test-utils',
			'react-dom': 'preact/compat',
			'react/jsx-runtime': 'preact/jsx-runtime',
		}
	}
})
