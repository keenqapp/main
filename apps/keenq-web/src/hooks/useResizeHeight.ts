import { useEffect } from 'preact/hooks'
import { useStore } from '@nanostores/preact'
import { atom } from 'nanostores'


function getHeight() {
	const body = document.body
	const	html = document.documentElement
	return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight)
}

const $height = atom(getHeight())

function listener(e: any) {
	const height = e.target.height
	if ($height.get() !== height) $height.set(height)
}
export default function useResizeHeight() {
	const height = useStore($height)
	useEffect(() => {
		window.visualViewport?.addEventListener('resize', listener)
		return () => window.visualViewport?.removeEventListener('resize', listener)
	}, [])
	return height
}
