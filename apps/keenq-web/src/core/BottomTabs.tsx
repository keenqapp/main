import { useEffect, useState } from 'preact/hooks'
import styled from '@emotion/styled'
import { useLocation, useNavigate } from 'react-router-dom'

import DateRangeTwoToneIcon from '@mui/icons-material/DateRangeTwoTone'
import QuestionAnswerTwoToneIcon from '@mui/icons-material/QuestionAnswerTwoTone'
import SupervisedUserCircleTwoToneIcon from '@mui/icons-material/SupervisedUserCircleTwoTone'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'


const Nav = styled(BottomNavigation)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.33);
  backdrop-filter: blur(6px);
	height: var(--vertical-space);
`

function BottomTabs() {
	const [ tab, setTab ] = useState(0)
	const navigate = useNavigate()
	const { pathname } = useLocation()

	useEffect(() => {
		switch (pathname) {
			case '/match': setTab(0); break
			case '/room': setTab(1); break
			case '/event': setTab(2); break
		}
	}, [ pathname ])

	const handleChange = (_: any, newValue: number) => {
		switch (newValue) {
			case 0: navigate('/match'); break
			case 1: navigate('/room'); break
			case 2: navigate('/event'); break
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
			<BottomNavigationAction icon={<QuestionAnswerTwoToneIcon />} />
			<BottomNavigationAction icon={<DateRangeTwoToneIcon />} />
		</Nav>
	)
}

export default BottomTabs
