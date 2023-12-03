import { createRoot } from 'react-dom/client'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { registerSW } from 'virtual:pwa-register'

import '@/utils/polyfills'
import App from '@/core/App'


registerSW({ immediate: true })

const root = createRoot(document.getElementById('app')!)
root.render(<App />)
