// eslint-disable-next-line simple-import-sort/imports

import { createRoot } from 'react-dom/client'

import '@/utils/polyfills'
import App from '@/core/App'


const root = createRoot(document.getElementById('app'))
root.render(<App />)
// render(<App />, document.getElementById('app') as HTMLElement)
