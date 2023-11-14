import styled from '@emotion/styled'

import Typography from '@mui/material/Typography'

import { useTranslate } from '@/services/translate'

import { checkShowName, IMessage, toColor } from '@/model/message'
import { useCurrentRoom } from '@/model/room'

import Stack from '@/ui/Stack'

import { useIsAdmin } from '@/hooks/useIsAdmin'


const Wrap = styled(Stack)`
	padding: 0 1rem;
`

function PersonalMessageName(message: IMessage) {
	const { t } = useTranslate()
	const { authorId, author: { name: mname } } = message
	const { room, isChannel } = useCurrentRoom()
	const isAdmin = useIsAdmin(authorId)
	const shouldShowName = checkShowName(message, room)
	const name = isChannel ? room.name : mname
	if (!shouldShowName) return null
	return (
		<Wrap justify='start'>
			<Typography color={toColor(name)} fontWeight={600}>{name}</Typography>
			{isAdmin && !isChannel && <Typography variant='caption'>{t`roomsMembers.admin`}</Typography>}
		</Wrap>
	)
}

export default PersonalMessageName
