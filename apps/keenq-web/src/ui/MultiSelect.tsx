import { useState } from 'preact/hooks'

import { Box, Chip, OutlinedInput } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
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
  onChange: (value: string[]) => void
  closeOnChange?: boolean
}

function MultiSelect({ value, onChange, options, closeOnChange }: Props) {
  const [ open, setOpen ] = useState(false)
  const handleChange = (event: SelectChangeEvent<string[]>) => {
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
