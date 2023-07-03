import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'

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

import { useCurrentMember } from '@/hooks/useCurrentMember'


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

const tags = ['bdsm', 'ffm', 'fwb', 'shibari', 'threeway', 'huging']
const images = [
	'https://i.pravatar.cc/400?img=1',
	'https://i.pravatar.cc/400?img=2',
	'https://i.pravatar.cc/400?img=3',
	'https://i.pravatar.cc/400?img=4',
	'https://i.pravatar.cc/400?img=5',
]

const partner = {
	name: 'Carrol',
	link: 'KjdoFjd5'
}

function Match() {
	const { onOpen: onReportOpen } = useModal('report')
	const { onOpen: onAcquaintanceOpen } = useModal('acquaintance')
	const navigate = useNavigate()

	const { done } = useCurrentMember()
	const onReportClick = () => onReportOpen()

	const onPartnerClick = () => navigate(`/match/${partner.link}`)

	const onYesClick = () => {
		if (!done) return onAcquaintanceOpen()
	}

	const onNoClick = () => {
		console.log('--- Match.tsx:74 -> onNoClick ->', 'next with no')
	}

	return (
		<Container data-testid='Match'>
			<Swiper images={images} />
			<Space />
			<Content direction='column' align='start'>
				<Row self='stretch' gap={0.5} align='baseline'>
					<Typography variant='h5'>Lucy</Typography>
					{partner && (
						<>
							<Typography variant='overline'>and</Typography>
							<Partner variant='h6' onClick={onPartnerClick}>{partner.name}</Partner>
						</>
					)}
					<Space grow />
					<Typography variant='body2'>Female Straight</Typography>
				</Row>
				<Space height={0.2} />
				<Typography variant='overline'>8 km away</Typography>
				<Space height={0.5} />
				<Fabs justify='between' self='stretch'>
					<IconButton onClick={onNoClick}><HighlightOffTwoToneIcon fontSize='large' color='secondary' /></IconButton>
					<IconButton onClick={onYesClick}><FavoriteTwoToneIcon fontSize='large' color='primary' /></IconButton>
				</Fabs>
				<Space />
				<Typography>
					Going to the heavens of manifestation doesn’t view hypnosis anymore than yearning creates synthetic meditation.
					Be small for whoever disappears, because each has been received with heaven.
					Important futilities discovers most courages. Career realizes when you receive with happiness.
					Control, blessing and an alchemistic body of career.
					All further saints praise each other, only parallel lamas have an acceptance.
				</Typography>
				<Space height={2} />
				<Row gap={0.5} wrap>
					{tags.map((tag) => <Chip key={tag} label={tag} />)}
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
