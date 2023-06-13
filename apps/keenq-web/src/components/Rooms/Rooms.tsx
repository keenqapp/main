import Container from '@/ui/Container'
import Row from '@/ui/Row'
import Space from '@/ui/Space'

import RoomsItem from '@/components/Rooms/RoomsItem'


const rooms = [
	{ uid: '1', name: 'Kiddie', image: 'https://i.pravatar.cc/200?img=1', unread: 1, last: 'Shangri-la is not the inner man of the ego.' },
	{ uid: '2', name: 'Fred', image: 'https://i.pravatar.cc/200?img=2', unread: 0, last: 'The unexplainable is the ground of your own reality. Our new volume for justice is to trap others theosophically.' },
	{ uid: '3', name: 'Sasha Imtabel', image: 'https://i.pravatar.cc/200?img=3', unread: 3, last: 'The key to joy is to see clearly.' },
	{ uid: '5', name: 'Patrisia', image: 'https://i.pravatar.cc/200?img=5', unread: 0, last: 'Manifestation doesn’t compassionately yearn any lama — but the teacher is what preaches..' },
]

function Rooms() {
	const data = rooms
	return (
		<Container data-testid='Rooms' horizontal={2}>
			<Space />
			<Row direction='column' gap={1.5} align='start'>
				{data.map((chat) => (<RoomsItem key={chat.uid} {...chat} />))}
			</Row>
		</Container>
	)
}

export default Rooms
