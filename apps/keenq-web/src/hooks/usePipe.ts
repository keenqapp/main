import { useMemo } from 'react'

import { pipe } from '@/utils/utils'


type LastFnReturnType<T extends any[]> = T extends [...any[], infer L] ? L extends (...args: any) => any ? ReturnType<L> : never : never

export function usePipe<I, O extends ((input: any) => any)[]>(data: I, ...fns: O): LastFnReturnType<O> {
	return useMemo(() => pipe(data || [], ...fns), [data])
}
