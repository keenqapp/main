import { FunctionComponent, ReactNode } from 'react'

import GqlProvider from '@/context/GqlProvider'
import LocalizationProvider from '@/context/LocalizationProvider'
import ThemeProvider from '@/context/ThemeProvider'


interface Props {
  contexts?: any[]
  children?: ReactNode
}

// 1. order of context is important
// 2. earlest context is topmost in nesting
// 3. early context is accessible from next but not vice versa
const initContexts: any[] = [
	GqlProvider,
	ThemeProvider,
	LocalizationProvider
]

const CombinedContext: FunctionComponent<Props> = ({ contexts = initContexts, children }) => {
	return (
		<>
			{contexts.reduceRight((rest, Current) => <Current>{rest}</Current>, children)}
		</>
	)
}

export default CombinedContext
