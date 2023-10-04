import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { useModal } from '@/services/modals'
import { request } from '@/services/notifications'
import { useTranslate } from '@/services/translate'

import Card from '@/ui/Card'
import Container from '@/ui/Container'
import Drawer from '@/ui/Drawer'
import Space from '@/ui/Space'


function NotificationsDrawer() {
	const { t } = useTranslate()
	const { name, close } = useModal('notifications')

	const onRequest = () => {
		close()
		request()
	}

	return (
		<Drawer data-testid='NotificationsDrawer' name={name}>
			<Container>
				<Card>
					<Typography variant='overline' align='center'>{t`notify.allow`}</Typography>
					<Space />
					<Button variant='outlined' onClick={onRequest}>{t`app.doit`}</Button>
				</Card>
			</Container>
		</Drawer>
	)
}

export default NotificationsDrawer
