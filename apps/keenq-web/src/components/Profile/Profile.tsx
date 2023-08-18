import { useEffect, useRef, useState } from 'preact/hooks'
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
import { deleteImage, uploadImage } from '@/services/spaces'
import { useTranslate } from '@/services/translate'

import { IMemberPartner, updatemembergql } from '@/model/member'
import { useCurrentMember } from '@/model/member/hooks'

import Column from '@/ui/Column'
import Container from '@/ui/Container'
import Row from '@/ui/Row'
import Space from '@/ui/Space'
import Upload from '@/ui/Upload'

import ProfileProgress from '@/components/Profile/ProfileProgress'
import Swiper from '@/components/Swiper'

import { useUpdate } from '@/hooks/gql'
import { useDebounceMutation } from '@/hooks/useDebounceMutation'
import { isLengthLower, isNotEmpty, useInput } from '@/hooks/useInput'


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

function Buttons({ id }: { id?: string }) {
	const { id: cid, images } = useCurrentMember()
	const [ , update ] = useUpdate(updatemembergql)

	const onClick = () => {
		const image = images?.find(({ id: iid }) => iid === id)
		const newImages = images?.excludeById(id!)
		if (!image) return
		deleteImage(`/members/${cid}`, image.id)
		update(cid, { images: newImages })
	}

	return (
		<Fabs>
			<CancelTwoToneIcon fontSize='large' color='error' onClick={onClick} />
		</Fabs>
	)
}

function EmptyImages() {

	const { t } = useTranslate()

	const { id, images = [] } = useCurrentMember()
	const [ , update ] = useDebounceMutation(updatemembergql)

	const onChange = async (e: any) => {
		for await (const file of e.target.files) {
			const image = await uploadImage(`members/${id}`, file)
			await update(id, { images: [...images, image] })
		}
	}

	return (
		<EmptyImagesContainer>
			<Upload onChange={onChange} accept='image/*' multiple>
				<Column>
					<Typography textAlign='center' variant='overline'>{t`profile.upload`}</Typography>
					<Space />
					<Button startIcon={<PhotoCameraTwoToneIcon />} component='span'>{t`profile.addPhoto`}</Button>
				</Column>
			</Upload>
		</EmptyImagesContainer>
	)
}

const AddButton = styled(Button)`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(2px);
	flex: 1;
	white-space: nowrap;
`

const SwiperContainer = styled.div`
	position: relative;
`

function Profile() {

	const { t } = useTranslate()

	const {
		id,
		linked,
		name,
		description,
		gender,
		sexuality,
		images = [],
		location,
		tags,
		done
	} = useCurrentMember()

	useEffect(() => {
		document.body.scrollTo({ top: 0, behavior: 'smooth' })
	}, [])

	const partner = linked?.find((l): l is IMemberPartner => l.type === 'partner')?.value

	const { onOpen: onLocationOpen } = useModal('location')
	const { onOpen: onTagsOpen } = useModal('tags')
	const { onOpen: onSettingsClick } = useModal('settings')
	const { onOpen: onGenderClick } = useModal('gender')
	const { onOpen: onAddPartnerClick } = useModal('addPartner')

	const [ , update ] = useDebounceMutation(updatemembergql)

	const nameInput = useInput({
		value: name,
		placeholder: t`profile.name`,
		disableUnderline: true,
		validation: [isNotEmpty, isLengthLower(24)],
		forceValid: true,
		onChange: (_:any, name: string) => update(id, { name }),
	})

	const descriptionInput = useInput({
		value: description,
		placeholder: t`profile.description`,
		multiline: true,
		disableUnderline: true,
		fullWidth: true,
		onChange: (_:any, description: string) => update(id, { description }),
	})

	const [ loading, setLoading ] = useState(false)

	const onScroll = useRef<(where: 'bottom' | 'top') => void>()
	const onUploadChange = async (e: any) => {
		setLoading(true)
		const image = await uploadImage(`members/${id}`, e.target.files[0])
		if (image) await update( id, { images: [...images, image] })
		setLoading(false)
	}

	const onNameClick = () => nameInput.inputRef.current?.focus()

	const onPartnerClick = () => {
		if (partner) return console.log('--- Profile.tsx:118 -> onPartnerClick ->', 'unlink')
		else onAddPartnerClick()
	}

	const onLocationClick = () => onLocationOpen()

	const onDescClick = () => descriptionInput.inputRef.current?.focus()

	const onTagsClick = () => onTagsOpen()

	const isDone = !!images && images.length > 0
		&& !!name
		&& !!gender && !!sexuality
		&& !!location
		&& !!description
		&& !!tags && tags.length > 0

	useEffect(() => {
		if (isDone && !done) update(id, { done: true })
	}, [ isDone, done ])

	return (
		<Container data-testid='Profile'>
			{!isDone && done === false && <ProfileProgress />}
			{images && images?.length > 0
				? (
					<SwiperContainer>
						<Swiper
							loading={loading}
							images={images}
							onScroll={onScroll}
							buttons={<Buttons />}
							scrollOnAdd
						/>
						<Row justify='end'>
							<Upload accept='image/*' onChange={onUploadChange}>
								<AddButton startIcon={<PhotoCameraTwoToneIcon />} component='span'>{t`profile.addPhoto`}</AddButton>
							</Upload>
						</Row>
					</SwiperContainer>
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
							<Typography variant='h6'>{t`profile.and`}</Typography>
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
							<Typography variant='h6'>{t`profile.and`}</Typography>
							<Typography variant='overline' color='#B2ADBB'>{t`profile.partner`}</Typography>
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
								<Typography variant='h6'>{t`profile.iam`}</Typography>
								<Typography variant='overline'>{t`gender.${gender}`} {t`gender.${sexuality}`}</Typography>
							</>
						)
						: (
							<>
								<Typography variant='h6'>{t`profile.your`}</Typography>
								<Typography variant='overline' color='#B2ADBB'>{t`profile.gs`}</Typography>
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
					<Typography variant='h6'>{t`profile.in`}</Typography>
					<Typography variant='overline' color={location?.city ? 'default' : '#B2ADBB'}>{location?.city ? location.city : t`profile.somecity`}</Typography>
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
							? tags.map(({ id, label }) => <Chip key={id} label={label} />)
							: <Typography color='#B2ADBB'>{t`profile.tags`}</Typography>}
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
				>{t`profile.settings`}</Button>
				<Space />
			</Content>
		</Container>
	)
}

export default Profile
