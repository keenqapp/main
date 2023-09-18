import { useEffect } from 'preact/hooks'
import { useStore } from '@nanostores/preact'
import { atom } from 'nanostores'


function getHeight() {
	const body = document.body
	const	html = document.documentElement
	return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight)
}

const $height = atom(getHeight())

function listener() {
	if ($height.get() !== getHeight()) $height.set(getHeight())
}
export default function useResizeHeight() {
	const height = useStore($height)
	useEffect(() => {
		window.addEventListener('resize', listener)
		return () => window.removeEventListener('resize', listener)
	}, [])
	return height
}
