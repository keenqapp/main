import { useEffect, useState } from 'preact/hooks'
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { useLocation, useNavigate } from 'react-router-dom'

import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'

import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone'

import { useCurrentMember } from '@/model/member'

import Space from '@/ui/Space'
import theme from '@/ui/theme'

import Logo from '@/assets/Logo'


const StyledAppBar = styled(AppBar)`
  height: var(--appbar-height);
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
	font: 2rem keenq, serif;
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

const Version = styled.sub`
	color:#999;
	letter-spacing: 0.1rem;
`

export default function Appbar() {
	const { id } = useCurrentMember()
	const [ color, setColor ] = useState('gray')
	const navigate = useNavigate()
	const location = useLocation()

	const onClick = () => navigate('/profile')
	const isProfile = location.pathname === '/profile'

	useEffect(() => {
		const interval = setInterval(() => {
			setColor(getColor())
		}, 5000)
		return () => clearInterval(interval)
	}, [])

	console.log('--- Appbar.tsx:73 -> Appbar ->', id)

	return (
		<StyledAppBar data-testid='Appbar'>
			<Toolbar>
				<ColorLogo color={color} />
				<HomeButton>{'keenq'}</HomeButton>
				{id === 'boris' && <Version>{import.meta.env.VITE_REACT_APP_VERSION}</Version>}
				<Space grow />
				<IconButton onClick={onClick} color={isProfile ? 'primary' : 'secondary'}>
					<AccountCircleTwoToneIcon />
				</IconButton>
			</Toolbar>
		</StyledAppBar>
	)
}
