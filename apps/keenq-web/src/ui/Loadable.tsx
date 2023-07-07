import { ComponentChildren, VNode } from 'preact'
import styled from '@emotion/styled'

import CircularProgress from '@mui/material/CircularProgress'


interface Props {
  loading: boolean
  children: ComponentChildren
  loader? : VNode
	fullHeight?: boolean
}

const LoadableContainer = styled.div<{ fullHeight?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  min-height: var(--vertical-space);
	${p => p.fullHeight && 'height: 100vh'}
`

const LoadingComponent = ({ fullHeight }: { fullHeight?: boolean }) => <LoadableContainer fullHeight={fullHeight}><CircularProgress /></LoadableContainer>

function Loadable({ loading, children, loader, fullHeight }: Props) {
	return (
		<>
			{loading
				? loader || <LoadingComponent fullHeight={fullHeight} />
				: children
			}
		</>
	)
}

export default Loadable
