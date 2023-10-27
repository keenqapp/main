import { useEffect } from 'preact/hooks'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useMutation } from 'urql'

import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone'
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone'
import ReportTwoToneIcon from '@mui/icons-material/ReportTwoTone'

import { useModal } from '@/services/modals'
import { ask } from '@/services/notifications'
import { useTranslate } from '@/services/translate'

import { addmatchgql, matchedgql, updatematchgql } from '@/model/match/gql'
import { useCurrentMember } from '@/model/member/hooks'

import Container from '@/ui/Container'
import Space from '@/ui/Space'
import Stack from '@/ui/Stack'

import EmptyMatch from '@/components/Match/EmptyMatch'
import Swiper from '@/components/Swiper'

import { $unread } from '@/core/BottomTabs'
import { useInsert } from '@/hooks/gql'
import { useMatch } from '@/hooks/useMatch'
import { useSwipe } from '@/hooks/useSwipe'
import { formatDistance } from '@/utils/formatters'


const Content = styled(Stack)`
	padding: 0 1rem;
`

const Fabs = styled(Stack)`
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

const animation = keyframes`
  0% {
    opacity: 0.01;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`

const Swipeable = styled(Container)<{ transform: number }>`
	transform: translateX(${({ transform }) => transform}px);
	will-change: transform;
	animation: ${animation} 0.2s ease-in-out;
	position: relative;
`

// function Left() {
// 	return ()
// }

function Match() {

	const { t } = useTranslate()

	const { open: onReportOpen } = useModal('report')
	const { open: onAcquaintanceOpen } = useModal('acquaintance')
	const navigate = useNavigate()
	const { id, done } = useCurrentMember()

	const [ , add ] = useInsert(addmatchgql)
	const [ , update ] = useMutation(updatematchgql)
	const [ , matched ] = useMutation(matchedgql)

	const { member, partner, fetching, error, next, prev, empty } = useMatch()
	const { id: mid, name, images, gender, sexuality, distance, description, tags } = member
	const { id: pid, name: pname } = partner

	useEffect(() => {
		if (id && mid && !fetching && !error) {
			add({ authorId: id, memberId: mid, type: 'seen' })
		}
	}, [ mid, fetching, error, id ])

	const onReportClick = () => onReportOpen({ id: mid, entity: 'member', from: 'match' })

	const onPartnerClick = () => {
		if (!partner) return
		navigate(`/match/${partner.id}`)
	}

	function redirect() {
		if (pid) navigate('/match')
	}

	const onYesClick = async () => {
		if (!done) return onAcquaintanceOpen()
		await update({ authorId: id, memberId: mid, data: { type: 'yes' } })
		const { data } = await matched({ authorId: id, memberId: mid, type: 'yes' })
		if (data?.matched.data.result) $unread.set(true)
		next()
		ask()
		redirect()
	}

	const onNoClick = async () => {
		update({ authorId: id, memberId: mid, data: { type: 'no' } })
		next()
		redirect()
	}

	const swipes = useSwipe({
		onLeft: (e) => {
			if (e.deltaX < -75) next()
		},
		onRight: (e) => {
			if (e.deltaX > 75) prev()
		},
		speed: 0.5
	})

	if (mid === id) return <Navigate to='/match' />
	if (empty || error) return <EmptyMatch />

	return (
		<Swipeable key={mid} data-testid='Match' {...swipes}>
			<Swiper images={images} />
			<Space />
			<Content direction='column' align='start' >
				<Stack self='stretch' gap={0.5} align='baseline'>
					<Stack
						align='center'
						justify='start'
						gap={0.2}
						wrap
					>
						<Typography variant='h5'>{name}</Typography>
						{!!partner.id && (
							<>
								<Typography variant='overline'>{t`match.and`}</Typography>
								<Partner variant='h6' onClick={onPartnerClick}>{pname}</Partner>
							</>
						)}
					</Stack>
					<Typography variant='body2'>{t`gender.${gender}`} {t`gender.${sexuality}`}</Typography>
				</Stack>
				<Space height={0.5} />
				<Typography variant='overline'>{formatDistance(distance, t)} {t`match.away`}</Typography>
				<Space height={0.5} />
				<Fabs justify='between' self='stretch'>
					<IconButton onClick={onNoClick}><RemoveCircleTwoToneIcon fontSize='large' color='secondary' /></IconButton>
					<IconButton onClick={onYesClick}><FavoriteTwoToneIcon fontSize='large' color='primary' /></IconButton>
				</Fabs>
				<Space />
				<Typography>{description}</Typography>
				<Space height={2} />
				<Stack gap={0.5} wrap>
					{tags?.map((tag) => <Chip key={tag.id} label={tag.label} />)}
				</Stack>
				<Space height={2} />
				<StyledDivider />
				<Space />
				<Button
					startIcon={<ReportTwoToneIcon color='error' />}
					onClick={onReportClick}
					fullWidth
					color='default'
				>{t`report.report`}</Button>
				<Space />
			</Content>
		</Swipeable>
	)
}

export default Match
