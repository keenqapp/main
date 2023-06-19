import { useState } from 'preact/hooks'
import styled from '@emotion/styled'

import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone'
import Chip from '@mui/material/Chip'
import TextField from '@mui/material/TextField'

import { useModal } from '@/services/modals'

import Container from '@/ui/Container'
import Drawer from '@/ui/Drawer'
import Row from '@/ui/Row'
import Space from '@/ui/Space'
import theme from '@/ui/theme'

import { useInput } from '@/hooks/useInput'
import Typography from '@mui/material/Typography'


const StyledContainer = styled(Container)`
  height: calc(100vh - var(--vertical-space) * 4);
`

const tags = [
	{ uid: 'ffm', label: 'ffm' },
	{ uid: 'bdsm', label: 'bdsm' },
	{ uid: 'fwb', label: 'fwb' },
	{ uid: 'poly', label: 'poly' },
	{ uid: 'dating', label: 'dating' },
	{ uid: 'just', label: 'just' },
	{ uid: 'friends', label: 'friends' },
	{ uid: 'travel', label: 'travel' },
	{ uid:'shibari', label: 'shibari' },
	{ uid:'threeway', label: 'threeway' },
	{ uid:'huging', label: 'huging' },
]

const TagChip = styled(Chip)<{ selected: boolean }>`
	background-color: ${p => p.selected ? theme.color.primaryLight : 'rgba(0, 0, 0, 0.08)'} !important;
`

function TagsDrawer() {
	const [ selected, setSelected ] = useState(new Set(['friends', 'shibari', 'threeway']))
	const drawer = useModal('tags')

	const tagInput = useInput({
		label: 'Find what you want',
		variant: 'outlined',
		fullWidth: true,
		InputProps: {
			endAdornment: <ClearTwoToneIcon onClick={() => tagInput.onClear()} />,
		}
	})

	const data = tags.filter(({ label }) => label.toLowerCase().includes(tagInput.value.toLowerCase()))

	const onClick = (uid: string) => {
		setSelected(prev => prev.has(uid) ? prev.copyDelete(uid) : prev.copyAdd(uid) )
	}

	return (
		<Drawer data-testid='ChooseCityDrawer' {...drawer}>
			<StyledContainer data-testid='ChooseCityDrawerContainer'>
				<TextField {...tagInput} />
				<Space />
				<Row justify='center'>
					<Typography variant='overline'>Selected {selected.size} / 10</Typography>
				</Row>
				<Space />
				<Row wrap gap={1} justify='start'>
					{data.map(tag => (
						<TagChip
							key={tag.uid}
							selected={selected.has(tag.uid)}
							onClick={(e: any) => e.target.blur() || onClick(tag.uid)}
							onDelete={selected.has(tag.uid) ? () => onClick(tag.uid) : undefined}
							{...tag}
						/>
					))}
				</Row>
			</StyledContainer>
		</Drawer>
	)
}

export default TagsDrawer
