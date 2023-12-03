import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { useStore } from '@nanostores/react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { atom } from 'nanostores'

import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import ArrowCircleLeftTwoToneIcon from '@mui/icons-material/ArrowCircleLeftTwoTone'
import ArrowCircleRightTwoToneIcon from '@mui/icons-material/ArrowCircleRightTwoTone'
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone'
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone'
import ReportTwoToneIcon from '@mui/icons-material/ReportTwoTone'

import { useModal } from '@/services/modals'
import { ask } from '@/services/notifications'
import { useTranslate } from '@/services/translate'

import { useCurrentMember } from '@/model/member/hooks'

import Container from '@/ui/Container'
import If from '@/ui/If'
import Space from '@/ui/Space'
import Stack from '@/ui/Stack'

import EmptyMatch from '@/components/Match/EmptyMatch'
import Swiper from '@/components/Swiper'

import { useFormatDistance } from '@/hooks/useFormatDistance'
import { useMatch } from '@/hooks/useMatch'


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

const SLeft = styled.div`
	position: fixed;
	top: 50%;
	left: 1rem;
	z-index: 1;
`

const SRight = styled.div`
	position: absolute;
	top: 50%;
	right: 1rem;
	z-index: 1;
`

function Left({ x }: any) {
	const scale = useTransform(() => x.get() / 75 + 0.25)
	const opacity = useTransform(() => x.get() / 75)
	return (
		<SLeft>
			<motion.div style={{ scale, opacity }}>
				<ArrowCircleLeftTwoToneIcon color='primary' fontSize='large' />
			</motion.div>
		</SLeft>
	)
}

function Right({ x }: any) {
	const scale = useTransform(() => x.get() / -75 + 0.25)
	const opacity = useTransform(() => x.get() / -75)
	return (
		<SRight>
			<motion.div style={{ scale, opacity }}>
				<ArrowCircleRightTwoToneIcon color='primary' fontSize='large' />
			</motion.div>
		</SRight>
	)
}

const SContainer = styled(Container)`
	position: relative;
	animation: ${animation} 0.3s ease-in-out;
`

export const $dragging = atom(false) 

function Match() {

	const { t } = useTranslate()

	const dragging = useStore($dragging)

	const { open: onReportOpen } = useModal('report')
	const { open: onAcquaintanceOpen } = useModal('acquaintance')
	const navigate = useNavigate()
	const { id, done } = useCurrentMember()

	const {
		index,
		member,
		partner,
		next,
		prev,
		empty,
		force,
		yes,
		no,
	} = useMatch()
	const { id: mid, name, images, gender, sexuality, distance, description, tags } = member
	const { name: pname } = partner
	const formattedDistance = useFormatDistance(distance!, mid)

	const onReportClick = () => onReportOpen({ id: mid, entity: 'member', from: 'match' })

	const onPartnerClick = () => {
		if (!partner) return
		navigate(`/match/${partner.id}`)
	}

	const onYesClick = async () => {
		if (!done) return onAcquaintanceOpen()
		yes()
		ask()
	}

	const onNoClick = async () => {
		no()
	}

	const x = useMotionValue(0)

	const end = (_: any, i: any) => {
		if (i.offset.x > 75) prev()
		if (i.offset.x < -75) next()
		$dragging.set(false)
	}

	const start = (e, i) => {
		$dragging.set(true)
	}

	useEffect(() => {
		if (empty) x.set(0)
	}, [ empty ])

	const isSelf = id === mid

	if (empty || force) return <EmptyMatch />

	const dragConstraints = { ...(index === 0 ? { right: 0 } : {}) }

	return (
		<>
			<Left x={x} />
			<Right x={x} />
			<motion.div
				drag='x'
				dragSnapToOrigin
				dragConstraints={dragConstraints}
				dragElastic={0.1}
				style={{ x }}
				onDragStart={start}
				onDragEnd={end}
				dragDirectionLock
			>
				<SContainer key={mid} data-testid='Match'>
					<Swiper images={images} />
					<Space height={0.5} />
					<Content direction='column' align='start' >
						<Stack self='stretch' gap={0.5} align='baseline'>
							<Stack
								align='center'
								justify='start'
								gap={0.2}
								wrap
							>
								<Typography variant='h5'>{name}</Typography>
								<If cond={!!partner.id}>
									<Typography variant='overline'>{t`match.and`}</Typography>
									<Partner variant='h6' onClick={onPartnerClick}>{pname}</Partner>
								</If>
							</Stack>
							<Typography variant='body2'>{t`gender.${gender}`} {t`gender.${sexuality}`}</Typography>
						</Stack>
						<Space height={0.5} />
						<Typography variant='overline'>{formattedDistance} {t`match.away`}</Typography>
						<Space height={0.5} />
						<If cond={!isSelf}>
							<Fabs justify='between' self='stretch'>
								<IconButton onClick={onNoClick}><RemoveCircleTwoToneIcon fontSize='large' color='secondary' /></IconButton>
								<IconButton onClick={onYesClick}><FavoriteTwoToneIcon fontSize='large' color='primary' /></IconButton>
							</Fabs>
						</If>
						<Space />
						<Typography>{description}</Typography>
						<Space height={2} />
						<Stack gap={0.5} wrap>
							{tags?.map((tag) => <Chip key={tag.id} label={tag.label} />)}
						</Stack>
						<Space height={2} />
						<StyledDivider />
						<Space />
						<If cond={!isSelf}>
							<Button
								startIcon={<ReportTwoToneIcon color='error' />}
								onClick={onReportClick}
								fullWidth
								color='default'
							>{t`report.report`}</Button>
						</If>
						<Space />
					</Content>
				</SContainer>
			</motion.div>
		</>
	)
}

export default Match
