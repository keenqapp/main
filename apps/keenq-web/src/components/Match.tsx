import styled from '@emotion/styled'

import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone'
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'

import Container from '@/ui/Container'
import Row from '@/ui/Row'
import Space from '@/ui/Space'

import Swiper from '@/components/Swiper'


const Content = styled(Row)`
	padding: 0 1rem;
`

const Fabs = styled(Row)`
	//position: fixed;
	//left: 0;
	//right: 0;
	//bottom: calc(4rem* 1.5);
	//padding: 0 1.5rem;
	
	svg {
    filter: drop-shadow(0px 2px 8px currentColor);
    backdrop-filter: blur(1px);
		border-radius: 4rem;
		padding: 0.1rem;
	}
`

const tags = ['bdsm', 'ffm', 'fwb', 'shibari', 'threeway', 'huging']
const images = [
	'https://i.pravatar.cc/400?img=1',
	'https://i.pravatar.cc/400?img=2',
	'https://i.pravatar.cc/400?img=3',
	'https://i.pravatar.cc/400?img=4',
	'https://i.pravatar.cc/400?img=5',
]

function Match() {
	return (
		<Container data-testid='Match'>
			<Swiper images={images} />
			<Space />
			<Content direction='column' align='start'>
				<Row justify='between' self='stretch'>
					<Typography variant='h5'>Lucy</Typography>
					<Typography variant='body2'>Straight</Typography>
				</Row>
				<Typography variant='overline'>8 km away</Typography>
				<Space />
				<Fabs justify='between' self='stretch'>
					<HighlightOffTwoToneIcon fontSize='large' color='secondary' />
					<FavoriteTwoToneIcon fontSize='large' color='primary' />
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
			</Content>
		</Container>
	)
}

export default Match
