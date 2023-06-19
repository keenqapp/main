import { useEffect } from 'preact/hooks'

import { signal } from '@/utils/signals'


function getHeight() {
	const body = document.body
	const	html = document.documentElement
	return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight)
}

const height = signal(getHeight())
function listener() {
	if (height() !== getHeight()) height(getHeight())
}
export default function useResizeHeight() {
	useEffect(() => {
		window.addEventListener('resize', listener)
		return () => window.removeEventListener('resize', listener)
	}, [])
	return height
}
