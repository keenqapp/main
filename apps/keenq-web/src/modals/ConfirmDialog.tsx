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
	const { t } = useTranslate()
	const { isOpen, open, close, options } = useConfirm()
	const onConfirm = () => {
		options.onConfirm()
		close()
	}

	return (
		<Dialog
			data-testid='ConfirmDialog'
			open={isOpen}
			onClose={close}
			onOpen={open}
		>
			<DialogTitle>
				{t(options.title)}
			</DialogTitle>
			<DialogContent>
				<DialogContentText>
					{t(options.text)}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button color='error' onClick={onConfirm}>{t`words.yes`}</Button>
				<Space grow />
				<Button color='primary' onClick={close}>{t`words.no`}</Button>
			</DialogActions>
		</Dialog>
	)
}

export default ConfirmDialog
