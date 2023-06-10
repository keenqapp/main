import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone'
import EmojiPeopleTwoToneIcon from '@mui/icons-material/EmojiPeopleTwoTone'
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone'
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone'
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Typography from '@mui/material/Typography'

import { isAuthed, logout } from '@/services/auth'

import Container from '@/ui/Container'
import Space from '@/ui/Space'


const StyledDrawer = styled(SwipeableDrawer)`
  min-width: 65vw; // TODO: not working
`

const StyledListItemText = styled(ListItemText)<{ color: ItemProps['color'] }>`
  color: ${({ theme, color }) => color ? theme.palette[color].main : theme.palette.text.primary};
`

interface ItemProps {
  text: string
  icon: JSX.Element
  onClick: () => void
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
}

function Item({ text, icon, onClick, color }: ItemProps) {
  return (
    <ListItem>
      <ListItemButton onClick={onClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <StyledListItemText primary={text} color={color} />
      </ListItemButton>
    </ListItem>
  )
}

interface Props {
  open: boolean
  toggleMenuOpen: (open: boolean) => () => void
}

function AppbarMenu({ open, toggleMenuOpen }: Props) {

  const navigate = useNavigate()

  const handle = (cb: () => void) => () => {
    toggleMenuOpen(false)()
    cb()
  }

  const Home = () => navigate('/')
  const Profile = () => navigate('/profile')
  const Results = () => navigate('/results')
  const Login = () => navigate('/auth/login')
  const CreateEvent = () => navigate('/events/create')
  const Logout = () => logout()

  return (
    <StyledDrawer
      data-testid='AppbarMenu'
      anchor='right'
      open={open}
      onClose={toggleMenuOpen(false)}
      onOpen={toggleMenuOpen(true)}
    >
      <List>
        <Item icon={<HomeTwoToneIcon />} text='Home' onClick={handle(Home)} />
        {isAuthed && <Item icon={<PersonOutlineTwoToneIcon />} text='You' onClick={handle(Profile)} />}
        {isAuthed && <Item icon={<EmojiPeopleTwoToneIcon />} text='My connections' onClick={handle(Results)} />}
        <Divider />

      </List>
      <Container data-testid='LogoutButton'>
        <Stack spacing={2} flex={1}>
          <Button variant='outlined' startIcon={<AddTwoToneIcon />} onClick={handle(CreateEvent)}>Create event</Button>
        </Stack>
      </Container>
      <Space grow />
      <Container data-testid='LogoutButton'>
        <Stack spacing={2} flex={1}>
          {isAuthed
            ? (
              <Button
                variant='outlined'
                color='warning'
                startIcon={<LogoutTwoToneIcon />}
                onClick={handle(Logout)}
              >
                Logout
              </Button>
            )
            : <Button variant='outlined'  startIcon={<LogoutTwoToneIcon />} onClick={handle(Login)}>Sign In</Button>
          }
          <Typography variant='caption' color='#ccc' align='center'>{'dev 0.0.1'}</Typography>
        </Stack>
      </Container>
      <Space />
    </StyledDrawer>
  )
}

export default AppbarMenu
