import styled from '@emotion/styled'

import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone'

import { useModal } from '@/services/modals'
import { useTranslate } from '@/services/translate'

import { updatemembergql } from '@/model/member'
import { useCurrentMember } from '@/model/member/hooks'
import { ITag } from '@/model/other'
import { createtaggql, tagsgql } from '@/model/tags/gql'

import Container from '@/ui/Container'
import Drawer from '@/ui/Drawer'
import Stack from '@/ui/Stack'
import Space from '@/ui/Space'
import theme from '@/ui/theme'

import { useInsert, useQuery, useUpdate } from '@/hooks/gql'
import { isLengthLower, useInput } from '@/hooks/useInput'
import { match } from '@/utils/utils'


const StyledContainer = styled(Container)`
  height: calc(100vh - var(--vertical-space) * 4);
`

const TagChip = styled(Chip)<{ selected: boolean }>`
	background-color: ${p => p.selected ? theme.color.primaryLight : 'rgba(0, 0, 0, 0.08)'} !important;
`


function byInput(input: string) {
	return ({ label }: ITag) => input ? match(input, label) : true
}

function TagsDrawer() {
	const {
		id,
		tags
	} = useCurrentMember()
	const [ { data } ] = useQuery(tagsgql)
	const [ , update ] = useUpdate(updatemembergql)
	const drawer = useModal('tags')

	const { t } = useTranslate('tags')

	const tagInput = useInput({
		label: t`find`,
		variant: 'outlined',
		fullWidth: true,
		validation: [ isLengthLower(16) ],
		helperText: t`max`,
		InputProps: {
			endAdornment: <ClearTwoToneIcon onClick={() => tagInput.onClear()} />,
		}
	})

	const selected = new Set(tags?.toIds())
	const alltags = data?.tags.filter(byInput(tagInput.value)) || []

	const onClick = (tid: string) => {
		if (selected.size >= 10) return

		const next = selected.copyToggle(tid)
		const tags = alltags.filter(({ id }: ITag) => next.has(id))
		update(id, { tags })
	}

	const onCreateClick = async () => {
		tagInput.onClear()
		// const tag = {
		// 	id: uuid(),
		// 	label: tagInput.value
		// }
		// update(id, { tags: tags.copyPush(tag) })
		// create(tag)
	}

	const isExectExist = alltags.some(({ label }) => label === tagInput.value)

	return (
		<Drawer data-testid='ChooseCityDrawer' {...drawer}>
			<StyledContainer data-testid='ChooseCityDrawerContainer'>
				<TextField {...tagInput} />
				<Space />
				<Stack justify='center'>
					<Typography variant='overline'>{t`selected`} {selected.size} {'/ 10'}</Typography>
				</Stack>
				<Space />
				<Stack wrap gap={1} justify={alltags.length > 0 ? 'start' : 'stretch'}>
					{alltags.length > 0
						? alltags?.map((tag: ITag) => (
							<TagChip
								key={tag.id}
								selected={selected.has(tag.id)}
								onClick={(e: any) => e.target.blur() || onClick(tag.id)}
								onDelete={selected.has(tag.id) ? () => onClick(tag.id) : undefined}
								{...tag}
							/>
						))
						: (
							<Stack justify='center' direction='column'>
								<Space height={0.5} />
								<Typography variant='overline' textAlign='center'>{t`noTag`}</Typography>
							</Stack>
						)}
					{tagInput.value.length > 0 && !isExectExist && selected.size < 10 && <Button fullWidth onClick={onCreateClick}>{t`create`}</Button>}
				</Stack>
			</StyledContainer>
		</Drawer>
	)
}

export default TagsDrawer
