import { useCurrentMember } from '@/model/member'
import { useCurrentRoom } from '@/model/room'

import RoomInput from '@/components/Room/RoomInput/RoomInput'
import RoomJoin from '@/components/Room/RoomJoin'


function RoomBottom() {
	const { isMember } = useCurrentRoom()
	const { done } = useCurrentMember()
	if (!isMember || !done) return <RoomJoin />
	return (
		<RoomInput />
	)
}

export default RoomBottom
