import { useMemo } from 'preact/hooks'
import styled from '@emotion/styled'
import { useStore } from '@nanostores/preact'
import { atom } from 'nanostores'
import { useMutation } from 'urql'

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone'
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone'

import { useModal } from '@/services/modals'
import { useTranslate } from '@/services/translate'

import { IMatch } from '@/model/match'
import { contactsgql, getAvatar, IMember, useCurrentMember } from '@/model/member'
import { useCurrentRoom } from '@/model/room'
import { addmembersgql } from '@/model/rooms_members'

import Checkbox from '@/ui/Checkbox'
import Container from '@/ui/Container'
import Drawer from '@/ui/Drawer'
import List from '@/ui/List'
import Row from '@/ui/Row'
import Space from '@/ui/Space'

import EmptyMembers from '@/components/EmptyMembers'

import { useInsert, useQuery } from '@/hooks/gql'
import { useInput } from '@/hooks/useInput'
import { insertmessagegql } from '@/model/message'


const StyledContainer = styled(Container)`
  height: calc(100vh - var(--vertical-space) * 4);
`

const MembersList = styled(List)`
	gap: 1rem;
`

const MemberItemContainer = styled(Row)`
	padding: 0 1rem;
`

const $selected = atom(new Set<string>())

function MemberItem(member: IMember) {
	const selected = useStore($selected)
	const { id, name } = member
	const avatar = getAvatar(member)
	const onChange = () => $selected.set(selected.copyToggle(id))
	return (
		<MemberItemContainer gap={1} justify='start' onClick={onChange}>
			<Avatar src={avatar?.url} alt={name} />
			<Row flex={1} >
				<Typography variant='h6'>{name}</Typography>
			</Row>
			<Checkbox value={selected.has(id)} />
		</MemberItemContainer>
	)
}

function AddMemberToRoom() {
	const { t } = useTranslate('addMember')
	const { name, on } = useModal('addMemberToRoom')
	const selected = useStore($selected)
	const { id } = useCurrentMember()
	const { id: rid, membersIds } = useCurrentRoom()
	const [ result ] = useQuery(contactsgql, { id })
	const [ , add ] = useMutation(addmembersgql)
	const [ , insert ] = useInsert(insertmessagegql)

	const members = useMemo(() => {
		return result.data?.matches
			.map((match: IMatch) => match.member)
			.filter((m: IMember) => m && !membersIds?.includes(m.id)) || []
	}, [ result.data, membersIds ])

	const nameInput = useInput({
		label: t`find`,
		variant: 'outlined',
		fullWidth: true,
		InputProps: {
			endAdornment: <ClearTwoToneIcon onClick={() => nameInput.onClear()} />,
		}
	})

	const click = () => {
		const objects = selected.toArray().map(mid => ({ roomId: rid, privateFor: rid, memberId: mid }))
		add({ objects })
		selected.toArray().forEach(mid => {
			const systemMessage = {
				roomId: rid,
				type: 'system',
				authorId: id,
				content: [{ type: 'joined', value: { memberId: mid } }]
			}
			insert(systemMessage)
		})
	}

	return (
		<Drawer data-testid='ChooseMemberDrawer' fullHeight name={name}>
			<StyledContainer flex>
				<TextField {...nameInput} />
				<Space />
				<MembersList
					data={members}
					render={MemberItem}
					empty={EmptyMembers}
				/>
				{members.length > 0 && <Button onClick={on(click)} fullWidth startIcon={<CheckTwoToneIcon />}>{t`yeap`}</Button>}
			</StyledContainer>
		</Drawer>
	)
}

export default AddMemberToRoom
