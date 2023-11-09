import { useEffect, useState } from 'react'
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
import { tagsgql } from '@/model/tags/gql'

import Container from '@/ui/Container'
import Drawer from '@/ui/Drawer'
import IfElse from '@/ui/IfElse'
import Space from '@/ui/Space'
import Stack from '@/ui/Stack'
import theme from '@/ui/theme'

import { useQuery, useUpdate } from '@/hooks/gql'
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

function byLocale(current: string) {
	return ({ locale }: ITag) => current === 'en-US' ? locale === 'en-US' : true
}

function TagsDrawer() {
	const { t, locale } = useTranslate()
	const { id, tags } = useCurrentMember()
	const [ alltags ] = useQuery(tagsgql)
	const [ , update ] = useUpdate(updatemembergql)
	const drawer = useModal('tags')
	const [ show, setShow ] = useState(false)

	useEffect(() => {
		setTimeout(() => setShow(drawer.isOpen), 50)
	}, [ drawer.isOpen ])

	const tagInput = useInput({
		label: t`tags.find`,
		variant: 'outlined',
		fullWidth: true,
		validation: [ isLengthLower(16) ],
		helperText: t`tags.max`,
		InputProps: {
			endAdornment: <ClearTwoToneIcon onClick={() => tagInput.onClear()} />,
		}
	})

	const selected = new Set(tags?.toIds())
	const filtered = alltags?.data?.tags
		.filter(byLocale(locale))
		.filter(byInput(tagInput.value)) || []

	const onClick = (tid: string) => {
		if (selected.size >= 10 && !selected.has(tid)) return

		const next = selected.copyToggle(tid)
		const tags = filtered.filter(({ id }: ITag) => next.has(id))

		update(id, { tags })
	}

	const onCreateClick = async () => {
		tagInput.onClear()
		// update(id, { tags: tags.copyPush(tag) })
	}

	const isExactExist = filtered.some(({ label }) => label === tagInput.value)

	return (
		<Drawer data-testid='ChooseCityDrawer' {...drawer}>
			<StyledContainer data-testid='ChooseCityDrawerContainer'>
				<TextField {...tagInput} />
				<Space />
				<Stack justify='center'>
					<Typography variant='overline'>{t`tags.selected`} {selected.size} {'/ 10'}</Typography>
				</Stack>
				<Space />
				<Stack wrap gap={1} justify={filtered.length > 0 ? 'start' : 'stretch'}>
					<IfElse cond={filtered.length > 0 && show}>
						<>
							{filtered?.map((tag: ITag) => (
								<TagChip
									key={tag.id}
									selected={selected.has(tag.id)}
									onClick={(e: any) => e.target.blur() || onClick(tag.id)}
									onDelete={selected.has(tag.id) ? () => onClick(tag.id) : undefined}
									{...tag}
								/>
							))}
							<Space />
						</>
						<Stack justify='center' direction='column' align='center' flex={1}>
							<Space height={0.5} />
							{/*<Typography variant='overline' textAlign='center'>{t`noTag`}</Typography>*/}
							<Typography variant='overline' textAlign='center'>{t`tags.noTagNo`}</Typography>
						</Stack>
					</IfElse>
					{/*{tagInput.value.length > 0 && !isExactExist && selected.size < 10 && <Button fullWidth onClick={onCreateClick}>{t`create`}</Button>}*/}
				</Stack>
				<Space height={2} />
			</StyledContainer>
		</Drawer>
	)
}

export default TagsDrawer
