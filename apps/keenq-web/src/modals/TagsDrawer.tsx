import styled from '@emotion/styled'
import { gql, useMutation } from 'urql'

import Button from '@mui/material/Button'
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
import { isLengthLower, useInput } from '@/hooks/useInput'
import { updategql } from '@/model/member'
import { ITag } from '@/model/other'
import { match } from '@/utils/utils'


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

const addtaggql = gql`
	mutation AddTag($label: String!) {
		insert_tags_one(object: { label: $label }) {
			uid
			label
		}
	}
`

function byInput(input: string) {
	return ({ label }: ITag) => input ? match(input, label) : true
}

function TagsDrawer() {
	const {
		uid,
		tags
	} = useCurrentMember()
	const [ { data } ] = useQuery(tagsgql)
	const [ , update ] = useUpdate(updategql)
	const [ , mutate ] = useMutation(addtaggql)
	const drawer = useModal('tags')

	const tagInput = useInput({
		label: 'Find what you want',
		variant: 'outlined',
		fullWidth: true,
		validation: [ isLengthLower(16) ],
		helperText: 'Max 16 characters',
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

	const onCreateClick = async () => {
		tagInput.onClear()
		const { data } = await mutate({ label: tagInput.value })
		if (data) update(uid, { tags: tags.copyPush(data.insert_tags_one) })
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
				<Row wrap gap={1} justify={alltags.length > 0 ? 'start' : 'stretch'}>
					{alltags.length > 0
						? alltags?.map((tag: ITag) => (
							<TagChip
								key={tag.uid}
								selected={selected.has(tag.uid)}
								onClick={(e: any) => e.target.blur() || onClick(tag.uid)}
								onDelete={selected.has(tag.uid) ? () => onClick(tag.uid) : undefined}
								{...tag}
							/>
						))
						: (
							<Row justify='center' flex={1} direction='column'>
								<Space height={0.5} />
								<Typography variant='overline' textAlign='center'>Seems no tags, you can create a new one</Typography>
							</Row>
						)}
					{alltags.length === 0 && selected.size < 10 && <Button fullWidth onClick={onCreateClick}>Create</Button>}
				</Row>
			</StyledContainer>
		</Drawer>
	)
}

export default TagsDrawer
