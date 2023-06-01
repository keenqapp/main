import { useEffect, useState } from 'react'
import styled from '@emotion/styled'


import AddPhotoAlternateTwoToneIcon from '@mui/icons-material/AddPhotoAlternateTwoTone'
import PersonAddAltTwoToneIcon from '@mui/icons-material/PersonAddAltTwoTone'
import { Box, Chip, OutlinedInput } from '@mui/material'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import TextField from '@mui/material/TextField'

import { useApi } from '@/services/api'
import { IGender, IMember } from '@/services/members'

import Container from '@/ui/Container'
import MultiSelect from '@/ui/MultiSelect'
import Space from '@/ui/Space'

import { useInput } from '@/hooks/useInput'
import { inputsHasError } from '@/hooks/useInput/useInput'

const Image = styled.img`
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: ${({ theme }) => theme.spacing(2)};
  object-fit: cover;
`

// const AddButton = styled(Button)<{ component: string }>`
//   width: 100%;
//   aspect-ratio: 4 / 3;
// `

// const Add = () => (
//   <AddButton color='secondary' variant='outlined' component='label'>
//     <input hidden accept="image/*" type="file" />
//     <AddPhotoAlternateTwoToneIcon />
//       Add image
//   </AddButton>
// )

const ints = [
  'Art',
  'Baking',
  'Board games',
  'IT',
  'Books',
  'FSD',
  'Travel'
]

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
      const url = await api.storage.upload('members', event.target.files[0])
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

function f(input: string) {
  return input.replaceAll(',', '\n')
}

type Props = IMember

function Profile({ uid, avatar = '', name, description, interests, gender, contacts }: Props) {

  const api = useApi()

  const [ image, setImage ] = useState(avatar)

  const [ genderState, setGender ] = useState(gender)
  const handleGender = (event: SelectChangeEvent<string>) => setGender(event.target.value as IGender)

  const [ interestsState, setInterests ] = useState(interests)
  const handleInterestsChange = (value: string[]) => setInterests(value)

  const nameInput = useInput({
    value: name,
    fullWidth: true,
    label: 'Name',
    variant: 'outlined'
  })

  const descriptionInput = useInput({
    value: description,
    fullWidth: true,
    label: 'About you',
    variant: 'outlined',
    multiline: true,
    rows: 4
  })

  const contactsInput = useInput({
    value: contacts.join('\n'),
    fullWidth: true,
    placeholder: 'Telegram, WhatsApp, Phone, etc. - one a line',
    label: 'How to contact you',
    variant: 'outlined',
    multiline: true,
    rows: 4,
    format: f
  })

  const handleSave = () => {
    if (!inputsHasError(nameInput, descriptionInput)) {
      const data = {
        uid,
        name: nameInput.value,
        description: descriptionInput.value,
        interests: interestsState,
        gender: genderState,
        contacts: contactsInput.value.split('\n'),
        avatar: image
      }
      api.members.update(data as IMember)
    }
  }

  return (
    <Container data-testid='Profile'>
      <Add image={image} onUpload={setImage} />
      <Space />
      <TextField {...nameInput} />
      <Space />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
        <Select
          value={genderState}
          label='Gender'
          onChange={handleGender}
        >
          <MenuItem value={'male'}>Male</MenuItem>
          <MenuItem value={'female'}>Female</MenuItem>
          <MenuItem value={'non-binary'}>Non-binary</MenuItem>
          <MenuItem value={'trans person'}>Trans person</MenuItem>
          <MenuItem value={'other'}>Other</MenuItem>
        </Select>
      </FormControl>
      <Space />
      <TextField {...descriptionInput} />
      <Space />
      <MultiSelect value={interestsState || []} onChange={handleInterestsChange} options={ints} />
      <Space />
      <TextField {...contactsInput} />
      <Space height={2} />
      <Button
        variant='outlined'
        startIcon={<PersonAddAltTwoToneIcon />}
        fullWidth
        onClick={handleSave}
      >Save</Button>
      <Space />
    </Container>
  )
}

export default Profile
