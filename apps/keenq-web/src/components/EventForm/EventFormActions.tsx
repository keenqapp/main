import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

interface Props {
  onClick: () => void
  isCreate: boolean
}

function EventFormActions({ onClick, isCreate }: Props) {
  return (
    <Stack
      spacing={1}
      justifyContent='center'
      alignItems='center'
      flex={1}
    >
      {isCreate
        ? <Button variant='contained' onClick={onClick}>Create</Button>
        : <Button variant='contained' onClick={onClick}>Save</Button>
      }
    </Stack>
  )
}

export default EventFormActions
