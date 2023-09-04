import { useEffect, useState } from 'preact/hooks'

import { useTranslate } from '@/services/translate'

import { formatDistance } from '@/utils/formatters'


export function useFormatDistance(init: number) {
	const [ distance, setDistance ] = useState('')
	const { t } = useTranslate()
	useEffect(() => {
		setDistance(formatDistance(init, t))
	}, [ init ])
	return distance
}
