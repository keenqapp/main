import { VNode } from 'preact'
import styled from '@emotion/styled'

import Typography from '@mui/material/Typography'

import FemaleTwoToneIcon from '@mui/icons-material/FemaleTwoTone'
import MaleTwoToneIcon from '@mui/icons-material/MaleTwoTone'

// import RadioButtonUncheckedTwoToneIcon from '@mui/icons-material/RadioButtonUncheckedTwoTone'
// import TransgenderTwoToneIcon from '@mui/icons-material/TransgenderTwoTone'
import { useModal } from '@/services/modals'
import { useTranslate } from '@/services/translate'

import { updatemembergql } from '@/model/member'
import { useCurrentMember } from '@/model/member/hooks'

import Container from '@/ui/Container'
import Drawer from '@/ui/Drawer'
import Row from '@/ui/Row'
import Space from '@/ui/Space'

// import BiGenderIcon from '@/assets/BiGenderIcon'
import NonBinaryIcon from '@/assets/NonBinaryIcon'
import { useUpdate } from '@/hooks/gql'


const StyledItem = styled(Row)<{ active: boolean }>`
	white-space: nowrap;
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid rgba(211, 211, 211, 0.5);
	background: ${p => p.active ? p.theme.palette.primary.light : 'transparent'};
	flex: 1;
`

const Icon = styled.div`
	color: ${p => p.theme.palette.primary.main};
`

interface GenderItemProps {
	text: string,
	active: boolean,
	icon?: VNode,
	onClick: (text: string) => void
	value: string
}

function Item({ icon, active, onClick, value }: GenderItemProps) {
	const { t } = useTranslate()
	return (
		<StyledItem direction='column' onClick={onClick} active={active}>
			{icon && <Icon>{icon}</Icon>}
			<Typography>{t`gender.${value}`}</Typography>
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
	{ text: 'Male', value: 'male', icon: <MaleTwoToneIcon />	 },
	{ text: 'Female', value: 'female',  icon: <FemaleTwoToneIcon /> },
	{ text: 'Non-binary', value: 'nonBinary', icon: <NonBinaryIcon />	 },
	// { text: 'Agender', icon: <RadioButtonUncheckedTwoToneIcon fontSize='small' /> },
	// { text: 'Transperson', icon: <TransgenderTwoToneIcon /> },
	// { text: 'Genderflid', icon: <BiGenderIcon /> },
]

const sexualities = [
	{ text: 'Hetero', value: 'hetero' },
	{ text: 'Homo', value: 'homo' },
	{ text: 'Flexible', value: 'flexible' },
	// { text: 'Bi' },
	// { text: 'Demi' },
	// { text: 'Asexual' },
	// { text: 'Pansexual' },
]

function GenderDrawer() {
	const { name } = useModal('gender')
	const { t } = useTranslate()

	const {
		id,
		gender,
		sexuality,
	} = useCurrentMember()

	const [ state, update ] = useUpdate(updatemembergql)
	const { gender: ugender, sexuality: usexuality } = state.data?.update_members_by_pk || {}
	const choice = (type: 'gender'|'sexuality', chosen: string) => () => {
		update(id, { [type]:chosen  })
	}

	return (
		<Drawer name={name} data-testid='GenderDrawer'>
			<Container>
				<Typography variant='h6'>{t`gender.gender`}</Typography>
				<Space height={1} />
				<Scroll gap={1} align='stretch'>
					<Space width={0.1} />
					{genders.map(item => (
						<Item
							key={item.value}
							active={(ugender || gender) === item.value}
							onClick={choice('gender', item.value)}
							{...item}
						/>
					))}
					<Space width={0.1} />
				</Scroll>
				<Space height={2} />
				<Typography variant='h6'>{t`gender.sexuality`}</Typography>
				<Space height={1} />
				<Scroll gap={1} align='stretch'>
					<Space width={0.1} />
					{sexualities.map(item => (
						<Item
							key={item.value}
							active={(usexuality || sexuality) === item.value}
							onClick={choice('sexuality', item.value)}
							{...item}
						/>
					))}
					<Space width={0.1} />
				</Scroll>
			</Container>
		</Drawer>
	)
}

export default GenderDrawer
