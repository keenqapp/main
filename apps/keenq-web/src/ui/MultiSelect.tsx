import { useState } from 'preact/hooks'

import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select, { SelectChangeEvent } from '@mui/material/Select'


const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
}

interface Props {
	value: string[]
	options: string[]
	onChange: (_:any, value: string[]) => void
	closeOnChange?: boolean
}

function MultiSelect({ value, onChange, options, closeOnChange }: Props) {
	const [ open, setOpen ] = useState(false)
	const handleChange = (event: SelectChangeEvent<string[]>) => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		onChange(event.target?.value as string[])
		closeOnChange && setOpen(false)
	}
	const handleClose = () => setOpen(false)
	const handleOpen = () => setOpen(true)

	return (
		<FormControl fullWidth>
			<InputLabel>Interests</InputLabel>
			<Select
				multiple
				value={value}
				open={open}
				onClose={handleClose}
				onOpen={handleOpen}
				onChange={handleChange}
				input={<OutlinedInput id='select-multiple-chip' label='Interests' fullWidth />}
				renderValue={(selected) => (
					<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
						{selected.map((value) => (
							<Chip key={value} label={value} />
						))}
					</Box>
				)}
				MenuProps={MenuProps}
			>
				{options.map((interest) => (
					<MenuItem
						key={interest}
						value={interest}
					>
						{interest}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	)
}

export default MultiSelect
