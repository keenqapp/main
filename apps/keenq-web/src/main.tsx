// eslint-disable-next-line simple-import-sort/imports
import 'preact/debug'
import { render } from 'preact'

import '@/utils/polyfills'
import App from '@/core/App'


// window.addEventListener('contextmenu', e => e.preventDefault())
// document.body.requestFullscreen()

render(<App />, document.getElementById('app') as HTMLElement)
