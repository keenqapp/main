import { useEffect, useState } from 'preact/hooks'

import { formatDistance } from '@/utils/formatters'


export function useFormatDistance(init: number) {
	const [ distance, setDistance ] = useState('')
	useEffect(() => {
		setDistance(formatDistance(init))
	}, [ init ])
	return distance
}
