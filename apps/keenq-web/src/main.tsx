import { render } from 'preact'

import 'preact/debug'
import '@/utils/polyfills'
import App from '@/core/App'


render(<App />, document.getElementById('app') as HTMLElement)
