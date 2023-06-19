import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone'
import RadioButtonUncheckedTwoToneIcon from '@mui/icons-material/RadioButtonUncheckedTwoTone'
import IconButton from '@mui/material/IconButton'


interface CheckboxProps {
	value: boolean
	onChange?: (value: boolean) => void
}

function Checkbox({ value, onChange }: CheckboxProps) {
	return (
		<IconButton onClick={() => onChange?.(!value)}>
			{value
				? <CheckCircleTwoToneIcon color='primary' />
				: <RadioButtonUncheckedTwoToneIcon color='secondary' />}
		</IconButton>
	)
}

export default Checkbox
