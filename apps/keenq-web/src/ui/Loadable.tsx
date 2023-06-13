import styled from '@emotion/styled'
import { ReactNode } from 'react'

import CircularProgress from '@mui/material/CircularProgress'


interface Props {
  loading: boolean
  children: ReactNode
  loader? : ReactNode
}

const LoadableContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  min-height: var(--vertical-space);
`

const LoadingComponent = () => <LoadableContainer><CircularProgress /></LoadableContainer>

function Loadable({ loading, children, loader }: Props) {
	return (
		<>
			{loading
				? loader || <LoadingComponent />
				: children
			}
		</>
	)
}

export default Loadable
