import { VNode } from 'preact'
import styled from '@emotion/styled'

import Typography from '@mui/material/Typography'

import AddAPhotoTwoToneIcon from '@mui/icons-material/AddAPhotoTwoTone'
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone'
import NotListedLocationTwoToneIcon from '@mui/icons-material/NotListedLocationTwoTone'
import SubjectTwoToneIcon from '@mui/icons-material/SubjectTwoTone'
import TagTwoToneIcon from '@mui/icons-material/TagTwoTone'
import TextFieldsTwoToneIcon from '@mui/icons-material/TextFieldsTwoTone'
import WcTwoToneIcon from '@mui/icons-material/WcTwoTone'

import Card from '@/ui/Card'
import Column from '@/ui/Column'
import Row from '@/ui/Row'
import Space from '@/ui/Space'

import { useCurrentMember } from '@/hooks/useCurrentMember'


const ProfileProgressContainer = styled.div`
`

function Done({ done, or }: { done: boolean, or: VNode }) {
	return done ? <CheckTwoToneIcon fontSize='small' color='primary' /> : or
}

function ProfileProgress() {
	const {
		name,
		description,
		gender,
		sexuality,
		images,
		location,
		tags,
	} = useCurrentMember()

	return (
		<ProfileProgressContainer>
			<Card>
				<Column gap={0.5}>
					<Typography variant='h6'>Before matching fill this:</Typography>
					<Space height={0.1} />
					<Row gap={0.5} justify='start'>
						<Done done={!!images && images.length > 0} or={<AddAPhotoTwoToneIcon fontSize='small' color='secondary' />} />
						<Typography>Photo</Typography>
					</Row>
					<Row gap={0.5} justify='start'>
						<Done done={!!name} or={<TextFieldsTwoToneIcon fontSize='small' color='secondary' />} />
						<Typography>Name</Typography>
					</Row>
					<Row gap={0.5} justify='start'>
						<Done done={!!gender && !!sexuality} or={<WcTwoToneIcon fontSize='small' color='secondary' />} />
						<Typography>Identity</Typography>
					</Row>
					<Row gap={0.5} justify='start'>
						<Done done={!!location} or={<NotListedLocationTwoToneIcon fontSize='small' color='secondary' />} />
						<Typography>Location</Typography>
					</Row>
					<Row gap={0.5} justify='start'>
						<Done done={!!description} or={<SubjectTwoToneIcon fontSize='small' color='secondary' />} />
						<Typography>Description</Typography>
					</Row>
					<Row gap={0.5} justify='start'>
						<Done done={!!tags && tags.length > 0} or={<TagTwoToneIcon fontSize='small' color='secondary' />} />
						<Typography>Desires</Typography>
					</Row>
				</Column>
			</Card>
			<Space />
		</ProfileProgressContainer>
	)
}

export default ProfileProgress
