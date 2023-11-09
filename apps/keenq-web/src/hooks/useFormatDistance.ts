import { useEffect, useState } from 'react'

import { useTranslate } from '@/services/translate'

import { formatDistance } from '@/utils/formatters'


const cache = new Map<string, string>()

export function useFormatDistance(init: number, id: string) {
	const [ distance, setDistance ] = useState('')
	const { t } = useTranslate()
	useEffect(() => {
		if (cache.has(id)) setDistance(cache.get(id!))
		else {
			const d = formatDistance(init, t)
			setDistance(d)
			cache.set(id, d)
		}
	}, [ init, id ])
	return distance
}
