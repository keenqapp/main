// eslint-disable-next-line simple-import-sort/imports
import 'preact/debug'
import { render } from 'preact'

import '@/utils/polyfills'
import App from '@/core/App'
// import { setPWA } from '@/services/pwa'

// window.addEventListener('contextmenu', e => e.preventDefault())
// document.body.requestFullscreen()

render(<App />, document.getElementById('app') as HTMLElement)

// if (typeof navigator.serviceWorker !== 'undefined') {
// 	navigator.serviceWorker.register('serviceworker.js')
// }
//
// window.addEventListener('beforeinstallprompt', (e) => {
// 	e.preventDefault()
// 	setPWA(e)
// })
