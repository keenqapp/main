import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import { useConfirm } from '@/services/modals'
import { useTranslate } from '@/services/translate'

import Space from '@/ui/Space'


function ConfirmDialog() {
	const { t } = useTranslate('confirm')
	const confirm = useConfirm()
	const onConfirm = () => {
		confirm.options().onConfirm()
		confirm.close()
	}
	return (
		<Dialog data-testid='ConfirmDialog' {...confirm}>
			<DialogTitle>
				{t(confirm.options().title() as string)}
			</DialogTitle>
			<DialogContent>
				<DialogContentText>
					{t(confirm.options().text() as string)}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button color='error' onClick={onConfirm}>{t`yes`}</Button>
				<Space grow />
				<Button color='primary' onClick={confirm.close}>{t`no`}</Button>
			</DialogActions>
		</Dialog>
	)
}

export default ConfirmDialog
