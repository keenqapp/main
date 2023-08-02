import { VNode } from 'preact'
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'


const fadeInBottom = keyframes`
  0% {
    opacity: 0.01;
    transform: translateY(50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`

const StyledAppBar = styled(AppBar)`
  animation: ${fadeInBottom} 300ms ease-in-out 1;
  top: auto;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(6px);
  color: ${props => props.theme.palette.text.primary}
`

interface Props {
  children: VNode
}

function BottomAppbar({ children }: Props) {
	return (
		<StyledAppBar position='fixed'>
			<Toolbar>
				{children}
			</Toolbar>
		</StyledAppBar>
	)
}

export default BottomAppbar
