import { useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'

import Button, { ButtonProps } from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'
import Typography from '@mui/material/Typography'

import BeenhereTwoToneIcon from '@mui/icons-material/BeenhereTwoTone'
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone'
import EditLocationTwoToneIcon from '@mui/icons-material/EditLocationTwoTone'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'
import GroupRemoveTwoToneIcon from '@mui/icons-material/GroupRemoveTwoTone'
import InterestsTwoToneIcon from '@mui/icons-material/InterestsTwoTone'
import PhotoCameraTwoToneIcon from '@mui/icons-material/PhotoCameraTwoTone'
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone'
import SupervisedUserCircleTwoToneIcon from '@mui/icons-material/SupervisedUserCircleTwoTone'
import TagTwoToneIcon from '@mui/icons-material/TagTwoTone'

import { $shouldRequest } from '@/services/location'
import { useConfirm, useModal } from '@/services/modals'
import { $shouldShow } from '@/services/pwa'
import { deleteImage, uploadImage } from '@/services/spaces'
import { useTranslate } from '@/services/translate'

import { IMemberPartner, membergql, updatemembergql } from '@/model/member'
import { useCurrentMember } from '@/model/member/hooks'

import Container from '@/ui/Container'
import If from '@/ui/If'
import IfElse from '@/ui/IfElse'
import Space from '@/ui/Space'
import Stack from '@/ui/Stack'
import Upload from '@/ui/Upload'

import ProfileProgress from '@/components/Profile/ProfileProgress'
import Swiper from '@/components/Swiper'

import { useQuery, useUpdate } from '@/hooks/gql'
import { useDebounceMutation } from '@/hooks/useDebounceMutation'
import { isLengthLower, isNotEmpty, useInput } from '@/hooks/useInput'


const Content = styled(Stack)`
	padding: 0 1rem;
`

const Fabs = styled(Stack)`
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
				<Stack direction='column'>
					<Typography textAlign='center' variant='overline'>{t`profile.upload`}</Typography>
					<Space />
					<Button startIcon={<PhotoCameraTwoToneIcon />} component='span'>{t`profile.addPhoto`}</Button>
				</Stack>
			</Upload>
		</EmptyImagesContainer>
	)
}

const AddButton = styled(Button)<ButtonProps>`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(2px);
	flex: 1;
	white-space: nowrap;
	z-index: 101;
`

const SwiperContainer = styled.div`
	position: relative;
`

function Profile() {

	const { t } = useTranslate()
	const [ saving, setSaving ] = useState(false)

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

	const pid = linked?.find((l): l is IMemberPartner => l.type === 'partner')?.value.id
	const [ result ] = useQuery(membergql, { id: pid })
	const partner = result.data?.members_by_pk

	const { open: onLocationOpen } = useModal('location')
	const { open: onTagsOpen } = useModal('tags')
	const { open: settings } = useModal('settings')
	const { open: onGenderClick } = useModal('gender')
	const { open: openAddPartner } = useModal('addPartner')
	const { confirm } = useConfirm()

	const [ , update ] = useDebounceMutation(updatemembergql)
	const [ , unlink ] = useUpdate(updatemembergql)

	const nameInput = useInput({
		value: name,
		placeholder: t`profile.name`,
		disableUnderline: true,
		validation: [isNotEmpty, isLengthLower(24)],
		forceValid: true,
		inputProps: {
			maxLength: 24,
		},
		fullWidth: true,
	})

	const descriptionInput = useInput({
		value: description,
		placeholder: t`profile.description`,
		multiline: true,
		disableUnderline: true,
		fullWidth: true,
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

	const onPartnerClick = async () => {
		if (partner) {
			confirm({
				onConfirm: async () => {
					await unlink(id, { linked: linked?.filter(mp => mp.type === 'partner' && mp.value.id !== partner.id) })
					await unlink(partner.id, { linked: linked?.filter(m => m.type === 'partner' && m.value.id !== id) })
				}
			})
		}
		else openAddPartner()
	}

	const onLocationClick = () => {
		$shouldRequest.set(true)
		onLocationOpen()
	}

	const onDescClick = () => descriptionInput.inputRef.current?.focus()

	const onTagsClick = () => onTagsOpen()

	const isDone = !!images
		&& images.length > 0
		&& !!name
		&& !!gender && !!sexuality
		&& !!location

	useEffect(() => {
		if (isDone && !done) {
			$shouldShow.set(true)
			update(id, { done: true })
		}
	}, [ isDone, done ])

	const save = () => {
		const data = {
			name: nameInput.value,
			description: descriptionInput.value,
		}
		update(id, data)
		setSaving(true)
		setTimeout(() => setSaving(false), 1000)
	}

	return (
		<Container data-testid='Profile'>
			<If cond={!isDone && done === false}>
				<ProfileProgress />
			</If>
			<IfElse cond={images && images?.length > 0}>
				<SwiperContainer>
					<Swiper
						loading={loading}
						images={images}
						onScroll={onScroll}
						buttons={<Buttons />}
						scrollOnAdd
					/>
					<Stack justify='end'>
						<Upload accept='image/*' onChange={onUploadChange}>
							<AddButton startIcon={<PhotoCameraTwoToneIcon />} component='span'>{t`profile.addPhoto`}</AddButton>
						</Upload>
					</Stack>
				</SwiperContainer>
				<EmptyImages />
			</IfElse>
			<Space />
			<Content direction='column' align='stretch'>
				<Stack justify='between' onClick={onNameClick}>
					<NameInput {...nameInput} />
					<IconButton color='primary'><EditTwoToneIcon /></IconButton>
				</Stack>
				<IfElse cond={!!partner}>
					<Stack onClick={onPartnerClick} gap={0.5} align='baseline'>
						<Typography variant='h6'>{t`profile.and`}</Typography>
						<Typography variant='overline'>{partner?.name}</Typography>
						<Space grow />
						<IconButton color='secondary'><GroupRemoveTwoToneIcon /></IconButton>
					</Stack>
					<Stack
						justify='between'
						onClick={onPartnerClick}
						gap={0.5}
						align='baseline'
					>
						<Typography variant='h6'>{t`profile.and`}</Typography>
						<Typography variant='overline' color='#B2ADBB'>{t`profile.partner`}</Typography>
						<Space grow />
						<IconButton color='primary'><SupervisedUserCircleTwoToneIcon /></IconButton>
					</Stack>
				</IfElse>
				<Stack
					justify='between'
					onClick={onGenderClick}
					gap={0.5}
					align='baseline'
				>
					<IfElse cond={!!gender && !!sexuality}>
						<>
							<Typography variant='h6'>{t`profile.iam`}</Typography>
							<Typography variant='overline'>{t`gender.${gender}`} {t`gender.${sexuality}`}</Typography>
						</>
						<>
							<Typography variant='h6'>{t`profile.your`}</Typography>
							<Typography variant='overline' color='#B2ADBB'>{t`profile.gs`}</Typography>
						</>
					</IfElse>
					<Space grow />
					<IconButton color='primary'><InterestsTwoToneIcon /></IconButton>
				</Stack>
				<Stack
					justify='between'
					onClick={onLocationClick}
					gap={0.5}
					align='baseline'
				>
					<Typography variant='h6'>{t`profile.in`}</Typography>
					<Typography variant='overline' color={location?.city ? 'default' : '#B2ADBB'}>{location?.city || t`profile.somecity`}</Typography>
					<Space grow />
					<IconButton color='primary'><EditLocationTwoToneIcon /></IconButton>
				</Stack>
				<Space />
				<Stack justify='between' align='start' onClick={onDescClick}>
					<Input {...descriptionInput} />
					<IconButton color='primary'><EditTwoToneIcon /></IconButton>
				</Stack>
				<Space />
				<Stack justify='between' align={tags?.length > 0 ? 'start' : 'center'} onClick={onTagsClick}>
					<Stack gap={0.5} wrap justify='start'>
						<IfElse cond={tags?.length > 0}>
							<>{tags?.map(({ id, label }) => <Chip key={id} label={label} />)}</>
							<Typography color='#B2ADBB'>{t`profile.tags`}</Typography>
						</IfElse>
					</Stack>
					<IconButton color='primary'><TagTwoToneIcon /></IconButton>
				</Stack>
				<Space />
				<Divider />
				<Space />
				<Button
					variant='contained'
					fullWidth
					onClick={save}
					startIcon={saving ? <CircularProgress color='inherit' size='1rem' /> : <BeenhereTwoToneIcon />}
				>{t`profile.save`}</Button>
				<Space />
				<Button
					variant='outlined'
					fullWidth
					onClick={settings}
					startIcon={<SettingsTwoToneIcon />}
				>{t`profile.settings`}</Button>
				<Space />
			</Content>
		</Container>
	)
}

export default Profile
