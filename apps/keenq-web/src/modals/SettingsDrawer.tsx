import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Switch from '@mui/material/Switch'

import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone'
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

import { logout } from '@/services/auth'
import { useConfirm, useModal } from '@/services/modals'

import Drawer, { DrawerItem, DrawerList } from '@/ui/Drawer'
import Space from '@/ui/Space'

import { useUpdate } from '@/hooks/gql'
import { useCurrentMember } from '@/hooks/useCurrentMember'
import { updategql } from '@/model/member'


function SettingsDrawer() {
	const { name, on } = useModal('settings')
	const {
		uid,
		visible
	} = useCurrentMember()
	const { confirm } = useConfirm()
	const [ , update ] = useUpdate(updategql)

	const onShowChange = () => update(uid, { visible: !visible })

	const onCloseClick = () => {
		confirm({
			onConfirm: on(() => { console.log('--- SettingsDrawer.tsx:28 -> onConfirm ->', 'close account') })
		})
	}
	return (
		<Drawer data-testid='SettingsDrawer' name={name}>
			<DrawerList>
				<DrawerItem
					icon={visible ? <VisibilityIcon color='primary' /> : <VisibilityOffIcon color='error' />}
					text='Show me'
					subtext={visible ? 'I am visible to others' : 'If I am not visible i cant see others'}
					action={<Switch onChange={onShowChange} checked={visible || false} />}
				/>
				<DrawerItem
					icon={<HighlightOffTwoToneIcon color='error' />}
					text='Close my account'
					onClick={onCloseClick}
				/>
				<Space />
				<Divider />
				<Space />
				<DrawerItem>
					<Button
						color='warning'
						variant='outlined'
						startIcon={<LogoutTwoToneIcon />}
						fullWidth
						onClick={on(logout)}
					>Logout</Button>
				</DrawerItem>
			</DrawerList>
		</Drawer>
	)
}

export default SettingsDrawer
