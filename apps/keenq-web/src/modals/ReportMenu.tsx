import { useNavigate } from 'react-router-dom'

import GppBadTwoToneIcon from '@mui/icons-material/GppBadTwoTone'
import SentimentVeryDissatisfiedTwoToneIcon from '@mui/icons-material/SentimentVeryDissatisfiedTwoTone'
import SmartToyTwoToneIcon from '@mui/icons-material/SmartToyTwoTone'

import { useModal } from '@/services/modals'

import { Drawer, DrawerItem, DrawerList } from '@/ui/Drawer'


function ReportMenu() {
	const report = useModal('report')

	const navigate = useNavigate()
	const on = (clause: string) => () => {
		console.log('--- ReportMenu.tsx:17 ->  ->', clause)
		report.onCloseAll()
		navigate('/match')
	}

	return (
		<Drawer data-testid='ReportMenu' {...report}>
			<DrawerList>
				<DrawerItem
					icon={<SmartToyTwoToneIcon color='error' />}
					text='Spam'
					subtext='Ads or some inappropriate offers'
					onClick={on('spam')}
				/>
				<DrawerItem
					icon={<SentimentVeryDissatisfiedTwoToneIcon color='error' />}
					text='Abuse'
					subtext='Unsafe behavior'
					onClick={on('abuse')}
				/>
				<DrawerItem
					icon={<GppBadTwoToneIcon color='error' />}
					text='Violation'
					subtext='Violation of rules of Keenq or commuity'
					onClick={on('violation')}
				/>
			</DrawerList>
		</Drawer>
	)
}

export default ReportMenu
