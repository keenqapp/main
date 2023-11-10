import { useEffect, useState } from 'react'
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { useStore } from '@nanostores/react'
import { atom } from 'nanostores'
import { useLocation, useNavigate } from 'react-router-dom'

import Badge from '@mui/material/Badge'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'

import BugReportIcon from '@mui/icons-material/BugReport'
import DateRangeTwoToneIcon from '@mui/icons-material/DateRangeTwoTone'
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone'
import QuestionAnswerTwoToneIcon from '@mui/icons-material/QuestionAnswerTwoTone'
import SupervisedUserCircleTwoToneIcon from '@mui/icons-material/SupervisedUserCircleTwoTone'

import { useCurrentMember } from '@/model/member'

import { isIOS, isPWA } from '@/utils/utils'


const Nav = styled(BottomNavigation)`
  position: fixed;
  bottom: ${isIOS() && isPWA() ? 'var(--safe-area)' : '0'};
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.33);
  backdrop-filter: blur(6px);
	height: var(--vertical-space);
`

const appear = keyframes`
	0% {
		opacity: 1;
		transform: scale(0.5);
	}
	100% {
		opacity: 0.2;
		transform: scale(2.5);
	}
`

const MatchedIcon = styled(FavoriteTwoToneIcon)`
	animation: ${appear} 1s ease-in-out;
	position: absolute;
	top: -2rem;
	right: 0;
  opacity: 0;
`

const MatchedIconWrapper = styled.div`
	position: relative;
`

function RoomsIcon() {
	const unread = useStore($unread)
	return (
		<MatchedIconWrapper>
			<Badge variant='dot' color='warning' invisible={!unread}>
				{unread && <MatchedIcon color='primary' />}
				<QuestionAnswerTwoToneIcon />
			</Badge>
		</MatchedIconWrapper>
	)
}

export const $unread = atom<boolean>(false)

function BottomTabs() {
	const { isTester } = useCurrentMember()
	const [ tab, setTab ] = useState<number|null>(null)
	const navigate = useNavigate()
	const { pathname } = useLocation()

	useEffect(() => {
		if (pathname.includes('/match')) setTab(0)
		else if (pathname.includes('/room')) setTab(1)
		else if (pathname.includes('/event')) setTab(2)
		else if (pathname.includes('/test')) setTab(3)
		else setTab(null)
	}, [ pathname ])

	const handleChange = (_: any, newValue: number) => {
		switch (newValue) {
			case 0: navigate('/match'); break
			case 1: {
				navigate('/room')
				$unread.set(false)
				break
			}
			case 2: navigate('/event'); break
			case 3: navigate('/test'); break
		}
	}

	return (
		<Nav
			data-testid='BottomTabs'
			component='nav'
			value={tab}
			onChange={handleChange}
		>
			<BottomNavigationAction icon={<SupervisedUserCircleTwoToneIcon />} />
			<BottomNavigationAction icon={<RoomsIcon />} />
			<BottomNavigationAction icon={<DateRangeTwoToneIcon />} />
			{isTester && <BottomNavigationAction icon={<BugReportIcon />} /> }
		</Nav>
	)
}

export default BottomTabs
