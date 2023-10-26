import { useState } from 'preact/hooks'
import { SwipeEventData, useSwipeable,  } from 'react-swipeable'


interface UseSwipeOptions {
	onLeft?: (e: SwipeEventData) => void
	onRight?: (e: SwipeEventData) => void
	onSwiping?: (e: SwipeEventData, setTransform: (delta: number) => void) => void
}

export function useSwipe({ onLeft, onRight, onSwiping }: UseSwipeOptions) {
	const [ transform, setTransform ] = useState(0)
	const swipes = useSwipeable({
		...(onLeft ? { onSwipedLeft: (e: SwipeEventData) => {
			setTransform(0)
			onLeft && onLeft(e)
		} } : {}),
		...(onRight ? { onSwipedRight: (e: SwipeEventData) => {
			setTransform(0)
			onRight && onRight(e)
		} } : {}),
		onSwiping: (e: SwipeEventData) => {
			onSwiping && onSwiping(e, setTransform)
			if (!onLeft && e.deltaX < 0) return
			if (!onRight && e.deltaX > 0) return
			setTransform(e.deltaX)
		},
		delta: 10,
	})
	return {
		transform,
		...swipes
	}
}
