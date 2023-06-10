import styled from '@emotion/styled'

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
`

function BottomTabs() {
  return (
    <Nav data-testid='BottomTabs' component='nav'>
      <BottomNavigationAction icon={<SupervisedUserCircleTwoToneIcon />} />
      <BottomNavigationAction icon={<QuestionAnswerTwoToneIcon />} />
      <BottomNavigationAction icon={<DateRangeTwoToneIcon />} />
    </Nav>
  )
}

export default BottomTabs
