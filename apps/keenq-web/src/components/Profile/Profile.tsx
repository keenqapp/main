import styled from '@emotion/styled'

import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone'
import EditLocationTwoToneIcon from '@mui/icons-material/EditLocationTwoTone'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'
import GroupRemoveTwoToneIcon from '@mui/icons-material/GroupRemoveTwoTone'
import InterestsTwoToneIcon from '@mui/icons-material/InterestsTwoTone'
import PhotoCameraTwoToneIcon from '@mui/icons-material/PhotoCameraTwoTone'
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone'
import SupervisedUserCircleTwoToneIcon from '@mui/icons-material/SupervisedUserCircleTwoTone'
import TagTwoToneIcon from '@mui/icons-material/TagTwoTone'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'
import Typography from '@mui/material/Typography'

import { useModal } from '@/services/modals'

import Container from '@/ui/Container'
import Row from '@/ui/Row'
import Space from '@/ui/Space'

import Swiper from '@/components/Swiper'

import { useCurrentMember } from '@/hooks/useCurrentMember'
import { useInput } from '@/hooks/useInput'
import { IMemberPartner } from '@/model/member'


const Content = styled(Row)`
	padding: 0 1rem;
`

const Fabs = styled(Row)`
	position: absolute;
	left: 1rem;
	bottom: 1rem;
	
	svg {
    filter: drop-shadow(0px 2px 8px currentColor);
    backdrop-filter: blur(1px);
		border-radius: 4rem;
		padding: 0.1rem;
	}
`

const NameInput = styled(Input)`
  font-weight: 700;
  font-family: serif;
  font-size: 1.5rem;
  line-height: 1.334;
`

function Buttons() {
	return (
		<Fabs>
			<CancelTwoToneIcon fontSize='large' color='error' />
		</Fabs>
	)
}

const AddButton = styled(Button)`
  position: absolute;
  top: calc(100vw - 2rem - 3rem); // 100vw - 2rem = height of swiper 
  right: 2rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(2px);
`

const images = [
	'https://i.pravatar.cc/400?img=1',
	'https://i.pravatar.cc/400?img=2',
	'https://i.pravatar.cc/400?img=3',
	'https://i.pravatar.cc/400?img=4',
	'https://i.pravatar.cc/400?img=5',
]

const desc = 'Going to the heavens of manifestation doesn’t view hypnosis anymore than yearning creates synthetic meditation.\n' +
	'Be small for whoever disappears, because each has been received with heaven.\n' +
	'Important futilities discovers most courages. Career realizes when you receive with happiness.\n' +
	'Control, blessing and an alchemistic body of career.\n' +
	'All further saints praise each other, only parallel lamas have an acceptance.'

const tags = ['bdsm', 'ffm', 'fwb', 'shibari', 'threeway', 'huging']

// export function useCurrentMember() {
// 	return { uid: 'me', partner: { uid: '1', name: 'Patrisia' } }
// 	// return { uid: 'me', partner: undefined }
// }

function Profile() {

	const { linked } = useCurrentMember()
	const partner = linked?.find((l): l is IMemberPartner => l.type === 'partner')?.value

	const { onOpen: onLocationOpen } = useModal('location')
	const { onOpen: onTagsOpen } = useModal('tags')
	const { onOpen: onSettingsClick } = useModal('settings')
	const { onOpen: onGenderClick } = useModal('gender')
	const { onOpen: onAddPartnerClick } = useModal('addPartner')

	const nameInput = useInput({
		value: 'Lucy',
		disableUnderline: true,
		onChange: (e: any) => console.log(e.target.value),
	})

	const descriptionInput = useInput({
		value: desc,
		multiline: true,
		disableUnderline: true,
		fullWidth: true,
		onChange: (e: any) => console.log(e.target.value),
	})

	const onNameClick = () => nameInput.inputRef.current?.focus()

	const onPartnerClick = () => {
		if (partner) return console.log('--- Profile.tsx:118 -> onPartnerClick ->', 'unlink')
		else onAddPartnerClick()
	}

	const onLocationClick = () => onLocationOpen()

	const onDescClick = () => descriptionInput.inputRef.current?.focus()

	const onTagsClick = () => onTagsOpen()

	return (
		<Container data-testid='Profile'>
			<Swiper images={images} buttons={<Buttons />} />
			<Row justify='end'>
				<AddButton startIcon={<PhotoCameraTwoToneIcon />}>Add photo</AddButton>
			</Row>
			<Space />
			<Content direction='column' align='stretch'>
				<Row justify='between' onClick={onNameClick}>
					<NameInput disableUnderline={true} {...nameInput} />
					<IconButton color='primary'><EditTwoToneIcon /></IconButton>
				</Row>
				{partner
					? (
						<Row onClick={onPartnerClick} gap={0.5} align='baseline'>
							<Typography variant='h6'>And</Typography>
							<Typography variant='overline'>{partner.name}</Typography>
							<Space grow />
							<IconButton color='secondary'><GroupRemoveTwoToneIcon /></IconButton>
						</Row>
					)
					: (
						<Row
							justify='between'
							onClick={onPartnerClick}
							gap={0.5}
							align='baseline'
						>
							<Typography variant='h6'>Add</Typography>
							<Typography variant='overline'>Partner</Typography>
							<Space grow />
							<IconButton color='primary'><SupervisedUserCircleTwoToneIcon /></IconButton>
						</Row>
					)}
				<Row
					justify='between'
					onClick={onGenderClick}
					gap={0.5}
					align='baseline'
				>
					<Typography variant='h6'>I am</Typography>
					<Typography variant='overline'>Female Hetero</Typography>
					<Space grow />
					<IconButton color='primary'><InterestsTwoToneIcon /></IconButton>
				</Row>
				<Row
					justify='between'
					onClick={onLocationClick}
					gap={0.5}
					align='baseline'
				>
					<Typography variant='h6'>In</Typography>
					<Typography variant='overline'>Moscow</Typography>
					<Space grow />
					<IconButton color='primary'><EditLocationTwoToneIcon /></IconButton>
				</Row>
				<Space />
				<Row justify='between' align='start' onClick={onDescClick}>
					<Input {...descriptionInput} />
					<IconButton color='primary'><EditTwoToneIcon /></IconButton>
				</Row>
				<Space />
				<Row justify='between' align='start' onClick={onTagsClick}>
					<Row gap={0.5} wrap justify='start'>
						{tags.map((tag) => <Chip key={tag} label={tag} />)}
					</Row>
					<IconButton color='primary'><TagTwoToneIcon /></IconButton>
				</Row>
				<Space />
				<Divider />
				<Space />
				<Button
					variant='outlined'
					fullWidth
					onClick={onSettingsClick}
					startIcon={<SettingsTwoToneIcon />}
				>Settings</Button>
				<Space />
			</Content>
		</Container>
	)
}

export default Profile
