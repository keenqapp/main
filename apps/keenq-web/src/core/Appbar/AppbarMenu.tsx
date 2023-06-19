import { useNavigate } from 'react-router-dom'

import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone'
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

import { useModal } from '@/services/modals'

import { DrawerItem, DrawerList } from '@/ui/Drawer'


function AppbarMenu() {

	const navigate = useNavigate()
	const { onClose } = useModal('appbar')

	const handle = (cb: () => void) => () => {
		onClose()
		cb()
	}

	const Profile = () => navigate('/profile')

	return (
		<DrawerList>
			<DrawerItem icon={<PersonOutlineTwoToneIcon />} text='You' onClick={handle(Profile)} />
			<Divider />
			<DrawerItem>
				<Button
					variant='outlined'
					color='warning'
					fullWidth
					startIcon={<LogoutTwoToneIcon />}
				>Logout</Button>
			</DrawerItem>
			<DrawerItem><Typography variant='caption' color='#ccc' align='center'>{'dev 0.0.1'}</Typography></DrawerItem>
		</DrawerList>
	)
}

export default AppbarMenu
