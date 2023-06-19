import { useRef } from 'preact/hooks'


const LONG_PRESS_TIMEOUT = 300

export default function useLongPress(cb: () => void, ms: number = LONG_PRESS_TIMEOUT) {
	const timeout = useRef<ReturnType<typeof setTimeout>>(null)
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const onTouchStart = () => timeout.current = setTimeout(cb, ms)
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const onTouchEnd = () => clearTimeout(timeout.current)

	return {
		onTouchStart,
		onTouchEnd,
		onMouseDown: onTouchStart,
		onMouseUp: onTouchEnd
	}
}
