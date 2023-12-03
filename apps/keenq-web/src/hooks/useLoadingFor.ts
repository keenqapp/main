import { useCallback, useState } from 'react'


export default function useLoadingFor(fn: any) {
	const [loading, setLoading] = useState(false)
	const execute = useCallback(() => {
		setLoading(true)
		return fn().finally(() => setLoading(false))
	}, [ fn ])
	return [ loading, execute ] as const
}
