import { ComponentChildren, VNode } from 'preact'
import styled from '@emotion/styled'

import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'

import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded'

import { ModalKeys, useModal } from '@/services/modals'


const StyledDrawer = styled(SwipeableDrawer)<{ fullHeight?: boolean }>`
	& .MuiDrawer-paper {
		border-radius: 1rem 1rem 0 0;
		padding-bottom: 2rem;
	}
`

const StyledListItemText = styled(ListItemText)<{ color: DrawerItemProps['color'] }>`
  color: ${({ theme, color }) => color ? theme.palette[color].main : theme.palette.text.primary};
`

export const DrawerList = styled(List)``

export interface DrawerItemProps {
	text?: string
	subtext?: string
	onClick?: () => void
	icon?: VNode
	color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
	children?: ComponentChildren
	action?: VNode
	className?: string
	disabled?: boolean
}

export function DrawerItem({ text, icon, onClick, color, subtext, children, action, className, disabled }: DrawerItemProps) {
	return (
		<ListItem className={className}>
			{children ? children : (
				<>
					<ListItemButton onClick={onClick} disabled={disabled}>
						{icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
						<StyledListItemText primary={text} secondary={subtext} color={color} />
					</ListItemButton>
					{action}
				</>
			)}
		</ListItem>
	)
}

interface DrawerProps {
	children: ComponentChildren
	name: ModalKeys
	fullHeight?: boolean
}

function Drawer({ name, children, fullHeight }: DrawerProps) {
	const { isOpen, open, close } = useModal(name)
	return (
		<StyledDrawer
			anchor='bottom'
			open={isOpen}
			onOpen={open}
			onClose={close}
			fullHeight={fullHeight}
			disableSwipeToOpen
		>
			<IconButton><RemoveRoundedIcon /></IconButton>
			{children}
		</StyledDrawer>
	)
}

export default Drawer
