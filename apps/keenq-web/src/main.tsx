// eslint-disable-next-line simple-import-sort/imports
import 'preact/debug'
import { render } from 'preact'

import '@/utils/polyfills'
import App from '@/core/App'
import '@/services/sentry'


// window.addEventListener('contextmenu', e => e.preventDefault())

render(<App />, document.getElementById('app') as HTMLElement)
