import "preact/debug";
import { render } from 'preact'

import App from '@/core/App'


render(<App />, document.getElementById('app') as HTMLElement)
