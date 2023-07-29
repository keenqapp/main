import { ComponentChildren, VNode } from 'preact'
import styled from '@emotion/styled'

import CircularProgress from '@mui/material/CircularProgress'


interface Props {
  loading: boolean
  children: ComponentChildren
  loader? : VNode
	fullHeight?: boolean
	overlay?: boolean
}

const LoadableContainer = styled.div<{ fullHeight?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  min-height: var(--vertical-space);
	${p => p.fullHeight && 'height: 100vh'}
`

const Overlay = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  min-height: var(--vertical-space);
	width: 100%;
	height: 100%;
	background: rgba(255, 255, 255, 0.8);
`

const LoadingComponent = ({ fullHeight }: { fullHeight?: boolean }) => <LoadableContainer fullHeight={fullHeight}><CircularProgress /></LoadableContainer>

function Loadable({ loading, children, loader, fullHeight, overlay }: Props) {
	return (
		<>
			{loading
				? overlay
					? (
						<>
							<Overlay fullHeight={fullHeight}>{loader || <LoadingComponent fullHeight={fullHeight} />}</Overlay>
							{children}
						</>
					)
					: loader || <LoadingComponent fullHeight={fullHeight} />
				: children
			}
		</>
	)
}

export default Loadable
