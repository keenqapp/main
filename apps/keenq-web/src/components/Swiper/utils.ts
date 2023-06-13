const options = {
	snapStop: true,
}

export async function checkSnap(el: HTMLDivElement|null) {
	const isSupported = CSS.supports('scroll-snap-type', 'y mandatory')
	if (!isSupported && el) {
		const snap = await import('scroll-snap')
		snap.default(el, options)
	}
}
