import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone'
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Switch from '@mui/material/Switch'

import { logout } from '@/services/auth'
import { useConfirm } from '@/services/modals'

import Drawer, { DrawerItem, DrawerList } from '@/ui/Drawer'
import Space from '@/ui/Space'

import { signal } from '@/utils/signals'


const show = signal(true)

function SettingsDrawer() {

	const { confirm } = useConfirm()

	const onShowChange = () => show(!show())

	const onCloseClick = () => {
		confirm({
			onConfirm: () => { console.log('--- SettingsDrawer.tsx:28 -> onConfirm ->', 'close account') }
		})
	}
	const onLogoutClick = () => logout()


	return (
		<Drawer data-testid='SettingsDrawer' name='settings'>
			<DrawerList>
				<DrawerItem
					icon={show() ? <VisibilityIcon color='primary' /> : <VisibilityOffIcon color='error' />}
					text='Show me'
					subtext={show() ? 'I am visible to others' : 'If I am not visible i cant see others'}
					action={<Switch onChange={onShowChange} checked={show()} />}
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
						onClick={onLogoutClick}
					>Logout</Button>
				</DrawerItem>
			</DrawerList>
		</Drawer>
	)
}

export default SettingsDrawer
