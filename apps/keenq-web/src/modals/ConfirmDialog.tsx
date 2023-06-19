import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import { useConfirm } from '@/services/modals'

import Space from '@/ui/Space'


function ConfirmDialog() {
	const confirm = useConfirm()
	const onConfirm = () => {
		confirm.options().onConfirm()
		confirm.onClose()
	}
	return (
		<Dialog data-testid='ConfirmDialog' {...confirm}>
			<DialogTitle>
				{confirm.options().title()}
			</DialogTitle>
			<DialogContent>
				<DialogContentText>
					{confirm.options().text()}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button color='error' onClick={onConfirm}>Yes</Button>
				<Space grow />
				<Button color='primary' onClick={confirm.onClose}>No</Button>
			</DialogActions>
		</Dialog>
	)
}

export default ConfirmDialog
