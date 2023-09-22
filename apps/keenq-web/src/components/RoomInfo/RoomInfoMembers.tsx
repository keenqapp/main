import styled from '@emotion/styled'

import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'

import { useModal } from '@/services/modals'
import { useTranslate } from '@/services/translate'

import { $isAdmin, getAvatar, IMember, membersgql } from '@/model/member'
import { useCurrentRoom } from '@/model/room'
import { $isBanned } from '@/model/rooms_members'

import List from '@/ui/List'
import Stack from '@/ui/Stack'

import { useQuery } from '@/hooks/gql'


const RoomInfoMembersContainer = styled(Stack)`
	flex: 1 0 auto;
	align-items: stretch;
`

const MembersList = styled(List)`
	gap: 1rem;
`

const MemberContainer = styled(Stack)`
	padding: 0 2rem;
`

function Member(member: IMember) {
	const { t } = useTranslate()
	const { id, name } = member
	const avatar = getAvatar(member)
	const { open } = useModal('roomInfoMember')
	const { adminsIds, allMembers } = useCurrentRoom()
	const isAdmin = $isAdmin(id, adminsIds)
	const isBanned = $isBanned(id, allMembers)
	const onClick = () => open({ id })

	return (
		<MemberContainer justify='start' gap={1} onClick={onClick}>
			<Avatar src={avatar?.url} alt={name} />
			<Stack direction='column' align='start'>
				<Typography variant='h6'>{name}</Typography>
				{isAdmin && <Typography variant='body2'>{t`roomsMembers.admin`}</Typography>}
				{isBanned && <Typography variant='body2'>{t`roomsMembers.banned`}</Typography>}
			</Stack>
		</MemberContainer>
	)
}

function RoomInfoMembers() {
	const { membersIds, allMembersIds, isAdmin } = useCurrentRoom()
	const [ result ] = useQuery(membersgql, { ids: isAdmin ? allMembersIds : membersIds })
	return (
		<RoomInfoMembersContainer data-testid='RoomInfoMembers'>
			<MembersList
				data={result.data?.members || []}
				render={Member}
			/>
		</RoomInfoMembersContainer>
	)
}

export default RoomInfoMembers
