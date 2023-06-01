import { KeyboardEvent, MouseEvent, TouchEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'


import CasinoTwoToneIcon from '@mui/icons-material/CasinoTwoTone'
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'
import QrCode2TwoToneIcon from '@mui/icons-material/QrCode2TwoTone'
import ShareTwoToneIcon from '@mui/icons-material/ShareTwoTone'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'

import { useApi } from '@/services/api'

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
  uid: string
  open: boolean
  toggleMenuOpen: (open: boolean) => (event: KeyboardEvent | MouseEvent | TouchEvent) => void
}

function EventActionsMenu({ uid, open, toggleMenuOpen }: Props) {

  const api = useApi()
  const navigate = useNavigate()

  const handleShare = () => {}
  const handleQR = () => {}
  const handleLeave = () => api.events.leave(uid)
  const handleEdit = () => navigate(`/events/${uid}/edit`)
  const handleControl = () => navigate(`/events/${uid}/control`)

  const isAdmin = api.events.checkAdmin(uid)

  return (
    <SwipeableDrawer
      anchor='bottom'
      data-testid='EventActionsMenu'
      open={open}
      onClose={toggleMenuOpen(false)}
      onOpen={toggleMenuOpen(true)}
    >
      <List>
        {isAdmin && (
          <>
            <Item text='Edit' icon={<EditTwoToneIcon />} onClick={handleEdit} />
            <Item text='Control' icon={<CasinoTwoToneIcon />} onClick={handleControl} />
            <Divider />
          </>
        )}
        <Item text='Share' icon={<ShareTwoToneIcon />} onClick={handleShare} />
        <Item text='QR' icon={<QrCode2TwoToneIcon />} onClick={handleQR} />
      </List>
      <Divider />
      <List>
        <Item
          text='Leave'
          icon={<DeleteForeverTwoToneIcon color='warning' />}
          onClick={handleLeave}
          color='warning' />
      </List>
    </SwipeableDrawer>
  )
}

export default EventActionsMenu
