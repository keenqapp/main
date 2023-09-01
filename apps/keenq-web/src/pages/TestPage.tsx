import Button from '@mui/material/Button'

import { useNotifications } from '@/services/notifications'

import Container from '@/ui/Container'
import Page from '@/ui/Page'
import Space from '@/ui/Space'


function TestPage() {
	const { notify } = useNotifications()
	return (
		<Page data-testid='TestPage'>
			<Container>
				<Space height={2} />
				<Button onClick={() => notify('You have a Match!')} variant='outlined' fullWidth>Notify</Button>
			</Container>
		</Page>
	)
}

export default TestPage
