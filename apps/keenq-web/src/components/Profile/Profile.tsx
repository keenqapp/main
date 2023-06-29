import styled from '@emotion/styled'

import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'
import Typography from '@mui/material/Typography'

import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone'
import EditLocationTwoToneIcon from '@mui/icons-material/EditLocationTwoTone'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'
import GroupRemoveTwoToneIcon from '@mui/icons-material/GroupRemoveTwoTone'
import InterestsTwoToneIcon from '@mui/icons-material/InterestsTwoTone'
import PhotoCameraTwoToneIcon from '@mui/icons-material/PhotoCameraTwoTone'
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone'
import SupervisedUserCircleTwoToneIcon from '@mui/icons-material/SupervisedUserCircleTwoTone'
import TagTwoToneIcon from '@mui/icons-material/TagTwoTone'

import { useModal } from '@/services/modals'

import Column from '@/ui/Column'
import Container from '@/ui/Container'
import Row from '@/ui/Row'
import Space from '@/ui/Space'
import Upload from '@/ui/Upload'

import ProfileProgress from '@/components/Profile/ProfileProgress'
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
  font-family: keenq, serif;
  font-size: 1.5rem;
  line-height: 1.334;
`

const EmptyImagesContainer = styled.div`
  width: calc(100vw - 2rem);
  height: calc(100vw - 2rem);
  border: 1px solid #e1dcec;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`

function Buttons() {
	return (
		<Fabs>
			<CancelTwoToneIcon fontSize='large' color='error' />
		</Fabs>
	)
}

function EmptyImages() {
	const onChange= (e: any) => {
		console.log('--- Profile.tsx:80 -> onChange ->', e)
	}
	return (
		<EmptyImagesContainer>
			<Upload onChange={onChange} accept='images/*'>
				<Column>
					<Typography textAlign='center' variant='overline'>Upload at least three photos for better impression</Typography>
					<Space />
					<Button startIcon={<PhotoCameraTwoToneIcon />} component='span'>Add photo</Button>
				</Column>
			</Upload>
		</EmptyImagesContainer>
	)
}

const AddButton = styled(Button)`
  position: absolute;
  top: calc(100vw - 2rem - 3rem); // 100vw - 2rem = height of swiper 
  right: 2rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(2px);
`

function Profile() {

	const {
		linked,
		name,
		description,
		gender,
		sexuality,
		images,
		location,
		tags,
		setupDone
	} = useCurrentMember()
	const partner = linked?.find((l): l is IMemberPartner => l.type === 'partner')?.value

	const { onOpen: onLocationOpen } = useModal('location')
	const { onOpen: onTagsOpen } = useModal('tags')
	const { onOpen: onSettingsClick } = useModal('settings')
	const { onOpen: onGenderClick } = useModal('gender')
	const { onOpen: onAddPartnerClick } = useModal('addPartner')

	const nameInput = useInput({
		value: name,
		placeholder: 'That is your name?',
		disableUnderline: true,
		onChange: (e: any) => console.log(e.target.value),
	})

	const descriptionInput = useInput({
		value: description,
		placeholder: 'Who you are? What you like? What you want? A few sentences to help people know you better.',
		multiline: true,
		disableUnderline: true,
		fullWidth: true,
		onChange: (e: any) => console.log(e.target.value),
	})

	const onUploadChange = (e: any) => {
		console.log('--- Profile.tsx:136 -> onUploadChange ->', e)
	}

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
			{!setupDone && <ProfileProgress />}
			{images && images?.length > 0
				? (
					<>
						<Swiper images={images} buttons={<Buttons />} />
						<Row justify='end'>
							<Upload accept='images/*' onChange={onUploadChange}>
								<AddButton startIcon={<PhotoCameraTwoToneIcon />}>Add photo</AddButton>
							</Upload>
						</Row>
					</>
				)
				: <EmptyImages />}
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
							<Typography variant='overline' color='#B2ADBB'>Partner</Typography>
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
					{gender && sexuality
						? (
							<>
								<Typography variant='h6'>I am</Typography>
								<Typography variant='overline'>{gender} {sexuality}</Typography>
							</>
						)
						: (
							<>
								<Typography variant='h6'>Your</Typography>
								<Typography variant='overline' color='#B2ADBB'>gender and sexuality</Typography>
							</>
						)}
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
					<Typography variant='overline' color={location?.city ? 'default' : '#B2ADBB'}>{location?.city ? location.city : 'some city'}</Typography>
					<Space grow />
					<IconButton color='primary'><EditLocationTwoToneIcon /></IconButton>
				</Row>
				<Space />
				<Row justify='between' align='start' onClick={onDescClick}>
					<Input {...descriptionInput} />
					<IconButton color='primary'><EditTwoToneIcon /></IconButton>
				</Row>
				<Space />
				<Row justify='between' align={tags?.length > 0 ? 'start' : 'center'} onClick={onTagsClick}>
					<Row gap={0.5} wrap justify='start'>
						{tags?.length > 0
							? tags.map((tag) => <Chip key={tag} label={tag} />)
							: <Typography color='#B2ADBB'>Select what you are looking for</Typography>}
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
