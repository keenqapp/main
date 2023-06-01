import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { Timestamp } from 'firebase/firestore'


import AddPhotoAlternateTwoToneIcon from '@mui/icons-material/AddPhotoAlternateTwoTone'
import DateRangeTwoToneIcon from '@mui/icons-material/DateRangeTwoTone'
import ExploreTwoToneIcon from '@mui/icons-material/ExploreTwoTone'
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone'
import LinkTwoToneIcon from '@mui/icons-material/LinkTwoTone'
import MessageTwoToneIcon from '@mui/icons-material/MessageTwoTone'
import PinDropTwoToneIcon from '@mui/icons-material/PinDropTwoTone'
import StickyNote2TwoToneIcon from '@mui/icons-material/StickyNote2TwoTone'
import TitleTwoToneIcon from '@mui/icons-material/TitleTwoTone'
import { InputAdornment, TextField } from '@mui/material'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker'

import { useApi } from '@/services/api'
import { CreateEventDTO, IEvent } from '@/services/events'

import BottomAppbar from '@/ui/BottomAppbar'
import Container from '@/ui/Container'
import Space from '@/ui/Space'

import EventActions from '@/components/EventForm/EventFormActions'

import { useInput } from '@/hooks/useInput'
import { inputsHasError } from '@/hooks/useInput/useInput'
import { isLengthGreater, isLengthLower, isNotEmpty, withErrorText } from '@/hooks/useInput/validation'

const AddButton = styled(Button)<{ component: string, image: string }>`
  width: 100%;
  aspect-ratio: 4 / 3;
  background-image: url(${({ image }) => image});
  background-size: cover;
  background-position: center;
`

const Add = observer(({ onUpload, image }: { onUpload: (url: string) => void, image: string }) => {
  const api = useApi()
  const handleUpload = async (event: any) => {
    if (event.target.files[0]) {
      const url = await api.storage.upload('events', event.target.files[0])
      onUpload(url)
    }
  }

  return (
    <AddButton
      color='secondary'
      variant='outlined'
      component='label'
      image={image}
    >
      <input
        hidden
        accept="image/*"
        type="file"
        onChange={handleUpload}
      />
      <AddPhotoAlternateTwoToneIcon />
      Add image
    </AddButton>
  )
})

const ise = withErrorText(isNotEmpty, 'Input should not be empty')
const ilg2 = withErrorText(isLengthGreater(2), 'Min 2 character')
const ill64 = withErrorText(isLengthLower(64), 'Max 64 character')

interface Props {
  event?: IEvent
}

function EventForm({ event }: Props) {

  const isCreate = !event?.uid

  const api = useApi()
  const navigate = useNavigate()
  const [ image, setImage ] = useState(event?.coverImage || '')
  const [ dateError, setDateError ] = useState('')
  const [ date, setDate ] = useState<Date|null>(event?.startDate.toDate() || null)

  const title = useInput({
    value: event?.title || '',
    label: 'Title',
    fullWidth: true,
    placeholder: 'Some name of your event',
    InputProps: {
      startAdornment: <InputAdornment position="start"><TitleTwoToneIcon /></InputAdornment>,
    },
    validation: [ise, ilg2, ill64],
  })

  const short = useInput({
    value: event?.shortDescription || '',
    label: 'Short Description',
    validation: [ise, ilg2, ill64],
    maxLength: 64,
    fullWidth: true,
    placeholder: 'Something interesting in two words',
    InputProps: {
      startAdornment: <InputAdornment position="start"><StickyNote2TwoToneIcon /></InputAdornment>,
    }
  })

  const description = useInput({
    value: event?.description || '',
    label: 'Description',
    fullWidth: true,
    multiline: true,
    validation: [ise, ilg2],
    rows: 4,
    placeholder: 'More details about event',
    InputProps: {
      startAdornment: <InputAdornment position="start"><MessageTwoToneIcon /></InputAdornment>,
    }
  })

  const city = useInput({
    value: event?.location.city || '',
    label: 'City',
    fullWidth: true,
    placeholder: 'City where event will be held',
    validation: [ise, ilg2, ill64],
    InputProps: {
      startAdornment: <InputAdornment position="start"><ExploreTwoToneIcon /></InputAdornment>,
    }
  })

  const place = useInput({
    value: event?.location.place || '',
    label: 'Place',
    fullWidth: true,
    placeholder: 'Name of place',
    validation: [ise, ilg2, ill64],
    InputProps: {
      startAdornment: <InputAdornment position="start"><HomeTwoToneIcon /></InputAdornment>,
    }
  })

  const address = useInput({
    value: event?.location.address || '',
    label: 'Address',
    fullWidth: true,
    placeholder: 'Exact address',
    validation: [ise, ilg2],
    InputProps: {
      startAdornment: <InputAdornment position="start"><PinDropTwoToneIcon /></InputAdornment>,
    }
  })

  const url = useInput({
    value: event?.location.url || '',
    label: 'Location url',
    placeholder: 'Link to google maps',
    validation: [ise, ilg2],
    fullWidth: true,
    InputProps: {
      startAdornment: <InputAdornment position="start"><LinkTwoToneIcon /></InputAdornment>,
    }
  })

  const dateProps = {
    placeholder: 'HH:mm dd MMM yyyy',
    fullWidth: true,
    InputProps: { startAdornment: <InputAdornment position="start"><DateRangeTwoToneIcon /></InputAdornment> },
    onFocus: () => setDateError(''),
    helperText: dateError,
    error: !!dateError,
  }

  const handleUpload = (url: string) => setImage(url)

  const handleSave = () => {
    if (!date) setDateError('Date should not be empty')
    if (!inputsHasError(title, short, description, city, place, address, url) && date) {
      const event: CreateEventDTO = {
        coverImage: image,
        title: title.value,
        shortDescription: short.value,
        description: description.value,
        admins: [api.user.uid],
        location: {
          country: '',
          city: city.value,
          place: place.value,
          address: address.value,
          url: url.value,
        },
        startDate: Timestamp.fromDate(date),
      }

      if (isCreate) api.events.create(event)
      else api.events.edit(event as IEvent)
      navigate('/')
    }
  }

  return (
    <Container data-testid='CreateEventForm'>
      <Typography variant='h4'>{isCreate ? 'Create new event' : 'Edit event'}</Typography>
      <Add onUpload={handleUpload} image={image} />
      <Space />
      <TextField {...title} />
      <Space />
      <TextField {...short} />
      <Space />
      <TextField {...description} />
      <Space />
      <Divider />
      <Space />
      <MobileDateTimePicker
        value={date}
        minDate={new Date()}
        label='Starting Date'
        ampm={false}
        format='HH:mm dd MMM yyyy'
        onChange={setDate}
        slotProps={{ textField: dateProps }}
      />
      <Space />
      <Divider />
      <Space />
      <TextField {...city} />
      <Space />
      <TextField {...place} />
      <Space />
      <TextField {...address} />
      <Space />
      <TextField {...url} />
      <Space />
      <Divider />
      <Space />
      <BottomAppbar>
        <EventActions onClick={handleSave} isCreate={isCreate} />
      </BottomAppbar>
    </Container>
  )
}

export default EventForm
