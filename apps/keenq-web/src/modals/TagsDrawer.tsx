import styled from '@emotion/styled'
import { gql } from 'urql'

import Chip from '@mui/material/Chip'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone'

import { useModal } from '@/services/modals'

import Container from '@/ui/Container'
import Drawer from '@/ui/Drawer'
import Row from '@/ui/Row'
import Space from '@/ui/Space'
import theme from '@/ui/theme'

import { useQuery, useUpdate } from '@/hooks/gql'
import { useCurrentMember } from '@/hooks/useCurrentMember'
import { useInput } from '@/hooks/useInput'
import { updategql } from '@/model/member'
import { ITag } from '@/model/other'


const StyledContainer = styled(Container)`
  height: calc(100vh - var(--vertical-space) * 4);
`

const TagChip = styled(Chip)<{ selected: boolean }>`
	background-color: ${p => p.selected ? theme.color.primaryLight : 'rgba(0, 0, 0, 0.08)'} !important;
`

const tagsgql = gql`
	query GetTags {
		tags {
			uid
			label
		}
	}
`

function byInput(input: string) {
	return ({ label }: ITag) => input ? label.toLowerCase().includes(input.toLowerCase()) : true
}

function TagsDrawer() {
	const {
		uid,
		tags
	} = useCurrentMember()
	const [ { data } ] = useQuery(tagsgql)
	const [ , update ] = useUpdate(updategql)
	const drawer = useModal('tags')

	const tagInput = useInput({
		label: 'Find what you want',
		variant: 'outlined',
		fullWidth: true,
		InputProps: {
			endAdornment: <ClearTwoToneIcon onClick={() => tagInput.onClear()} />,
		}
	})

	const selected = new Set(tags?.toUids())
	const alltags = data?.tags.filter(byInput(tagInput.value)) || []

	const onClick = (tuid: string) => {
		if (selected.size >= 10) return

		const next = selected.has(tuid) ? selected.copyDelete(tuid) : selected.copyAdd(tuid)
		const tags = alltags.filter(({ uid }: ITag) => next.has(uid))
		update(uid, { tags })
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
					{alltags?.map((tag: ITag) => (
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
