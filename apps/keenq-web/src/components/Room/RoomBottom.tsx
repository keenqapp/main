import { useCurrentRoom } from '@/model/room'

import RoomInput from '@/components/Room/RoomInput/RoomInput'
import RoomJoin from '@/components/Room/RoomJoin'


function RoomBottom() {
	const { isMember } = useCurrentRoom()
	if (!isMember) return <RoomJoin />
	return (
		<RoomInput />
	)
}

export default RoomBottom
