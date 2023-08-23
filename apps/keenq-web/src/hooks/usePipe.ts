import { useMemo } from 'preact/hooks'

import { pipe } from '@/utils/utils'


export function usePipe<I, O>(data: I, ...fns: ((input: any) => any)[]): O {
	return useMemo(() => pipe(data || [], ...fns), [data])
}
