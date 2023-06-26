import styled from '@emotion/styled'

import Column from '@/ui/Column'
import Container from '@/ui/Container'

import RoomInfoDetails from '@/components/RoomInfo/RoomInfoDetails'
import RoomInfoHeader from '@/components/RoomInfo/RoomInfoHeader'
import RoomInfoImage from '@/components/RoomInfo/RoomInfoImage'
import RoomInfoMembers from '@/components/RoomInfo/RoomInfoMembers'
import { IRoom } from '@/model/room'


const mockroom = {
	uid: '1',
	name: 'keenq',
	verified: true,
	type: 'public',
	links: ['https://keenq.com/room/sdf7DSm3'],
	image: 'https://picsum.photos/200/200',
	description: 'A safe space for all Everything we do is connected with suffering: satori, faith, uniqueness, manifestation.',
	members: [
		{ uid: 'me', name: 'boris', image: 'https://picsum.photos/200/200' },
		{ uid: '1', name: 'Patrisia', image: 'https://picsum.photos/200/200' },
		{ uid: '2', name: 'Mia', image: 'https://picsum.photos/200/200' },
		{ uid: '3', name: 'boris', image: 'https://picsum.photos/200/200' },
		{ uid: '4', name: 'Patrisia', image: 'https://picsum.photos/200/200' },
		{ uid: '5', name: 'Mia', image: 'https://picsum.photos/200/200' },
		{ uid: '6', name: 'boris', image: 'https://picsum.photos/200/200' },
		{ uid: '7', name: 'Patrisia', image: 'https://picsum.photos/200/200' },
		{ uid: '8', name: 'Mia', image: 'https://picsum.photos/200/200' },
		{ uid: '9', name: 'boris', image: 'https://picsum.photos/200/200' },
		{ uid: '10', name: 'Patrisia', image: 'https://picsum.photos/200/200' },
		{ uid: '11', name: 'Mia', image: 'https://picsum.photos/200/200' },
	]
} as IRoom

const RoomInfoContainer = styled(Container)`
	//align-items: center;
`

function RoomInfo() {
	const room = mockroom
	return (
		<RoomInfoContainer data-testid='RoomInfo' flex>
			<Column gap={1} flex={1}>
				<RoomInfoHeader {...room} />
				<RoomInfoImage {...room} />
				<RoomInfoDetails {...room} />
				<RoomInfoMembers {...room} />
			</Column>
		</RoomInfoContainer>
	)
}

export default RoomInfo
