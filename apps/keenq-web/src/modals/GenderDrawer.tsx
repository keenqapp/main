import { VNode } from 'preact'
import styled from '@emotion/styled'

import FemaleTwoToneIcon from '@mui/icons-material/FemaleTwoTone'
import MaleTwoToneIcon from '@mui/icons-material/MaleTwoTone'
import RadioButtonUncheckedTwoToneIcon from '@mui/icons-material/RadioButtonUncheckedTwoTone'
import TransgenderTwoToneIcon from '@mui/icons-material/TransgenderTwoTone'
import Typography from '@mui/material/Typography'

import { useModal } from '@/services/modals'

import Container from '@/ui/Container'
import Drawer from '@/ui/Drawer'
import Row from '@/ui/Row'
import Space from '@/ui/Space'

import BiGenderIcon from '@/assets/BiGenderIcon'
import NonBinaryIcon from '@/assets/NonBinaryIcon'


const StyledItem = styled(Row)`
	white-space: nowrap;
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid rgba(211, 211, 211, 0.5);
`

const Icon = styled.div`
	color: ${p => p.theme.palette.primary.main};
`

function Item({ text, icon, onClick }: { text: string, icon?: VNode, onClick: (text: string) => void }) {
	return (
		<StyledItem direction='column' onClick={onClick}>
			{icon && <Icon>{icon}</Icon>}
			<Typography>{text}</Typography>
		</StyledItem>
	)
}

const Scroll = styled(Row)`
	width: 100vw;
	overflow-x: scroll;
	margin-left: -1rem;
  margin-right: -1rem;
`

const genders = [
	{ text: 'Male', icon: <MaleTwoToneIcon />	 },
	{ text: 'Female', icon: <FemaleTwoToneIcon /> },
	{ text: 'Non-Binary', icon: <NonBinaryIcon />	 },
	{ text: 'Agender', icon: <RadioButtonUncheckedTwoToneIcon fontSize='small' /> },
	{ text: 'Transperson', icon: <TransgenderTwoToneIcon /> },
	{ text: 'Genderfluid', icon: <BiGenderIcon /> },
]

const sexualities = [
	{ text: 'Hetero' },
	{ text: 'Homo' },
	{ text: 'Bi' },
	{ text: 'Flexible' },
	{ text: 'Demi' },
	{ text: 'Asexual' },
	{ text: 'Pansexual' },
]

function GenderDrawer() {
	const { on } = useModal('gender')

	const choice = (type: 'gender'|'sexuality', chosen: string) => () => {
		console.log('--- GenderDrawer.tsx:18 ->  ->', type, chosen)
	}

	return (
		<Drawer
			name='gender'
			data-testid='GenderDrawer'
		>
			<Container>
				<Typography variant='h6'>Gender</Typography>
				<Space height={1} />
				<Scroll gap={1} align='stretch'>
					<Space width={0.1} />
					{genders.map(gender => <Item key={gender.text} onClick={on(choice('gender', gender.text))} {...gender} />)}
					<Space width={0.1} />
				</Scroll>
				<Space height={2} />
				<Typography variant='h6'>Sexuality</Typography>
				<Space height={1} />
				<Scroll gap={1} align='stretch'>
					<Space width={0.1} />
					{sexualities.map(sexuality => <Item key={sexuality.text} onClick={on(choice('sexuality', sexuality.text))} {...sexuality} />)}
					<Space width={0.1} />
				</Scroll>
			</Container>
		</Drawer>
	)
}

export default GenderDrawer
