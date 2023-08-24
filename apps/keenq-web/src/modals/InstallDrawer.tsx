import { useEffect } from 'preact/hooks'
import { useStore } from '@nanostores/preact'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { useModal } from '@/services/modals'
import { $pwa, $shouldShow } from '@/services/pwa'
import { useTranslate } from '@/services/translate'

import Card from '@/ui/Card'
import Container from '@/ui/Container'
import Drawer from '@/ui/Drawer'
import Space from '@/ui/Space'


function InstallDrawer() {
	const { t } = useTranslate()
	const { name, onOpen, close } = useModal('install')
	const shouldShow = useStore($shouldShow)
	useEffect(() => {
		if (shouldShow) {
			onOpen()
			$shouldShow.set(false)
		}
	}, [])
	const install = async () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		$pwa.get()?.prompt()
		close()
	}
	return (
		<Drawer data-testid='InstallDrawer' name={name}>
			<Container>
				<Card>
					<Typography variant='overline' align='center'>{t`install.you`}<br /><b>Keenq</b><br />{t`install.homescreen`}</Typography>
					<Space />
					<Button variant='outlined' onClick={install}>{t`app.doit`}</Button>
				</Card>
			</Container>
		</Drawer>
	)
}

export default InstallDrawer
