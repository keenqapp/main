import { useEffect, useState } from 'preact/hooks'
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'

import Space from '@/ui/Space'
import theme from '@/ui/theme'

import Logo from '@/assets/Logo'
import AppbarMenu from '@/core/Appbar/AppbarMenu'
import { useMenuOpen } from '@/hooks/useMenuOpen'


const StyledAppBar = styled(AppBar)`
  height: var(--vertical-space);
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(6px);
  color: ${({ theme }) => theme.palette.primary.contrastText};
  box-shadow: none;
`

const fadeInTop = keyframes`
  0% {
    opacity: 0.01;
    transform: translateY(-25px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`

const HomeButton = styled(Button)`
  animation: ${fadeInTop} 300ms ease-in-out 1;
	font: 2rem serif;
	color: black;
	text-transform: none;
`

let i = 0
const colors = [theme.color.primary, theme.color.secondary, theme.color.error, 'blue', 'gray']
function getColor() {
	return colors[i++ % colors.length]
}

const ColorLogo = styled(Logo)`
	transition: color 300ms ease-in-out;
	color: ${p => p.color};
`

export default function Appbar() {
	const { open, setMenuOpen } = useMenuOpen()
	const [ color, setColor ] = useState('gray')

	useEffect(() => {
		const interval = setInterval(() => {
			setColor(getColor())
		}, 5000)
		return () => clearInterval(interval)
	}, [])

	return (
		<StyledAppBar data-testid='Appbar'>
			<Toolbar>
				<ColorLogo color={color} />
				<HomeButton>keenq</HomeButton>
				<Space grow />
				<IconButton onClick={setMenuOpen(true)}>
					<MenuTwoToneIcon />
				</IconButton>
				<AppbarMenu open={open} toggleMenuOpen={setMenuOpen} />
			</Toolbar>
		</StyledAppBar>
	)
}
