import { useNavigate } from 'react-router-dom'

import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone'
import ReportTwoToneIcon from '@mui/icons-material/ReportTwoTone'

import { useModal } from '@/services/modals'

import Drawer, { DrawerItem, DrawerList } from '@/ui/Drawer'


function PartnerRequestMenu() {
	const navigate = useNavigate()
	const { open } = useModal('report')
	const { name, on, params, close } = useModal('partnerRequest')
	const { id } = params

	const reportClick = () => {
		close()
		open({ entity: 'partnerRequest', id })
	}

	const profileClick = () => navigate(`/match/${id}`)

	return (
		<Drawer data-testid='PartnerRequestMenu' name={name}>
			<DrawerList>
				<DrawerItem icon={<ReportTwoToneIcon color='error' />} text='Report' onClick={reportClick} />
				<DrawerItem icon={<AccountCircleTwoToneIcon color='primary' />} text='Profile' onClick={on(profileClick)} />
			</DrawerList>
		</Drawer>
	)
}

export default PartnerRequestMenu
