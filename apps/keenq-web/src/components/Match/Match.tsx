import { useEffect } from 'preact/hooks'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { useMutation } from 'urql'

import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone'
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone'
import ReportTwoToneIcon from '@mui/icons-material/ReportTwoTone'

import { useModal } from '@/services/modals'

import Container from '@/ui/Container'
import Row from '@/ui/Row'
import Space from '@/ui/Space'

import Swiper from '@/components/Swiper'

import { useInsert, useQuery } from '@/hooks/gql'
import { useMember } from '@/hooks/useMember'
import { addmatchgql, matchgql, updatematchgql } from '@/model/match/gql'
import { getPartner } from '@/model/member'
import { useCurrentMember } from '@/model/member/hooks'


const Content = styled(Row)`
	padding: 0 1rem;
`

const Fabs = styled(Row)`
	svg {
    filter: drop-shadow(0px 2px 8px currentColor);
    backdrop-filter: blur(1px);
		border-radius: 4rem;
		padding: 0.1rem;
	}
`

const StyledDivider = styled(Divider)`
	width: 100%;
`

const Partner = styled(Typography)`
	opacity: 0.8;
	border-bottom: 1px solid currentColor;
`

function Match() {
	const { onOpen: onReportOpen } = useModal('report')
	const { onOpen: onAcquaintanceOpen } = useModal('acquaintance')
	const navigate = useNavigate()
	const { id, done } = useCurrentMember()

	const [ result, match ] = useQuery(matchgql, { id })
	console.log('--- Match.tsx:60 -> Match ->', result)
	const { data, fetching, error } = result
	console.log('--- Match.tsx:61 -> Match ->', data?.match?.data)
	const [ , add ] = useInsert(addmatchgql)
	const [ , update ] = useMutation(updatematchgql)

	const {
		id: mid,
		name,
		images = [],
		description,
		gender,
		sexuality,
		tags,
		linked
	} = useMember(data?.match?.data.id)

	useEffect(() => {
		if (id && mid && !fetching && !error) add({ authorId: id, memberId: mid, type: 'seen' })
	}, [ mid, fetching, error, id ])

	const partner = getPartner(linked)
	const onReportClick = () => onReportOpen()

	const onPartnerClick = () => {
		if (!partner) return
		navigate(`/match/${partner.id}`)
	}

	const onYesClick = () => {
		if (!done) return onAcquaintanceOpen()
		update({ authorId: id, memberId: mid, type: 'yes' })
		match()
	}

	const onNoClick = () => {
		update({ authorId: id, memberId: mid, type: 'no' })
		match()
	}

	return (
		<Container data-testid='Match'>
			<Swiper images={images} />
			<Space />
			<Content direction='column' align='start'>
				<Row self='stretch' gap={0.5} align='baseline'>
					<Typography variant='h5'>{name}</Typography>
					{partner && (
						<>
							<Typography variant='overline'>and</Typography>
							<Partner variant='h6' onClick={onPartnerClick}>{partner.name}</Partner>
						</>
					)}
					<Space grow />
					<Typography variant='body2'>{gender} {sexuality}</Typography>
				</Row>
				<Space height={0.2} />
				<Typography variant='overline'>8 km away</Typography>
				<Space height={0.5} />
				<Fabs justify='between' self='stretch'>
					<IconButton onClick={onNoClick}><HighlightOffTwoToneIcon fontSize='large' color='secondary' /></IconButton>
					<IconButton onClick={onYesClick}><FavoriteTwoToneIcon fontSize='large' color='primary' /></IconButton>
				</Fabs>
				<Space />
				<Typography>{description}</Typography>
				<Space height={2} />
				<Row gap={0.5} wrap>
					{tags?.map((tag) => <Chip key={tag.id} label={tag.label} />)}
				</Row>
				<Space height={2} />
				<StyledDivider />
				<Space />
				<Button
					startIcon={<ReportTwoToneIcon color='error' />}
					onClick={onReportClick}
					fullWidth
					color='default'
				>Report</Button>
				<Space />
			</Content>
		</Container>
	)
}

export default Match
