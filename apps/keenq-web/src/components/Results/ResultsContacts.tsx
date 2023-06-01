import { KeyboardEvent, MouseEvent, TouchEvent, useState } from 'react'
import styled from '@emotion/styled'


import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Snackbar from '@mui/material/Snackbar'

import { useApi } from '@/services/api'
import { IMember } from '@/services/members'

import { setClipboard } from '@/utils/utils'

const StyledListItemText = styled(ListItemText)<{ color: ItemProps['color'] }>`
  color: ${({ theme, color }) => color ? theme.palette[color].main : theme.palette.text.primary};
`

interface ItemProps {
  text: string
  icon?: JSX.Element
  onClick: () => void
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
}

function Item({ text, icon, onClick, color }: ItemProps) {
  return (
    <ListItem>
      <ListItemButton onClick={onClick}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <StyledListItemText primary={text} color={color} />
      </ListItemButton>
    </ListItem>
  )
}

interface Props {
  uid: string | null
  open: boolean
  toggleMenuOpen: (open: string|null) => (event: KeyboardEvent | MouseEvent | TouchEvent | object) => void
}

function ResultsContacts({ uid, open, toggleMenuOpen }: Props) {

  const [ snack, setSnack ] = useState(false)

  const api = useApi()

  const member = (uid && api.members.getByUid(uid)) || {}
  const { contacts = [] } = member as IMember

  const handleCopy = (contact: string) => () => {
    setClipboard(contact)
    setSnack(true)
    setTimeout(() => toggleMenuOpen(null)({}), 1500)
  }

  return (
    <Drawer
      anchor='bottom'
      data-testid='ResultsContacts'
      open={open}
      onClose={toggleMenuOpen(null)}
    >
      <List>
        {contacts.map(contact => <Item
          key={contact}
          text={`Copy ${contact}`}
          onClick={handleCopy(contact)}
          icon={<ContentCopyTwoToneIcon />}
        />)}
      </List>
      <Snackbar
        open={snack}
        autoHideDuration={1000}
        onClose={() => setSnack(false)}
        message="Copied!"
      />
    </Drawer>
  )
}

export default ResultsContacts
